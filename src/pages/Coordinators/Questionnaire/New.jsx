// import {useState} from 'react';
// import {Link, useNavigate} from 'react-router-dom';
// import React from 'react';


// const New = () => {

//     const createQuestionnaire = ()=>{
//       alert("new test created, term: "+ term +" date: "+date);
        
//     }

//     const [date, setDate] = useState();
//     const  [term, setTerm] = useState('A');

//     //if the function does a few things we can also do it like this
//     // const dateChanger = event =>{
//     //   setDate(event.target.value);
//     //   console.log(this.date);
//     // }
//     //   const navigate = useNavigate();


//   return <>
//     <br/>
//     <p>בחרי תאריך למבחן</p><br/><br/>
//     <input  type={'date'}  onBlur = {e=>{setDate(e.target.value)}}></input><br/><br/>

//     <select name='terms' id='term-select' onBlur={e=>setTerm(e.target.value)}>
//       <option value={''}> מועד המבחן</option>
//       <option value={'A'}>מועד א</option>
//       <option value={'B'}>מועד ב</option>
//       <option value={'C'}>מועד ג</option>
//       <option value={'D'}>מועד ד</option>
//       <option value={'E'}>מועד מיוחד</option>

//     </select><br/> <br/>

//     <button onClick={createQuestionnaire}>create questionnaire</button>


//   </>
// }



import Axios from 'axios'
import React, { useRef } from 'react';

const New = () => {
  const dateRef = useRef('');
  const termRef = useRef('');

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

    const {data:newQst}= await Axios.post('http://localhost:3600/api/questionnaire/',
      {
        "owner":1,
        "date":dateRef.current.value
      }
    );
    console.log(newQst);
  };
  const showQuestionnaires = async event=>{
    event.preventDefault();
    const data = await Axios.get('http://localhost:3600/api/questionnaire');
    const d = await data.data;
    console.log(d);
  }
  return (
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
  );
}

export default New;
