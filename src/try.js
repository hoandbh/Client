import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider } from '@mui/material';
import { Formik, FieldArray , Field } from 'formik';
import {useState} from 'react'

const QuestionForm = ({ options }) => {

  // const initialValues = {
  //   question: options.qstContent,
  //   correctAnswer: options.correctAnswer,
  //   incorrectAnswers: options.incorrectAnswers
  // };

  //const [question,setQuestions] = useState(options.question)

  const handleQuestionChange = event => {
    options.setQuestions(event.target.value);
    //options.handleQuestionChange(event);
  };

  const handleClose = () => {
    options.setQuestions('');
    //options.handleClose();
  }

  const handleSave = () => {
    options.setQuestions('');
    //options.handleSave();
  }

  return <>
    <Formik
      // initialValues={initialValues}
      onSubmit={(values) => {
        if (options.isEditing) {
          options.handleEdit(values)
        } else {
          options.handleSave(values);
        }
      }}
    >
      <form>
        <Dialog open={options.open} onClose={handleClose}>
          <DialogTitle>{options.isEditing? 'Edit question' : 'New question'}</DialogTitle>
          <DialogContent>
          <Field
            as={TextField}
            margin="dense"
            label="question"
            type="text"
            fullWidth
            //name='question'
            value={options.question}
            onChange={handleQuestionChange}
          />

            <Divider sx={{ mt: 2, mb: 2 }} />
            <Field 
              as={TextField}
              margin="dense"
              label="correct answer"
              type="text"
              fullWidth
              name='correctAnswer'
              onChange={options.handleCorrectAnswerChange}
            />
            <Divider sx={{ mt: 2, mb: 2 }} />
            {/* {options.initialValues.incorrectAnswers.map((value, index) => (
              <TextField
                key={index}
                margin="dense"
                label={`incorrect answer ${index + 1}`}
                type="text"
                fullWidth
                // name={`incorrectAnswer${index}`}
                onChange={(event) => options.handleIncorrectAnswerChange(index, event)}
              />
            ))} */}

            <Button
              variant="contained"
              color="secondary"
              onClick={options.addIncorrectAnswerField}
              sx={{ mt: 2 }}
            >
              Add incorrect answer
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={options.handleClose}>Cancel</Button>
            {/* type="submit" */}
            <Button onClick={handleSave}>{options.isEditing? 'Save' : 'Add'}</Button>
          </DialogActions>
        </Dialog>
      </form>
    </Formik>
  </>
}

export default QuestionForm;







// <FieldArray name="incorrectAnswers">
//   {(arrayHelpers) => (
//     <>
//       {values.incorrectAnswers.map((answer, index) => (
//         <Field
//           as={TextField}
//           key={index}
//           name={`incorrectAnswers.${index}`}
//           margin="dense"
//           label={`incorrect answer ${index + 1}`}
//           type="text"
//           fullWidth
//         />
//       ))}
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={() => arrayHelpers.push('')}
//         sx={{ mt: 2 }}
//       >
//         Add incorrect answer
//       </Button>
//     </>
//   )}
// </FieldArray>