import { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Paper, ListItemText, ListItemButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from '@mui/material';
import { Formik, Field } from 'formik';
import CourseCard from './CourseCard';


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [])

  const fetchCourses = async () => {
    const { data } = await axios.get(`http://localhost:3600/api/course`);
    setCourses(data);
  }

  const addCourse = () => {
    setOpen(true);
  }

  const onDeleteCourse = () => {
    fetchCourses();
  }

  const handleAddCourse = async (values) => {
    setError('');
    if (!values.courseName || !values.courseCode || !values.courseCode) {
      setError('Please fill all the required fields.');
      return;
    }
    //   setIsLoading(true);
    try {
      await axios.post(`http://localhost:3600/api/course`, {
        name: values.courseName,
        code: values.courseCode,
        code: values.courseCode

      });
      setOpen(false);
      fetchCourses();
    }
    catch {
      setError('Something went wrong. Please contact the technical support center.')
    }
    // finally {
    //   setIsLoading(false);
    // }

  }

  const handleClose = () => {
    setOpen(false);
  }

  return <>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto' }}>
      {
        courses?.length > 0 &&
        courses.map(course => (
          <CourseCard course={course} onDelete={onDeleteCourse} />
        ))

      }
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <ListItemButton onClick={addCourse}>
          <ListItemText secondary="add course" />
        </ListItemButton>
      </Paper>
    </List>

    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Formik initialValues={{ courseName: '', courseCode: '' }}>
        {formik => (
          <form
            onKeyDown={e => { if (e.key === 'Enter') handleAddCourse(formik.values) }}
          >
            <DialogTitle id="alert-dialog-title">{"Type the course name and the course code"}</DialogTitle>
            <DialogContent>
              <Typography variant="body2" color="text.secondary">
                {error}
              </Typography>              
              <Field
                as={TextField}
                margin="dense"
                label={`Course name`}
                type="text"
                fullWidth
                value={formik.values.courseName}
                name="courseName"
              />
              <Field
                as={TextField}
                margin="dense"
                label={`Course Code`}
                type="number"
                fullWidth
                value={formik.values.courseCode}
                name="courseCode"
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} >Cancel</Button>
              <Button
                onClick={() => handleAddCourse(formik.values)}
                autoFocus
              >
                add
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>

  </>


}

export default Courses;



