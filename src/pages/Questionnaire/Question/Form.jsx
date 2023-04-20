import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider, IconButton } from '@mui/material';
import { Formik , Field, FieldArray } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';

const QuestionForm = ({ options }) => {
  // const QuestionForm = ({ options: { open, handleClose, isEditing, handleEdit, handleSave, questionContent, setQuestionContent, correctAnswer, setCorrectAnswer, incorrectAnswers, addIncorrectAnswerField } }) => {

  const clearInput = () => {
    options.setQuestionContent('');
    options.setCorrectAnswer('');
  }
  
  const handleSaveFormik = (values) => {
    if (options.isEditing) {
      options.handleEdit(values);
    } else {
      handleSave(values);
    }
  };


  const handleQuestionChange = event => {
    options.setQuestionContent(event.target.value);
  };

  const handleCorrectAnswerChange = event => {
    options.setCorrectAnswer(event.target.value);
  };



  const handleClose = () => {
    clearInput();
    options.handleClose();
  }

  const handleSave = () => {
    clearInput();
    options.handleSave();
  }

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    textField: {
      display: 'inline-block',
    },
    iconButton: {
      display: 'inline-block',
    },
  };
  
  return <>
    <Formik initialValues={{ questionContent:'', correctAnswer: '', incorrectAnswers: [] }}>
      {({values}) => (
        <form>
        <Dialog open={options.open} onClose={handleClose}>
          <DialogTitle>{options.isEditing? 'Edit question' : 'New question'}</DialogTitle>
          <DialogContent>
            {/* question */}
            <Field
              as={TextField}
              margin="dense"
              label="question"
              type="text"
              fullWidth
              value={options.questionContent}
              onChange={handleQuestionChange}
              name="questionContent"
            />
            {/* correct answer */}
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Field 
              as={TextField}
              margin="dense"
              label="correct answer"
              type="text"
              fullWidth
              value={options.correctAnswer}
              onChange={handleCorrectAnswerChange}
              name="correctAnswer"     
            />
            <Divider sx={{ mt: 2, mb: 2 }} />
            {/* incorrect answers */}
            {/* key={options.incorrectAnswers.length} */}
            <FieldArray name="incorrectAnswers">
                {({push, remove}) => (
                  <>
                  {options.incorrectAnswers?.length?  options.incorrectAnswers.map((answer, index) => (
                    <div key={index.toString()} style={styles.container}>
                        <Field 
                          style={styles.textField}
                          as={TextField}
                          margin="dense"
                          label={`incorrect answer ${index + 1}`}
                          type="text"
                          fullWidth
                          name={`incorrectAnswers[${index}].content`}
                          onChange={(event) => options.handleIncorrectAnswerChange(index, event)}
                        />
                        <IconButton
                          style={styles.iconButton}
                          aria-label="delete"
                          onClick={() => options.removeIncorrectAnswerField(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    )) : ''} 
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={options.addIncorrectAnswerField}
                      sx={{ mt: 2 }}
                    >
                      Add incorrect answer
                    </Button>
                  </>
                )}
            </FieldArray>            
          </DialogContent>
          <DialogActions>
            <Button onClick={options.handleCancel}>Cancel</Button>
            <Button onClick={(values) => handleSaveFormik(values)}>{options.isEditing? 'Save' : 'Add'}</Button>
          </DialogActions>
        </Dialog>
      </form>         



      )}
      
    </Formik>
  </>
}

export default QuestionForm;

 


