import React, { useEffect } from 'react'
import { useNavigate, Navigate} from 'react-router-dom'
import { UserAuth } from './AuthContext'

const ProtectedRoute = ({children}) => {
    const {user} = UserAuth()

    const navigate = useNavigate()
    if (!user) {
        return <Navigate to='/login'/>
    }

    return children
}

export default ProtectedRoute