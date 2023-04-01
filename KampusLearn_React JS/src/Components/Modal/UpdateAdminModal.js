import { useDisclosure } from '@mantine/hooks';
import { Modal, Group,Grid,Center,Card } from '@mantine/core';
import ButtonField from '../Button';
import TextBox from '../TextBox';
import axios from 'axios';
import { useState } from 'react';

export default function UpdateModal() {
  
  const [opened, { open, close }] = useDisclosure(false);
  //const[admin,setAdmin]=useState(JSON.parse(localStorage.getItem("Admin")));
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
  axios.get(`https://localhost:44317/api/Admin/GetAdminbyId`,{
    headers:{
      'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
    }}
 ).then((response)=>{
     setName(response.data.admin.name);
     setAddress(response.data.admin.address);
     setContact(response.data.admin.contact);
     setEmail(response.data.admin.email);
    setPassword(response.data.admin.password);
 }).catch(err=>{
   alert(err.data);
 })
 }

  const updateAdmin=()=>{
    axios.put(`https://localhost:44317/api/Admin/UpdateAdmin`,{
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
    }).catch(err=>{
      alert(err.data);
    });
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Admin">
      <Center >
        <Card  withBorder radius="md"  style={{width:'100%'}}>
       <form onSubmit={updateAdmin}>
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
                <ButtonField type="submit" color='teal' >Update Admin</ButtonField>
            </Center>
       </form>
       
    </Card>
    </Center>
    
      </Modal>

      <Group position="left" >
      <ButtonField  color='teal' type='submit' onClick={()=>{open();onClick();}} >Edit</ButtonField>
      </Group>
    </>
  );
}