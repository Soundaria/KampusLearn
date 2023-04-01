import { Grid,RingProgress,Text } from "@mantine/core";
import Nav from "../../Components/Nav";
import axios from "axios";
import { useState } from "react";


export default function Admin(){
  const[course,setCourse]=useState([]);
  const [candidate,setCandidate]=useState([]);

      axios.get('https://localhost:44317/api/Candidate/GetCandidate',{
        headers:{
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
        }
      }).then((response) => {
        setCandidate(response.data);
    }).catch(err=>{alert(err.data)});

  axios.get('https://localhost:44317/api/Course/GetCourse').then((response)=>{
        setCourse(response.data);
}).catch(err=>{alert(err.data);});

  return(
      <Nav>
         <h2>Hi {JSON.parse(localStorage.getItem("Name"))}!! Welcome</h2>
         <Grid style={{marginTop:'8%'}}>
          <Grid.Col span={6} style={{paddingLeft:'14%'}}>
          <RingProgress
            size={360}
            thickness={13}
            roundCaps
              label={
              <Text size="xl" align="center" style={{fontFamily:'cursive'}}>
                Total Participants
              </Text>
            }
            sections={[
              { value: candidate.length, color: 'cyan' },
            ]}
          />
          </Grid.Col>
          <Grid.Col span={6}>
          <RingProgress
           size={360}
           thickness={13}
           roundCaps
              label={
              <Text size="xl" align="center" style={{fontFamily:'cursive'}}>
                Total Course
              </Text>
            }
            sections={[
              { value: course.length , color: 'cyan' },
            ]}
          />
          </Grid.Col>
         </Grid>
      </Nav>
  );
}