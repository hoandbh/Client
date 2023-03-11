import Axios from 'axios'
import React, { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import Single from './Single'
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
    // axios get example
    // const data = await Axios.get('http://localhost:3600/api/course/');
    // const d = await data.data;
    // console.log(d);

    const {data:newQuestionnaire}= await Axios.post('http://localhost:3600/api/questionnaire/',
      {
        "owner":1,
        "date":dateRef.current.value
      }
    );
    const id = newQuestionnaire.id_questionnaire;
    console.log(newQuestionnaire);
    navigate('/single?id='+id);
  };

  const showQuestionnaires = async event=>{
    event.preventDefault();
    const data = await Axios.get('http://localhost:3600/api/questionnaire');
    const d = await data.data;
    console.log(d);
    }
  return <>
  
    <form onSubmit={handleSubmit}>
      <label>
        date:
          <input type="date" ref={dateRef} required />
      </label>
      <label>
        term:
        <select ref={termRef} required >
          <option> מועד המבחן</option>
          <option value={'A'}>מועד א</option>
          <option value={'B'}>מועד ב</option>
          <option value={'C'}>מועד ג</option>
          <option value={'D'}>מועד ד</option>
          <option value={'E'}>מועד מיוחד</option>
          </select> <br/>
      </label>
        <button type="submit">Submit</button>
        <button onClick={showQuestionnaires}>See Test</button>
    </form>
  </>
}

export default New;
