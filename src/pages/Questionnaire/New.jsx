import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AuthContext } from '../../context/authContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Paper, Button, FormControl, InputLabel, MenuItem, Select, TextField, Checkbox, FormControlLabel, Typography, CircularProgress } from '@mui/material';
import sendAuthenticatedRequest from '../../utils/api';

const NewQuestionnaire = () => {
  const [date, setDate] = useState('0001-01-01');
  const [term, setTerm] = useState('');
  const [course, setCourse] = useState('');
  const [name, setName] = useState('');
  const [courses, setCourses] = useState([]);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckedChange = (event) => {
    setChecked(event.target.checked);
  };

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const [currentUserId, setCurrentUserId] = useState(currentUser?.id);

  useEffect(() => {
    setCurrentUserId(currentUser?.id);
  }, [currentUser]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data } = await sendAuthenticatedRequest(`http://localhost:3600/api/course`, 'GET');
    setCourses(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    if (!date || !term || !course || !name) {
      setError('Please fill all the required fields.');
      return;
    }

    setIsLoading(true);

    const details = {
      owner: currentUserId,
      date,
      term,
      name,
      course_id: course
    };

    try {
      const { data: newQuestionnaire } = await sendAuthenticatedRequest('http://localhost:3600/api/questionnaire/', 'post', details);
      const id = newQuestionnaire.id;
      navigate(`/questionnaire/${id}`);
    }
    catch {
      setError('Something went wrong. Please contact the technical support center.')
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Paper
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: 800,
          textAlign: 'center'
        }}
      >
        <form onSubmit={handleSubmit}>
          <br />
          <Typography variant="body2" color="text.secondary">
            {error}
          </Typography>
          <br />
          <FormControl sx={{ width: '50%' }}>
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
          <FormControl sx={{ width: '50%' }}>
            <InputLabel
              id="term-select-label"
            >Select Term</InputLabel>
            <Select
              sx={{
                textAlign: 'left'
              }}
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
          <br />
          <FormControl sx={{ width: '50%' }}>
            <InputLabel id="course-select-label">Select Course</InputLabel>
            <Select
              sx={{
                textAlign: 'left'
              }}
              labelId="course-select-label"
              value={course}
              label="Select Course "
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            >
              {courses?.length > 0 ? (
                courses.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={0}>no course, contact the technical support center</MenuItem>
              )}
            </Select>
          </FormControl>

          <br />
          <br />
          <FormControl sx={{ width: '50%' }}>
            <TextField
              value={name}
              label="Description"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </FormControl>
          <br />
          <FormControl sx={{ width: '50%', color: 'gray', marginTop: '10px', marginBottom: '10px' }}>
            <FormControlLabel
              label="one part questionnaire"
              control={<Checkbox checked={checked} onChange={handleCheckedChange} />}
            />
          </FormControl>
          <br />
          <FormControl sx={{ width: '50%' }} disabled={isLoading}>
            <Button type="submit">
              {isLoading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </FormControl>
        </form>

      </Paper>

    </>
  );
};

export default NewQuestionnaire;
