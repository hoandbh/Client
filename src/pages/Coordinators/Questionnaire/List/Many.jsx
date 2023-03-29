import { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Box, TextField , ListItem, List} from '@mui/material';


const showQstnrDetails = (props) => {

    // const qstnr = props.qstnr;
    var dateOnly = props.date.split('T')[0];
    return <>
        <p>Questionnaire number {props.id_questionnaire},  </p>
        <p>Teacher: {props.owner}  </p>
        <p>date: {dateOnly}  </p>
        <p>term: {props.term}  </p>

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
            <List>
                {qst.map(q => <ListItem >{q}</ListItem>)}
            </List>}
    </>
}

export default Many;