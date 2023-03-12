import Question from "./Question";
import Axios from 'axios';
import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField , List, ListItem, Divider, Typography} from '@mui/material';

const Part = (props) => {

  const part = props.part;
  const [questions,setQuestions] = useState(part.questions_in_part);


  const fetchQuestions = async () => {
    const {data} = await Axios.get(`http://localhost:3600/api/question/ofPart/${part.id_part}`);
    setQuestions(data);
  }


  //for the dialog
  const [open, setOpen] = useState(false);
  const [qstContent, setQstContent] = useState('');

  //dialog funtions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    addQuestion(qstContent);
    setQstContent('');
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setQstContent(event.target.value);
  };

  const addQuestion = async (content) => {
  //nested url?? 
  //questionnaire/questionnaireId/part/partId/question
    const res = await Axios.post('http://localhost:3600/api/question',
      {
        "part_in_questionnaire": part.id_part,
        "content": content
      }
    )
    fetchQuestions();
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
      <DialogTitle>type question content</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="question"
          type="text"
          fullWidth
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          margin="dense"
          label="corect answer"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          label="incorect answer"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          label="incorect answer"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>    
</>
}

export default Part;



    

  
    


    

