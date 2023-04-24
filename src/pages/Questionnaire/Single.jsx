import { useEffect, useState } from "react";
import axios from "axios";
import Part from './Part';
import { Button, Typography, TextField, Divider, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useParams } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';
// import './a.css'
import '../../Style/sst.css'
const Questionnaire = () => {

  const { id } = useParams();

  const [questionnaire, setQuestionnaire] = useState({});
  const [partsNum, setPartsNum] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [open, setOpen] = useState(false);

  const [partHeadline, setPartHeadline] = useState('');


  const fetchData = async () => {
    const { data: questionnaire } = await axios.get(`http://localhost:3600/api/questionnaire/full/${id}`);
    console.log(questionnaire.name);
    console.log(questionnaire);

    setQuestionnaire(questionnaire);
    setPartsNum(questionnaire.parts_in_questionnaire.length);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const addPart = async () => {
    //setIsAdding(true);
    setOpen(true)
  }

  const handleAddPart = async () => {
    await axios.post(`http://localhost:3600/api/questionnaire/${id}/part`,
      {
        headline: partHeadline,
        serial_number: partsNum + 1,
        mix: true
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

  return <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Type the part name"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={`Part name`}
          type="text"
          fullWidth
          onKeyDown={e => setPartHeadline(e.target.value)}
        />
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


    {questionnaire && questionnaire.parts_in_questionnaire &&
      <ul>
        {questionnaire.parts_in_questionnaire.map((part, i) => <Part key={i.toString()} part={part} />)}
      </ul>
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
        {/* <a href='#' class="stt" title="scroll to top" > ^ </a> */}
        <div class="container-top">
          <a href="#" class="top" title="scroll to top"></a>
        </div>

      </>
    }

  </>
}

export default Questionnaire;



