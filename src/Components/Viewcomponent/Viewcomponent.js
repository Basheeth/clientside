import React, { useState } from 'react'
import Task from '../Task/Task';
import style from './Viewcomponent.module.css'

export default function Viewcomponent(props) {
  console.log(props);
  const [commonState,setCommonState] = useState({addButton:false,addDiv:false});
  const render = (e) => {
    localStorage.getItem("id")
    let date = "";
    (props.text == "Today")?date = new Date().toLocaleDateString():(props.text == "This week")?date = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()+6)).toLocaleDateString():(props.text == "This month" )?date =new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toLocaleDateString() :(props.text == "Upcoming")?date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 28).toLocaleDateString():date = "yet to set"; 
    fetch('http://localhost:3028/updateValues',{
      method:"POST",
      headers : {
        'Content-Type' : 'application/json; charset=utf-8',
      },
      body:JSON.stringify({
        title : e.target.innerText,
        dueDate : date,
        id : Number(localStorage.getItem("id")),
        assignId : Number(localStorage.getItem("id")),
        startDate : "yet to set",
        status : "OPEN",
        category : "General",
        groupId : Number(localStorage.getItem("id")),
        priority : "Medium",
        description : "",
      })
    });
    e.target.innerText = "";
    props.Fetch();
  }

  return (
    <div onMouseLeave={()=>setCommonState({...commonState,addButton:!commonState.addButton})} onMouseEnter={()=>setCommonState({...commonState,addButton:!commonState.addButton})} className={style.componentBody}>
        <div className={style.viewHeading}>
            {props.text}
            {(commonState.addButton && props.text != "Delayed")?<span onClick={()=>setCommonState({...commonState,addDiv:!commonState.addDiv})}>+</span>:null}
        </div>
        {(commonState.addDiv)?<div className={style.addNewTaskButton}>
            <span>+</span>
            <div onKeyDown={(e)=>(e.code == 'Enter')?render(e):null} contentEditable={true} placeholder="s" className={style.titleBox}></div>
            <div className={style.bigDiv}></div>
        </div>:null}
        {(props.datas != undefined && props.datas.length != 0)?props.datas.map(e =>{return(<Task key={e.assignedTo} data ={e}/>)}):null}
    </div>
  )
}
