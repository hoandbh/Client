import Question from "./Question";
import Axios from 'axios';
import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField , List, ListItem, Divider, Typography} from '@mui/material';

const Part = (props) => {

  const part = props.part;
  const [questions,setQuestions] = useState(part.questions_in_part);


  const fetchQuestions = async () => {
    const questionnaireId = 1;//how to know questionnaireId?
    // const {data} = await Axios.get(`http://localhost:3600/api/question/ofPart/${part.id_part}`);
    const {data} = await Axios.get(`http://localhost:3600/api/questionnaire/${questionnaireId}/parts/${part.id_part}/questions`);
    setQuestions(data);
  }



  

  const postQuestion = async () => {
    //nested url?? 
    //questionnaire/questionnaireId/part/partId/question
    await Axios.post('http://localhost:3600/api/question',
      {
        "part_in_questionnaire": part.id_part,
        "content": qstContent
      }
    )
    fetchQuestions();
  }

  const postAnswers = async () => {
    
    // await Axios.post('http://localhost:3600/api/question',
    //   {
    //     "part_in_questionnaire": part.id_part,
    //     "content": qstContent
    //   }
    // )
    // fetchAnswers();
  }


  //for the dialog
  const [open, setOpen] = useState(false);
  const [qstContent, setQstContent] = useState('');
  // const [numIncorrectAnswers, setNumIncorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  //dialog funtions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    postQuestion();
    postAnswers();
    setIncorrectAnswers([]);
    setOpen(false);
  };

  const handleClose = () => {
    setIncorrectAnswers([]);
    setOpen(false);
  };

  const handleInputChangeQst = (event) => {
    setQstContent(event.target.value);
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
  <Divider sx={{ mt: 2, mb: 2}} />
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
  <br/>
  <br/>
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
          onChange={handleInputChangeQst}
        />
  <Divider sx={{ mt: 2, mb: 2}} />

        <TextField
          margin="dense"
          label="corect answer"
          type="text"
          fullWidth
        />

  <Divider sx={{ mt: 2, mb: 2}} />
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



    

  
    


    

