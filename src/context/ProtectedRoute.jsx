import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from './context.jsx';
import { useEffect } from "react";
export default  function  ProtectedRoute() {
  const token =true;
      // const{token ,setToken}=useAuth()
      // useEffect(
      //   setToken(localStorage.getItem("token"))
      //   ,[token])
      // console.log(token)
    return token ? <Outlet /> : <Navigate to="/signinsignUp" />
}