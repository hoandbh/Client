import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider, IconButton } from '@mui/material';
import { Formik , Field, FieldArray } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect} from 'react';

const QuestionForm = ({ options }) => {

  // useEffect(() => {
  //   console.log(options.initialValues);
  // },[])

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
<<<<<<< HEAD

  const formik = useFormik({
    initialValues:options.initialValues,
    onSubmit: (values) => options.handleSubmit(values),
    onReset: options.handleCancel
  });


  return (
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
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
              onChange={formik.handleChange}
              value={formik.values.question}
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
              onChange={formik.handleChange}
              value={formik.values.correctAnswer}
            />
            <Divider sx={{ mt: 2, mb: 2 }} />
            {/* incorrect answers */}
            {/* <FieldArray name="incorrectAnswers">
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
            </FieldArray> */}
          </DialogContent>
          <DialogActions>
            <Button type='reset' >Cancel</Button>
            <Button type='submit' >
              {options.isEditing ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
    </form>
=======
  
  return (
    <Formik initialValues={options.initialValues}>
      {formik => (
        <form>
          <Dialog open={options.open}>
            <DialogTitle>{options.isEditing? 'Edit question' : 'New question'}</DialogTitle>
            <DialogContent>
              {/* question */}
              <Field
                as={TextField}
                margin="dense"
                label="question"
                type="text"
                fullWidth
                value={formik.values.questionContent}
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
                value={formik.values.correctAnswer}
                name="correctAnswer"   
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
                          value={formik.values.incorrectAnswers[index]?.content}
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
          </Dialog>
        </form>         
      )}
    </Formik>
>>>>>>> 75232bd1bc11f003fdb9059aebdc43e847ab46a9
  );
}

export default QuestionForm;
