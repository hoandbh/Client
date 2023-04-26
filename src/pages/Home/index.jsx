import React from 'react';
import { Typography } from  '@mui/material';

const Home = () => {
  return (
  <div>
    <Typography variant="h4" component="h1" gutterBottom>
    Welcome to the Questionnaire Creator!
    </Typography>
    <Typography variant="body1" gutterBottom>
    As a coordinator, you can use this site to easily create multiple choice questionnaires for your students.
    </Typography>
    <Typography variant="body1" gutterBottom>
    To get started, click on the "New Questionnaire" button above.
    </Typography>
  </div>
  );
};

export default Home;