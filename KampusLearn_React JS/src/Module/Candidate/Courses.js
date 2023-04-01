import { useState,useEffect } from "react";
import axios from 'axios';
import { Grid,Modal,Card,Button,Badge,ActionIcon,Group} from "@mantine/core";
import CourseCard from "../../Components/CourseCard";
import { useDisclosure } from "@mantine/hooks";
import ButtonField from "../../Components/Button";
import { Filter ,SortAscendingLetters} from 'tabler-icons-react';


export default function Courses(props){
    const [opened, { open, close }] = useDisclosure(false);
    const[course,setCourse]=useState([]);
    //const colours = ['burlywood','cadteblue','darkcyan','darkgoldenrod','darkolivegreen','darkslategrey','lightblue','lavendar','lightgreen','tan','thistle'];

    const getCourse=()=>{
      axios.get('https://localhost:44317/api/Course/GetCourse').then((response)=>{
        setCourse(response.data);

        }).catch(err=>{alert(err.data);});
    }

    useEffect(()=>{ getCourse();},[]);

    const getAscCourse=()=>{
        axios.get('https://localhost:44317/api/Course/GetCoursebyAscName').then((response)=>{
          //setCourse(response.data);
          }).catch(err=>{alert(err.data);console.log(err)});
      }
  
      useEffect(()=>{ getAscCourse();},[]);

    const enroll=(e)=>{
        //console.log(e);
        axios.post(`https://localhost:44317/api/CandidateCourse/AddCoursetoCandidate/${JSON.parse(localStorage.getItem("CandidateId"))}`,{
            "courseId":e
        }).then((response)=>{
            //console.log(response.data);
        }).catch(err=>{
            alert(err.response.data);
        });
    }


     if(course.length===0){
        return(
            <h3>No courses to display!!</h3>
        );
     }
     else{ 
    return(
<>
        <Modal opened={opened} onClose={close}  >
          <Card withBorder shadow='lg'>
          <center>
          <p>Course Enrolled Successfully!!</p>
          <p>Do the payment for the activation of course..</p>
          <h4>Happy Learning!!</h4>
          </center>
          </Card>  
        </Modal>

        {/* <Grid style={{backgroundColor:'ButtonHighlight',width:'100%',paddingLeft:'8px'}}>
               <Group>
               <ActionIcon disabled>
                      <Filter size={58} strokeWidth={2} color={'black'}/>
                </ActionIcon>
               <ActionIcon>
                    <SortAscendingLetters size={58} strokeWidth={2} color={'black'} onClick={()=>{getAscCourse()}}/>
                </ActionIcon>
                </Group>
        </Grid> */}
        
            <Grid  gutter="xl"  style={{paddingLeft:'10px',paddingTop:'25px',width:'100%'}}>
                {
                    course.map((data,index)=>{
                        //let ind=Math.floor(Math.random() * colours.length);
                        return(
                            <Grid.Col span={3}>
                                <CourseCard  badge="Active" price={data.courses.price} duration={data.courses.durationInHours} title= {data.courses.courseName}  >
                                    <Button variant="light" color="teal" fullWidth mt="md" radius="md" onClick={ e=> {open(); enroll(data.courses.courseId);}} style={{fontSize:"15px"}}>
                                        Enroll
                                    </Button>
                                </CourseCard>
                            </Grid.Col>
                        );
                    })
                }
            </Grid>
            </>
    );
}
}