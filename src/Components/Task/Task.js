import React, { useState } from 'react'
import Updatetask from '../Updatetask/Updatetask';
import style from './Task.module.css'

export default function Task(props) {
    const [selected,setSelected] = useState(false);
    let i = new Date(props.data.dueDate).getFullYear()+"-"+((new Date(props.data.dueDate).getMonth()>8)?"":"0")+(new Date(props.data.dueData).getMonth()+1)+"-"+new Date(props.data.dueData).getDate();
  return (
    <React.Fragment>
    <div onClick={()=>setSelected(true)} className={style.taskWholeContainer}>
        <div suppressContentEditableWarning={true} contentEditable="true" className={style.taskTitle}>
             {props.data.title}
        </div>
        <div className={style.flx}>
            <div className={style.taskStatus}>
                {props.data.status}
            </div>
            <div className={style.taskAssigned}>{props.data.assignedTo}</div>
        </div>
        <div className={style.flx1}>
           <input className={style.taskDueDate} defaultValue={i} type={"date"}/>
        </div>
    </div>
    {(selected)? <Updatetask data = {props.data} />:null}
    </React.Fragment>
  )
}
