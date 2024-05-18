/* eslint-disable react/prop-types */

import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoutes = ({verifyJWT, children,}) => {
    if (!verifyJWT){
        return <Navigate to='/login' />
    }

    
    return children ? children : <Outlet/>
  
}

export default ProtectedRoutes


