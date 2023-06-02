import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, TextField, Grid, CircularProgress, Typography } from '@mui/material';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import sendAuthenticatedRequest from '../../utils/api';

const MixQuestionnaire = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [questionnaireDetails, setQuestionnaireDetails] = useState({});
  const [amount, setAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    const { data: questionnaire } = await sendAuthenticatedRequest(`http://localhost:3600/api/questionnaire/${id}`,'GET');
    setQuestionnaireDetails(questionnaire);
  }

  const navBack = async () => {
    navigate(`/questionnaire/${id}`);
  }

  const handleMixButton = async () => {
    try {
      setError('');
      if (!amount) {
        setError('Fill the number of version.');
        return;
      }
      setIsLoading(true);
      await sendAuthenticatedRequest(`http://localhost:3600/api/questionnaire/${id}/generate-versions`, 'POST',{ amount });
      navigate(`/versions/${id}`);
    }
    catch {
      setError('Something went wrong. Please contact the technical support center.')
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return <>
    <Button onClick={navBack}>
      <ContentPasteSearchIcon sx={{ mr: 1 }} />
      Back to Editing Questionnaire
    </Button>
    <Grid
      container
      spacing={5}
      direction="column"
      alignItems="center"
      justifyContent="center"
      marginTop={20}
    >
      <h1> Test Mixing </h1>
      <br />
      <h3>Finish And Mix</h3>
      <TextField
        sx={{ width: 200 }}
        id="outlined-number"
        label="Number of Versions"
        type="number"
        onBlur={e => {
          const enteredValue = e.target.value;
          if (!enteredValue || (enteredValue >= 0 && enteredValue <= 100)) {
            setAmount(enteredValue);
          }
        }}
        value={amount}
        InputProps={{
          inputProps: {
            min: 0,
            max: 100
          }
        }}
      />
      <br /><br />

      <Typography variant="body2" color="text.secondary">
        {error}
      </Typography>
      <Button color='primary' onClick={handleMixButton}>
        {isLoading ? <CircularProgress size={24} /> : 'Complete And Create Versions'}
      </Button>
      <Grid item>
      </Grid>
    </Grid>






  </>
}


export default MixQuestionnaire;

