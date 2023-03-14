import Question from "./Question";
import Axios from 'axios';
import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, Divider, Typography } from '@mui/material';

const Part = (props) => {

  const part = props.part;
  const [questions, setQuestions] = useState(part.questions_in_part);
  const questionnaireId = 1;//how to know questionnaireId?
  var id_qst;//state or ref??

  const fetchQuestions = async () => {

    const {data} = await Axios.get(`http://localhost:3600/api/questionnaire/${questionnaireId}/part/${part.id_part}/question`);
    setQuestions(data);
  }

  const postQuestion = async () => {
    //this url 
    //localhost:3600/api/questionnaire/1/part/2/question
    // const {data} = await Axios.post('http://localhost:3600/api/question',
    const {data} = await Axios.post(`http://localhost:3600/api/questionnaire/${questionnaireId}/part/${part.id_part}/question`,
      {
        "content": qstContent
      }
    )
    id_qst = data.id_qst;
    fetchQuestions();
  }

  const postAnswers = async () => {

    await Axios.post(`http://localhost:3600/api/questionnaire/${questionnaireId}/part/${part.id_part}/question/${id_qst}/answer`, 
        {
          "content": correctAnswer,
          "is_correct":true
        }
      );

    for (const ans of incorrectAnswers) {
      await Axios.post(`http://localhost:3600/api/questionnaire/${questionnaireId}/part/${part.id_part}/question/${id_qst}/answer`, 
        {
          "content": ans,
          "is_correct":false
        }
      );
    }
    // fetchAnswers();
  }

  //for the dialog
  const [open, setOpen] = useState(false);
  const [qstContent, setQstContent] = useState('');
  // const [numIncorrectAnswers, setNumIncorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');


  //dialog funtions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = async () => {
    await postQuestion();
    await postAnswers();
    setIncorrectAnswers([]);
    setOpen(false);
  };

  const handleClose = () => {
    setIncorrectAnswers([]);
    setOpen(false);
  };

  
  const handleQuestionChange = (event) => {
    setQstContent(event.target.value);
  };
  

  const handleCorrectAnswerChange = (event) => {
    setCorrectAnswer(event.target.value);
  };


  //understand more deep
  const handleIncorrectAnswerChange = (index, event) => {
    const value = event.target.value;
    const answers = [...incorrectAnswers];
    answers[index] = value;
    setIncorrectAnswers(answers);
  };

  const addIncorrectAnswerField = () => {
    setIncorrectAnswers(prevAnswers => [...prevAnswers, '']);
  }















  return <>
    <Divider sx={{ mt: 2, mb: 2 }} />
    <Typography variant="h6" gutterBottom>
      headline: {part.headline}
    </Typography>
    <Typography variant="h6" gutterBottom>
      serial_number: {part.serial_number}
    </Typography>

    {questions.length > 0 &&
      <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {questions.map((qst) => {
            return <><ListItem alignItems="flex-start"><Question question={qst} /> </ListItem><Divider variant="inset" component="li" /></>
          })}
        </List>
      </>
    }
    <br />
    <br />
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
      add question to part {part.serial_number}
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>new quesion</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="question"
          type="text"
          fullWidth
          onChange={handleQuestionChange}
        />
        <Divider sx={{ mt: 2, mb: 2 }} />

        <TextField
          margin="dense"
          label="correct answer"
          type="text"
          fullWidth
          onChange={handleCorrectAnswerChange}

        />

        <Divider sx={{ mt: 2, mb: 2 }} />
        {incorrectAnswers.map((value, index) => (
          <TextField
            key={index}
            margin="dense"
            label={`incorrect answer ${index + 1}`}
            type="text"
            fullWidth
            onChange={(event) => handleIncorrectAnswerChange(index, event)}
          />
        ))}

        <Button
          variant="contained"
          color="secondary"
          onClick={addIncorrectAnswerField}
          sx={{ mt: 2 }}
        >
          Add incorrect answer
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  </>
}

export default Part;











