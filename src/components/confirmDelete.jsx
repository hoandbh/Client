import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
const ConfirmDialog = (props) => {
    const { title, cCode, open, setOpen, onConfirm, cName, course } = props;
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby='confirm-delete-dialog'
        >
            {/* <DialogTitle id='confirm-delete-dialog'>{"HHHIII"}</DialogTitle> */}
            <DialogContent>{"Are you sure you want to erase this course?"}</DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    onClick={() => {
                        setOpen(false);
                    }}
                    color="secondary"
                >
                    No 
                    </Button>
                <Button
                    variant='contained'
                    onClick={() => {
                        setOpen(false);
                        onConfirm(course.id)
                        // handledeleteCourse(c.id);
                    }}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default ConfirmDialog;