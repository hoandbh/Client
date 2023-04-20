import { useEffect, useState } from "react";
import axios from "axios";
import Part from './Part';
import { Button, Typography, TextField} from '@mui/material';
import { useParams } from 'react-router-dom';

const Questionnaire = () => {

  const { id } = useParams();

  const [questionnaire, setQuestionnaire] = useState({});
  const [partsNum, setPartsNum] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [partHeadline, setPartHeadline] = useState('');
  
  const fetchData = async () => {    
    const { data:questionnaire } = await axios.get(`http://localhost:3600/api/questionnaire/full/${id}`);
    console.log(questionnaire)
    
    setQuestionnaire(questionnaire);
    setPartsNum(questionnaire.parts_in_questionnaire.length);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const addPart = async () => {
    setIsAdding(true);
  }

  const handleAddPart = async (e) => {
      if (e.key === 'Enter') {
        await axios.post(`http://localhost:3600/api/questionnaire/${id}/part`,
        {
          headline: partHeadline,
          serial_number:partsNum + 1,
          mix:true
        }
      )
      setIsAdding(false);
      setPartHeadline('');
      fetchData();
      }    
  }

  return <>
    <br/>
    <Typography variant="h4" gutterBottom>
      {questionnaire?.name}
    </Typography>
    <Typography variant="h4" gutterBottom>
      questionnaire in {questionnaire?.course?.name}
    </Typography>
    <Typography variant="h5" gutterBottom>
      {questionnaire && <p>exam date :{new Date(questionnaire.date).toLocaleDateString()}</p>}
    </Typography>

   {questionnaire && questionnaire.parts_in_questionnaire && 
        <ul>
          {questionnaire.parts_in_questionnaire.map((part, i) => <li> <Part key={i.toString()} part={part} /></li>)}
        </ul>
    }
    {isAdding ? 
      (
        <>
          <TextField
            label='part head line'
            onChange={e => setPartHeadline(e.target.value)}
            onKeyDown={handleAddPart}
          />
        </>

      )
      : 
      <Button  variant="contained" onClick={addPart} color='error'>+  add part</Button>
    }

  </>
}  

export default Questionnaire;



