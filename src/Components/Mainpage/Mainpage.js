import React, { useEffect, useState } from 'react'
import style from './Mainpage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble} from '@fortawesome/free-solid-svg-icons'
import Viewcomponent from '../Viewcomponent/Viewcomponent';
import Newtask from '../Newtask/ Newtask';

export default function Mainpage() {
  const [arrays,setArrays] = useState({Delayed:[],Today:[],'This week':[],'This month':[],Upcoming:[],'No due date':[],High:[],Medium:[],low:[]});

  const [Fetch,setFetch] = useState(true);

  const [selected,setSelected] = useState(0);

  const [sortDiv,showSortDiv] = useState(false);
  
  const [group,setGroup] = useState("Personal tasks");

  const [sortSelection,setSortSelection] = useState("Due date");

  const callFetch = () => {
    console.log("fetch");
      setFetch(!Fetch);
      localStorage.setItem("selected",selected);
      setSelected(-1);
  }

  useEffect(()=>{
    console.log(localStorage.getItem("email"))
   fetch('http://localhost:3028/views',{
      method :"POST",
      headers :{
        'Content-Type' : 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        email :localStorage.getItem("email"),
        groupName : group,
      })
   }).then((response)=>{
    return response.json();
   }).then((data)=>{
    setFetchData(data.response);
    console.log(selected)
    if (selected == -1){
      console.log("everyone")
      setSelected(localStorage.getItem("selected"));
    }
      setSelected(1);
      localStorage.setItem("id",data.i);
   });
  },[Fetch]);

    const [addTask,addNewTask] = useState(false);
   
    const [fetchData,setFetchData] = useState([]);

    const [viewsDisplay,setViewsDisplay] = useState(true);
   
    const [viewsList,setViewsList] = useState([]);
   
    useEffect(()=>{
      let delayed = [],today = [],thisWeek = [],thisMonth = [],upcoming = [],noDueDate = [],High = [],Medium= [],Low = [];
      for (let e of fetchData){
        let g = e.DueDate.split("/");
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        if(e.priority == "High")High.push(e);
        if(e.priority == "Medium")Medium.push(e);
        if(e.priority == "Low")Low.push(e);
        if(new Date(g[1]+"/"+g[0]+"/"+g[2]).toLocaleDateString() == currentDate.toLocaleDateString()){today.push(e);continue;}
        if(new Date(g[1]+"/"+g[0]+"/"+g[2]) < new Date()){delayed.push(e);continue;}
        if(new Date(g[1]+"/"+g[0]+"/"+g[2]) > new Date() && new Date(new Date(g[1]+"/"+g[0]+"/"+g[2])) <= new Date(new Date().setDate(new Date().getDate() - new Date().getDay()+6))){thisWeek.push(e);continue}
        if(new Date(g[1]+"/"+g[0]+"/"+g[2]) > new Date() && new Date(g[1]+"/"+g[0]+"/"+g[2]) > new Date() && new Date(new Date(g[1]+"/"+g[0]+"/"+g[2])) <= new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)){thisMonth.push(e);continue;}
        if(new Date(g[1]+"/"+g[0]+"/"+g[2]) > new Date()){upcoming.push(e);continue;}
        if(new Date(g[1]+"/"+g[0]+"/"+g[2]) == "Invalid")noDueDate.push(e);
      }
      if (selected != 1){let array = [thisWeek,thisMonth,upcoming].flat(); upcoming = array;}
      setArrays({Delayed:delayed,Today:today,'This week':thisWeek,'This month':thisMonth,Upcoming:upcoming,'No due date':noDueDate,High:High,Medium:Medium,low:Low})
    },[selected])

    useEffect(()=>{
      if(selected == 1)setViewsList(["Delayed","Today","This week","This month","Upcoming","No due date"]);
      if(selected == 2 || selected == 3) setViewsList(["Delayed","Today","Upcoming","No due date"]);
      if(selected == 4) setViewsList ( ["Shared with me"]);
      if(selected == 5) setViewsList ( ["Delayed","Today","Upcoming","No due date"]);
      if(selected == 6) setViewsList (["High","Medium","Low"]);
    },[selected]);
  return (
    <React.Fragment>
    <div className={style.header}><FontAwesomeIcon icon = {faCheckDouble} /> &nbsp; Missions</div>
    <div className={style.wholeBody}>  
      <div className={style.sideBar} >
        <div onClick={()=>{addNewTask(!addTask)}} className={style.newTaskButton}>
            New Task
        </div>
        <div onClick={()=>setViewsDisplay(!viewsDisplay)} className={style.headingViews}>
            VIEWS
        </div>
        <div className={(viewsDisplay)?style.allViews:style.displayNone}>
            <div onClick={()=>setSelected(1)} className={(selected == 1)?style.views+" "+style.selected:style.views}>
                Agenda view
            </div> 
            <div onClick={()=>setSelected(2)} className={(selected == 2 || selected == 6)?style.views+" "+style.selected:style.views}>
                Created by me
            </div>                                        
            <div onClick={()=>setSelected(3)} className={(selected == 3)?style.views+" "+style.selected:style.views}>
                Assigned to me
            </div> 
            <div onClick={()=>setSelected(4)} className={(selected == 4)?style.views+" "+style.selected:style.views}>
                Shared with me
            </div>  
            <div onClick={()=>setSelected(5)} className={(selected == 5)?style.views+" "+style.selected:style.views}>
                Personal tasks
            </div>  
        </div>
      </div>
      <div className={style.mainContent}>
        <div className={style.mainContentHeader}>Tasks</div>
        <div className={style.viewCategory}>Assigned to me</div>
        <div onClick={()=>{showSortDiv(!sortDiv)}} className={style.sortGroup}>Group by:<div className={style.sortButton}>{sortSelection}</div></div>
        {(sortDiv)?<div className={style.sortContainer}>
          <div onClick={()=>{ setSortSelection("Priority");setSelected(6);showSortDiv(!sortDiv)}}
             className={(sortSelection == "Priority")?style.sortItem+" "+style.sortItemColor:style.sortItem}>Priority</div>
          <div onClick={()=>{ setSortSelection("Due date");setSelected(2);showSortDiv(!sortDiv)}}
           className={(sortSelection == "Due date")?style.sortItem+" "+style.sortItemColor:style.sortItem}>Due date</div>
        </div>:null}
        <hr/>
        <div className={style.dummyDiv}>
        <div className={style.content}>
          {viewsList.map(e=> {return (<Viewcomponent datas={arrays[e]} Fetch = {callFetch} key={e} text={e}/>)})}
        </div>
        </div>
      </div>
    </div>
    {(addTask)?<Newtask Fetch = {callFetch} cancel = {addNewTask}/>:null}
    </React.Fragment>
  )
}
