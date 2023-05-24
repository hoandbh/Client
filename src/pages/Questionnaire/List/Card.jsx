
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import { Box, Paper, IconButton } from '@mui/material';


const QuestionnaireCard = ({ questionnaire }) => {

  const navigate = useNavigate();

  const openEdit = () => {
    navigate(`/questionnaire/${questionnaire.id}`);
  }

  const openFile = () => {
    navigate(`/questionnaire/complete/${questionnaire.id}`);
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
          `Questionnaire number: ${questionnaire.id}.
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
      </Box>
    </Paper>


  </>
}

export default QuestionnaireCard;