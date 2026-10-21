import { useEffect, useState } from "react";
import {  createContext } from "react";
import { getCurrentUser } from "./auth.api";
export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user,setuser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() =>{
        const getandSetUser = async() =>{
            try {
                const data = await getCurrentUser();
                setuser(data.user);    
            } catch (error) {
                console.log("Error getCurrentuser :",error);
            } finally {

                setloading(false);
            }
            
        }
        
        getandSetUser();
    },[])
    return <AuthContext.Provider value = {{user,setuser,loading,setloading}} >
        {children}
    </AuthContext.Provider>

}