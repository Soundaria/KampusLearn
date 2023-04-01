import { useDisclosure} from '@mantine/hooks';
import { Modal, Group,Grid,Center,Card } from '@mantine/core';
import ButtonField from '../Button';
import TextBox from '../TextBox';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function CourseModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [admin,setAdmin]=useState(JSON.parse(localStorage.getItem("Admin")));
  const [name,setName]=useState("");
  const [category,setCategory]=useState("");
  const [price,setPrice]=useState("");
  const [duration,setDuration]=useState("");

  const changeName=(e)=>{
    setName(e.target.value);
  }
  const changeCategory=(e)=>{
    setCategory(e.target.value);
  }
  const changePrice=(e)=>{
    setPrice(e.target.value);
  } 
  const changeDuration=(e)=>{
    setDuration(e.target.value);
  }
  
  const AddCourse= ()=>{
    axios.post(`https://localhost:44317/api/Admin/AddCourse`,{
      "courseName":name,
      "courseCategory":category,
      "price":2000,
      "durationInHours":25
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
      <Modal opened={opened} onClose={close} title="Add Course">
      <Center >
        <Card  withBorder radius="md"  style={{width:'100%'}}>
       <form onSubmit={AddCourse}>
       <Grid justify="center" align="center">
            <Grid.Col span={10}>
                <TextBox type="text" label="Course Name" placeholder="Enter the Course Name" value={name} onChange={changeName} required={true}/>
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
                <TextBox type="text" label="Course Category" placeholder="Enter the Course Category" value={category} onChange={changeCategory} required={true}/>
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
                <TextBox type="text" label="Price" placeholder="Enter the Price" value={price} onChange={changePrice} required={true}/>
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
                <TextBox type="text" label="Duration of Course" placeholder="Enter the Duration" value={duration} onChange={changeDuration} required={true}/>
            </Grid.Col>
             </Grid>
            <br/>
            <Center>
                <ButtonField type="submit" color='teal' >Add Course</ButtonField>
            </Center>
       </form>
       
    </Card>
    </Center>
    
      </Modal>

      <Group position="right" >
      <ButtonField  color='teal' type='submit' onClick={open} >Add Course</ButtonField>
      </Group>
    </>
  );
}