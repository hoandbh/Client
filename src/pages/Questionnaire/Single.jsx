import { useEffect, useState } from "react";
import axios from "axios";
import Part from './Part';
import { IconButton, Button, Typography, TextField, Divider, Dialog, DialogActions, DialogContent, DialogTitle, Box, Switch, ToggleButtonGroup, ToggleButton, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import '../../Style/sst.css';
   
const Questionnaire = () => {

  const { id } = useParams();

  const [questionnaire, setQuestionnaire] = useState({});
  const [partsNum, setPartsNum] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [open, setOpen] = useState(false);
  const [mix, setMix] = useState(true);

  const [partHeadline, setPartHeadline] = useState('');


  const fetchData = async () => {
    const { data: questionnaire } = await axios.get(`http://localhost:3600/api/questionnaire/${id}/full`);
    setQuestionnaire(questionnaire);
    setPartsNum(questionnaire.parts.length);
  }

  useEffect(() => {
    fetchData();
  }, [])
  const switchMix = (e) => {
    const toMix = e.currentTarget.value === 'true'? true: false;
    setMix(toMix);
  }


  const addPart = async () => {
    //setIsAdding(true);
    setOpen(true)
  }

  const handleAddPart = async () => {
    await axios.post(`http://localhost:3600/api/questionnaire/${id}/part`,
      {
        headline: partHeadline,
        serial_number: partsNum + 1,
        mix: mix
      }
    )
    setIsAdding(false);
    setPartHeadline('');
    fetchData();
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
    setPartHeadline('');
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

  return <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onKeyDown={e => { if (e.key === 'Enter') handleAddPart() }}
    >
      <DialogTitle id="alert-dialog-title">{"Type the part name"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={`Part name`}
          type="text"
          fullWidth
          onChange={e => setPartHeadline(e.target.value)}
        />

        <RadioGroup
          value={mix}
          onChange={switchMix}

        >
          <FormControlLabel value = 'true' label = 'Mix Questions and Answers' control={<Radio />}/>
          <FormControlLabel value = 'false'label='Mix Only Answers' control = {<Radio/>}/>
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddPart} autoFocus>
          add
        </Button>
      </DialogActions>
    </Dialog>
    <br />
    <div style={{ textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        {questionnaire?.name}
      </Typography>
      <Typography variant="h4" gutterBottom>
        questionnaire in {questionnaire?.course?.name}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {questionnaire && <p>exam date :{new Date(questionnaire.date).toLocaleDateString()}</p>}
      </Typography>
    </div>

    {questionnaire && questionnaire.parts &&
      <Box>
        {questionnaire.parts.map((part, i) => <Part handlePartChange={handlePartChange} key={randKey(3)+part.headline} part={part} />)}
      </Box>
    }
    {isAdding ?
      (
        <>
          <Divider>
            <TextField
              label='part head line'
              onChange={e => setPartHeadline(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAddPart() }}
              style={{ width: 500 }}
              onBlur={handleAddPart}
            />
            <IconButton onClick={handleAddPart}>
              <DoneAllIcon />
            </IconButton>
          </Divider>
        </>

      )
      :
      <>
        <Divider>
          <Button variant="contained" onClick={addPart} color='error'>+  add part</Button>
        </Divider>

        <div className="container-top">
          <a href="#" className="top" title="scroll to top"></a>
        </div>
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="contained" onClick={finish} color='error'>finish and mix</Button>
        </Box>
      </>
    }

  </>
}

export default Questionnaire;