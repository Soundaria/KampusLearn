
import Nav from "../../../Components/Nav";
import { Grid, Table } from '@mantine/core';
import { useState,useEffect } from "react";
import axios from 'axios';
import React from 'react';
import AdminModal from "../../../Components/Modal/Add Admin Modal";
import DeleteModal from "../../../Components/Modal/Delete Modal";
import UpdateModal from "../../../Components/Modal/UpdateAdminModal";


export default function ViewAdmin(){
 const [admin,setAdmin]=useState([]);
 const [notactive,setnotactive]=useState([]);

 const getAdmin=()=>{
  axios.get('https://localhost:44317/api/Admin/GetAdmin',{
    headers:{
      'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
    }
  }).then((response) => {
    setAdmin(response.data);
  }).catch(err=>{console.log(err)});
}

const getAdminNotActive=()=>{
  axios.get('https://localhost:44317/api/Admin/GetAdminNotActive',{
    headers:{
      'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
    }
  }).then((response) => {
    setnotactive(response.data);
  }).catch(err=>{
    alert(err.data)
  });
}

 useEffect(() => {getAdmin();}, []);

 useEffect(() => {getAdminNotActive();}, []);
 
 const Notactive = notactive.map((element) => (
  <tr key={element.adminId}>
    <td>{element.adminId}</td>
    <td>{element.name}</td>
    <td>{element.contact}</td>
    <td>{element.email}</td>
    <td>{element.address}</td>
    <td>{element.createdAt}</td>
    <td>{element.updatedAt}</td>
  </tr>
));


if(admin.length===0){
  return(
    <Nav>
    <p>No Admins are available</p>
  </Nav>
  );
 
}
else{
const rows = admin.map((element) => (
  <tr key={element.adminId}>
    <td>{element.adminId}</td>
    <td>{element.name}</td>
    <td>{element.contact}</td>
    <td>{element.email}</td>
    <td>{element.address}</td>
    <td>{element.createdAt}</td>
    <td>{element.updatedAt}</td>
  </tr>
));

   return(
      <>
        <Nav>
        <Grid>
          <h3>List of Admin are listed!!</h3>
          <Grid.Col span={1} style={{marginLeft:'55%'}}><AdminModal/></Grid.Col>
          <Grid.Col span={2}>
            <DeleteModal label='Admin Id' placeholder='Enter the Admin Id' title="Delete Admin">
            </DeleteModal>
          </Grid.Col>
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

