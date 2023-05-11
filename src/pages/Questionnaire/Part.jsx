import axios from 'axios';
import { useState } from "react";
import { IconButton, Typography, AccordionDetails, AccordionSummary, Accordion, Button, List, ListItem, Divider, Paper, TextField } from '@mui/material';
import QuestionCard from "./Question/Card";
import QuestionForm from './Question/Form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

const Part = ({ part, handleDeletePart }) => {

  const [questions, setQuestions] = useState(part.questions);
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
        content: values.questionContent,
        part_id: part.id
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
    };
    if (values.file) {
      await axios.post(`http://localhost:3600/api/question/${qstId}/image`, values.file);

    }
    fetchQuestions();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = async (values) => {
    await postQuestionAndAnsawers(values);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3600/api/part/${part.id}`);
    handleDeletePart();
  }

  const initialValues = {
    questionContent: '',
    correctAnswer: '',
    incorrectAnswers: [],
  };

  return <>

    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
        <Typography>{title}</Typography>
        
      </AccordionSummary>
      <AccordionDetails>
        {questions && questions.length > 0 &&
          <>
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', margin: 'auto' }}>
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
      </AccordionDetails>
    </Accordion>

    {/* 
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

     */}
  </>
}

export default Part;