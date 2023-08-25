import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const UserRoute = () => {
    const user = localStorage.getItem('user')
    return user !== null ? <Outlet/> : <Navigate to='/login'/>
}

export default UserRoute