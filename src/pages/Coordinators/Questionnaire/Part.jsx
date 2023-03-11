import Question from "./Question";
import Axios from 'axios';

const Part = (props) => {

    const part = props.part;

    const addQuestion = async () => {
        //nested url?? 
        const res = await Axios.post('http://localhost:3600/api/question',
            {
                "part_in_questionnaire": 1,
                "content": "WWWWWWWWWWWWWWWWWWWW"
            }
        )
        props.toDelete()//just for re-render the parent
    }


return <>
    <p>headline: {part.headline}</p>
    <p>serial_number: {part.serial_number}</p>
    {part.questions_in_part && <ul>
        {part.questions_in_part.map((qst) => <li><Question question={qst} /></li>)}
    </ul>}
    <button onClick={addQuestion}>add question to part {part.serial_number}</button>
</>
}

export default Part;