import { Button, Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
// import MessageIcon from '@mui/icons-material/Message';

const Navigation = () => {

  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return <>
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        centered
      >
        <Tab value = "one" label="הוספת מבחן" href="./Questionnaire/new" />
        <Tab label="עריכת מבחן קיים" href = "./Questionnaire/many"/>
      </Tabs>
    </Box>
    <br/>


  </>
}

export default Navigation;