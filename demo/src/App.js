import React, { Component } from "react"
import {Link, Route, Routes} from "react-router-dom"
import Alpha from "./Pages/Alpha";
import Beta from "./Pages/Beta";
import One from "./Pages/One"
import Two from "./Pages/Two";

export default class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <div>
                        <Link to="/alpha">Alpha</Link><br></br>
                        <Link to="/beta">Beta</Link>
                    </div>
                </div>
                <Routes>
                    <Route path="/alpha" element={<Alpha/>}>
                        <Route index element={<One/>}/>
                        <Route path="/alpha/one" element={<One/>}/>
                        <Route path="/alpha/two" element={<Two/>}/>
                    </Route>
                    <Route path="/beta" element={<Beta/>}/>
                </Routes>
            </div>
        )
    }
}