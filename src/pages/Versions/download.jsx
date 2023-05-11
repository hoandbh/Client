import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Chip, List, ListItemButton, CardMedia } from '@mui/material';

const DownloadPdfs = () => {

  const { Qid } = useParams();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchVersions();
  }, [])

  const fetchVersions = async () => {
    const { data: d } = await axios.get(`http://localhost:3600/api/downloads/versions/2`);
    console.log(d);
    setLinks(d);
  }
  const designLinks = (arr) => {
    arr.forEach(element => {
      <Chip label="Chip Filled" />

    });

  }
  return (
    <>
      <div> Files Paths {Qid}</div>
      <div>
        <a href="http://localhost:3600/files/wow.docx" download="wow.docx">Download File</a>
      </div>      
    </>
  )
}

export default DownloadPdfs;