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


export default function DiagramHelp(props) {
  
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
          <div style={{
            display: 'flex', 
            justifyContent: 'space-between',
          }}>
            <h2 id="modal-modal-title" style={{
              margin: 0,
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              fontWeight: '500',
              fontSize: '1.25rem',
              lineHeight: '1.6',
              letterSpacing: '0.0075em',
            }}>
              How to fill up the forces
            </h2>
            <div style={{textAlign:'right'}}>
                <Button onClick={handleClose} style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  backgroundColor: 'inherit',
                  whiteSpace: 'nowrap',
                  minWidth: '15px',
                  fontSize: '20px',
                  height: '30px',
                }}>
                  &times;
                </Button>
              </div>
          </div>
          <div id="modal-modal-description" style={{ marginTop: 15 }}>
            <Typography id="modal-modal-title" variant="body2">
              <h3 style={{ marginBottom: 6 }}>Instructions:</h3>
              <ol>
                <li>Click on the points in the diagram to input the forces.</li>
                <li>
                  Upon clicking on SAVE CHANGES, the shade on the point will turn green 
                  if your answer is correct. Otherwise, you should change your forces.
                </li>
              </ol>
              <h3 style={{ marginTop: 15 , marginBottom: 6 }}>Tips:</h3>
              <ul>
                <li>
                  For forces in pin supports, initial assumptions should be horizontal 
                  force to the right and vertical force upwards.
                </li>
                <li>
                  For forces in two-force members, initially assume forces to be tensile.
                </li>
                <li>
                  As you create diagrams, solve for forces in that diagram before moving 
                  to the next diagram.
                </li>
                <li>
                  Once a direction of a force is determined in a previous diagram, use 
                  that correct direction in the next diagram to get a correct prompt.
                </li>

              </ul>
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}