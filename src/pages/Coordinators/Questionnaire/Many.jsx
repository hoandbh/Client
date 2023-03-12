import {useState } from "react";
import Axios from "axios";


const Many = () => {

    const [qst, setQst] = useState([]);

    const showQuestionnaires = async event => {
        const {data:d} = await Axios.get('http://localhost:3600/api/questionnaire');
        const qstInfo = d.map(qst => qst.date);
        setQst(qstInfo);
    }

    return <>
        many component
        <button onClick={showQuestionnaires}>See Test</button><br /><br />
        {qst && 
            <ul>
                {qst.map(q => <li>{q}</li>)}
            </ul>
        }
    </>
}

export default Many;