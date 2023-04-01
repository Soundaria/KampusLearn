import { useDisclosure } from '@mantine/hooks';
import { Modal, Group,Grid,Center,Card } from '@mantine/core';
import ButtonField from '../Button';
import TextBox from '../TextBox';
import axios from 'axios';
import { useState } from 'react';

export default function UpdateTrainer() {
  
  const [opened, { open, close }] = useDisclosure(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [contact,setContact]=useState("");
  const [address,setAddress]=useState("");
  const[experience,setExperience]=useState("");
  const[qualification,setQualification]=useState("");
  
const changeName=(e)=>{
    setName(e.target.value);
}
const changeEmail=(e)=>{
  setEmail(e.target.value);
}
const changePassword=(e)=>{
  setPassword(e.target.value);
}
const changeContact=(e)=>{
  setContact(e.target.value);
}
const changeAddress=(e)=>{
  setAddress(e.target.value);
}
const changeQualification=(e)=>{
    setQualification(e.target.value);
  }
  const changeExperience=(e)=>{
    setExperience(e.target.value);
  }
  const onClick=()=>{
    axios.get(`https://localhost:44317/api/Trainer/GetTrainerbyId`,{
      headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Trainertoken'))}`
      }}
   ).then((response)=>{
       setName(response.data.name);
       setAddress(response.data.address);
       setContact(response.data.contact);
       setEmail(response.data.email);
       setPassword(response.data.password);
       setExperience(response.data.yearOfExperience);
       setQualification(response.data.qualification);
   }).catch(err=>{
     alert(err.data);
   })
   }

  const updateTrainer=()=>{
    axios.put(`https://localhost:44317/api/Trainer/UpdateTrainer`,{
       "name":name,
       "email":email,
       "password":password,
       "contact":contact,
       "address":address,
       "qualification":qualification,
       "yearOfExperience":experience
    },{
      headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Trainertoken'))}`
      }
  }).then((response)=>{
        alert(response.data);
    }).catch(err=>{
      alert(err.data);
    })
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Trainer">
      <Center >
        <Card  withBorder radius="md"  style={{width:'100%'}}>
       <form onSubmit={updateTrainer}>
       <Grid justify="center" align="center">
            <Grid.Col span={10}>
                <TextBox type="text" label="Name" placeholder="Enter your Name" value={name} onChange={changeName} required={true}/>
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
                <TextBox type="text" label="Email" placeholder="Enter your Email Address" value={email} onChange={changeEmail} required={true}/>
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
                <TextBox type="text" label="Password" placeholder="Enter a strong password" value={password} onChange={changePassword} required={true}/>
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
                <TextBox type="text" label="Contact" placeholder="Enter your Contact Number" value={contact} onChange={changeContact} required={true}/>
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
                <TextBox type="text" label="Address" placeholder="Enter your Address" value={address} onChange={changeAddress} required={true}/>
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
                <TextBox type="text" label="Qualification" placeholder="Enter your Qualification" value={qualification} onChange={changeQualification} required={true}/>
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
                <TextBox type="text" label="Years of Experience" placeholder="Enter your Year of Experience" value={experience} onChange={changeExperience} required={true}/>
            </Grid.Col>
             </Grid>
            <br/>
            <Center>
                <ButtonField type="submit" color='teal' >Update Trainer</ButtonField>
            </Center>
       </form>
       
    </Card>
    </Center>
    
      </Modal>

      <Group position="left" >
      <ButtonField  color='teal' type='submit' onClick={()=>{onClick();open();}} >Edit</ButtonField>
      </Group>
    </>
  );
}