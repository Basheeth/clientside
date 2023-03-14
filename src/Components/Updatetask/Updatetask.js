import React, { useState } from 'react'
import style from './Updatetask.module.css'

export default function Updatetask(props) {
console.log(props.data)
  const [detail,setDetails] = useState({
        title:"",dueDate:"",assignedTo:"",startDate:"",status:"",category:"",group:"",priority:"",description:""
  })
  return (
    <div className={style.createNewTask}>
    <div className={style.newTask}>
      <div className={style.newTaskHeader}>
        <div className={style.status}>{props.data.status}</div>
        <div className={style.assigned}>
          <div>Assigned to</div>
          <div className={style.assignedName}>{props.data.assignedTo}</div>
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
           <div onKeyUp={(e)=>setDetails({...detail,title:e.target.innerText})} contentEditable="true" placeholder={"Task Title"} className={style.title}>
              {props.data.title}
           </div>
        </div>
        <div className={style.categoryGroup}>
          <div className={style.mar}>
              in <span className={style.blueBox}>{props.data.groupName}</span>
          </div>
          <div className={style.mar}>
              under <span className={style.blueBox}>{props.data.category}</span>
          </div>
          <div className={style.mar}>
              <span className={style.blueBox+" "+style.gry}>{props.data.priority}</span>
          </div>
        </div>
        <div className={style.newTaskDescriptionName}>Description</div>
        <div onKeyUp={(e)=>{setDetails({...detail,description:e.target.innerText})}} contentEditable="true" className={style.newTaskDescription}>
           {props.data.description}
        </div>
        <div className={style.button}>
        </div>
      </div>
    </div>
  </div>
  )
}
