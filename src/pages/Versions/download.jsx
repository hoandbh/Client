// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { Button } from '@mui/material';
// import sendAuthenticatedRequest from '../../utils/api';

// const DownloadPdfs = () => {

//   const { qId } = useParams();

//   const handleDownload = async () => {
//     try { 
//       const { data } = await sendAuthenticatedRequest(`http://localhost:3600/api/download-folder/${qId}`,'GET', { responseType: 'blob' })
//       const url = window.URL.createObjectURL(new Blob([data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `files.zip`);// to change the name
//       document.body.appendChild(link);
//       link.click();

//     }
//     catch (error) {
//       console.error(error);
//     }
//   }

// return (
//   <>
//     <br/> <br/>
//     <Button 
//     onClick={handleDownload}
//     sx={{
//       fontSize:'small'
//     }}
//     >
//       Download Vesrsions of questionnaire {qId}
//     </Button>
//   </>
// )
// }

// export default DownloadPdfs;


import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import sendAuthenticatedRequest from '../../utils/api';
import axios from 'axios'
const DownloadPdfs = () => {

  const { qId } = useParams();

  const handleDownload = async () => {
    try { 
      const response = await axios.get(`http://localhost:3600/api/download-folder/${qId}`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'folder.zip';
      link.click();
    }
    catch (error) {
      console.error(error);
    }
  }

return (
  <>
    <br/> <br/>
    <Button 
    onClick={handleDownload}
    sx={{
      fontSize:'small'
    }}
    >
      Download Vesrsions of questionnaire {qId}
    </Button>
  </>
)
}

export default DownloadPdfs;
