import { useDisclosure } from '@mantine/hooks';
import { Modal, Group,Grid,Center,Card } from '@mantine/core';
import ButtonField from '../Button';
import TextBox from '../TextBox';
import axios from 'axios';
import { useState } from 'react';

export default function AdminModal() {
  const [opened, { open, close }] = useDisclosure(false);

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

  const addAdmin=()=>{
    axios.post('https://localhost:44317/api/Admin/AddAdmin',{
       "name":name,
       "email":email,
       "password":password,
       "contact":contact,
       "address":address
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
      <Modal opened={opened} onClose={close} title="Add Admin">
      <Center >
        <Card  withBorder radius="md"  style={{width:'100%'}}>
       <form onSubmit={addAdmin}>
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
             </Grid>
            <br/>
            <Center>
                <ButtonField type="submit" color='teal' >Add Admin</ButtonField>
            </Center>
       </form>
       
    </Card>
    </Center>
    
      </Modal>

      <Group position="right" >
      <ButtonField  color='teal' type='submit' onClick={open} >Add Admin</ButtonField>
      </Group>
    </>
  );
}