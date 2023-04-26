import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Chip, List, ListItem, ListItemButton } from '@mui/material';

const VersionsPdf = () => {

    const { Qid } = useParams();
    const [links, setLinks] = useState([]);

    useEffect(() => {
        fetchVersions();
    }, [])

    const fetchVersions = async() => {
        const {data: d} = await axios.get(`http://localhost:3600/api/downloads/versions/2`);
        console.log(d);
        setLinks(d);
    }
    const designLinks = (arr)=>{
        arr.forEach(element => {
            <Chip label="Chip Filled" />

        });

    }
    return (
        <>
        <div> Files Paths {Qid}</div>
        {links &&
        <List>
            {links.map(l =><ListItemButton>{l}</ListItemButton>)}
        </List>
        }
        </>
    )
}

export default VersionsPdf;