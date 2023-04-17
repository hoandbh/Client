import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider, IconButton } from '@mui/material';
import { Formik, Field, FieldArray, Form } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';

const QuestionFormTry = ({ options, onSubmit }) => {

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
    <Formik
      initialValues={{
        questionContent: options.questionContent || '',
        correctAnswer: options.correctAnswer || '',
        incorrectAnswers: options.incorrectAnswers || [],
      }}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
        <Form>
          <Dialog open={options.open} onClose={options.handleClose}>
            <DialogTitle>{options.isEditing? 'Edit question' : 'New question'}</DialogTitle>
            <DialogContent>
              {/* question */}
              <Field
                as={TextField}
                margin="dense"
                label="Question"
                type="text"
                fullWidth
                name="questionContent"
              />
              {/* correct answer */}
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Field
                as={TextField}
                margin="dense"
                label="Correct answer"
                type="text"
                fullWidth
                name="correctAnswer"
              />
              <Divider sx={{ mt: 2, mb: 2 }} />
              {/* incorrect answers */}
              <FieldArray name="incorrectAnswers">
                {({push, remove}) => (
                  <>
                    {values.incorrectAnswers?.length ? values.incorrectAnswers.map((answer, index) => (
                      <div key={index.toString()} style={styles.container}>
                        <Field
                          style={styles.textField}
                          as={TextField}
                          margin="dense"
                          label={`Incorrect answer ${index + 1}`}
                          type="text"
                          fullWidth
                          name={`incorrectAnswers[${index}].content`}
                        />
                        <IconButton
                          style={styles.iconButton}
                          aria-label="delete"
                          onClick={() => remove(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    )) : ''}
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => push({ content: '' })}
                      sx={{ mt: 2 }}
                    >
                      Add incorrect answer
                    </Button>
                  </>
                )}
              </FieldArray>
            </DialogContent>
            <DialogActions>
              <Button onClick={options.handleClose}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {options.isEditing ? 'Save' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionFormTry;
