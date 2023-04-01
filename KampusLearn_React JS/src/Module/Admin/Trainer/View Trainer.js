import Nav from "../../../Components/Nav";
import { Table,Grid } from '@mantine/core';
import { useState,useEffect } from "react";
import axios from 'axios';
import React from 'react';
import TrainerModal from "../../../Components/Modal/Add Trainer Modal";
import DeleteModal from "../../../Components/Modal/Delete Modal";


export default function ViewTrainer(){

    const[trainer,setTrainer]=useState([]);
   const getTrainer=()=>{
    axios.get('https://localhost:44317/api/Trainer/GetTrainer',{
      headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`,
       }
    }).then((response)=>{
      setTrainer(response.data);
     }).catch(err=>{alert(err.data);});
   }
    useEffect(()=>{ getTrainer();},[]);

    if(trainer.length===0){
      return(
          <Nav>
             <Grid>
             <p>No Trainer wer added still!!</p>
            <Grid.Col span={4}><TrainerModal/></Grid.Col>
            </Grid>
            
          </Nav>
      );
    }
    else{
    const rows = trainer.map((element) => (

        <tr key={element.trainee.trainerId}>
          <td>{element.trainee.trainerId}</td>
          <td>{element.trainee.name}</td>
          <td>{element.trainee.contact}</td>
          <td>{element.trainee.email}</td>
          <td>{element.trainee.address}</td>
          <td>{element.trainee.qualification}</td>
          <td>{element.trainee.yearOfExperience}</td>
          <td>{element.admins.name}</td>
          <td>{element.trainee.createdAt}</td>
          <td>{element.trainee.updatedAt}</td>
        </tr>
      ));

        return(
            <Nav>
            <Grid>
            <h3>List of trainer is listed!!</h3>
            <Grid.Col span={1} style={{marginLeft:'58%'}}><TrainerModal/></Grid.Col>
            <Grid.Col span={2}>
              <DeleteModal label='Trainer Id' placeholder='Enter the Trainer Id' title="Delete Trainer">
              </DeleteModal>
            </Grid.Col>
            </Grid>
            <hr/>
            <br/> <br/> 
            <Table horizontalSpacing="xs" striped >
            <thead>
              <tr>
                <th>Trainer Id</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Qualification</th>
                <th>Years of Experience</th>
                <th>Admin Name</th>
                <th>Created At</th>
                <th>Updated At</th>
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