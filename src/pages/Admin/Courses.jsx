import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List, Paper, ListItemText, ListItemButton, Dialog, DialogTitle, DialogContent, TextField, setPartHeadline
  , DialogActions, Button, IconButton
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Field } from 'formik';
import confirmDelete from '../../components/confirmDelete';



const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [courseToDeleteId, setCourseToDeleteId] = useState([]);

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

  const handledeleteCourse = async () => {

    await axios.delete(`http://localhost:3600/api/course/${courseToDeleteId}`);
    //setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
    fetchCourses();
  }


  const handleAddCourse = async (values) => {
    await axios.post(`http://localhost:3600/api/course`, {
      name: values.courseName,
      code: values.courseCode

    });
    setOpen(false);

    fetchCourses();
  }

  const handleClose = () => {
    setOpen(false);
  }

  return <>
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
            <DialogTitle id="alert-dialog-title">{"Type the course name"}</DialogTitle>
            <DialogContent>
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
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto' }}>
      {
        courses?.length > 0 &&
        courses.map(c => (
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
            <ListItemText primary={c.name} />
            <ListItemText secondary={c.code} />
            <IconButton onClick={() => setConfirmDeleteOpen(true)}>
              <DeleteIcon />
            </IconButton>

          </Paper>
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


  </>


}

export default Courses;

 
// <Dialog
// open={confirmDeleteOpen}
// // onClose={() => setConfirmDeleteOpen(false)}
// // aria-labelledby='confirm-delete-dialog'
// >
// {/* <DialogTitle id='confirm-delete-dialog'>{"HHHIII"}</DialogTitle> */}
// <DialogContent>{"Are you sure you want to erase this course?"}</DialogContent>
// <DialogActions>
//   <Button
//     variant='contained'
//     onClick={() => {
//       setConfirmDeleteOpen(false);
//       setCourseToDeleteId(c.id);
//     }}
//     color="secondary"
//   >
//     No
//   </Button>
//   <Button
//     variant='contained'
//     onClick={() => {
//       setConfirmDeleteOpen(false);
//       handledeleteCourse(c.id);
//     }}
//     // color='default'
//   >
//     Yes
//   </Button>
// </DialogActions> 
// </Dialog>