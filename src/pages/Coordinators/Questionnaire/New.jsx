import Axios from 'axios'
import React, { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import { Button} from '@mui/material';

const New = () => {
  const dateRef = useRef('');
  const termRef = useRef('');

  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const {data:newQuestionnaire}= await Axios.post('http://localhost:3600/api/questionnaire/',
      {
        "owner":1,
        "date":dateRef.current.value,
        "term":termRef.current.value
      }
    );
    const id = newQuestionnaire.id_questionnaire;
    navigate('/single?id='+id);
  };

  return <>

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


