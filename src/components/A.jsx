
import axios from 'axios';

const A = () => {


    const handleDownload = () => {
        axios
          .get('http://localhost:3600/download-folder', { responseType: 'blob' })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'files.zip');
            document.body.appendChild(link);
            link.click();
          })
          .catch((error) => {
            // Handle the error
            console.error(error);
          });
      };
 

  return (
    <>
    <button onClick={handleDownload}>
      Download Folder
    </button>
    </>
  )
}

export default A;