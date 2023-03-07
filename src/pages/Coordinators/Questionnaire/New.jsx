import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import React from 'react';


const New = () => {

    const createQuestionnaire = ()=>{
      alert("new test created, term: "+ term +" date: "+date);
        
    }

    const [date, setDate] = useState();
    const  [term, setTerm] = useState('A');

    //if the function does a few things we can also do it like this
    // const dateChanger = event =>{
    //   setDate(event.target.value);
    //   console.log(this.date);
    // }
    //   const navigate = useNavigate();


  return <>
    <br/>
    <p>בחרי תאריך למבחן</p><br/><br/>
    <input  type={'date'}  onBlur = {e=>{setDate(e.target.value)}}></input><br/><br/>

    <select name='terms' id='term-select' onBlur={e=>setTerm(e.target.value)}>
      <option value={''}> מועד המבחן</option>
      <option value={'A'}>מועד א</option>
      <option value={'B'}>מועד ב</option>
      <option value={'C'}>מועד ג</option>
      <option value={'D'}>מועד ד</option>
      <option value={'E'}>מועד מיוחד</option>

    </select><br/> <br/>

    <button onClick={createQuestionnaire}>create questionnaire</button>


  </>
}

export default New;

