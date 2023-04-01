
import Nav from "../../../Components/Nav";
import { Table } from '@mantine/core';
import { useState ,useEffect} from "react";
import axios from 'axios';
import React from 'react';


export default function ViewCandidate(){
    const [candidate,setCandidate]=useState([]);
    const getCandidate=()=>{
      axios.get('https://localhost:44317/api/Candidate/GetCandidate',{
        headers:{
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
        }
      }).then((response) => {
        setCandidate(response.data);
    }).catch(err=>{alert(err.data)});
  }
      useEffect(() => {getCandidate();}, []);

      if(candidate.length===0){
        return(
            <Nav>
              <p>No Candidates are added!!</p>
            </Nav>
        );
      }
      else{
      const rows = candidate.map((element) => (
        <tr key={element.candidateId}>
          <td>{element.candidateId}</td>
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
          <h3>List of Candidate are listed!!</h3>
          <hr/>
          <br/> <br/> 
          <Table horizontalSpacing="xs" striped >
          <thead>
            <tr>
              <th>Candidate Id</th>
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
        </Nav>
        </>
     );
   }
}