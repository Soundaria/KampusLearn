import { Grid,Button,Modal,Card } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState,useEffect } from "react";
import CourseCard from "../../Components/CourseCard";

export default function MyCourses(){
    const [opened, { open, close }] = useDisclosure(false);
    const[mycourse,setMyCourse]=useState([]);
    const[payment,setPayment]=useState([]);
   // const colours = ['burlywood','bisque','cadteblue','darkcyan','darkgoldenrod','darkolivegreen','darkslategrey','lightblue','lavendar','lightgreen','tan','thistle'];
      
    const getMyCourse=()=>{
      axios.get(`https://localhost:44317/api/CandidateCourse/GetCourseOfCandidate/${JSON.parse(localStorage.getItem("CandidateId"))}`
      ).then((response)=>{
        setMyCourse(response.data);
}).catch(err=>{alert(err.data);});
    }

    useEffect(()=>{ getMyCourse();},[]);

    const pay=(e)=>{
        console.log(e)
        //setDisable(true);
        axios.post(`https://localhost:44317/api/Payment/AddPayment/${JSON.parse(localStorage.getItem("CandidateId"))}`,{
            "courseId":e
        }).then((response)=>{
            setPayment(response.data);
    }).catch(
        err=>{alert(err.data);
    });  
    }

    
    if(mycourse.length==0){
        return(
            <h2>No Courses added still..Reload to see courses if enrolled!!</h2>
        );
    }
    else{
    return(
        <>
        <Modal opened={opened} onClose={close}  >
          <Card withBorder shadow='lg'>
          <center>
            <p>Payment done successfully!!</p>
            <p>Happy Learning..</p>
          </center>
          </Card>  
        </Modal>
        <Grid  gutter="xl"  style={{paddingLeft:'10px',paddingTop:'25px',width:'100%'}}>
        {
            mycourse.map((data)=>{
                return(
                    <Grid.Col span={3}>
                        <CourseCard  badge={data.status} price={data.course.price} duration={data.course.durationInHours} title={data.course.courseName}  >
                        <Button variant="light" color="teal" disabled={data.status==="Active"?true:false} fullWidth mt="md" radius="md"  onClick={ e=> {open();pay(data.courseId);}} style={{fontSize:"15px"}}>
                         PAY
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