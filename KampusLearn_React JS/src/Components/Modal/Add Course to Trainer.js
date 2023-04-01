import { useDisclosure } from '@mantine/hooks';
import { Modal, Group,Grid,Center,Card } from '@mantine/core';
import ButtonField from '../Button';
import axios from 'axios';
import { useState } from 'react';
import SelectTrainer from '../SelectTrainer';
import SelectCourse from '../SelectCourse';
import SelectBatch from '../SelectBatch';

export default function CoursetoTrainer() {
  const [opened, { open, close }] = useDisclosure(false);
  const [admin,setAdmin]=useState(JSON.parse(localStorage.getItem("Admin")));
  const [trainer,setTrainer]=useState("");
  const [course,setCourse]=useState("");
  const [batch,setBatch]=useState("");
  
  const changeTrainer=(e)=>{
      setTrainer(e);
  }
  const changeCourse=(e)=>{
    setCourse(e);
  }
  const changeBatch=(e)=>{
    setBatch(e)
  }
  

  const addcoursetotrainer=()=>{
    axios.post(`https://localhost:44317/api/Admin/AddCourseToTrainer`,{
        "courseId":course,
        "trainerId":trainer,
        "batchName":batch
    },{
      headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
      }
  }).then((response)=>{
        alert(response.data);
    }).catch(err=>{
      alert(err.data);
    })
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Course to Trainer">
      <Center >
        <Card  withBorder radius="md"  style={{width:'100%'}}>
       <form onSubmit={addcoursetotrainer}>
       <Grid justify="center" align="center">
            <Grid.Col span={10}>
               <SelectCourse value={course} onChange={changeCourse}  />
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
               <SelectTrainer value={trainer} onChange={changeTrainer} />
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
               <SelectBatch value={batch} onChange={changeBatch} />
            </Grid.Col>
            </Grid>
            <br/>
            <Center>
                <ButtonField type="submit" color='teal' >Add Course To Trainer</ButtonField>
            </Center>
       </form>
       
    </Card>
    </Center>
    
      </Modal>

      <Group position="left" >
      <ButtonField  color='teal' type='submit' onClick={open} >Add Course to Trainer</ButtonField>
      </Group>
    </>
  );
}