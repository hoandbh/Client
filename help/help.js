import { useState } from "react"
import axios from "axios"
import { Button } from "@mui/material";

const Uploader = ({ file, setFile, label }) => {

  const [image, setImage] = useState('');

  const handleAdd = async () => {
    console.log(image);
    try {
      const picture = await axios.post(`http://localhost:3600/api/question/1/image`, image, { headers: { "Content-Type": "multipart/form-data" } })
      console.log(picture);
      const r = await picture.json();
      console.log(r);
      // const picture = await axios.post(`http://localhost:3600/images`, image, { headers: { 'Authorization': 'Bearer ' + token, "Content-Type": "multipart/form-data" } })
    }
    catch (err){
      console.log(err);
    }
  }

  const onSelectFile = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <>
      <label htmlFor="file"> {label ? label : "File"} </label>
      <input accept="image/*" type="file" onChange={onSelectFile} name="file" />
      <Button onClick={handleAdd}>add</Button>
    </>
  )
};

export default Uploader