// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { Chip } from '@mui/material';

// const DownloadPdfs = () => {

//   const { qId } = useParams();
//   const [links, setLinks] = useState([]);
//   const [arr, setArr] = useState([]);

//   useEffect(() => {
//     fetchVersions();
//   }, [])

//   useEffect(() => {
//     if (links) {
//       var x = '';
//       console.log(links)
//       const a = links.map((l) => {
//         if (l) {
//           x = l.split('./files/')[1];
//           console.log('x')
//           console.log(x)

//           return <><a href={`http://localhost:3600/files/readyVersions/${x}`} download={x}>Download File</a><br /></>
//         }

//       });
//       setArr(a);
//     }
//   }, [links])

//   const fetchVersions = async () => {
//     const { data } = await axios.get(`http://localhost:3600/api/downloads/versions/${qId}`);
//     setLinks(data);
//   }

//   return (
//     <>
//       <div> questionnaire id {qId}</div>
//       <div>
//         {/* <a href="http://localhost:3600/files/wow.docx" download="wow.docx">Download File</a> */}
//         {arr}
//       </div>
//     </>
//   )
// }

// export default DownloadPdfs;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Chip } from '@mui/material';

const DownloadPdfs = () => {

  const { qId } = useParams();
  // const [links, setLinks] = useState([]);
  // const [arr, setArr] = useState([]);

  // useEffect(() => {
  //   fetchVersions();
  // }, [])

  // useEffect(() => {
  //   if (links) {
  //     var x = '';
  //     console.log(links)
  //     const a = links.map((l) => {
  //       if (l) {
  //         x = l.split('./files/')[1];
  //         console.log('x')
  //         console.log(x)

  //         return <><a href={`http://localhost:3600/files/readyVersions/${x}`} download={x}>Download File</a><br /></>
  //       }

  //     });
  //     setArr(a);
  //   }
  // }, [links])

  // const fetchVersions = async () => {
  //   const { data } = await axios.get(`http://localhost:3600/api/downloads/versions/${qId}`);
  //   setLinks(data);
  // }

  const handleDownload = async () => {
    try { 
      const { data } = await axios.get(`http://localhost:3600/api/download-folder/${qId}`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `files.zip`);// to change the name
      document.body.appendChild(link);
      link.click();

    }
    catch (error) {
      console.error(error);
    }
  }

return (
  <>
    <div> questionnaire id {qId}</div>
    <button onClick={handleDownload}>
      Download Vesrsions
    </button>
  </>
)
}

export default DownloadPdfs;
