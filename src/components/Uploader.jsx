// import { useState, useEffect } from "react";
// import { Button, Typography } from "@mui/material";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

// const Uploader = ({ setFile }) => {

//   const [selectImage, setSelectImage] = useState('');
//   const [selected, setSelected] = useState(false);

//   const onSelectImage = (e) => {
//     setSelectImage(e.target.files[0]);
//   };

//   useEffect(() => {
//     handleUpload();
//   }, [selectImage])

//   const handleUpload = () => {
//     if (selectImage) {
//       const formData = new FormData();
//       formData.append("file", selectImage);
//       setFile(formData);
//       setSelected(true);
//     }
//   };

//   return (

//     selected ?
//       <Typography variant="body1">
//         {`Selected image: ${selectImage.name}`}
//       </Typography>
//       :
//       (
//         <div style={{ display: "inline-block", position: "relative" }} >
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddPhotoAlternateIcon />}
//             onClick={() => document.getElementById("image-input").click()}
//             aria-label="Add Image"
//           >
//             Add Image
//           </Button>
//           <input
//             id="image-input"
//             type="file"
//             accept="image/*"
//             name="file"
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               opacity: 0,
//               width: "100%",
//               height: "100%",
//               cursor: "pointer",
//             }}
//             onChange={onSelectImage}
//           />
//         </div >
//       )

//   );
// };

// export default Uploader;



const Uploader = () => {

  return (<>
      <div>
        <a href="http://localhost:3600/files/wow.docx" download="wow.docx">Download File</a>
      </div>
  </>
  )
}
export default Uploader;