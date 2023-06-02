
import { useEffect, useState, useContext } from "react";
import { Typography, List, Grid } from "@mui/material";
import QuestionnaireCard from "./Card";
import { AuthContext } from "../../../context/authContext";
import sendAuthenticatedRequest from "../../../utils/api";
const QuestionnairesList = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentUserId, setCurrentUserId] = useState(currentUser?.id);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [noContent, setNoContent] = useState(true);

  useEffect(() => {
    setCurrentUserId(currentUser?.id);
  }, [currentUser]);

  const fetchData = async () => {
    const {data} = await sendAuthenticatedRequest(`http://localhost:3600/api/questionnaire?owner=${currentUserId}`, 'GET');
    setQuestionnaires(data);
  };

  const onDelete = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setNoContent(questionnaires.length === 0);
  }, [questionnaires]);

  return (
    <>
      {noContent ? (
        <Typography variant="body2">no questionnaires</Typography>
      ) : (
        <Grid container spacing={2}>
          {questionnaires.map((q) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={q.id}>
              <QuestionnaireCard questionnaire={q} onDelete={onDelete} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default QuestionnairesList;
