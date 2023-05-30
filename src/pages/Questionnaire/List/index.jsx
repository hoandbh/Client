// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { ListItem, List, Typography, Box, Paper, Grid } from '@mui/material';
// import { AuthContext } from '../../../context/authContext'
// import QuestionnaireCard from "./Card";
// import { experimentalStyled as styled } from '@mui/material/styles';

// const QuestionnairesList = () => {

//   const { currentUser } = useContext(AuthContext);
//   const [currentUserId, setCurrentUserId] = useState(currentUser?.id);
//   const [questionnaires, setQuestionnaires] = useState([]);
//   const [noContent, setNoContent] = useState(true);

//   useEffect(() => {
//     setCurrentUserId(currentUser?.id);
//   }, [currentUser])

//   const fetchData = async () => {
//     const { data } = await axios.get(`http://localhost:3600/api/questionnaire?owner=${currentUserId}`);
//     setQuestionnaires(data);
//   }

//   const onDelete = () => {
//     fetchData();
//   }


//   useEffect(() => {
//     fetchData();
//   }, [])

//   useEffect(() => {
//     if (questionnaires.length) {
//       setNoContent(false);
//     }
//     else {
//       setNoContent(true);
//     }
//   }, [questionnaires])


//   return <>
//     {
//             noContent? 
//             <Typography variant="body2">
//               no questionnaires
//             </Typography>
//             :
//             <List>
//               {questionnaires.map(q =>
//                 <ListItem fullWidth>
//                   <QuestionnaireCard questionnaire={q} onDelete={onDelete} />
//                 </ListItem>
//               )}
//             </List>
//     }
//   </>
// }

// export default QuestionnairesList;
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Typography, List, Grid } from "@mui/material";
import QuestionnaireCard from "./Card";
import { AuthContext } from "../../../context/authContext";

const QuestionnairesList = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentUserId, setCurrentUserId] = useState(currentUser?.id);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [noContent, setNoContent] = useState(true);

  useEffect(() => {
    setCurrentUserId(currentUser?.id);
  }, [currentUser]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `http://localhost:3600/api/questionnaire?owner=${currentUserId}`
    );
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
