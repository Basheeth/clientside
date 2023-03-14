import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Loginpage from '../Loginpage/Loginpage'
import Signup from '../Signup/Signup'
import style from './Userloginpage.module.css'

export default function Userloginpage() {
    const [page,setPage] = useState(0);


  return (
    <div className={style.login}>
       <div className={style.wholeContainer}>
          <img src={"assets/Screenshot from 2023-03-02 09-38-42-depositphotos-bgremover.png"} />
          <div className={style.loginDiv}>
           {(page == 0)? <Loginpage setPageNumber ={setPage}/> : <Signup setPageNumber ={setPage} />}
          </div>
       </div>
    </div> 
  )
}
