import { Paper, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import QuestionForm from './Form';

const QuestionCard = ({question,onDelete}) => {

  const [answers, setAnswers] = useState(question.answers);
  const [open, setOpen] = useState(false); 
  const [questionContent, setQuestionContent] = useState(question?.content || '');
  const [correctAnswerContent, setCorrectAnswerContent] = useState('')
  const [incorrectAnswersContent, setIncorrectAnswersContent] = useState('')

  const qstId = question.id;

  useEffect(() => {
    console.log(answers)

    setCorrectAnswerContent(answers?.length && answers.find(a => a.is_correct)?.content || '');
    const answersArr = [...answers]
    const incorrectAnswersArr =  answersArr?.filter(a => !a.is_correct);
    setIncorrectAnswersContent(incorrectAnswersArr?.map(a => a.content) || []);
  }, [answers])

  const fetchData = async () => {
    const { data } = await axios.get(`http://localhost:3600/api/question/${qstId}`);
    setQuestionContent(data.content);
    setAnswers(data.answers);
  }

  const handleEdit = async (values) => {
    const arr = values.incorrectAnswers.map(a => a.content);
    await axios.put(`http://localhost:3600/api/question/${qstId}`,
      { 
        content: values.questionContent,
        correctAnswerContent: values.correctAnswer,
        incorrectAnswers: arr
      }
    );
    setOpen(false);
    fetchData();
  }
  
  const handleCancel = async () => {
    setOpen(false);
  }
  
  const deleteQst = async() => {
    await axios.delete(`http://localhost:3600/api/question/${qstId}`);
    onDelete(); 
  }

  const editQst = () => {
    setOpen(true);
  }

  const initialValues = { 
    questionContent: question?.content , 
    correctAnswer: answers.filter(a => a.is_correct)?.[0]?.content ,
    incorrectAnswers: answers && answers.filter(a => !a.is_correct) || [],
  }

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
      {question && answers && 
        <QuestionForm
        options={{
          open,
          isEditing: true,
          initialValues,
          handleCancel,
          handleEdit,
        }}
        />
      }
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item>
              <Typography gutterBottom variant="subtitle1" component="div">
                {questionContent}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div>{correctAnswerContent && `V:  ${correctAnswerContent}`}</div>
                <div>{incorrectAnswersContent?.length && incorrectAnswersContent.map((ans,i) => <div>{`X: ${ans}.  `}</div>)}</div>
              </Typography>
            </Grid>
            <Grid item>
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