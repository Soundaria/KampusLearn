import { useState,useEffect } from "react";
import NavTrainer from "../../Components/NavTrainer";
import axios from "axios";
import { Table } from "@mantine/core";


export default function MyCourse(){
    const[mycourse,setMycourse]=useState([]);
    const trainerid=JSON.parse(localStorage.getItem("Trainer"));
     
    const getmycourse=()=>{
        axios.get(`https://localhost:44317/api/TrainerCourse/GetCourseOfTrainer/${trainerid.id.trainerId}`
        ).then((response) => {
          setMycourse(response.data);
        }).catch(err=>{console.log(err)});
      }
  
      useEffect(() => {getmycourse();}, []);

      if(mycourse.length===0){
        return(
            <NavTrainer>
            <p>No Courses were added still!!</p>
          </NavTrainer> 
        );
        
      }
      else{
        const rows=mycourse.map((element)=>(
          <tr key={element.id}>
            <td>{element.course.courseName}</td>
            <td>{element.admin.name}</td>
            <td>{element.batchName}</td>
            <td>{element.createdAt}</td>
            <td>{element.updatedAt}</td>
          </tr>
  
      ));
        return(
            <NavTrainer>
                        <h3>List of courses are listed!!</h3>    
        <hr/>
        <br/> <br/>
        <Table horizontalSpacing="xs" striped >
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Admin Name</th>
            <th>Batch Name</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        </Table>
        <br/><br/>
        <hr/>
            </NavTrainer>
        );
      }
}