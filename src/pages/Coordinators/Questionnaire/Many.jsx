import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";

const Many = () => {

    const [data, setData] = useState([{}]);
    const location = useLocation();


    const showQuestionnaires = async event => {
        event.preventDefault();
        const data = await Axios.get('http://localhost:3600/api/questionnaire');
        const d = await data.data;
        console.log(d);
        const qstrsItems = d.map((qstr) =>
            <li key={qstr.toString()}>
                {qstr}
            </li>
            );

            return <ul>{qstrsItems}</ul>

        // const qstnrLi = d.map((qstr)=>)
        // return (
        //     <ul>
        //         {d.map((qstr) =>
        //             <li key={qstr.id}>qstr</li>)}
        //     </ul>
        // )
    }
    function NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) =>
            <li key={number.toString()}>
                {number}
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }
    return <>
        many component

        <button onClick={showQuestionnaires}>See Test</button><br /><br />

    </>
}

export default Many;