import Question from "./Question";
import Axios from 'axios';
import { useState } from "react";

const Part = (props) => {

    const part = props.part;
    const [questions,setQuestions] = useState(part.questions_in_part);
    
    const fetchQuestions = async () => {
      const {data} = await Axios.get(`http://localhost:3600/api/question/ofPart/${part.id_part}`);
      setQuestions(data);
    }


    const addQuestion = async () => {
      //nested url?? 
      //questionnaire/questionnaireId/part/partId/question
      const res = await Axios.post('http://localhost:3600/api/question',
        {
            "part_in_questionnaire": part.id_part,
            "content": "WWWWWWWWWWWWWWWWWWWW"
        }
      )
      fetchQuestions();
    }
    console.log(part)

return <>
    <p>headline: {part.headline}</p>
    <p>serial_number: {part.serial_number}</p>
    {questions && <ul>
        {questions.map((qst) => <li><Question question={qst} /></li>)}
    </ul>}
    <button onClick={addQuestion}>add question to part {part.serial_number}</button>
</>
}

export default Part;