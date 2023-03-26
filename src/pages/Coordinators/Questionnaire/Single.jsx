import { useEffect, useState } from "react";
import Axios from "axios";
import Part from './Part';
import { Button, Typography} from '@mui/material';
import { useParams } from 'react-router-dom';

const Questionnaire = () => {

  const { id } = useParams();

  const [questionnaire, setQuestionnaire] = useState({});
  const [partsNum, setPartsNum] = useState(1);

  const fetchData = async () => {
    //do request to questionnaire full or just parts?
    const { data:questionnaire } = await Axios.get(`http://localhost:3600/api/questionnaire/full/${id}`);
    setQuestionnaire(questionnaire);
    setPartsNum(questionnaire.parts_in_questionnaire.length + 1);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const addPart = async () => {
    await Axios.post(`http://localhost:3600/api/questionnaire/${id}/part`,
      //take the info from the user!!
      {
        "headline": `the headline of the part ${partsNum}`,
        "serial_number":partsNum,
        "mix":true
      }
    )
    fetchData();
  }


  return <>
    <br/>
    <Typography variant="h4" gutterBottom>
      questionnaire id {id}
    </Typography>
    <Typography variant="h5" gutterBottom>
      {questionnaire && <p>date:{new Date(questionnaire.date).toLocaleDateString()}</p>}
    </Typography>
    <Typography variant="h5" gutterBottom>
      {questionnaire && <p>owner: {questionnaire.owner}</p>}
    </Typography>
   {questionnaire && questionnaire.parts_in_questionnaire && 
        <ul>
          {questionnaire.parts_in_questionnaire.map((part, i) => <li key={i.toString()}> <Part part={part} /></li>)}
        </ul>
    }
    <Button  variant="contained" onClick={addPart} color='error'>add part</Button>

  </>
}  

export default Questionnaire;



