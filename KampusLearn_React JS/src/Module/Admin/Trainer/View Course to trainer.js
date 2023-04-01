import Nav from "../../../Components/Nav";
import axios from "axios";
import { useState,useEffect } from "react";
import { Table,Grid } from "@mantine/core";
import CoursetoTrainer from "../../../Components/Modal/Add Course to Trainer";
import UpdateCoursetoTrainer from "../../../Components/Modal/UpdateCourseToTrainer";
import DeleteModal from "../../../Components/Modal/Delete Modal";

export default function ViewTrainerCourse(){
    const[trainercourse,setTrainercourse]=useState([]);
   
     const getTrainerCourse=()=>{
      let token=JSON.parse(localStorage.getItem('Authtoken'));
      axios.get('https://localhost:44317/api/Admin/GetCourseOfTrainer',{
       headers:{
         'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`,
        }
      }).then((response)=>{
         setTrainercourse(response.data);
      }).catch(err=>{alert(err.data);});
  }

    useEffect(()=>{ getTrainerCourse();},[]);

    if(trainercourse.length===0){
      return(
        <Nav>
            <Grid>
            <p>No Trainers are added!!</p>
            <Grid.Col span={2} style={{marginLeft:'35%'}}><CoursetoTrainer/></Grid.Col>
            </Grid>
         
        </Nav>
      );
    }
    else{
    const rows = trainercourse.map((element) => (

        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.trainerId}</td>
          <td>{element.trainer.name}</td>
          <td>{element.course.courseName}</td>
          <td>{element.admin.name}</td>
          <td>{element.batchName}</td>
          <td>{element.createdAt}</td>
          <td>{element.updatedAt}</td>
          <td><UpdateCoursetoTrainer id= {element.id} /></td>
        </tr>
      ));
    return(
        <Nav>
            <Grid>
            <h3>List of trainers and their courses are listed!!</h3>
            <Grid.Col span={2} style={{marginLeft:'35%'}}><CoursetoTrainer/></Grid.Col>
            <Grid.Col span={2}><DeleteModal label='Id' placeholder='Enter the Id' title="Delete Course Of Trainer">
              </DeleteModal></Grid.Col>
            </Grid>
        <hr/>
        <br/> <br/> 
        <Table horizontalSpacing="xs" striped >
        <thead>
          <tr>
            <th>Id</th>
            <th>Trainer Id</th>
            <th>Trainer Name</th>
            <th>Course Name</th>
            <th>Admin Name</th>
            <th>Batch Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        </Table>
        <br/> <br/> 
        <hr/>
        </Nav>
    );
    }
}