import React, {createContext, useEffect, useState} from 'react'
import {jwtDecode} from 'jwt-decode'
import { redirect } from "react-router-dom";
import { toast } from 'react-toastify'

const AuthContext = createContext()
export default AuthContext;

export function AuthProvider({children}) {
    
    const [isLoading, setIsLoading] = useState(false);
    const [LoadingStatus, setLoadingStatus] = useState("Loading...");

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
            : null
    );

    
    const login = async (username, password) => {
        setIsLoading(()=>true);
        // console.log(username, password);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/login/", {
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify( {"username": username, "password": password})
            });

            const auth_tokens = await response.json();

            if(response.status === 200){
                setAuthTokens(auth_tokens)

                setUser(()=>jwtDecode(auth_tokens.access))
                toast.info(`Login success. Welcome ${jwtDecode(auth_tokens.access).fname}!`)
                localStorage.setItem("authTokens", JSON.stringify(auth_tokens))
                window.location.href = "/"
            }else if(response.status === 401){    
                toast.error(auth_tokens.detail)
            }
        } catch (error) {
            alert(error.message)
            toast.error("error occured! Kindly check your internet connection.")
        }finally{
            setIsLoading(()=>false)
        }
    }



    const registerUser = async (formdata) => {
        setIsLoading(()=>true)
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/user/register/", {
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        "first_name":formdata.first_name,
                        "last_name":formdata.last_name,
                        "username":formdata.username,
                        "password":formdata.password
                    }
                )
            });

            const data = await response.json();

            if(response.status === 200){
                toast.error("Account has been created. Please login!")
                window.location.href = "/login"
    
            }else if(response.status === 400){    
                toast.error(data.username[0])
            }else if(response.status === 401){
                toast.error(data.detail)
            }

        } catch (error) {
            toast.error("error occured! Kindly check your internet connection")
        }finally {
            setIsLoading(()=>false)
        }
    }

    const logoutUser = () => {
        setIsLoading(()=>true);
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        setIsLoading(()=>false);
        redirect("/login");
    }

    const contextData = {
        user, 
        setUser,    
        authTokens,
        setAuthTokens,
        login,
        logoutUser,
        isLoading,
        setIsLoading,
        registerUser,
        LoadingStatus,
        setLoadingStatus
    }

    useEffect(() => {
        // run only when autheon is set chanegs with some values...
        if(authTokens) {
            setUser(()=>jwtDecode(authTokens.access))
        }
    }, [authTokens])


  return (
    <>
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    </>
  )
}
