# 题目

注意：所有的题目都不是「原本的表述」，经过了笔者自身的翻译+回忆+理解，但是尽量保持题目原本的意思。

## 第一题

给定长度为 n（<= 2e5） 的字符串，仅包含小写字母。求，将该字符串切为不为空的两段，至少一段满足字符 x 与字符 y 的数量相等（0 也满足），有多少种切法？

## 第二题

给定点数为 n（<= 1e5），边数为 m（<= 1e5） 的无向图。

现在每隔一秒，度数不超过 1 的点以及与之相连的边都会消失，问，多少秒后，图将不再发生变化？

## 第三题

给定一棵结点数量为 n （<= 2e4）的树，每个节点权值为 0 或 1，求树上最长路径长，满足 01 交替出现。

# 笔试时的各个想法

下列代码均为笔试期间的代码。

## 第一题

前缀和后 O(n) 扫一遍。

```javascript
function solution(S) {
    const x = []
    const y = []
    x.push(S[0] === 'x' ? 1 : 0)
    y.push(S[0] === 'y' ? 1 : 0)
    for (let i = 1; i < S.length; ++i) {
        x.push(x[x.length - 1] + (S[i] === 'x' ? 1 : 0))
        y.push(y[y.length - 1] + (S[i] === 'y' ? 1 : 0))
    }
    let ans = 0
    for (let i = 0; i < S.length - 1; ++i) {
        const x1 = x[i], y1 = y[i]
        const x2 = x[x.length - 1] - x[i]
        const y2 = y[y.length - 1] - y[i]
        if (x1 === y1 || x2 === y2) {
            ++ans
        }
    }
    return ans
}
```

## 第二题

当时第一眼就看出来是拓扑排序，但是脑子瓢了一下，想错了一个地方，然后把拓扑排序否了。

然后一想，直接把图中的环缩点后不就是直接求直径了吗？于是开始 Tarjan 缩点……

结果肯定就扑街了……Tarjan 缩点是有向图强连通分量，我这个是无向图的环……缩点根本就不是一回事……

当时还在想 Tarjan 缩点都已经忘了，但是也现场调试出来了，结果后来想起来根本就不是这回事……

Tarjan 错误做法代码如下（上面有一些调试输出）：

```c++
#include <bits/stdc++.h>
using namespace std;

const int N = 1e5 + 5;

struct node {
    int to, nxt;
} edges[N << 1];
int n, m, ret, du[N], vis[N];
int cnt, head[N];
int dfn[N], low[N], dfncnt, s[N], in_stack[N], tp;
int scc[N], sc;
int sz[N];
vector<int> g[N];
vector<int> p;

void insert(int x, int y) {
    ++cnt;
    edges[cnt].to = y;
    edges[cnt].nxt = head[x];
    head[x] = cnt;
    cout << x << " <-> " << y << endl;
}

void tarjan(int u) {
    low[u] = dfn[u] = ++dfncnt, s[++tp] = u, in_stack[u] = 1;
    for (int i = head[u]; i; i = edges[i].nxt) {
        const int &v = edges[i].to;
        if (!dfn[v]) {
            tarjan(v);
            low[u] = min(low[u], low[v]);
        } else if (in_stack[v]) {
            low[u] = min(low[u], dfn[v]);
        }
    }
    if (dfn[u] == low[u]) {
        ++sc;
        while (s[tp] != u) {
            scc[s[tp]] = sc;
            sz[sc]++;
            in_stack[s[tp]] = 0;
            --tp;
        }
        scc[s[tp]] = sc;
        sz[sc]++;
        in_stack[s[tp]] = 0;
        --tp;
    }
}

void dfs(int cur, int val) {
    vis[cur] = 1;
    ret = max(ret, val);
    for (int i = 0; i < g[cur].size(); ++i) {
        int to = g[cur][i];
        if (!vis[to]) {
            dfs(to, val + 1);
        }
    }
}

int solution(int N, vector<int> &A, vector<int> &B) {
    n = N; m = A.size();
    for (int i = 0; i < A.size(); ++i) {
        insert(A[i] + 1, B[i] + 1);
        insert(B[i] + 1, A[i] + 1);
    }
    for (int i = 1; i <= n; ++i) {
        if (!dfn[i]) {
            tarjan(i);
        }
    }
    for (int i = 1; i <= n; ++i) {
        for (int j = head[i]; j; j = edges[j].nxt) {
            int x = i, y = edges[j].to;
            if (scc[x] != scc[y]) {
                g[scc[x]].push_back(scc[y]);
                g[scc[y]].push_back(scc[x]);
                du[scc[x]] ++;
                du[scc[y]] ++;
            }
        }
    }
    for (int i = 1; i <= n; ++i) {
        cout << scc[i] << " ";
    }
    cout << endl;
    for (int i = 1; i <= sc; ++i) {
        if (du[i] == 1) {
            p.push_back(i);
        }
    }
    if (p.size() == 0) {
        return 0;
    }
    int ans = 0;
    for (int i = 0; i < p.size(); ++i) {
        int x = p[i];
        for (int j = 1; j <= n; ++j) {
            vis[j] = 0;
        }
        ret = 1;
        dfs(x, 1);
        ans = max(ans, ret);
    }
    return (ans + 1) / 2;
}


int main() {
    vector<int> a = {0, 1, 2, 1, 4, 4};
    vector<int> b = {1, 2, 0, 4, 5, 6};
    cout << solution(7, a, b);
    return 0;
}
```

