import {Paper, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const QuestionCard = ({question,onDelete}) => {
  const [answers, setAnswers] = useState([]);
  const id_qst = question.id_qst;

  const deleteQst = async() => {
    await Axios.delete(`http://localhost:3600/api/question/${id_qst}`);
    onDelete(); 
  }

  const editQst = () => {
    alert('implemnt editQst');
  }

  const fetchAnswers = async () => {
    //to change the url
    const { data } = await Axios.get(`http://localhost:3600/api/question/${id_qst}/answer`);
    setAnswers(data);
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
                {answers && answers.length>0 && answers.map((a,i) => <p key={i.toString()}>-{a.content}</p>)}
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

export default QuestionCard;