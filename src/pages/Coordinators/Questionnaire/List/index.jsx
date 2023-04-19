import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ListItem, List, Paper} from '@mui/material';
import { AuthContext } from '../../../../context/authContext'
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';

const QuestionnaireCard = ({questionnaire}) => {

  const navigate = useNavigate();

  
  const openEdit = () => {
    navigate(`/questionnaire/${questionnaire.id}`);
  }

  useEffect(() => {
    console.log(questionnaire);
  },[])

  return <>
    <Paper
    sx={{
    p: 2,
    maxWidth: 500,
    flexGrow: 1,
    fontFamily: 'Open Sans, sans-serif',
    backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    }}
    > 
      { 
        `Questionnaire number: ${questionnaire.id}.
        Teacher: ${questionnaire.owner}.
        Date: ${new Date(questionnaire.date).toLocaleDateString()}.
        `
      }

      <IconButton onClick={openEdit}>
        <LinkIcon/>
      </IconButton>
    </Paper>
  </>
}

const QuestionnairesList = () => {

  const {currentUser} = useContext(AuthContext);
  const [currentUserId, setCurrentUserId] = useState(currentUser?.id);  
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    setCurrentUserId(currentUser?.id);
  },[currentUser])

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
                {questionnaires.map(q => <ListItem >
                  <QuestionnaireCard questionnaire={q}/>
                </ListItem>)}
          </List>
        }
    </>
}

export default QuestionnairesList;