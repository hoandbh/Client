// import axios from 'axios';
// import { useState } from "react";
// import { IconButton, Typography, AccordionDetails, AccordionSummary, Accordion, Button, List, ListItem, Divider, Paper, TextField } from '@mui/material';
// import QuestionCard from "./Question/Card";
// import QuestionForm from './Question/Form';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// const Part = ({ part, handlePartChange }) => {

//   const [questions, setQuestions] = useState(part.questions);
//   const [open, setOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [headline, setHeadline] = useState(part.headline);


//   const handleDeleteQuestion = () => {
//     fetchQuestions();
//   }

//   const fetchQuestions = async () => {
//     const { data } = await axios.get(`http://localhost:3600/api/part/${part.id}/question`);
//     setQuestions(data);
//   }

//   const postNewQuestion = async (values) => {
//     const { data } = await axios.post(`http://localhost:3600/api/question`,
//       {
//         content: values.questionContent,
//         part_id: part.id
//       }
//     )
//     const qstId = data.id;
//     await axios.post(`http://localhost:3600/api/answer`,
//       {
//         content: values.correctAnswer,
//         is_correct: true,
//         question_id: qstId
//       }
//     );
//     for (const answer of values.incorrectAnswers) {
//       await axios.post(`http://localhost:3600/api/answer`,
//         {
//           content: answer.content,
//           is_correct: false,
//           question_id: qstId
//         }
//       );
//     };
//     if (values.file) {
//       const formData = new FormData();
//       formData.append("file", values.file);
//       const {data} = await axios.post(`http://localhost:3600/api/question/${qstId}/image`, formData);
//     }
//     fetchQuestions();
//   }

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleSave = async (values) => {
//     await postNewQuestion(values);
//     setOpen(false);
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   const handleDelete = async (e) => {
//     e.stopPropagation();
//     await axios.delete(`http://localhost:3600/api/part/${part.id}`);
//     handlePartChange();
//   }

//   const handleEdit = async (e) => {
//     e.stopPropagation();
//     setIsEditing(true);
//   };

//   const handleEditPart = async () => {
//     await axios.patch(`http://localhost:3600/api/part/${part.id}`, { headline: 'new' });
//     handlePartChange();
//   }

//   const initialValues = {
//     questionContent: '',
//     correctAnswer: '',
//     incorrectAnswers: [],
//     file: ''
//   };

//   return <>

//     <Accordion>
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1a-content"
//         id="panel1a-header"
//       >
//         <IconButton onClick={handleDelete}>
//           <DeleteIcon />
//         </IconButton>
//         <IconButton onClick={handleEdit}>
//           <EditIcon />
//         </IconButton>
//         {isEditing ? <input ></input> : <Typography variant='h5'>{headline}</Typography>}

//       </AccordionSummary>
//       <AccordionDetails>
//         {questions && questions.length > 0 &&
//           <>
//             <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', margin: 'auto' }}>
//               {questions.map(qst => {
//                 return <>
//                   <ListItem alignItems="flex-start" key={qst.id}>
//                     <QuestionCard
//                       question={qst}
//                       onDelete={handleDeleteQuestion}
//                     />
//                   </ListItem></>
//               })}
//             </List>
//           </>
//         }
//         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto' }} >
//           <ListItem>
//             <Paper
//               sx={{
//                 maxWidth: 500,
//                 flexGrow: 1,
//                 backgroundColor: (theme) =>
//                   theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//               }}
//             >
//               <Button
//                 style={{ width: '100%', height: '100%' }}
//                 variant="contained"
//                 color="primary"
//                 onClick={handleClickOpen}
//               >
//                 +   add question
//               </Button>
//             </Paper>
//           </ListItem>

//         </List>
//         {
//           open &&
//           <QuestionForm
//             options={{
//               open,
//               initialValues,
//               handleCancel,
//               handleSave
//             }}
//           />
//         }
//       </AccordionDetails>
//     </Accordion>

//   </>
// }

// export default Part;

import axios from 'axios';
import { useState, useEffect } from "react";
import { IconButton, Typography, AccordionDetails, AccordionSummary, Accordion, Button, List, ListItem, Input, InputAdornment, Paper } from '@mui/material';
import QuestionCard from "./Question/Card";
import QuestionForm from './Question/Form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const Part = ({ part, handlePartChange }) => {
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState('');
  const [newHeadline, setNewHeadline] = useState('');

  useEffect(() => {
    setQuestions(part.questions);
    setHeadline(part.headline);
  }, [part]);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3600/api/part/${part.id}/question`);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const postNewQuestion = async (values) => {
    try {
      const { data } = await axios.post(`http://localhost:3600/api/question`, {
        content: values.questionContent,
        part_id: part.id
      });

      const qstId = data.id;
      await axios.post(`http://localhost:3600/api/answer`, {
        content: values.correctAnswer,
        is_correct: true,
        question_id: qstId
      });

      for (const answer of values.incorrectAnswers) {
        await axios.post(`http://localhost:3600/api/answer`, {
          content: answer,//.content,
          is_correct: false,
          question_id: qstId
        });
      }

      if (values.file) {
        const formData = new FormData();
        formData.append("file", values.file);
        await axios.post(`http://localhost:3600/api/question/${qstId}/image`, formData);
      }

      fetchQuestions();
    } catch (error) {
      console.error('Error creating new question:', error);
    }
  };

  const handleDeleteQuestion = () => {
    fetchQuestions();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = async (values) => {
    await postNewQuestion(values);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:3600/api/part/${part.id}`);
      handlePartChange();
    } catch (error) {
      console.error('Error deleting part:', error);
    }
  };

  const handleEdit = async (e) => {
    e.stopPropagation();
    setNewHeadline(headline);
    setIsEditing(true);
  };

  const handleEditPart = async () => {
    try {
      await axios.patch(`http://localhost:3600/api/part/${part.id}`, { headline: newHeadline });
      handlePartChange();
    } catch (error) {
      console.error('Error editing part:', error);
    }
  };

  const initialValues = {
    questionContent: '',
    correctAnswer: '',
    incorrectAnswers: [],
    file: ''
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          {
            isEditing ?
              <Input
                autoFocus
                onChange={(e) => {
                  setNewHeadline(e.target.value);
                }}
                defaultValue={headline}
                onClick={(e)=> {
                  e.stopPropagation();
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={(e) => {
                      e.stopPropagation();
                      handleEditPart();
                    }}>
                      <CheckIcon />
                    </IconButton>
                    <IconButton onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(false);
                      setNewHeadline('')
                    }}>
                      <CloseIcon />
                    </IconButton>

                  </InputAdornment>
                }
              />
              :

              <Typography variant='h5'>{headline}</Typography>

          }

        </AccordionSummary>
        <AccordionDetails>
          {questions && questions.length > 0 && (
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', margin: 'auto' }}>
              {questions.map((qst) => (
                <ListItem alignItems="flex-start" key={qst.id}>
                  <QuestionCard question={qst} onDelete={handleDeleteQuestion} />
                </ListItem>
              ))}
            </List>
          )}
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto' }}>
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
                  + Add Question
                </Button>
              </Paper>
            </ListItem>
          </List>
          {open && (
            <QuestionForm options={{ open, initialValues, handleCancel, handleSave }} />
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Part;
