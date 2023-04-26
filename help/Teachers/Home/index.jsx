import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Teacher = () => {



  const navigate = useNavigate();

  const changeToMessages =  () => {
    navigate('/messages')    
  }

  return <>
    <Paper >
      <p onClick={
        ()=>{
          
          console.log("make this pass to a different component")
        }
      }>
        צפיה במטלות
      </p>


    </Paper>
    <Paper>
      <p>
        מבחני תלמידות
      </p>
    </Paper>
  </>
}

export default Teacher;