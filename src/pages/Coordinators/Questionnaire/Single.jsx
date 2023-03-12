import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import Part from './Part';
import { Button, Typography} from '@mui/material';

const Single = () => {

  const location = useLocation();//maybe to get the id through props??
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [questionnaire, setQuestionnaire] = useState({});
  const [partsNum, setPartsNum] = useState(1);

  const fetchData = async () => {
    const { data } = await Axios.get(`http://localhost:3600/api/questionnaire/full/${id}`)
    const questionnaire = data[0]
    setQuestionnaire(questionnaire);
    setPartsNum(questionnaire.parts_in_questionnaire.length+1);
  }

  useEffect(() => {
    console.log(questionnaire.parts_in_questionnaire)
    fetchData();
  }, [])

  const addPart = async () => {
    const res = await Axios.post(`http://localhost:3600/api/questionnaire/${id}/parts`,
      //take the info from the user!!
      {
        "headline": `the headline of the part ${partsNum}`,
        "serial_number":partsNum,
        "mix":true
      }
    )
    fetchData();//do request to questionnaire full or just parts?
  }


  return <>
    <br/>
    <Typography variant="h4" gutterBottom>
      question id {id}
    </Typography>
    <Typography variant="h5" gutterBottom>
      {questionnaire && <p>date:{new Date(questionnaire.date).toLocaleDateString()}</p>}
    </Typography>
    <Typography variant="h5" gutterBottom>
      {questionnaire && <p>owner: {questionnaire.owner}</p>}
    </Typography>


   {questionnaire && questionnaire.parts_in_questionnaire && 
        <ul>
          {questionnaire.parts_in_questionnaire.map(part => <li> <Part part={part} /></li>)}
        </ul>
    }
    <Button  variant="contained" onClick={addPart} color='error'>add part</Button>

  </>
}

export default Single;

    {/* {questionnaire && questionnaire.parts_in_questionnaire && 
      <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {questionnaire.parts_in_questionnaire.map((part) => {
            return <><ListItem alignItems="center"><Part part={part} /></ListItem><Divider variant="inset" component="li" /></>
            })}
          </List>
      </>
    } */}

  //how to render an array??  ->
  //{data.map((qst, index) => <h4 key={index}>{qst}</h4>)}

  //how to render an object?? ->
  //<ul>
  //{
  //Object.entries(theObject).map(([key, value]) => (
  //<li key={key}>
  //<strong>{key}: </strong>
  //{value}
  // </li>
  //))
  //}
  //</ul>
 



