
import Nav from "../../../Components/Nav";
import { Grid, Table } from '@mantine/core';
import { useState,useEffect } from "react";
import axios from 'axios';
import React from 'react';
import AdminModal from "../../../Components/Modal/Add Admin Modal";
import DeleteModal from "../../../Components/Modal/Delete Modal";
import UpdateModal from "../../../Components/Modal/UpdateAdminModal";


export default function ViewTrainerNotActive(){

 const [notactive,setnotactive]=useState([]);

const getTrainerNotActive=()=>{
  axios.get('https://localhost:44317/api/Trainer/GetTrainerNotActive',{
    headers:{
      'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
    }
  }).then((response) => {
    setnotactive(response.data);
  }).catch(err=>{
    alert(err.data)
  });
}

 useEffect(() => {getTrainerNotActive();}, []);
 

if(notactive.length===0){
  return(
    <Nav>
    <p>No Trainers are available</p>
  </Nav>
  );
 
}
else{
    const rows = notactive.map((element) => (
        <tr key={element.trainerId}>
          <td>{element.trainerId}</td>
          <td>{element.name}</td>
          <td>{element.contact}</td>
          <td>{element.email}</td>
          <td>{element.address}</td>
          <td>{element.qualification}</td>
          <td>{element.yearOfExperience}</td>
          <td>{element.createdAt}</td>
          <td>{element.updatedAt}</td>
        </tr>
      ));
      
   return(
      <>
        <Nav>
        <Grid>
          <h3>List of Trainers who are not active are listed!!</h3> 
        </Grid>
          
        <hr/>
        <br/> <br/> 
        <Table horizontalSpacing="xs" striped >
        <thead>
          <tr>
            <th>Admin Id</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Address</th>
            <th>Qualification</th>
            <th>Years Of Experience</th>
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

