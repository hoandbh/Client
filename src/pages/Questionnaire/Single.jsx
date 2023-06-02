import { useEffect, useState } from "react";
import Part from './Part/Card';
import { IconButton, Fab, Button, Typography, TextField, Divider, Dialog, DialogActions, DialogContent, DialogTitle, Box, Switch, ToggleButtonGroup, ToggleButton, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import sendAuthenticatedRequest from '../../utils/api';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PartForm from "./Part/Form";


const Questionnaire = () => {
  const { id } = useParams();

  const [questionnaire, setQuestionnaire] = useState({});
  const [partsNum, setPartsNum] = useState(0);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const res = await sendAuthenticatedRequest(`http://localhost:3600/api/questionnaire/${id}/full`);
      const questionnaire = res.data;
      setQuestionnaire(questionnaire);
      setPartsNum(questionnaire.parts.length);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('Forbidden - Access Denied');
      } else {
        setError('Something went wrong. Please contact the technical support center.');
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const addPart = () => {
    setOpen(true);
  }

  const handleAddPart = async (headline, mix) => {

    const data = {
      headline,
      serial_number: partsNum + 1,
      mix
    }
    await sendAuthenticatedRequest(`http://localhost:3600/api/questionnaire/${id}/part`, 'POST', data)

    fetchData();
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const navigate = useNavigate();

  const finish = () => {
    navigate(`/questionnaire/complete/${id}`);
  }

  const handlePartChange = () => {
    fetchData();
  }

  const randKey = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {error.length > 0 ? (
        <Typography variant="body2" color="text.secondary">
          {error}
        </Typography>
      ) : (
        <>
          <PartForm
            open={open}
            handleAddPart={handleAddPart}
            handleClose={handleClose}
          />
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="h4" gutterBottom>
              {questionnaire?.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {`Questionnaire in ${questionnaire?.course?.name}`}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {questionnaire && <p>exam date: {new Date(questionnaire.date).toLocaleDateString()}</p>}
            </Typography>
          </Box>

          {questionnaire && questionnaire.parts && (
            <Box>
              {questionnaire.parts.map((part, i) => (
                <Part handlePartChange={handlePartChange} key={randKey(3) + part.headline} part={part} />
              ))}
            </Box>
          )}

          <Divider>
            <Button variant="contained" onClick={addPart} color='error'>+  add part</Button>
          </Divider>

          <Fab
            color="primary"
            aria-label="Scroll to top"
            onClick={handleScrollToTop}
            sx={{
              position: 'fixed',
              bottom: '16px',
              right: '16px',
              //zIndex: 9999,
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="contained" onClick={finish} color='error'>finish and mix</Button>
          </Box>
        </>
      )}
    </>
  );
}

export default Questionnaire;
