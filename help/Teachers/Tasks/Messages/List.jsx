import { Accordion } from "@mui/material";


const MessagesList = () =>{

    const messageTry1 = "please finish your task";
    const messageTry2 = "please finish your task";
    const messageTry3 = "please finish your task";
    return<>
    <Accordion>{messageTry1}</Accordion>
    <Accordion>{messageTry2}</Accordion>
    <Accordion>{messageTry3}</Accordion>
    </>

}

export default MessagesList;