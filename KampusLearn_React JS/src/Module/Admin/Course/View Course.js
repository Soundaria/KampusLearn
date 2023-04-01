import Nav from "../../../Components/Nav";
import { Table,Grid } from '@mantine/core';
import { useState,useEffect } from "react";
import axios from 'axios';
import React from 'react';
import CourseModal from "../../../Components/Modal/Add Course Modal";
import DeleteModal from "../../../Components/Modal/Delete Modal";
import UpdateCourse from "../../../Components/Modal/UpdateCourse";

export default function ViewCourse(){
    const[course,setCourse]=useState([]);
    const getCourse=()=>{
      axios.get('https://localhost:44317/api/Course/GetCourse').then((response)=>{
        setCourse(response.data);
}).catch(err=>{alert(err.data);});
    }
    useEffect(()=>{ getCourse();},[]);

    if(course.length===0){
      <Nav>
        <p>No Courses were added still!!</p>
      </Nav>
    }
    else{
    const rows=course.map((element)=>(
        <tr key={element.courses.courseId}>
        <td>{element.courses.courseId}</td>
        <td>{element.courses.courseName}</td>
        <td>{element.courses.courseCategory}</td>
        <td>{element.courses.price}</td>
        <td>{element.courses.durationInHours}</td>
        <td>{element.admins.name}</td>
        <td>{element.courses.totalparticipant}</td>
        <td>{element.courses.createdAt}</td>
        <td>{element.courses.updatedAt}</td>
        <td><UpdateCourse id= {element.courses.courseId} /></td>
      </tr>

    ));
        return(
            <Nav>
              <Grid>
               <h3>List of courses are listed!!</h3>
              <Grid.Col span={2} style={{marginLeft:'48%'}}><CourseModal/></Grid.Col>
              <Grid.Col span={2}  >
               <DeleteModal label='Course Id' placeholder='Enter the Course Id' title="Delete Course">
              </DeleteModal>
          </Grid.Col>
              </Grid>
        
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
            <th>Admin </th>
            <th>Total Participants</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        </Table>
        <br/><br/>
        <hr/>
        </Nav>
      );
    }
}