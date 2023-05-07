import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ListItem, List, Paper, Fab, Box } from '@mui/material';
import { AuthContext } from '../../../context/authContext'
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
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
        color: "red",
        width: "100vh",
        p: 2,
        flexGrow: 1,
        fontFamily: 'Open Sans, sans-serif',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
      }}
    >

      <Box
      >
        {
          `Questionnaire number: ${questionnaire.id}.
    Teacher: ${questionnaire.owner}.
    Date: ${new Date(questionnaire.date).toLocaleDateString()}.
    `
        }
        {/* 
    <IconButton onClick={openFile}>
    <LinkIcon/>Open Test File
    </IconButton>
    <IconButton onClick={openEdit}>
    <EditIcon/> Edit Test 
    </IconButton> */}
      </Box>
      <Box>
        <Fab variant="extended" onClick={openEdit}>
          <EditIcon />
        </Fab>
        <Fab variant="extended" onClick={openFile}>
          <LinkIcon />
        </Fab>

      </Box>
    </Paper>


  </>
}

const QuestionnairesList = () => {

  const { currentUser } = useContext(AuthContext);
  const [currentUserId, setCurrentUserId] = useState(currentUser?.id);
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    setCurrentUserId(currentUser?.id);
  }, [currentUser])

  const fetchData = async () => {
    const { data } = await axios.get(`http://localhost:3600/api/questionnaire?owner=${currentUserId}`);
    setQuestionnaires(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return <>
    {
      questionnaires &&
      <List>
        {questionnaires.map(q =>
          <ListItem fullWidth>
            <QuestionnaireCard questionnaire={q} />
          </ListItem>
        )}
      </List>
    }
  </>
}

export default QuestionnairesList;