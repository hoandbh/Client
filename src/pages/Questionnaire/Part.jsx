import axios from 'axios';
import { useEffect, useState } from "react";
import { Button, List, ListItem, Divider, Typography } from '@mui/material';
import QuestionCard from "./Question/Card";
import QuestionCardTry from "./Question/CardTry";
import QuestionForm from './Question/Form';
import QuestionFormTry from './Question/FormTry';

const Part = ({part}) => {

  const [questions, setQuestions] = useState(part.questions_in_part);
  const [open, setOpen] = useState(false);

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
  
  const initialValues = {
    question: '',
    correctAnswer: '',
    incorrectAnswers: [],
  };
  
  return <>
    <Divider textAlign="left" sx={{ mt: 2, mb: 2 }} >
      <Typography sx={{ typography: 'subtitle1' ,fontWeight: 'light', m: 1}}>
        {`${part.headline}(${part.serial_number})`}
      </Typography>
    </Divider>

    {questions && questions.length > 0 &&
      <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {questions.map(qst => {
            return <>
              <ListItem alignItems="flex-start" key={qst.id}>
                <QuestionCardTry 
                  question={qst} 
                  onDelete={handleDeleteQuestion}
                />
              </ListItem></>
          })}
        </List>
      </>
    }
    <br />   
    <br />
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
      add question to part {part.serial_number}
    </Button>
      {open && <QuestionFormTry 
        options={{
          open,
          initialValues,
          handleCancel,
          handleSave,
        }}
      />}
  </>
}

export default Part;





















