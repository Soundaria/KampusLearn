import { Card, Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import UpdateTrainer from "../../Components/Modal/Update Trainer";
import NavTrainer from "../../Components/NavTrainer";
import axios from "axios";
import {CiUser } from 'react-icons/ci';


export default function Trainer(){
    const[trainer,setTrainer]=useState([]);
    const getTrainer=()=>{
      axios.get(`https://localhost:44317/api/Trainer/GetTrainerbyId`,{
        headers:{
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Trainertoken'))}`
        }
      }).then((response) => {
        setTrainer(response.data);
      }).catch(err=>{console.log(err)});
    }

    useEffect(() => {getTrainer();}, []);

    return(
      <NavTrainer>
        <h2 style={{fontStyle:'italic'}}>Hii {JSON.parse(localStorage.getItem("TrainerName"))} Welcome!!</h2>
        <br/>
        <Grid>
            <Grid.Col span={6}>
            <p style={{fontStyle:'italic',fontSize:'30px'}}>My Profile</p>
            </Grid.Col>
            <Grid.Col span={2} style={{marginLeft:'33%',marginTop:'40px'}}>
                <UpdateTrainer/>
            </Grid.Col>
        </Grid>
        
        <hr/>
        <Grid>
            <Grid.Col span={3}>
              <Card style={{marginTop:'10%',paddingLeft:'25px'}}>
              <CiUser size={250} />
              </Card>
            </Grid.Col>
            <Grid.Col span={6} style={{textAlign:'left',fontFamily:'serif',fontSize:'20px'}}>
            <p><b>Name : </b>{trainer.name} </p> 
            <p><b>Address :</b> {trainer.address} </p>
            <p><b>Contact : </b> {trainer.contact} </p>
            <p><b>Email : </b> {trainer.email} </p>
            <p><b>Qualification :</b>  {trainer.qualification}</p>
            <p><b>Years of Experience :</b>  {trainer.yearOfExperience} years</p>
            <p><b>Created At :</b>  {trainer.createdAt} </p>
            <p><b>Updated At :</b>  {trainer.updatedAt}</p> 
            </Grid.Col>
        </Grid>
      </NavTrainer>
    );
}