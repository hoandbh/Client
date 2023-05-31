import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useState } from 'react';

const PartForm = ({ open, handleAddPart, handleClose }) => {

  const [headline, setHeadline] = useState('');
  const [mix, setMix] = useState('true');

  return <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleAddPart(headline, mix);
      }}
    >
      <DialogTitle id="alert-dialog-title">{"Type the part name"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={`Part name`}
          type="text"
          fullWidth
          onChange={(e) => setHeadline(e.target.value)}
        />

        <RadioGroup value={mix} onChange={(e) => setMix(e.target.value)}>
          <FormControlLabel value="true" label="Mix Questions and Answers" control={<Radio />} />
          <FormControlLabel value="false" label="Mix Only Answers" control={<Radio />} />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleAddPart(headline, mix)} autoFocus>
          add
        </Button>
      </DialogActions>
    </Dialog></>
};

export default PartForm;
