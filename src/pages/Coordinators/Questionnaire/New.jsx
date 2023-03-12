import Axios from 'axios'
import React, { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
// import { TextField } from "@material-ui/core";
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

import { Button, Box, TextField } from '@mui/material';
// import { styled } from '@mui/material/styles';

const New = () => {
  const dateRef = useRef('');
  const termRef = useRef('');

  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = {
      date: dateRef.current.value,
      term: termRef.current.value
    };
    console.log(formData);


    const {data:newQuestionnaire}= await Axios.post('http://localhost:3600/api/questionnaire/',
      {
        "owner":1,
        "date":dateRef.current.value,
        "term":termRef.current.value
      }
    );
    const id = newQuestionnaire.id_questionnaire;
    console.log(dateRef.current.value);
    navigate('/single?id='+id);
  };

  return <>
  <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div>
      <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div>
    </Box>
    <form onSubmit={handleSubmit}>
      <label>
        date:
          <input defaultValue='0001-01-01' type="date" ref={dateRef} required />
      </label>
      <label>
        term:
        <select ref={termRef} required >
          {/* <option> {null}</option> => to force the user select term*/}
          <option> מועד המבחן</option>
          <option value={'A'}>מועד א</option>
          <option value={'B'}>מועד ב</option>
          <option value={'C'}>מועד ג</option>
          <option value={'D'}>מועד ד</option>
          <option value={'E'}>מועד מיוחד</option>
          </select> <br/>
      </label>
        <Button type="submit">Submit</Button>
    </form>
  </>
}

export default New;
