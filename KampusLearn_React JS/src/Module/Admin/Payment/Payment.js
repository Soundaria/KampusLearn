
import Nav from "../../../Components/Nav";
import { Grid, Table } from '@mantine/core';
import { useState,useEffect } from "react";
import axios from 'axios';
import React from 'react';



export default function Payment(){

 const [payment,setPayment]=useState([]);

const getPayment=()=>{
  axios.get('https://localhost:44317/api/Payment/GetPayment',{
    headers:{
      'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
    }
  }).then((response) => {
    setPayment(response.data);
    console.log(response.data);
  }).catch(err=>{
    alert(err.data)
  });
}

 useEffect(() => {getPayment();}, []);
 

if(payment.length===0){
  return(
    <Nav>
    <p>No Payments are available</p>
  </Nav>
  );
 
}
else{
    const rows = payment.map((element) => (
        <tr key={element.paymentId}>
            <td>{element.paymentId}</td>
          <td>{element.candidate.name}</td>
          <td>{element.course.courseName}</td>
          <td>{element.createdAt}</td>
        </tr>
      ));
      
   return(
      <>
        <Nav>
        <Grid>
          <h3>List of Payments are listed!!</h3> 
        </Grid>
          
        <hr/>
        <br/> <br/> 
        <Table horizontalSpacing="xs" striped >
        <thead>
          <tr>
            <th> Id</th>
            <th>Candidate Name</th>
            <th>Course Name</th>
            <th>Created At</th>
           
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

