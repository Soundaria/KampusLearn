import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group,Grid,Center,Card } from '@mantine/core';
import ButtonField from '../Button';
import TextBox from '../TextBox';
import { useState } from 'react';
import axios from 'axios';
import { Id } from 'tabler-icons-react';

export default function DeleteModal(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [id,setId]=useState("");

  const changeId=(e)=>{
    setId(e.target.value);
  }
   const sure=value=>()=>{
       if(value==="Delete Course"){
             axios.delete(`https://localhost:44317/api/Admin/DeleteCourse/${id}`,{
                headers:{
                  'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
                }

             }).then((response)=>{
              alert(response.data);
            }).catch(err=>{
              console.log(err.data);
            });
       }
       else if(value==="Delete Admin")
       {
        axios.delete(`https://localhost:44317/api/Admin/DeleteAdmin/${id}`,{
          headers:{
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
          }
        }).then((response)=>{
        alert(response.data);
      }).catch(err=>{
        console.log(err.data);
      });
       }
       else if(value==="Delete Course Of Trainer"){
        axios.delete(`https://localhost:44317/api/TrainerCourse/DeleteCourseAndTrainer/${id}`,{
          headers:{
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
          }

       }).then((response)=>{
        alert(response.data);
      }).catch(err=>{
        console.log(err.data);
      });
       }

       else {
        axios.delete(`https://localhost:44317/api/Trainer/DeleteTrainer/${id}`,{
          headers:{
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
          }

       }).then((response)=>{
        alert(response.data);
      }).catch(err=>{
        console.log(err.data);
      });
       }
   }
   
  return (
    <>
      <Modal opened={opened} onClose={close} title={props.title}>
      <Center >
        <Card  withBorder radius="md"  style={{width:'100%'}}>
       <form >
       <Grid justify="center" align="center">
            <Grid.Col span={10}>
                <TextBox type="number" label={props.label} placeholder={props.placeholder} value={id} onChange={changeId} required={true}/>
            </Grid.Col>
            <br/>
             </Grid>
            <br/>
            <Center>
                <ButtonField type="submit" color='red' onClick={sure(props.title)} >{props.title}</ButtonField>
            </Center>
       </form>
       
    </Card>
    </Center>
    
      </Modal>

      <Group position="left" >
      <ButtonField  color='red' type='submit' onClick={open} >{props.title}</ButtonField>
      </Group>
    </>
  );
}