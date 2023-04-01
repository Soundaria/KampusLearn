import { useDisclosure } from '@mantine/hooks';
import { Modal, Group,Grid,Center,Card } from '@mantine/core';
import ButtonField from '../Button';
import TextBox from '../TextBox';
import axios from 'axios';
import { useState } from 'react';

export default function UpdateCandidate() {
  
  const [opened, { open, close }] = useDisclosure(false);
  const[candidate,setCandidate]=useState([]);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [contact,setContact]=useState("");
  const [address,setAddress]=useState("");

  
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

const onClick=()=>{
  axios.get(`https://localhost:44317/api/Candidate/GetCandidatebyId`,{
   headers:{
     'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Candidatetoken'))}`
   }
}).then((response)=>{
     setName(response.data.name);
     setEmail(response.data.email);
     setAddress(response.data.address);
     setPassword(response.data.password);
     setContact(response.data.contact);
 }).catch(err=>{
   alert(err.data);
 })
}
  const updateCandidate=()=>{
    axios.put(`https://localhost:44317/api/Candidate/UpdateCandidate`,{
       "name":name,
       "email":email,
       "password":password,
       "contact":contact,
       "address":address,
    },{
      headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Candidatetoken'))}`
      }
  }).then((response)=>{
        alert(response.data);
    }).catch(err=>{
      alert(err.data);
    });
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Candidate">
      <Center >
        <Card  withBorder radius="md"  style={{width:'100%'}}>
       <form onSubmit={updateCandidate}>
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
        
             </Grid>
            <br/>
            <Center>
                <ButtonField type="submit" color='teal' >Update Candidate</ButtonField>
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