
import { Tabs,Header,Text, Badge } from '@mantine/core';
import Courses from './Courses';
import MyCourses from './MyCourses';
import Profile from './Profile';
import { FcApproval,FcSportsMode} from "react-icons/fc";
import { FaGraduationCap} from "react-icons/fa";
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Candidate(){
  const[course,setCourse]=useState([]);
  const[mycourse,setMyCourse]=useState([]);
const get=()=>{
  axios.get('https://localhost:44317/api/Course/GetCourse').then((response)=>{
    setCourse(response.data);
    }).catch(err=>{alert(err.data);});
  
    axios.get(`https://localhost:44317/api/CandidateCourse/GetCourseOfCandidate/${JSON.parse(localStorage.getItem("CandidateId"))}`
    ).then((response)=>{
      setMyCourse(response.data);
}).catch(err=>{alert(err.data);});
}
   
useEffect(()=>{ get();},[]);


    return(
       <div >
         
       <div style={{textAlign:'center'}}>
         <p style={{fontSize:'38px',color:'teal'}}>Hello {JSON.parse(localStorage.getItem("Name"))} Welcomee!!!</p>
         <p style={{fontSize:'30px',fontStyle:'italic'}}>This is the page where you can develop and enrich your skill..<FcApproval size={20} ></FcApproval></p>
         <p style={{fontSize:'30px',fontStyle:'italic'}}>Emerge like a phoenix...<FcSportsMode size={21}/></p>
         <br/>
       </div>
       <div>
       <Tabs color="teal"  defaultValue="My Courses">
      <Tabs.List grow position="center">
        <Tabs.Tab value="Courses" style={{fontSize:"25px",fontFamily:'monospace'}} >Courses <Badge color="dark">{course.length}</Badge> </Tabs.Tab>
        <Tabs.Tab value="My Courses" style={{fontSize:"25px",fontFamily:'monospace'}}>My Courses  <Badge color="dark">{mycourse.length}</Badge> </Tabs.Tab>
        <Tabs.Tab value="Profile"style={{fontSize:"25px",fontFamily:'monospace'}}>Profile <FaGraduationCap size={18}/></Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Courses" pt="xs">
         <Courses/>
      </Tabs.Panel>

      <Tabs.Panel value="My Courses" pt="xs">
        <MyCourses/>
      </Tabs.Panel>

      <Tabs.Panel value="Profile" pt="xs">
        <Profile/>
      </Tabs.Panel>
    </Tabs>
    
       </div>
       </div>
  
    );
}