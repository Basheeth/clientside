import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import style from './Loginpage.module.css'

export default function Loginpage(props) {

  const [login,setlogin]=useState({email:"",password:""})

  const [errorDiv,setErrorDiv] =  useState("");

  const [authentication,setAuthentication] = useState(false)

  const run = () =>{
  fetch('http://localhost:3028/login',{
     method:"POST",
     headers:{
        'Content-Type' : 'application/json; charset=utf-8'
     },
     body:JSON.stringify({
        email : login.email,
        password :login.password,
     }),
  }).then((response)=>{
        return response.json();
  }).then((data)=>{
    console.log(data);
      if(data == "Invalid"){
        if (login.email != "" && login.password != "")
         setErrorDiv("Invalid email or password");
      }
      if(data == "success"){
         setAuthentication(true);
         setErrorDiv("");
         localStorage.setItem("email");
      }
  })
  }


  const selectInput = (e) => {
      document.getElementsByTagName("input")[e].focus();
  }

  const changePage = () => {
    props.setPageNumber(1);
  }

  const handleFetch = () => {
    run();
  }


  return (
    <form>
    <h1 className={style.heading}>LOGIN</h1>
    <div className={style.container}>
    <input type={"text"} name={"email"}  required onChange={(e) => setlogin({...login,email:e.target.value})} onBlur={()=>handleFetch()}/>
    <label onClick={(e)=>selectInput(0)} >Email</label>
    </div>
    <div className={style.container}>
    <input required type={"password"} name={"password"} onChange={(e) => setlogin({...login,password:e.target.value})} onBlur={()=>handleFetch()}/>
    <label onClick={(e)=>selectInput(1)}>Password</label>
    <span className={style.error}>{errorDiv}</span>
    </div>
    {(authentication)?<Link to="/mainPage"><div className={style.submitbutton} type={"button"}>Login</div></Link>:<div className={style.submitbutton} type={"button"}>Login</div>}
    <div className={style.footer}>Don't have an account ? <span onClick={()=>changePage()}>Sign Up</span></div>
    </form> 
             
  )
}
