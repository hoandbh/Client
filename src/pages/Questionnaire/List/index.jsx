import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ListItem, List, Typography } from '@mui/material';
import { AuthContext } from '../../../context/authContext'
import QuestionnaireCard from "./Card";

const QuestionnairesList = () => {

  const { currentUser } = useContext(AuthContext);
  const [currentUserId, setCurrentUserId] = useState(currentUser?.id);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [noContent, setNoContent] = useState(true);

  useEffect(() => {
    setCurrentUserId(currentUser?.id);
  }, [currentUser])

  const fetchData = async () => {
    const {data} = await axios.get(`http://localhost:3600/api/questionnaire?owner=${currentUserId}`);
    setQuestionnaires(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if (questionnaires){
      setNoContent(false);
    }
    else {
      setNoContent(true);
    }
  }, [questionnaires])


  return <>
    {
      noContent? 
      <Typography variant="body2">
        no questionnaires
      </Typography>
      :
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