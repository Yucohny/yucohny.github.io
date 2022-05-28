import React from 'react'
import 'antd/dist/antd.css'

import { Table } from 'antd';
const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

class App extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return <Table rowSelection={{type: 'checkbox'}} dataSource={data}>
            <Table.Column title="name" dataIndex="name"/>
            <Table.Column title="age" dataIndex="age"/>
            <Table.Column title="address" dataIndex="address"/>
        </Table>;
    }
}

export default App;