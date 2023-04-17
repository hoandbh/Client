import axios from 'axios';
import { useEffect, useState } from "react";
import { Button, List, ListItem, Divider, Typography } from '@mui/material';
import QuestionCard from "./Question/Card";
import QuestionCardTry from "./Question/CardTry";
import QuestionForm from './Question/Form';

const Part = ({part}) => {

  const [questions, setQuestions] = useState(part.questions_in_part);
  const [open, setOpen] = useState(false);
  const [questionContent, setQuestionContent] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  //const apiUrl = process.env.REACT_APP_API_URL;

  const handleDeleteQuestion = () => {
    fetchQuestions()
  }

  const fetchQuestions = async () => {
    const { data } = await axios.get(`http://localhost:3600/api/part/${part.id}/question`);
    setQuestions(data);
  }

  const postQuestionAndAnsawers = async () => {
    const { data } = await axios.post(`http://localhost:3600/api/question`,
        {
          content : questionContent,
          part_id : part.id
        }
      )
      const qstId = data.id;
      await axios.post(`http://localhost:3600/api/answer`,
      {
        content: correctAnswer,
        is_correct: true,
        question_id: qstId
      }
      );
      for (const ans of incorrectAnswers) {
        await axios.post(`http://localhost:3600/api/answer`,
          {
            content: ans,
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

  const handleSave = async () => {
    await postQuestionAndAnsawers()
    setIncorrectAnswers([]);
    setOpen(false);
  };

  const handleCancel = () => {
    setIncorrectAnswers([]);
    setOpen(false);
  };

  const handleQuestionChange = (event) => {
    setQuestionContent(event.target.value);
  };

  const handleCorrectAnswerChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleIncorrectAnswerChange = (index, event) => {
    const value = event.currentTarget.value;
    const answers = [...incorrectAnswers];
    answers[index] = value;
    setIncorrectAnswers(answers);
  };

  useEffect(() => {
  },[incorrectAnswers])

  const addIncorrectAnswerField = () => {
    setIncorrectAnswers(prevAnswers => [...prevAnswers, '']);
  }

  const removeIncorrectAnswerField = (index) => {
    // const answers = [...incorrectAnswers]
    // answers.splice(index, 1);
    // setIncorrectAnswers(answers);
    setIncorrectAnswers(prevAnswers => prevAnswers.filter((answer, i) => i !== index));
  }
  

  const initialValues = {
    question: questionContent,
    correctAnswer,
    incorrectAnswers,
  };

  return <>
    <Divider sx={{ mt: 2, mb: 2 }} />
    <Typography sx={{ typography: 'subtitle1' ,fontWeight: 'light', m: 1}}>
      {part.headline}
    </Typography>
    <Typography sx={{ typography: 'subtitle2' ,fontWeight: 'light', m: 1}}>
      serial number: {part.serial_number}
    </Typography>

    {questions && questions.length > 0 &&
      <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {questions.map(qst => {
            // return <><ListItem alignItems="flex-start" key={qst.id}><QuestionCard question={qst} onDelete={handleDeleteQuestion}/></ListItem></>
            return <><ListItem alignItems="flex-start" key={qst.id}><QuestionCardTry question={qst} onDelete={handleDeleteQuestion}/></ListItem></>
          })}
        </List>
      </>
    }
    <br />   
    <br />
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
      add question to part {part.serial_number}
    </Button>
      <QuestionForm options={{setCorrectAnswer,setQuestionContent,initialValues,open,handleQuestionChange,handleCorrectAnswerChange,
                              incorrectAnswers,handleIncorrectAnswerChange,addIncorrectAnswerField,removeIncorrectAnswerField
                              ,handleCancel,handleSave,questionContent,correctAnswer}}/>
  </>
}

export default Part;





















