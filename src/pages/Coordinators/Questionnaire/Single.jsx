import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import Part from './Part';

const Single = () => {

  const location = useLocation();//maybe to get the id through props
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [data, setData] = useState({});
  const [partsNum, setPartsNum] = useState(0);

  const fetchData = async () => {
    const { data } = await Axios.get(`http://localhost:3600/api/questionnaire/full/${id}`)
    const questionnaire = data[0]
    setData(questionnaire);
    setPartsNum(questionnaire.parts_in_questionnaire.length);
    console.log(questionnaire);
  }

  useEffect(() => {
    fetchData();
  }, [])

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
 

  const addPart = async () => {
    const res = await Axios.post(`http://localhost:3600/api/questionnaire/${id}/parts`,
      //to take the info from the user
      {
        "headline":"the headline of the part B",
        "serial_number":partsNum,
        "mix":true
      }
    )
    fetchData();
  }


  return <>
    <h1>single component {id}</h1>
    {data && <h4>date: {new Date(data.date).toLocaleDateString()}</h4>}
    {data && <h4>owner: {data.owner}</h4>}
    {data && data.parts_in_questionnaire && <ul>
      {data.parts_in_questionnaire.map((part) => <li><Part part={part} /></li>)}
    </ul>}
    <button onClick={addPart}>add part</button>
  </>
}

export default Single;

// localhost:3600/api/questionnaire/full/29





