import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
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
          <div style={{
            display: 'flex', 
            justifyContent: 'space-between',
          }}>
            <h2 id="modal-modal-title" style={{
              margin: 0,
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              fontWeight: '500',
              fontSize: '1.5rem',
              lineHeight: '1.6',
              letterSpacing: '0.0075em',
            }}>
              {props.title ? props.title : ''}
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
            <img src={`/${props.src}`} style={{ width: "100%"}} alt="Details Gif"></img>
          </div>
        </Box>
      </Modal>
    </div>
  );
}