import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List, Paper, ListItemText, ListItemButton, Dialog, DialogTitle, DialogContent, TextField, setPartHeadline
  , DialogActions, Button, IconButton
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Field } from 'formik';
import ConfirmDialog from '../../components/confirmDelete';


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(0);

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

  const handledeleteCourse = async (id) => {

    console.log('c.id');
    await axios.delete(`http://localhost:3600/api/course/${id}`);
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

  const openConfirmDialog = (c) => {
    setConfirmOpen(true);
    setCourseToDelete(c);
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
          <Paper key={c.id} id={c.id}
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
            <ListItemButton onClick={() => openConfirmDialog(c)}>
              <DeleteIcon />
            </ListItemButton>
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


    <ConfirmDialog

      open={confirmOpen}
      setOpen={setConfirmOpen}
      course={courseToDelete}
      onConfirm={handledeleteCourse}

    >
    </ConfirmDialog>

  </>


}

export default Courses;



