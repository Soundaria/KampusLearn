
import Nav from "../../../Components/Nav";
import { Grid, Table } from '@mantine/core';
import { useState,useEffect } from "react";
import axios from 'axios';
import React from 'react';


export default function ViewCourseNotActive(){

 const [notactive,setnotactive]=useState([]);

const getCourseNotActive=()=>{
  axios.get('https://localhost:44317/api/Course/GetCourseNotActive',{
    headers:{
      'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
    }
  }).then((response) => {
    setnotactive(response.data);
  }).catch(err=>{
    alert(err.data)
  });
}

 useEffect(() => {getCourseNotActive();}, []);
 

if(notactive.length===0){
  return(
    <Nav>
    <p>No Courses are available</p>
  </Nav>
  );
 
}
else{
    const rows = notactive.map((element) => (
        <tr key={element.courseId}>
          <td>{element.courseId}</td>
          <td>{element.courseName}</td>
          <td>{element.courseCategory}</td>
          <td>{element.price}</td>
          <td>{element.durationInHours}</td>
          <td>{element.createdAt}</td>
          <td>{element.updatedAt}</td>
        </tr>
      ));
      
   return(
      <>
        <Nav>
        <Grid>
          <h3>List of Courses which are not active are listed!!</h3> 
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
            <th>Duration in Hours</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        </Table>
        <br/> <br/> 
        <hr/>
      </Nav>
      
      </>
   );
   }
}

