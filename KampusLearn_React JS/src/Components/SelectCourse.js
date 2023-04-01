import { useState,useEffect } from "react";
import axios from "axios";
import { Select } from "@mantine/core";

export default function SelectCourse({onChange,value}){
    const[course,setCourse]=useState([]);
    const[loading,setloading]=useState(false);
    const[selectCourse,setSelectCourse]=useState("");
    const getCourse=()=>{
        axios.get('https://localhost:44317/api/Course/GetCourse').then((response)=>{
          setCourse(response.data);
          localStorage.setItem("TotalCourse",course.length);
  }).catch(err=>{alert(err.data);});
      }
  
      useEffect(()=>{ 
        setloading(true)
        getCourse();
        setloading(false);
      },[]);

      return(
        
        loading ? <p>loading</p> :
    <>
        <Select
      label="Course"
      placeholder="Select Course"
      searchable
      nothingFound="No options"
      value={value}
      onChange={onChange}
      data={
        course.map((element)=>{  
          return(   
                    
              { value:`${element?.courses?.courseId}`, label: element?.courses?.courseName }
          );
          })
      }
    />
    </>
      );
}