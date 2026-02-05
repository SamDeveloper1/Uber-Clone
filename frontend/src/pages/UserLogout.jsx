import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const UserLogout = () => {
    const token = localStorage.getItem('user-token')
    const navigate = useNavigate()

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    localStorage.removeItem('user-token')
                    navigate('/login')
                }
            } catch (error) {
                console.error('Logout error:', error)
                localStorage.removeItem('user-token')
                navigate('/login')
            }
        }

        if (token) {
            handleLogout()
        } else {
            navigate('/login')
        }
    }, []) 

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-lg">Logging out...</div>
        </div>
    )
}

export default UserLogout