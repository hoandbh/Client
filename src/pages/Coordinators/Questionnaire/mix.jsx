import { useNavigate, useParams } from 'react-router-dom';
import { React, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/authContext'
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from 'axios';

const MixQuestionnaire = () => {


    const { id } = useParams();

    const [questionnaireDetails, setQuestionnaireDetails] = useState({});


    const fetchData = async()=>{
        const { data: questionnaire} = await axios.get(`http://localhost:3600/api/questionnaire/${id}`);
        setQuestionnaireDetails(questionnaire);
        console.log(questionnaire)

    }

    useEffect(() => {
        fetchData();
      }, [])

    return <>

        <Box>
            <h1>hi</h1>
        </Box>


    </>
}


export default MixQuestionnaire;

