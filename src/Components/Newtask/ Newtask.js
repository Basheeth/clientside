import React, { useState } from 'react'
import style from './Newtask.module.css'

export default function  Newtask(props) {

  const [detail,setDetails] = useState({
    title:"",dueDate:"",assignedTo:"",startDate:"",status:"",category:"",group:"",priority:"",description:""
  })
  const render = () =>{
    fetch('http://localhost:3028/updateValues',{
        method:"POST",
        headers:{
            'Content-Type' : 'application/json; charser=utf-8',
        },
        body:JSON.stringify({
            title : detail.title,
            dueDate : new Date("2023-10-03").toLocaleDateString(),
            email : "panda12@gmail.com",
            assignedTo : "bashee",
            startDate : "yet to set",
            status : "OPEN",
            category : "General",
            group : "Personal tasks",
            priority : "High",
            description : detail.description,
        }),
    }).then((response)=>{
        console.log(response);
        if (response.status == 200){
            props.Fetch();
            props.cancel(false);
        }
    })
    
  }
  
  return (
    <div className={style.createNewTask}>
      <div className={style.newTask}>
        <div className={style.newTaskHeader}>
          <div className={style.status}>Open</div>
          <div className={style.assigned}>
            <div>Assigned to</div>
            <div className={style.assignedName}>Sheik</div>
          </div>
          <div className={style.setDate}>
             <div>Start date</div>
             <div>Yet to set</div>
          </div>
          <div className={style.dueDate}>
            <div>Due date</div>
            <div>Yet to set</div>
          </div>
        </div>
        <div className={style.newTaskBody}>
          <div className={style.flx}>
             <img className={style.mailImage} src={"//js.zohocdn.com/zmail/zm/app/wp-images/mail-icon.9abdf23c3c14c3c559e7174706842d17.png"} />
             <div onKeyUp={(e)=>setDetails({...detail,title:e.target.innerText})} contentEditable="true" placeholder={"Task Title"} className={style.title}></div>
          </div>
          <div className={style.categoryGroup}>
            <div className={style.mar}>
                in <span className={style.blueBox}>Personal tasks</span>
            </div>
            <div className={style.mar}>
                under <span className={style.blueBox}>General</span>
            </div>
            <div className={style.mar}>
                <span className={style.blueBox+" "+style.gry}>Medium</span>
            </div>
          </div>
          <div className={style.newTaskDescriptionName}>Description</div>
          <div onKeyUp={(e)=>{setDetails({...detail,description:e.target.innerText})}} contentEditable="true" className={style.newTaskDescription}>
            d
          </div>
          <div className={style.button}>
              <div onClick={()=>render()} className={style.save}>Save</div>
              <div onClick={()=>{props.cancel(false)}} className={style.cancel}>Cancel</div>
          </div>
        </div>
      </div>
    </div>
  )
}
