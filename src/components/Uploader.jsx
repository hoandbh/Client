import { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const Uploader = ({ handleAddImage }) => {

  const [selectImage, setSelectImage] = useState();

  const onSelectImage = (e) => {
    setSelectImage(e.target.files[0]);
  };

  useEffect(() => {
    handleUpload();
  }, [selectImage])

  const handleUpload = () => {
    if (selectImage) {
      handleAddImage(selectImage);
    }
  };

  return (
    <>
      <div style={{ display: "inline-block", position: "relative" }}>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={() => document.getElementById("image-input").click()}
          aria-label="Add Image"
        >
          Add Image
        </Button>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          name="file"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
          onChange={onSelectImage}
        />
      </div>
    </>
  );
};

export default Uploader;
