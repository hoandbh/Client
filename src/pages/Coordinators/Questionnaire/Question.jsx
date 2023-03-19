import {Paper, Typography, Grid, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import IconButton from '@mui/material/IconButton';

const Question = (props) => {
  const question = props.question;
  const [answers, setAnswers] = useState([]);
  const id_qst = question.id_qst;

  const setSomething = props.func;

  var x = 10
  const deleteQst = async() => {
    await Axios.delete(`http://localhost:3600/api/question/${id_qst}`);
    x = x + 2;
    setSomething(x); 
  }


  const editQst = () => {
    alert('implemnt editQst');
  }


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
            <Grid item sx>
                <IconButton onClick={deleteQst}>
                  <DeleteIcon/>
                </IconButton>
                <IconButton onClick={editQst}>
                  <EditIcon/>
                </IconButton>
            </Grid>
          </Grid> 
        </Grid>
      </Grid>
    </Paper>
  </>
}

export default Question;

