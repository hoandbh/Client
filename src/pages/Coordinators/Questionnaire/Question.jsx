import {Paper, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Axios from 'axios';


const Question = (props) => {
  const question = props.question;
  const [answers, setAnswers] = useState([]);
  const id_qst = question.id_qst;

  const fetchAnswers = async () => {
    const { data } = await Axios.get(`http://localhost:3600/api/questionnaire/99/part/99/question/${id_qst}/answer`);
    // setAnswers(data);
    console.log(data);
  }

  useEffect(() => {
    fetchAnswers(); 
  },[])



  return <>
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {question.content}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                the answer?
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove - change to button
              </Typography>
            </Grid>
          </Grid> 
        </Grid>
      </Grid>
    </Paper>
  </>
}

export default Question;

