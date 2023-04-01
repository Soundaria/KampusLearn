import { useState } from "react";
import UpdateModal from "../../Components/Modal/UpdateAdminModal";
import Nav from "../../Components/Nav";
import { Grid,Card } from "@mantine/core";
import { FaUserTie } from "react-icons/fa";
import axios from "axios";


export default function Profile(){
    const[admin,setAdmin]=useState([]);
     
    axios.get(`https://localhost:44317/api/Admin/GetAdminbyId`,{
        headers:{
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`
        }}
     ).then((response)=>{
        setAdmin(response.data.admin)
     }).catch(err=>{
       alert(err.data);
     })

    return(
        <Nav>
            <h2>Hi {JSON.parse(localStorage.getItem("Name"))}!!</h2>
            <br/>
        <Grid>
            <Grid.Col span={6}>
            <p style={{fontStyle:'italic',fontSize:'30px'}}>My Profile</p>
            </Grid.Col>
            <Grid.Col span={2} style={{marginLeft:'33%',marginTop:'40px'}}>
                <UpdateModal/>
            </Grid.Col>
        </Grid>
        
        <hr/>
        <Grid>
            <Grid.Col span={3}>
                <Card withBorder style={{paddingLeft:'18%',marginTop:'20px'}} >
            <FaUserTie size={200} />
            </Card>
            </Grid.Col>
            <Grid.Col span={6} style={{textAlign:'left',fontFamily:'serif',fontSize:'20px'}}>
            <p><b>Name : </b>{admin.name} </p> 
            <p><b>Address :</b> {admin.address} </p>
            <p><b>Contact : </b> {admin.contact} </p>
            <p><b>Email : </b> {admin.email} </p>
            <p><b>Created At :</b>  {admin.createdAt} </p>
            <p><b>Updated At :</b>  {admin.updatedAt}</p> 
            </Grid.Col>
        </Grid>
        
        </Nav>
    );
}