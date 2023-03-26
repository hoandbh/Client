import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider } from '@mui/material';
import { Formik, Form, Field } from 'formik';

const QuestionForm = ({ options }) => {

  return <>
    <Formik
        initialValues={options.initialValues}
        onSubmit={(values) => {
          options.handleSave(values);
        }}
      >
      <form>
        <Dialog open={options.open} onClose={options.handleClose}>
          <DialogTitle>new quesion or edit</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="question"
              type="text"
              fullWidth
              onChange={options.handleQuestionChange}
            />
            <Divider sx={{ mt: 2, mb: 2 }} />

            <TextField
              margin="dense"
              label="correct answer"
              type="text"
              fullWidth
              onChange={options.handleCorrectAnswerChange}

            />

            <Divider sx={{ mt: 2, mb: 2 }} />
            {options.incorrectAnswers.map((value, index) => (
              <TextField
                key={index}
                margin="dense"
                label={`incorrect answer ${index + 1}`}
                type="text"
                fullWidth
                onChange={(event) => options.handleIncorrectAnswerChange(index, event)}
              />
            ))}

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
            <Button onClick={options.handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </form>
    </Formik>
  </>
} 

export default QuestionForm;