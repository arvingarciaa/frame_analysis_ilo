import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AnswersHelp(props) {
  
  const handleClose = () => {
    props.setOpenDialog(false); 
  };

  return (
    <div>
      <Modal
        open={props?.openDialog}
        onClose={handleClose}
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            How to input equations
          </Typography>
          <div id="modal-modal-description" style={{ marginTop: 15 }}>
            <Typography id="modal-modal-title" variant="body2">
              <h3 style={{ marginBottom: 6 }}>Instructions to input equations:</h3>
              <ol>
                <li>
                  You will be asked for the sign, component, and moment arm of a force. 
                  If the force is vertical or horizontal, indicate 1 as the component. 
                  If the force is inclined, indicate component as cosine or sine of an 
                  angle.
                </li>
                <li>
                  Use five decimal places for all inputs.
                </li>
                <li>
                  For the component, once you choose cos/sin, you will be prompted to input 
                  an angle. The angle used should always be with respect to the x-axis.
                </li>
                <li>
                  Upon clicking on CHECK ANSWERS, the box encircling your input will remain 
                  grey/black if your answer is correct and will turn red if your input is wrong.
                </li>
              </ol>
              <h3 style={{ marginTop: 15 , marginBottom: 6 }}>Instructions to input answers:</h3>
              <ol>
                <li>
                  Use five decimal places (regular rounding off rules) for intermediate answers, 
                  except for whole number answers.
                </li>
              </ol>
            </Typography>
          </div>
          <div style={{marginTop:"25px", textAlign:'right'}}>
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}