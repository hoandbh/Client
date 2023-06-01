import { useState } from 'react';
import { Paper, ListItemText, ListItemButton, Dialog, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import sendAuthenticatedRequest from '../../utils/api';
import ConfirmationDialog from '../../components/ConfirmationDialog';

const CourseCard = ({ course, onDelete }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handledeleteCourse = async () => {

    await sendAuthenticatedRequest(`http://localhost:3600/api/course/${course.id}`, 'DELETE');
    onDelete();
  }

  const openConfirmDialog = () => {
    setConfirmOpen(true);
  }

  return <>
    <Paper key={course.id} id={course.id}
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <ListItemText primary={course.name} />
      <ListItemText secondary={course.code} />
      <IconButton onClick={() => openConfirmDialog()}>
        <DeleteIcon />
      </IconButton>

    </Paper>
    <ConfirmationDialog
      open={confirmOpen}
      setOpen={setConfirmOpen}
      onConfirm={handledeleteCourse}
      text='Are you sure you want to delete this questionnaire?'
      confirmText='Delete'
    />
  </>


}

export default CourseCard;



