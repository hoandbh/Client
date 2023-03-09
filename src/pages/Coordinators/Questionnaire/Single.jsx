import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";

const Single = () => {

  const [data, setData] = useState({});
  const [partsNum, setPartsNum] = useState(0);

  //
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  useEffect( () => { 
    const fetchData = async () => { 
      const {data} = await Axios.get(`http://localhost:3600/api/questionnaire/full/${id}`)
      const questionnaire = data[0]
      setData(questionnaire);
      setPartsNum(questionnaire.parts_in_questionnaire.length);
      console.log(questionnaire)
    }
    fetchData();
  },[])
  
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

  const viewQst = (qst) => {
    return <p>{qst.content}</p>
  }

  const viewPart = (part) => {
    return <>
      <p>headline: {part.headline}</p>
      <p>number: {part.number_in_questionnaire}</p>
      {part.questions_in_part && <ul>
        {part.questions_in_part.map((qst) => <li>{viewQst(qst)}</li>)}
      </ul>}
    </>
  }


  return <>
    <h1>single component {id}</h1>
    {data && <h4>date: {data.date}</h4>}
    {data && <h4>owner: {data.owner}</h4>}
    {data && data.parts_in_questionnaire && <ul>
      {data.parts_in_questionnaire.map((part) => <li>{viewPart(part)}</li>)}
    </ul>}
    <button>add part</button>
  </>
}


export default Single;

// localhost:3600/api/questionnaire/full/29





