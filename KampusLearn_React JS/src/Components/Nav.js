import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  NavLink,
  Card
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';



export default function Nav(props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate=useNavigate();

  return (
          <AppShell 
          style={{width:'99%'}}
          navbarOffsetBreakpoint="sm"
          navbar={
          <Navbar p="sm" hiddenBreakpoint="sm"  hidden={!opened} width={{ sm: 100, lg: 200 }} >
          <NavLink label="Home" onClick={()=>{navigate('/admin')}}/>
          <NavLink label="Profile" onClick={()=>{navigate('/profile')}}/>
          <NavLink label="Admin">
          <NavLink label="View Admin" onClick={()=>{navigate('/viewadmin')}} />
          <NavLink label="View Trainer" onClick={()=>{navigate('/viewtrainerbyadmin')}} />
          <NavLink label="View Course" onClick={()=>{navigate('/viewcoursebyadmin')}} />
          <NavLink label="View Admin Not Active" onClick={()=>{navigate('/viewadminnotactive')}} />
          <NavLink label="View Trainer Not Active" onClick={()=>{navigate('/viewtrainernotactive')}} />
          <NavLink label="View Course Not Active" onClick={()=>{navigate('/viewcoursenotactive')}} />
          </NavLink>
          <NavLink label="Trainer">
          <NavLink label="View Trainer" onClick={()=>{navigate('/viewtrainer')}} />
          <NavLink label="View Trainer and their course" onClick={()=>{navigate('/viewtrainercourse')}} />
          </NavLink>
          <NavLink label="Course">
            <NavLink label="View Course" onClick={()=>{navigate('/viewcourse')}} />
            </NavLink>
            <NavLink label="Candidate" >
            <NavLink label="View Candidate" onClick={()=>{navigate('/viewcandidate')}} />
            <NavLink label="View Candidate And Course" onClick={()=>{navigate('/viewcandidateandcourse')}} />
            </NavLink>
            <NavLink label="Payment Details">
            <NavLink label="View Payment" onClick={()=>{navigate('/viewpayment')}} />
            </NavLink>
            </Navbar>
          }

          footer={
            <Footer height={60}  withBorder>
              <Text style={{textAlign:'left',textIndent:'88%',fontWeight:'bold'}}>@kampuslearn</Text>
              <Text style={{textAlign:'left',textIndent:'88%'}}>contact:73391861011</Text>
            </Footer>
          }

          header={
            <Header  height={50} p="md" style={{backgroundColor:'teal'}}>
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[0]}
                    mr="xl"
                  />
                </MediaQuery>
                <Text  component="a" href="/" style={{color:'whitesmoke',fontFamily:'inherit',fontWeight:'bolder',fontSize:'xx-large',textAlign:'left',textIndent:'44px',fontStyle:'italic'}}>KampusLearn</Text>
              </div>
            </Header>
          }
          >
          {props.children}
          </AppShell>
    
  );
}