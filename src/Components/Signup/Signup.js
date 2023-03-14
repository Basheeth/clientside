import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import style from './Signup.module.css'

export default function Signup(props) {
    const [authentication,setAuthentication] = useState(false);
  
    const [login,setlogin]=useState({username:"",password:"",email:""});

    const [validation,checkValidation] = useState({wrongPassword:"",wrongEmail:"",wrongUsername:""});

    const emailReg =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordReg =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
    const usernameReg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;


    const run = () => {
        if (emailReg.test(login.email) && passwordReg.test(login.password) && (usernameReg.test(login.username) && login.username.length > 2)){
            console.log("fetch")
          checkUser();
            
        }
        else if (login.username != "" && login.password != "" && login.email != ""){
            let mail = "",pwd = "",uname = "";
            if (!emailReg.test(login.email) || login.email.length > 51)mail = "!Invalid email";
            if (!passwordReg.test(login.password) || login.password.length > 21)pwd = "!Invalid password";
            if (!usernameReg.test(login.username) || login.username.length > 51 || login.username.length < 3)uname = "!Invalid Username";
        checkValidation({wrongUsername:uname,wrongPassword:pwd,wrongEmail:mail})
        setAuthentication(false)
        }
    }

    const goToFetch = () => {
      localStorage.setItem("email",login.email);
        fetch('http://localhost:3028/signUp',{
           method:"POST",
           headers:{
              'Content-Type' : 'application/json; charset=utf-8'
           },
           body:JSON.stringify({
              name : login.username,
              password :login.password,
              email : login.email,
           }),
        }).then((response)=>{
              return response;
        });
    }

    const checkUser = () => {
      fetch('http://localhost:3028/checkUserAvailability',{
        method:"POST",
        headers : {
          'Content-Type' : 'application/json; charset=utf-8',
        },
        body : JSON.stringify({
          email : login.email,
        })
      }).then((response)=>{
        return response.json();
      }).then((data)=>{
        if (data == "userAvailable"){
          setAuthentication(true);
          checkValidation({wrongUsername:"",wrongPassword:"",wrongEmail:""})
        }
        else{
          setAuthentication(false);
          checkValidation({wrongUsername:"",wrongPassword:"User already exists",wrongEmail:""})
        }
      })
    }


    const selectInput = (e) => {
        document.getElementsByTagName("input")[e].focus();
    }
    
    const changePage = () => {
        props.setPageNumber(0);
    }

  return (
  <form>
    <h1 className={style.heading}>SIGN UP</h1>
    <div className={style.container}>
    <input type={"text"} name={"username"}  required onChange={(e)=>setlogin({...login,username:e.target.value})} onBlur={()=>run()}/>
    <label onClick={(e)=>selectInput(0)}>Username</label>
    <p className={style.validationChecker}>{validation.wrongUsername}</p>
    </div>
    <div className={style.container}>
    <input type={"text"} name={"email"}  required onChange={(e)=>setlogin({...login,email:e.target.value})} onBlur={()=>run()}/>
    <label onClick={(e)=>selectInput(1)}>Email</label>
    <p className={style.validationChecker}>{validation.wrongEmail}</p>
    </div>
    <div className={style.container}>
    <input required type={"password"} name={"password"} onChange={(e)=>setlogin({...login,password:e.target.value})} onBlur={()=>run()}/>
    <label onClick={(e)=>selectInput(2)}>Password</label>
    <p className={style.validationChecker}>{validation.wrongPassword}</p>
    </div>
    {(authentication)?(<Link to="/mainPage"><div onClick={()=>goToFetch()} className={style.submitbutton} type={"button"}>Signup</div></Link>):<div className={style.submitbutton} type={"button"}>Signup</div>}
    <div className={style.footer}>Already have an account ? <span onClick={()=>changePage()}>Login</span></div>
  </form> 
  )
}
