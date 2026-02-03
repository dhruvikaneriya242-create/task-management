import { Children } from "react";
import { Navigate, redirect } from "react-router-dom";
const AuthGuard=({
  children,
  required=true,
  redirect="/login"
})=>{
  const data = JSON.parse(localStorage.getItem("loginData"));
  const isAuthenticated = !!data;
  if(required && !isAuthenticated){
    return <Navigate to ={redirect} replace/>
  }

  if (!required && isAuthenticated) {
    return <Navigate to ="/Dashboard" replace/>
    
  }
  return children;
};
export default AuthGuard;