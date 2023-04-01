import { useDisclosure } from '@mantine/hooks';
import { Modal, Group,Grid,Center,Card } from '@mantine/core';
import ButtonField from '../Button';
import TextBox from '../TextBox';
import { useState } from 'react';
import axios from 'axios';

export default function TrainerModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [admin,setAdmin]=useState(JSON.parse(localStorage.getItem("Admin")));
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [contact,setContact]=useState("");
  const [password,setPassword]=useState("");
  const [address,setAddress]=useState("");
  const [qualification,setQualification]=useState("");
  const [experience,setExperience]=useState("");

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

  const AddTrainer=()=>{
    axios.post(`https://localhost:44317/api/Admin/AddTrainer`,{
       "name":name,
       "email":email,
       "contact":contact,
       "password":password,
       "address":address,
       "qualification":qualification,
       "yearOfExperience":experience
    },{
      headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
      }
  }).then((response)=>{
        alert(response.data);
        console.log(response.data);
        
    }).catch(err=>{
      alert(err.data);
    })
  }


  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Trainer" >
      <Center >
        <Card  withBorder radius="md"  style={{width:'100%'}}>
       <form onSubmit={AddTrainer}>
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
                <TextBox type="text" label="Password" placeholder="Enter your Password" value={password} onChange={changePassword} required={true}/>
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
                <TextBox type="text" label="Contact" placeholder="Enter your Contact Number" value={contact} onChange={changeContact} required={true}/>
            </Grid.Col>
            <br/>
            <Grid.Col span={10}>
                <TextBox type="text" label="Address" placeholder="Enter your Address" value={address} onChange={changeAddress} required={true}/>
            </Grid.Col>
            <Grid.Col span={10}>
                <TextBox type="text" label="Qualification" placeholder="Enter your Qualification" value={qualification} onChange={changeQualification} required={true}/>
            </Grid.Col>
            <Grid.Col span={10}>
                <TextBox type="text" label="Years of Experience" placeholder="Enter your Years of Experience" value={experience} onChange={changeExperience} required={true}/>
            </Grid.Col>
             </Grid>
            <br/>
            <Center>
                <ButtonField type="submit" color='teal'> Add Trainer</ButtonField>
            </Center>
       </form>
       
    </Card>
    </Center>
    
      </Modal>

      <Group position="right" >
      <ButtonField  color='teal' type='submit' onClick={open} >Add Trainer</ButtonField>
      </Group>
    </>
  );
}