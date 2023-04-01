import Nav from "../../../Components/Nav";
import { Table,Grid } from '@mantine/core';
import { useState,useEffect } from "react";
import axios from 'axios';
import React from 'react';
import CourseModal from "../../../Components/Modal/Add Course Modal";
import DeleteModal from "../../../Components/Modal/Delete Modal";
import UpdateModal from "../../../Components/Modal/UpdateAdminModal";
import UpdateCourse from "../../../Components/Modal/UpdateCourse";


export default  function ViewCoursebyAdmin(){
    const[course,setCourse]=useState([]);

    const getcourse=()=>{
      axios.get('https://localhost:44317/api/Admin/GetCoursebyAdminId',{
        headers:{
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
        }
      }).then((response)=>{
        setCourse(response.data);
        console.log(response.data)
    }).catch(err=>{
      alert(err.data);
    });
}

    useEffect(()=>{getcourse();},[]);
  if(course.length===0){
    return(
      <Nav>
      <p>No Courses are added!!</p>
    </Nav>
    );
  }

  else{
    
    const rows=course.map((element)=>(
        <tr key={element.courseId}>
        <td>{element.courseId}</td>
        <td>{element.courseName}</td>
        <td>{element.courseCategory}</td>
        <td>{element.price}</td>
        <td>{element.durationInHours}</td>
        <td>{element.totalparticipant}</td>
        <td>{JSON.parse(localStorage.getItem("Name"))}</td>
        <td>{element.createdAt}</td>
        <td>{element.updatedAt}</td>
      </tr>

    ));

    return(
        <Nav>
        <h3>List of courses by Admin is listed!!</h3>
        <hr/>
        <br/> <br/> 
        <Table horizontalSpacing="xs" striped >
        <thead>
          <tr>
            <th>Course Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Total Participants</th>
            <th>Admin Name</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        </Table>
        
        </Nav>
    );
  }
}