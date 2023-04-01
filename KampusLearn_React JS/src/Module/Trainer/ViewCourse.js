
import { Table } from '@mantine/core';
import { useState,useEffect } from "react";
import axios from 'axios';
import React from 'react';
import NavTrainer from '../../Components/NavTrainer';
import ViewCourse from '../Admin/Course/View Course';

export default function ViewCourseTrainer(){
    const[course,setCourse]=useState([]);
    const getCourse=()=>{
      axios.get('https://localhost:44317/api/Course/GetCourse').then((response)=>{
        setCourse(response.data);
        
        localStorage.setItem("TotalCourse",course.length);
}).catch(err=>{alert(err.data);});
    }
    useEffect(()=>{ getCourse();},[]);

    if(course.length===0){
      return(
        <NavTrainer>
        <p>No Courses were added still!!</p>
      </NavTrainer>
      ); 
    }
    else{
      const rows=course.map((element)=>(
        <tr key={element.courses.courseId}>
        <td>{element.courses.courseId}</td>
        <td>{element.courses.courseName}</td>
        <td>{element.courses.courseCategory}</td>
        <td>{element.courses.price}</td>
        <td>{element.courses.durationInHours}</td>
        <td>{element.courses.createdAt}</td>
        <td>{element.courses.updatedAt}</td>
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
            <th>Course Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Duration</th>
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