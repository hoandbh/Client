import { CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider, IconButton } from '@mui/material';
import { Formik, Field, FieldArray } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Uploader from '../../../components/Uploader';
import { useEffect } from 'react';

const QuestionForm = ({ options }) => {

  const [imageName, setImageName] = useState('');
  const [image, setImage] = useState(options.initialValues.file);

  useEffect(() => {
    if (options.open) {
      console.log('options.initialValues')
      console.log(options.initialValues)
      console.log('options.initialValues')
      setImageName('');
      setImage(options.initialValues.file);
    }
  }, [options.open]);

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
    <Formik key={JSON.stringify(options.initialValues)} initialValues={options.initialValues} >
      {formik => (
        <form>
          <Dialog open={options.open} PaperProps={{ style: { minWidth: '80%', minHeight: '80%' } }}>
            <DialogTitle>{options.isEditing ? 'Edit question' : 'New question'}</DialogTitle>
            <DialogContent>
              {/* question */}
              <Field
                as={TextField}
                margin="dense"
                label="question"
                type="text"
                fullWidth
                required
                value={formik.values.questionContent}
                name="questionContent"
                dir="rtl"
                multiline // Enable multiline input
                rows={4}
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
                dir="rtl"
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
                          name={`incorrectAnswers[${index}]`}//.content
                          value={formik.values.incorrectAnswers[index]}//.content
                          dir="rtl"
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
            <DialogContent>
              {
                image?.length == 0 && imageName?.length == 0 &&
                <Uploader handleAddImage={(img) => {
                  setImageName(img.name);
                  formik.values.file = img;
                }} />
              }

              {
                image?.length > 0 &&
                <>
                  <CardMedia
                    component="img"
                    src={`http://localhost:3600/images/${image}`}
                    alt="Uploaded Image"
                    sx={{ width: '300px' }}
                  />
                  <IconButton onClick={() => {
                    formik.values.file = undefined;
                    setImage('');
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }

              {
                imageName && <>
                  <p>you added an image {imageName} to the question</p>
                  <IconButton onClick={() => {
                    setImageName('');
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={options.handleCancel}>Cancel</Button>
              <Button onClick={() => handleSaveFormik(formik.values)}>{options.isEditing ? 'Save' : 'Add'}</Button>
            </DialogActions>
          </Dialog>
        </form>
      )}
    </Formik>
  );
}

export default QuestionForm;

