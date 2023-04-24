import { React , useRef, useState, useContext } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AuthContext } from '../../context/authContext';
import { useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';


const NewQuestionnaire = () => {

  const [date, setDate] = useState('0001-01-01');
  const [term, setTerm] = useState('');  
  const [course, setCourse] = useState('');  
  const [name, setName] = useState('');  
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const {currentUser} = useContext(AuthContext);
  const [currentUserId, setCurrentUserId] = useState(currentUser?.id);

  useEffect(() => {
    setCurrentUserId(currentUser?.id);
  },[currentUser])


  useEffect(() => {
    fetchCourses();   
  },[])

  const fetchCourses = async () => {
    const { data } = await axios.get(`http://localhost:3600/api/course`)
    setCourses(data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data: newQuestionnaire }= await axios.post(
      'http://localhost:3600/api/questionnaire/',
      {
        owner:currentUserId,
        date,
        term,
        name,
        course_id:course==0? undefined : course
      }
    );
    const id = newQuestionnaire.id;
    navigate(`/questionnaire/${id}`);
  };

  return <>
    <form onSubmit={handleSubmit}>
      <br />
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label="date" 
            onChange={(newValue) => setDate(newValue)}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
      </FormControl>
      <br />
      <br />
      <FormControl fullWidth>
        <InputLabel id="term-select-label">Select Term</InputLabel>
        <Select
          labelId="term-select-label"
          value={term}
          label="Select Term "
          onChange={(event) => {
            setTerm(event.target.value);
          }}
        >
          <MenuItem value={'A'}>term A</MenuItem>
          <MenuItem value={'B'}>term B</MenuItem>
          <MenuItem value={'C'}>term C</MenuItem>
          <MenuItem value={'D'}>term D</MenuItem>
          <MenuItem value={'E'}>special term</MenuItem>
        </Select>
      </FormControl>
      
          <br />
          <br/>
          <FormControl fullWidth>
            <InputLabel id="course-select-label">Select Course</InputLabel>
            <Select
              labelId="course-select-label"
              value={course}
              label="Select Course "
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            >
            {courses?.length > 0 ?
              courses.map(c => (<MenuItem value={c.id}>{c.name}</MenuItem>))
              :
              <MenuItem value={0}>no course, contact the technical support center</MenuItem>
            }
            </Select>
          </FormControl>

      <br />
      <br />
      <FormControl fullWidth>
        <TextField
          value={name}
          label="Description"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
          
      </FormControl>

      <FormControl fullWidth>
        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  </>  
}

export default NewQuestionnaire; 