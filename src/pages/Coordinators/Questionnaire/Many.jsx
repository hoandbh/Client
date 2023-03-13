import { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Box, TextField } from '@mui/material';


const showQstnrDetails = (props) => {

    // const qstnr = props.qstnr;
    console.log(props)
    return <>
        <p>id: {props.id_questionnaire}</p>
        <p>owner: {props.owner}</p>
        <p>date: {props.date}</p>
        <p>term: {props.term}</p>

    </>
}

const Many = () => {

    const [qst, setQst] = useState([]);
    // const [qsntrByOwner, setQstnrByOwner] = useState([]);

    const showQuestionnaires = async () => {
        const { data: d } = await Axios.get('http://localhost:3600/api/questionnaire/owner/131');
        const qstInfo = d.map(qst => showQstnrDetails(qst));
        setQst(qstInfo);
    }
    const showAllQuestionnaires = async () => {
        const { data: d } = await Axios.get('http://localhost:3600/api/questionnaire');
        // console.log(d);
        const qstInfo = d.map(qst => showQstnrDetails(qst));
        setQst(qstInfo);
    }


    useEffect(() => {
        showQuestionnaires();
    }, [])

    return <>
        many component

        <button onClick={showAllQuestionnaires}>See All</button><br /><br />
        {/* {qst &&
            <ul>
                {qst.map(q => <li>{q}</li>)}
            </ul>
        } */}
        {qst &&
            <ul>
                {qst.map(q => <li>{q}</li>)}
            </ul>}
    </>
}

export default Many;