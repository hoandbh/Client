import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";

const Single = () => {

  const [data, setData] = useState([{}]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  useEffect( () => { 
    const fetchData = async () => { 
      const {data:questionnaireInfo} = await Axios.get(`http://localhost:3600/api/questionnaire/full/${id}`)
      setData(questionnaireInfo);
      
    }
    fetchData();
  },[])
  
  //how to render an array??  ->
  //{data.map((qst, index) => <h4 key={index}>{qst}</h4>)}

  //how to render an object?? ->
  //Object.entries(theObject).map(([key, value]) => (
  //<li key={key}>
  //<strong>{key}: </strong>
  //{value}
  // </li>
  //))

  return <>
    <ul>
      {
      }
    </ul>
    <h1>single component {id}</h1>
  </>
}


export default Single;

// localhost:3600/api/questionnaire/full/29





