import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const JobDetailsDialog = ({ open, handleClose, jobDetails }) => {
  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: '20px' } }}>
      <DialogTitle>
      <Typography variant="h6" align="center" fontWeight="bold">
          Job Description
        </Typography>
      </DialogTitle>
      <DialogContent style={{ maxHeight: '300px', overflowY: 'scroll' }}>
      <Typography variant="h8" align="center" fontWeight="bold">
          About Company:
        </Typography>
        <Typography variant="body1">{jobDetails}{jobDetails}</Typography>                
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobDetailsDialog;
