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
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';



export default function NavTrainer(props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate=useNavigate();

  return (
          <AppShell 
          style={{width:'99%'}}
          navbarOffsetBreakpoint="sm"
          navbar={
           
          <Navbar p="sm" hiddenBreakpoint="sm"  hidden={!opened} width={{ sm: 100, lg: 200 }} style={{fontSize:'30px'}} >
          <NavLink label="Profile"  onClick={()=>{navigate('/trainer')}}  />
          <NavLink label="Courses">
          <NavLink label="My Course" onClick={()=>{navigate('/trainercourse')}} />
          <NavLink label="View Course" onClick={()=>{navigate('/viewcoursetrainer')}} />
          </NavLink>
         
            </Navbar>
          }

          footer={
            <Footer height={60}  withBorder >
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