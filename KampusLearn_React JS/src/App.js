

import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom';
import { Header,Text } from '@mantine/core';
import Signup from './Module/SignUpPage';
import Landing from './Module/LandingPage';
import Login from  './Module/LoginPageAdmin'
import Admin from './Module/Admin/AdminPage';
import ViewAdmin from './Module/Admin/Admin/View Admin';
import ViewTrainerofAdmin from './Module/Admin/Admin/View Trainer';
import ViewCoursebyAdmin from './Module/Admin/Admin/View Course';
import ViewTrainer from './Module/Admin/Trainer/View Trainer';
import ViewCourse from './Module/Admin/Course/View Course';
import ViewCandidate from './Module/Admin/Candidate/Candidate';
import ViewCandidateCourse from './Module/Admin/Candidate/CandidateCourse';
import ButtonField from './Components/Button';
import LoginAdmin from './Module/LoginPageAdmin';
import LoginTrainer from './Module/LoginPAgeTrainer';
import LoginCandidate from './Module/LoginPageCandidate';
import Trainer from './Module/Trainer/Trainer';
import MyCourse from './Module/Trainer/My Course';
import ViewCourseTrainer from './Module/Trainer/ViewCourse';
import ViewTrainerCourse from './Module/Admin/Trainer/View Course to trainer';
import Candidate from './Module/Candidate/Candidate';
import Profile from './Module/Admin/Profile';
import ViewAdminNotActive from './Module/Admin/Admin/View Admin Not Active';
import ViewCourseNotActive from './Module/Admin/Admin/View course not active';
import ViewTrainerNotActive from './Module/Admin/Admin/View trainer not active';
import Payment from './Module/Admin/Payment/Payment';



function App() {

  return (
    <div >
        <Header height={50} p="xs" style={{backgroundColor:'teal',display:'flex',alignItems:'center'}}>
        <Text component="a" href="/" style={{color:'whitesmoke',fontFamily:'inherit',fontWeight:'bolder',fontSize:'xx-large',textAlign:'left',textIndent:'50px',fontStyle:'italic'}}>KampusLearn</Text>
        </Header>  
       
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Landing/>} />
              <Route path="/signup" element={<Signup ></Signup>} />
              <Route path="/loginadmin" element={<LoginAdmin/>} />
              <Route path="/logintrainer" element={<LoginTrainer/>} />
              <Route path="/logincandidate" element={<LoginCandidate/>} />
              <Route path='/admin' element={<Admin/>} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/viewadmin' element={<ViewAdmin/>} />
              <Route path='/viewtrainerbyadmin' element={<ViewTrainerofAdmin/>} />
              <Route path='/viewcoursebyadmin' element={<ViewCoursebyAdmin/>}/>
              <Route path='/viewadminnotactive' element={<ViewAdminNotActive/>} />
              <Route path='/viewcoursenotactive' element={<ViewCourseNotActive/>} />
              <Route path='/viewtrainernotactive' element={<ViewTrainerNotActive/>} />
              <Route path='/viewpayment' element={<Payment/>} />
              <Route path='/viewtrainer' element={<ViewTrainer/>}/>
              <Route path='/viewtrainercourse' element={<ViewTrainerCourse/>}/>
              <Route path='/viewcourse' element={<ViewCourse/>}/>
              <Route path='/viewcandidate' element={<ViewCandidate/>}/>
              <Route path='/viewcandidateandcourse' element={<ViewCandidateCourse/>}/>
              <Route path='/trainer' element={<Trainer/> } />
              <Route path='/viewcoursetrainer' element={<ViewCourseTrainer/>}/>
              <Route path='/trainercourse' element={<MyCourse/>} />
              <Route path='/candidate' element={<Candidate/>}/>
            </Routes>
          </BrowserRouter>
        </div>
    </div>
   
  
  );
}

export default App;
