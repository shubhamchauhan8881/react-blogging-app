import { useContext } from 'react'
import AuthContext from './AuthProvider'
import { Navigate } from 'react-router-dom'


export default function PrivateRoutes({children}) {
    const {user} = useContext(AuthContext)
    return (
        <>  
            {(user === null || user === undefined)
                ? <Navigate to="/login"/>
                : children
            }
        </>

    )
}
