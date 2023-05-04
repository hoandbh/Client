import { useState, useEffect } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const Uploader = ({ setFile }) => {

  const [selectImage, setSelectImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const questionId = 1;
  // need to get the question id, but if it's new question??
  // what about the setFile?

  const onSelectImage = (e) => {
    setSelectImage(e.target.files[0]);
  };

  useEffect(()=>{
    handleUpload();
  },[selectImage])

  const handleUpload = () => {
    console.log('selectImage')
    console.log(selectImage)
    setError(null);
    if (selectImage) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", selectImage);
      axios
        .post(`http://localhost:3600/api/question/${questionId}/image`, formData)
        .then(({ data }) => {
          if (data?.name) {
            setFile(data.name);
          }
        })
        .catch((err) => {
          console.error("Error uploading image", err);
          setError("Error uploading image. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError("Please select an image to upload.");
    }
  };

  return (
    <>
      <div style={{ display: "inline-block", position: "relative" }}>
        {isLoading ? (
          <CircularProgress size={24} />
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddPhotoAlternateIcon />}
            onClick={() => document.getElementById("image-input").click()}
            disabled={isLoading}
            aria-label="Add Image"
          >
            Add Image
          </Button>
        )}
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
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}
    </>
  );
};

export default Uploader;
