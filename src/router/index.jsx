/* 
    App > List + Edit + Means
    Login
    Register
*/

import App from '../App'
import List from '../pages/List'
import ListTable from '../pages/ListTable'
import ListList from '../pages/ListList'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const BaseRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='/list' element={<ListTable />}></Route>
                    <Route path='/edit' element={<Edit />}></Route>
                    <Route path='/means' element={<Means />}></Route>
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
        </Router>
    )
}

export default BaseRouter