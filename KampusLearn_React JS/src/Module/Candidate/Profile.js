import { Card, Grid, Center, CardSection } from "@mantine/core";
import axios from "axios";
import { useEffect,useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ButtonField from "../../Components/Button";
import UpdateCandidate from "../../Components/Modal/Update Candidate";

export default function Profile(){
  const navigate=useNavigate();
    const[candidate,setCandidate]=useState([]);
    const candidateId=JSON.parse(localStorage.getItem("CandidateId"));
    const getCandidate=()=>{
      axios.get(`https://localhost:44317/api/Candidate/GetCandidatebyId`,{
        headers:{
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Candidatetoken'))}`
        }
      }).then((response) => {
        setCandidate(response.data);
      }).catch(err=>{console.log(err)});
    }

    useEffect(() => {getCandidate();}, []);

    const signout=()=>{
      axios.delete(`https://localhost:44317/api/Candidate/DeleteCandidate`,{
        headers:{
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Candidatetoken'))}`
        }
      }).then((response) => {
        setCandidate(response.data);
        navigate('/');
      }).catch(err=>{console.log(err)});
    }

    return(
            <>
            
            <Grid style={{width:'100%',justifyContent:'center',paddingTop:'50px'}}> 
            <Grid.Col span={2}>
              <Card style={{marginTop:'8%',paddingLeft:'45px'}}>
              <FaUserGraduate size={150}/>
              </Card>
              <Grid>
              <UpdateCandidate/>
                <ButtonField type='submit' color='red' onClick={signout}>SignOut</ButtonField>
              </Grid>
                
            </Grid.Col> 
            <Grid.Col span={3}style={{fontSize:'20px'}} >
            <p><b>Name : </b>{candidate.name} </p> 
            <p><b>Address :</b> {candidate.address} </p>
            <p><b>Contact : </b> {candidate.contact} </p>
            <p><b>Email : </b> {candidate.email} </p>
            </Grid.Col>
            </Grid>
            </>
        
       
    );
}