这个题其实就是直接拓扑排序，单独对每个点的度数变为不超过 1 时记录一下时间即可：

尴尬了……发现没有保存正确做法的代码……不过其实也简单。

## 第三题

第三题一上来就有点没有反应过来，马上写了暴力……

```c++
const int N = 4e4 + 5;

struct node {
    int to, nxt;
} edges[N << 1];
int n, m, ret;
int cnt, vis[N], head[N];
string s;

void insert(int x, int y) {
    ++cnt;
    edges[cnt].to = y;
    edges[cnt].nxt = head[x]; head[x] = cnt;
}

void dfs(int cur, int val) {
    vis[cur] = 1;
    ret = max(ret, val);
    for (int i = head[cur]; i; i = edges[i].nxt) {
        int to = edges[i].to;
        if (vis[to]) {
            continue;
        }
        if (s[to - 1] != s[cur - 1]) {
            dfs(to, val + 1);
        }
    }
}

int solution(string &S, vector<int> &A) {
    s = S;
    n = A.size(), m = A.size() - 1;
    for (int i = 0; i < A.size(); ++i) {
        insert(i + 1, A[i] + 1);
        insert(A[i] + 1, i + 1);
    }
    int ans = 0;
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            vis[j] = 0;
        }
        ret = 0;
        dfs(i, S[i - 1] == 'a' ? 0 : 1);
        ans = max(ans, ret);
    }
    return ans;
}
```

然后一想，这不就是树形 DP 吗？对于每个点，选取两个权值最大且异号的子节点相加即可，dfs 的时候记录最大即可，于是就有了下面的代码：

```c++
#include <bits/stdc++.h>
using namespace std;

const int N = 4e4 + 5;

int n, ans, f[N];
vector<int> sons[N];
string s;

void dfs(int cur) {
    f[cur] = 1;
    int a = 0, b = 0;
    for (int i = 0; i < sons[cur].size(); ++i) {
        int y = sons[cur][i];
        dfs(y);
        if (s[y - 1] == s[cur - 1]) {
            continue;
        }
        if (f[y] > a) {
            b = a;
            a = f[y];
        } else if (f[y] > b) {
            b = f[y];
        }
    }
    f[cur] += a + b;
}

int solution(string &S, vector<int> &A) {
    s = S;
    n = A.size();
    for (int i = 0; i < n; ++i) {
        if (A[i] == -1) {
            continue;
        }
        sons[A[i] + 1].push_back(i + 1);
    }
    dfs(1);
    for (int i = 1; i <= n; ++i) {
        ans = max(ans, f[i]);
    }
    return ans;
}

int main() {
//    vector<int> vct = {-1, 0, 0, 0, 2};
//    cout << solution("abbab", vct);
    return 0;
}
```

但是直接就错完了，选取两个权值最大的子节点，这个权值已经不能保证是一条链了……就错了，最后意识到了这个问题，感觉正解也来不及想，就交了暴力。

这个题其实应该就是树形DP？增加一个 01 状态……

之后要是能再继续想一想，就来更新一下吧。

# 一些思考

这次笔试做完还是有一些想法吧：

1. 关于 Explore 暑期项目本身，我自知第三题没有做出来已经是没有希望了。微软会收到大批 ACM 选手投递实习，算法要求自然水涨船高，而很可能在笔试的时候就直接卡算法了。
2. 关于数据结构与算法。之前字节与阿里的笔试&面试，算法和数据结构考的都很基础，再加上看了一些面经上面考的算法个人感觉都不难，所以这次微软 Explore 的笔试我也没有专门刷算法题……不过现在肯定就吃亏了。
3. 其实大学以来，自己就直接做了前端开发，确实没有再太多照顾算法这一块；原本中学留下的竞赛功底已经消耗殆尽了。未来（明年春招）要想收割一波 offer，刷算法确实是非常必要的，所以就继续从现在开始，把算法数据结构做起来吧。