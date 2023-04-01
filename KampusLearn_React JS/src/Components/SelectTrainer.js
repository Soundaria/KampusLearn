import { Select } from '@mantine/core';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function SelectTrainer({value,onChange}) {
 
  const[trainer,setTrainer]=useState([]);
  const[loading,setloading]=useState(false);

  const getTrainer=()=>{
    axios.get('https://localhost:44317/api/Trainer/GetTrainer',{
      headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('Authtoken'))}`,
       }
    }).then((response)=>{
      setTrainer(response.data);
     }).catch(err=>{alert(err.data);});
   }

    useEffect(()=>{ 
      setloading(true)
      getTrainer();
      setloading(false)
    },[]);

    
  return (
    
      loading ? <p>loading</p> :
    <>
        
    <Select
    label="Trainer"
    placeholder="Select Trainer"
    searchable
    nothingFound="No options"
    value={value}
    onChange={onChange}
    data={
      trainer.map((element,index)=>{  
        return(   
                  
            { value:`${element?.trainee?.trainerId}`, label: element?.trainee?.name }
        );
        })
    }
  />
     </>
 
  );
  
}