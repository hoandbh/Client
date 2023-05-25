import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box, Paper, IconButton } from '@mui/material';
import ConfirmationDialog from "../../../components/ConfirmationDialog";


const QuestionnaireCard = ({ questionnaire, onDelete }) => {

  const id = questionnaire.id;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const openEdit = () => {
    navigate(`/questionnaire/${id}`);
  }

  const openFile = () => {
    navigate(`/questionnaire/complete/${id}`);
  }

  const openDelete = () =>{
    setOpen(true);
  }

  const deleteQuestionnaire = async () =>{
    await axios.delete(`http://localhost:3600/api/questionnaire/${id}`);
    onDelete();
  }

  return <>
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100vh",
        p: 2,
        flexGrow: 1,
        fontFamily: 'Open Sans, sans-serif',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
      }}
    >
      <Box>
        {
          `Questionnaire number: ${id}.
          Teacher: ${questionnaire.owner}.
          Date: ${new Date(questionnaire.date).toLocaleDateString()}.`
        }
      </Box>
      <Box>
        <IconButton onClick={openEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={openFile}>
          <LinkIcon />
        </IconButton>
        <IconButton onClick={openDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
    <ConfirmationDialog open={open} setOpen={setOpen} onConfirm={deleteQuestionnaire} text='Are you sure you want to delete this questionnaire?' confirmText='Delete' />    

  </>
}

export default QuestionnaireCard;