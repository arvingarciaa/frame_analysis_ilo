import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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


export default function WholeADialog(props) {
  const [verticalForceDirection, setVerticalForceDirection] = React.useState("none");
  const [verticalForceLabel, setVerticalForceLabel] = React.useState("");
  const [horizontalForceDirection, setHorizontalForceDirection] = React.useState("none");
  const [horizontalForceLabel, setHorizontalForceLabel] = React.useState("");
  const [inclinedForceDirection, setInclinedForceDirection] = React.useState("none");
  const [inclinedForceAngle, setInclinedForceAngle] = React.useState(0);
  const [inclinedForceLabel, setInclinedForceLabel] = React.useState("");
  const [momentDirection, setMomentDirection] = React.useState("none");
  const [momentLabel, setMomentLabel] = React.useState("");
  
  const handleClose = () => {
    props.setOpenDialog(false); 
    props.savePoints([
      props.pointID, 
      props.section, 
      verticalForceDirection, 
      verticalForceLabel, 
      horizontalForceDirection, 
      horizontalForceLabel,
      inclinedForceDirection,
      inclinedForceAngle,
      inclinedForceLabel,
      momentDirection,
      momentLabel,
    ])
  };

  React.useEffect(() => {
    setVerticalForceDirection(props.pointsData[props.pointID]?.['verticalForceDirection']);
    setVerticalForceLabel(props.pointsData[props.pointID]?.['verticalForceLabel']);
    setHorizontalForceDirection(props.pointsData[props.pointID]?.['horizontalForceDirection']);
    setHorizontalForceLabel(props.pointsData[props.pointID]?.['horizontalForceLabel']);
    setInclinedForceDirection(props.pointsData[props.pointID]?.['inclinedForceDirection']);
    setInclinedForceAngle(props.pointsData[props.pointID]?.['inclinedForceAngle']);
    setInclinedForceLabel(props.pointsData[props.pointID]?.['inclinedForceLabel']);
    setMomentDirection(props.pointsData[props.pointID]?.['momentDirection']);
    setMomentLabel(props.pointsData[props.pointID]?.['momentLabel']);
}, [props.pointID, props.pointsData])

  return (
    <div>
      <Modal
        open={props?.openDialog}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Whole FBD Point {props.pointID}
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={{px: "40px"}}>
              <p>Force along X</p>
              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{mr: 1}}>
                  <Select
                    labelId="select-horizontal-force-direction-label"
                    id="select-horizontal-force-direction"
                    value={horizontalForceDirection}
                    onChange={(event) => setHorizontalForceDirection(event.target.value)}
                    defaultValue=""
                  >
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="left">Left</MenuItem>
                    <MenuItem value="right">Right</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <TextField 
                    id="outlined-basic" 
                    label="Label" 
                    variant={horizontalForceDirection === "none" ? "filled" : "outlined"} 
                    disabled={horizontalForceDirection === "none"}
                    value={horizontalForceLabel}
                    onChange={(event) => setHorizontalForceLabel(event.target.value)}
                  />
                </FormControl>
              </Box>
            </div>
            <div style={{ paddingTop: '25px' }}>
              Force along Y
              <Box sx={{ minWidth: 120, mt: 3 }}>
                <FormControl sx={{mr:1}}>
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    value={verticalForceDirection}
                    onChange={(event) => setVerticalForceDirection(event.target.value)}
                    defaultValue=""
                  >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="up">Up</MenuItem>
                  <MenuItem value="down">Down</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <TextField 
                    id="outlined-basic" 
                    label="Label" 
                    variant={verticalForceDirection === "none" ? "filled" : "outlined"} 
                    value={verticalForceLabel}
                    disabled={verticalForceDirection === "none"}
                    onChange={(event) => setVerticalForceLabel(event.target.value)}
                  />
                </FormControl>
              </Box>
            </div>
            <div style={{ paddingTop: '25px' }}>
              Inclined Force with Known Direction
              <Box sx={{ minWidth: 120, mt: 3, display: 'flex', flexWrap: 'wrap'  }}>
                <FormControl sx={{mr:1,  maxWidth:"140px"}}>
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    value={inclinedForceDirection}
                    onChange={(event) => setInclinedForceDirection(event.target.value)}
                  >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="ne">North East</MenuItem>
                  <MenuItem value="nw">North West</MenuItem>
                  <MenuItem value="se">South East</MenuItem>
                  <MenuItem value="sw">South West</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: '8rem', mr: 1 }} >
                  <TextField 
                    id="outlined-basic" 
                    label="Angle" 
                    variant={inclinedForceDirection === "none" ? "filled" : "outlined"} 
                    value={inclinedForceAngle}
                    disabled={inclinedForceDirection === "none"}
                    onChange={(event) => 
                      {
                        const regex = /^[0-9\b.]+$/;
                        if (event.target.value === "" || regex.test(event.target.value)) {
                          setInclinedForceAngle(event.target.value)
                        }
                      }
                    }
                  />
                </FormControl>
                <FormControl sx={{ width: '5rem'}}>
                  <TextField 
                    id="outlined-basic" 
                    label="Label" 
                    variant={inclinedForceDirection === "none" ? "filled" : "outlined"} 
                    value={inclinedForceLabel}
                    disabled={inclinedForceDirection === "none"}
                    onChange={(event) => setInclinedForceLabel(event.target.value)}
                  />
                </FormControl>
              </Box>
            </div>
            <div style={{ paddingTop: '25px' }}>
              Moment
              <Box sx={{ minWidth: 120, mt: 3 }}>
                <FormControl sx={{mr:1, maxWidth:"140px"}}>
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    value={momentDirection}
                    onChange={(event) => setMomentDirection(event.target.value)}
                    defaultValue=""
                  >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="counter_clockwise">Counter Clockwise</MenuItem>
                  <MenuItem value="clockwise">Clockwise</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <TextField 
                    id="outlined-basic" 
                    label="Magnitude or Label" 
                    variant={momentDirection === "none" ? "filled" : "outlined"} 
                    value={momentLabel}
                    disabled={momentDirection === "none"}
                    onChange={(event) => setMomentLabel(event.target.value)}
                  />
                </FormControl>
              </Box>
            </div>
          </div>
          <div style={{marginTop:"25px", textAlign:'right'}}>
            <Button onClick={handleClose} variant="contained">
              Save changes
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}