import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const UserLogout = () => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    localStorage.removeItem('captain-token')
                    navigate('/captain-login')
                }
            } catch (error) {
                console.error('Logout error:', error)
                localStorage.removeItem('captain-token')
                navigate('/captain-login')
            }
        }

        if (token) {
            handleLogout()
        } else {
            navigate('/captain-login')
        }
    }, []) 

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-lg">Logging out...</div>
        </div>
    )
}

export default UserLogout