import { useNavigate, useParams } from 'react-router-dom';
import { React, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/authContext'
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from 'axios';
import { Card, Fab, Paper, TextField } from '@mui/material';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { spacing } from '@mui/system';


const MixQuestionnaire = () => {


    const { id } = useParams();

    const [questionnaireDetails, setQuestionnaireDetails] = useState({});


    const fetchData = async () => {
        const { data: questionnaire } = await axios.get(`http://localhost:3600/api/questionnaire/${id}`);
        setQuestionnaireDetails(questionnaire);
        console.log(questionnaire)

    }

    useEffect(() => {
        fetchData();
    }, [])

    return <>

        <Paper sx={{ '& > :not(style)': { m: 'auto' } }}>

            <h1> Test Mixing </h1><br />
            <Fab variant="extended">
                <ContentPasteSearchIcon sx={{ mr: 1 }} />
                View File Of Master Questionnaire
            </Fab>

        </Paper>

        <Card>
            <h3>Finish And Mix
            </h3>
            <TextField
          id="outlined-number"
          label="Number of Versions"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/><br/>
        <Fab variant="extended" color='primary'>
            Complete And Create Versions
            </Fab>
        </Card>




    </>
}


export default MixQuestionnaire;

