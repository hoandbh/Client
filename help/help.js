
import { Button, Paper, DialogTitle, DialogContent, DialogActions, TextField, Divider, IconButton } from '@mui/material';
import { Formik, Field, FieldArray } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';

const QuestionForm = ({ options }) => {

  const handleSaveFormik = (values) => {
  if (options.isEditing) {
    options.handleEdit(values);
  } else {
    options.handleSave(values);
  }
  };

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

  return (
  <Formik initialValues={options.initialValues} >
    {formik => (
    <form>
      <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
      open={options.open}
      >
        <DialogTitle>{options.isEditing ? 'Edit question' : 'New question'}</DialogTitle>
        <DialogContent>
        {/* question */}
        <Field
          required
          as={TextField}
          margin="dense"
          label="question"
          type="text"
          fullWidth
          value={formik.values.questionContent}
          name="questionContent"
        // onFocus={event => {
        //   const input = event.target;
        //   input.setSelectionRange(0, input.value.length);
        // }}
        />
        {/* correct answer */}
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Field
          as={TextField}
          margin="dense"
          label="correct answer"
          type="text"
          fullWidth
          value={formik.values.correctAnswer}
          name="correctAnswer"
        // onFocus={event => {
        //   const input = event.target;
        //   input.setSelectionRange(0, input.value.length);
        // }}  
        />
        <Divider sx={{ mt: 2, mb: 2 }} />
        {/* incorrect answers */}
        <FieldArray name="incorrectAnswers">
          {({ push, remove }) => (
          <>
            {formik.values.incorrectAnswers?.map((answer, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Field
              style={styles.textField}
              as={TextField}
              margin="dense"
              label={`incorrect answer ${index + 1}`}
              type="text"
              fullWidth
              name={`incorrectAnswers[${index}].content`}
              value={formik.values.incorrectAnswers[index].content}
              // onFocus={event => {
              //   const input = event.target;
              //   input.setSelectionRange(0, input.value.length);
              // }}
              />
              <IconButton
              aria-label="delete"
              onClick={() => remove(index)}
              >
              <DeleteIcon />
              </IconButton>
            </div>
            ))}
            <Button
            variant="contained"
            color="secondary"
            onClick={() => push('')}
            //onClick={() => push({content:`Write the incorrect answer number ${formik.values.incorrectAnswers.length + 1} here...`})}
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
        <Button onClick={() => handleSaveFormik(formik.values)}>{options.isEditing ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Paper>
    </form>
    )}
  </Formik>
  );
}

export default QuestionForm;
