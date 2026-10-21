import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/auth";
import Loading from '../components/Loading';
import React from 'react'

const Protected = ({children}) => {
    const {loading,user} = useAuth();
    // console.log("AUTH DEBUG -> loading:", loading, "user:", user);
    if(loading)
    {
        return (<Loading />)
    }
    if(!user)
    {
        
        return <Navigate to={'/login'} />
    }
  return children;
}

export default Protected;
