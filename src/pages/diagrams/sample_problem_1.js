import React from 'react'
import Layout from '../../components/Layout'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Typography from '@mui/material/Typography';
import StepButton from '@mui/material/StepButton';
import CheckIcon from '@mui/icons-material/Check';
import * as styles from "../../styles/diagram.module.css"  
import ImageMapper from 'react-img-mapper';
import DetailsDialog from './dialogs/details_dialog'

const steps = [
  'Determine 2-Force Members',
  'Whole FBD',
  'Diagrams of ID and CG',
  'Diagram of ABCDE with Pulleys',
  'Final Answers',
];

export default function SampleProblem1() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [revealMembers, setRevealMembers] = React.useState(false);
  const [revealFinalAnswer, setRevealFinalAnswer] = React.useState(false);
  const [openDetailsDialog, setDetailsDialog] = React.useState(false);
  const [detailsDialogSRC, setDetailsDialogSRC] = React.useState('');
  const [detailsDialogTitle, setDetailsDialogTitle] = React.useState('');

  
  const totalSteps = () => {
    return steps.length;
  };
  
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setRevealMembers(false);
    setRevealFinalAnswer(false);
  };

  const handleMembersReveal = () => {
    setRevealMembers(true);
  }

  const handleFinalAnswerReveal = () => {
    setRevealFinalAnswer(true);
  }

  const handleOpenDetailsDialog = () => {
    switch(activeStep){
      case 1:
        setDetailsDialogTitle('Whole FBD');
        setDetailsDialogSRC('SP1_wholeFBD_momentH.gif');
        break;
      case 3:
        setDetailsDialogTitle('ABCDE with Pulleys');
        setDetailsDialogSRC('SP1_ABCDE_MomentA.gif');
        break;
      default:
        break;
    }
    setDetailsDialog(true);
  };

  const closeDialogs = () => {
    setDetailsDialog(false);
  }

  const MAP = {
    name: "my-map",
    areas: [
      {
        id: 0,
        title: "ID",
        name: "2",
        shape: "rect",
        coords: [
          387,
          101,
          409,
          370,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
      },
      {
        id: 1,
        title: "CG",
        name: "2",
        shape: "poly",
        coords: [
          333,
          102,
          352,
          102,
          352,
          288,
          106,
          288,
          106,
          269,
          333,
          269,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
      },
      {
        id: 2,
        title: "ABCDE",
        name: "3",
        shape: "poly",
        coords: [
          107, 103,
          190, 103,
          190, 79,
          495, 79,
          495, 180,
          482, 180,
          482, 146,
          432, 146,
          432, 129,
          255, 129,
          255, 146,
          190, 146,
          190, 125,
          107, 125
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
      },
      {
        id: 3,
        title: "Whole FBD",
        name: "1",
        shape: "poly",
        coords: [
          107, 93,
          190, 93,
          190, 80,
          497, 80,
          497, 151,
          420, 151,
          420, 360,
          107, 360
        ],
        polygon: [
          [126, 106],
          [220, 106],
          [220, 92],
          [574, 92],
          [574, 171],
          [499, 171],
          [499, 423],
          [124, 423],
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
      },
      
    ]
  };

  const selectDiagram = (area) => {
    console.log(area);
    setActiveStep(Number(area.name))
  }

  let diagram;
  let notes;
  if(activeStep === 0){
    notes = 
      <div style={{padding: "0 20px"}}>
        <h4>Are there any 2-force members?</h4>
        <p>
          <Button 
            variant="outlined" 
            style={{display: revealMembers ? 'none' : '', width: '100%'}} 
            onClick={(handleMembersReveal)}
          > 
            Reveal Answer
          </Button>
          <span style={{
            opacity: revealMembers ? 1 : 0,
            transition: 'visibility 0s, opacity 0.5s linear',
            visibility: revealMembers ? 'visible' : 'hidden',
            padding: 0,
          }}>
            Yes, ID and CG are 2-force members 
            because they only have connections and forces in points I and D 
            for member ID and C and G for member CG.
          </span>
        </p>
      </div>;
    diagram = 
      <div style={{textAlign: 'center'}}>
        <ImageMapper 
          src = '/sample_1_whole_fbd.jpg' 
          map = {MAP} 
          width = {600}
          onClick = {(area) => selectDiagram(area)} 
        />
      
      </div>;
  } else if(activeStep === 1) {
    notes = 
      <div style={{textAlign: 'center', padding: "0 20px"}}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2>Equations: </h2>
          <Button
            color="warning"
            disabled={activeStep === 0}
            onClick={handleOpenDetailsDialog}
            variant="contained"
          >
            More Details
          </Button>
        </div>
        <img src="/sample_1_fbd_equation.jpg" style={{ maxHeight: "320px"}} alt="FBD Equations"></img>
      </div>;
    diagram = <div style={{textAlign: 'center'}}><img src="/sample_1_whole_fbd_diagram.png" style={{ maxHeight: "450px", width:"100%"}} alt="Whole FBD" /></div>;
  } else if(activeStep === 2){
    notes = 
      <div style={{padding: "12px 20px"}}>
        <ul>
          <li style={{marginBottom: "12px"}}>Both forces in the 2-f members are initially assumed to be compressive.</li>
          <li>Even if the support at point I is a pin support, we did not put a force along x because we already analyzed ID to be a 2-f member and the force has a known direction.</li>
        </ul>      
      </div>;
    diagram = <div style={{textAlign: 'center'}}><img src="/sample_1_id_dg.png" style={{ maxHeight: "450px", width:"100%"}} alt="ABCDE Diagram"></img></div>;
  } else if(activeStep === 3){
    notes = 
      <div style={{padding: "12px 20px"}}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2>Equations: </h2>
          <Button
            color="warning"
            disabled={activeStep === 0}
            onClick={handleOpenDetailsDialog}
            variant="contained"
          >
            More Details
          </Button>
        </div>
        <img src="/sample_1_abcde_equation.jpg" style={{ width: "100%"}} alt="ABCDE Equations"></img>
      </div>;
    diagram = <div style={{textAlign: 'center'}}><img src="/sample_1_abcde.png" style={{ maxHeight: "450px", width:"100%"}} alt="ID and DG Diagram"></img></div>;
  }
  else{
    notes = 
      <div style={{padding: "0 20px"}}>
        <p style={{margin:0}}>
          <Button variant="outlined" style={{display: revealFinalAnswer ? 'none' : ''}} onClick={(handleFinalAnswerReveal)}> Reveal Answer</Button>
          <span style={{
            opacity: revealFinalAnswer ? 1 : 0,
            transition: 'visibility 0s, opacity 0.5s linear',
            visibility: revealFinalAnswer ? 'visible' : 'hidden',
            padding: 0,
          }}>
            <span className={styles.answer}>Hx</span>  = 0 <br/>
            <span className={styles.answer}>Hy</span> = 159.8804 N, ↓ <br/>
            <span className={styles.answer}>FCG</span> = 244.0201 N, C <br/>
            <span className={styles.answer}>Ax</span> = 192.6178 N, → <br/>
            <span className={styles.answer}>Ay</span> = 180.6057 N, ↑ <br/>
            Directions for Ax and Ay are reversed because the question requires forces felt by AFGH, not ABCDE.
          </span>
        </p>
      </div>;
    diagram = <div style={{textAlign: 'center'}}><img src="/sample_1_whole_fbd.jpg" style={{ maxHeight: "450px", width:"100%"}} alt="Whole FBD"></img></div>;
  }




  return (
    <Layout>
      <section>
        <DetailsDialog 
          openDialog={openDetailsDialog} 
          closeDialog={closeDialogs} 
          setOpenDialog={setDetailsDialog}
          title={detailsDialogTitle}
          src={detailsDialogSRC}
        />
        <h2 style={{marginBottom: "5px"}}>Sample Problem 1</h2>
        <h3 style={{fontWeight: 400}}>For the frame shown below, determine the forces on member AFGH.</h3>
        <Box sx={{ width: '100%', marginTop: "40px", marginBottom: "40px"}}>
          <Stepper nonLinear activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]} 
                sx={{'& .MuiStepLabel-root .Mui-completed': {
                  color: 'green'
                }}}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Grid container spacing={2}>
          <Grid item lg={6} md={12} sx={{display: "grid", placeContent: "center"}}>
            {diagram}
          </Grid>
          <Grid item lg={6} md={12}>
            <div style={{  
              border: '2px solid grey', 
              minHeight: "450px", 
              width: "100%", 
              backgroundColor:"#E7EBF0", 
              zIndex: '3', 
              position: "relative",
            }}>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you're finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span style={{  textAlign: 'center' }}>
                    <Typography variant='h6' sx={{ mt: 2, mb: 1, py: 1, color: completed[activeStep] ? '#5EBA7D' : ''}}>
                      { steps[activeStep] } { completed[activeStep] ? (<CheckIcon />) : '' } 
                    </Typography>
                  </span>
                  { notes }
                  <Box sx={{
                    justifyContent: 'center', 
                    display: 'flex', 
                    mb: 3, 
                    mt: 3,
                    padding: "0 20px",
                  }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      variant="outlined"
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button variant="contained" onClick={handleComplete}>
                      Next
                    </Button>
                   
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Grid>
        </Grid>
      </section>
    </Layout>
  )
}
