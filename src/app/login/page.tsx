"use client";
import Link from 'next/link';
import react, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password:""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    //This method will always call db so we are marking as async
    const onLogin = async ()=>{
        try{
            setLoading(true);
           const response = await axios.post("/api/users/login", user);
           console.log(response);
           router.push("/profile");

        }catch(error){
            console.log("Login Failed ", error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (
          user.email.length > 0 &&
          user.password.length > 0 ) {
          setButtonDisabled(false);
        } 
        else {
          setButtonDisabled(true);
        }
    }, [user]);

    return(
        <div className="flex flex-col mt-4 items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing..." : "Login"}</h1>
            <hr/>
               <label htmlFor="email">email</label>
            <input
            className="text-black"
               id="email"
               type="text"
               value={user.email}
               onChange = {(e)=> setUser({...user, email: e.target.value})}
               placeholder="email"
               />
               <label htmlFor="password">password</label>
            <input
            className="text-black"
               id="password"
               type="password"
               value={user.password}
               onChange = {(e)=> setUser({...user, password: e.target.value})}
               placeholder="password"
               />
               <button
               onClick ={onLogin}
               className="p-2 pt-2 border border-gray-300 rounded-lg
               mb-4 focus:outline-none
               focus:border-gray-600">{buttonDisabled ? "No Login" : "Login"}</button>
               <Link href="/signup">Visit SignUp</Link>
        </div>
    );
}