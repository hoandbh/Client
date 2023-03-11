import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";


const Many = () => {

    const [qstnrs, setQstnrs] = useState({});
    const location = useLocation();


    const showQuestionnaires = async event => {
        event.preventDefault();
        console.log("before")
        console.log(qstnrs)
        const data = await Axios.get('http://localhost:3600/api/questionnaire');
        const d = await data.data;
        // console.log(d);
        const qstrsItems = d.map((qstr) =>
            <li key={qstr.id_questionnaire}>
                {qstr}
            </li>
            );
        setQstnrs(d);
        console.log("afger");
        console.log(qstnrs)

            // const q = <ul>{qstrsItems}</ul>;


        // const qstnrLi = d.map((qstr)=>)
        // return (
        //     <ul>
        //         {d.map((qstr) =>
        //             <li key={qstr.id}>qstr</li>)}
        //     </ul>
        // )
    }


    const viewQuestionnaires = (qst) =>{
        return <>
            <p>Questionnaire Id: {qst.id_questionnaire}</p> 
            <p>Owner: {qst.owner}</p>
            
        </>
    }
 
    return <>
        many component
        <button onClick={showQuestionnaires}>See Test</button><br /><br />
        {qstnrs && <ul> {qstnrs.map((qstn) => <li>{viewQuestionnaires(qstn)}</li>)}</ul>}

    </>
}

export default Many;