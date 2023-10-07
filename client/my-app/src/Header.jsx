import { useContext, useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { UserContext } from "./UserContext";
export default function Header(){
 const {setUserInfo,userInfo} =useContext(UserContext)
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo =>{
        setUserInfo(userInfo);
      })
    })
  },[]);

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials:'include',
      method:'POST',
    });
    setUserInfo(null);
  }
    const username=userInfo?.username;
    return (
        <header>
        <Link to="/">my blog</Link>
        <nav>
          {username && (
            <>
            <span>hello, {username}</span>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
               <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
         
        </nav>
      </header>
    )
}