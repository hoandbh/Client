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
      {/* {links &&
  <List>
  {links.map(l =><ListItemButton>{l}</ListItemButton>)}
  </List>
  } */}
      {/* <a href="http://localhost:3600//images/1cebf305-f1ab-43c6-b2e3-7d9b58aba60c_myw3schoolsimage.jpg" download>
        click to download
        <img src="http://localhost:3600//images/1cebf305-f1ab-43c6-b2e3-7d9b58aba60c_myw3schoolsimage.jpg" alt="W3Schools" width="104" height="142" />
      </a> */}
      
    </>
  )
}

export default DownloadPdfs;