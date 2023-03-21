import Axios from 'axios';
import { useState } from "react";
import { Button, List, ListItem, Divider, Typography } from '@mui/material';
import QuestionCard from "./Question/Card";
import QuestiomForm from './Question/Form';

const Part = ({part}) => {

  const [questions, setQuestions] = useState(part.questions_in_part);
  const [open, setOpen] = useState(false);
  const [qstContent, setQstContent] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  //const apiUrl = process.env.REACT_APP_API_URL;

  const fetchQuestions = async () => {
    const { data } = await Axios.get(`http://localhost:3600/api/part/${part.id_part}/question`);
    setQuestions(data);
  }

  const postQuestion = async () => {
    const { data } = await Axios.post(`http://localhost:3600/api/question`,
      {
        "content" : qstContent,
        part_in_questionnaire : part.id_part
      }
    )
    fetchQuestions();
    return data.id_qst;
  }

  const postAnswers = async (qstId) => {
    await Axios.post(`http://localhost:3600/api/answer`,
      {
        "content": correctAnswer,
        "is_correct": true,
        "qst":qstId
      }
    );
    for (const ans of incorrectAnswers) {
      await Axios.post(`http://localhost:3600/api/answer`,
        {
          "content": ans,
          "is_correct": false,
          "qst":qstId
        }
      );
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = async () => {
    const qstId = await postQuestion();
    await postAnswers(qstId);
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

  const handleIncorrectAnswerChange = (index, event) => {
    const value = event.target.value;
    const answers = [...incorrectAnswers];
    answers[index] = value;
    setIncorrectAnswers(answers);
  };

  const addIncorrectAnswerField = () => {
    setIncorrectAnswers(prevAnswers => [...prevAnswers, '']);
  }

  const initialValues = {
    qstContent,
    correctAnswer,
    incorrectAnswers,
  };

  return <>
    <Divider sx={{ mt: 2, mb: 2 }} />
    <Typography variant="h6" gutterBottom>
      headline: {part.headline}
    </Typography>
    <Typography variant="h6" gutterBottom>
      serial_number: {part.serial_number}
    </Typography>

    {questions && questions.length > 0 &&
      <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {questions.map((qst) => {
            return <><ListItem alignItems="flex-start"><QuestionCard question={qst}/></ListItem></>
          })}
        </List>
      </>
    }
    <br />
    <br />
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
      add question to part {part.serial_number}
    </Button>
      <QuestiomForm options={{initialValues,open,handleQuestionChange,handleCorrectAnswerChange,incorrectAnswers,handleIncorrectAnswerChange,addIncorrectAnswerField,handleClose,handleSave}}/>
  </>
}

export default Part;





















