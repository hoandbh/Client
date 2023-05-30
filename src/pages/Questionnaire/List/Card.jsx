import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import SmartButtonIcon from '@mui/icons-material/SmartButton';

import { Box, Paper, IconButton, Typography } from '@mui/material';
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

  const openDelete = () => {
    setOpen(true);
  }

  const deleteQuestionnaire = async () => {
    await axios.delete(`http://localhost:3600/api/questionnaire/${id}`);
    onDelete();
  }

  return <>
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        flexGrow: 1,
        fontFamily: "Open Sans, sans-serif",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Box>
        <Typography variant="body1">
          {questionnaire.name}.
        </Typography>
        <Typography variant="body2">
          Teacher: {questionnaire.owner}.
        </Typography>
        <Typography variant="body2">
          Date: {new Date(questionnaire.date).toLocaleDateString()}.
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Box>
            <IconButton onClick={openDelete}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={openEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={openFile}>
              <SmartButtonIcon />
            </IconButton>

          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box flexGrow={1} /> {/* This creates an empty space that pushes the text to the bottom */}
            <Typography
              sx={{
                marginBottom: 0
              }}
              variant="caption"
            >
              code:{questionnaire.id}.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
    <ConfirmationDialog open={open} setOpen={setOpen} onConfirm={deleteQuestionnaire} text='Are you sure you want to delete this questionnaire?' confirmText='Delete' />

  </>
}

export default QuestionnaireCard;
