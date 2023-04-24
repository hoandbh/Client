import axios from 'axios';
import { useState } from "react";
import { Button, List, ListItem, Divider, Typography, Paper, TextField, Field } from '@mui/material';
import QuestionCard from "./Question/Card";
import QuestionForm from './Question/Form';

const Part = ({part}) => {

  const [questions, setQuestions] = useState(part.questions_in_part);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(part.headline);

  const handleDeleteQuestion = () => {
    fetchQuestions();
  }

  const fetchQuestions = async () => {
    const { data } = await axios.get(`http://localhost:3600/api/part/${part.id}/question`);
    setQuestions(data);
  }

  const postQuestionAndAnsawers = async (values) => {
    const { data } = await axios.post(`http://localhost:3600/api/question`,
      {
        content : values.questionContent,
        part_id : part.id
      }
    )
    const qstId = data.id;
    await axios.post(`http://localhost:3600/api/answer`,
    {
      content: values.correctAnswer,
      is_correct: true,
      question_id: qstId
    } 
    );
    for (const answer of values.incorrectAnswers) {
      await axios.post(`http://localhost:3600/api/answer`,
        {
          content: answer.content,
          is_correct: false,
          question_id: qstId
        }
      );
    }
    fetchQuestions();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = async (values) => {
    await postQuestionAndAnsawers(values)
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  
  // const initialValues = {
  //   questionContent: 'Write the question here...',
  //   correctAnswer: 'Write the correct answer here...',
  //   incorrectAnswers: [],
  // };
  
  const initialValues = {
    questionContent: '',
    correctAnswer: '',
    incorrectAnswers: [],
  };
  
  return <>
    <Divider textAlign="center" sx={{ mt: 2, mb: 2 }} >
      <TextField
        value={title}
        color="primary"
        variant="outlined"
        onChange={event => setTitle(event.target.value)}
        style={{ width: 400 }}
        //when to save the tilte in db??
      /> 
    </Divider>

    {questions && questions.length > 0 &&
      <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto'  }}>
          {questions.map(qst => {
            return <>
              <ListItem alignItems="flex-start" key={qst.id}>
                <QuestionCard
                  question={qst} 
                  onDelete={handleDeleteQuestion}
                />
              </ListItem></>
          })}
        </List>
      </>
    }
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto' }} >
        <ListItem>
          <Paper
            sx={{
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          > 
            <Button       
              style={{ width: '100%', height: '100%' }}
              variant="contained"
              color="primary" 
              onClick={handleClickOpen}
            >
               +   add question
            </Button>    
          </Paper>  
        </ListItem>
        
      </List>
    {
      open && 
        <QuestionForm 
          options={{
            open,
            initialValues,
            handleCancel,
            handleSave,
          }}
        />
    }
  </>
}

export default Part;





















