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
import ImageMapper from 'react-img-mapper';

const steps = [
  'Determine 2-Force Members',
  'Whole FBD',
  'Diagram of Member BD',
  'Diagram of Member AD With Pin D Attached',
  'Diagram of Member AD Without Pin D',
  'Diagram of Pin D',
  'Diagram of Member ABC'
];

export default function SampleProblem1() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [revealMembers, setRevealMembers] = React.useState(false);
  
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
  };

  const handleMembersReveal = () => {
    setRevealMembers(true);
  }

  const MAP = {
    name: "my-map",
    areas: [
      {
        id: 0,
        title: "BD",
        name: 2,
        shape: "poly",
        coords: [
          368, 45,
          393, 45,
          200, 390,
          170, 390,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
      },
      {
        id: 1,
        title: "AD",
        name: 3,
        shape: "poly",
        coords: [
          167, 0,
          210, 0,
          210, 390,
          167, 390,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
      },
      {
        id: 2,
        title: "Whole FBD",
        name: 1,
        shape: "poly",
        coords: [
          143, 30,
          158, 30,
          158, 0,
          218, 0,
          218, 24,
          406, 24,
          406, 280,
          270, 280,
          205, 390,
          158, 390,
          158, 80,
          143, 80
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
      },
      
      
    ]
  };
  const AD_MAP = {
    name: "my-map",
    areas: [
      {
        id: 0,
        title: "Pin D",
        name: 5,
        shape: "poly",
        coords: [
          130, 395,
          173, 395,
          173, 430,
          130, 430,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: "#fcba034c"
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
            style={{display: revealMembers ? 'none' : ''}} 
            onClick={(handleMembersReveal)
          }> 
            Reveal Answer
          </Button>
          <span style={{
            opacity: revealMembers ? 1 : 0,
            transition: 'visibility 0s, opacity 0.5s linear',
            visibility: revealMembers ? 'visible' : 'hidden',
            padding: 0,
          }}>
            Yes, BD is a 2-force member since the forces acting on it are located at points 
            B and D only.
          </span>
        </p>
      </div>;
    diagram = 
      <div style={{textAlign: 'center'}}>
        <ImageMapper 
          src = '/sample_2_whole_fbd.png' 
          map = {MAP} 
          width = {430}
          onClick = {(area) => selectDiagram(area)} 
        />
      
      </div>;
  } else if(activeStep === 1) {
    notes = 
      <div style={{textAlign: 'left', padding: "0 20px"}}>
        <img src="/sample_2_whole_fbd_equation.png" style={{ width: "100%"}} alt="FBD Equations"></img>
        <div style={{padding: "12px 20px"}}>
          <ul>
            <li style={{marginBottom: "12px"}}>
              There are 4 unknowns in the diagram which makes it STATICALLY INDETERMINATE.
            </li>
            <li>
              You will not be able to solve any forces if you start with this diagram. Dx and 
              Dy were solved using this diagram after Cx and Cy was solved using the succeeding 
              diagrams.
            </li>
          </ul>      
        </div>
      </div>;
    diagram = <div style={{textAlign: 'center'}}><img src="/sample_2_whole_fbd_member.png" style={{ maxHeight: "450px", width:"100%"}} alt="Whole FBD" /></div>;
  } else if(activeStep === 2){
    notes = 
      <div style={{padding: "0px 20px"}}>
        <ul>
          <li style={{marginBottom: "12px"}}>
            F<sub>BD</sub> is first assumed to be compressive.
          </li>
          <li style={{marginBottom: "12px"}}>
            Since BD is a 2-force member, the forces at points B and D are equal and 
            have opposite directions with line of action same as the lines connecting 
            points B and D.
          </li>
          <li style={{marginBottom: "12px"}}>
          While points B and D are connected to the rest of the frame using pins, its 
          better to represent the forces with already known direction F<sub>BD</sub> than use Bx, 
          By, Dx or Dy because the direction of the force is already known based on 
          the concept of 2-force members. This also makes the solution easier as there 
          are less unknowns.
          </li>
        </ul>      
      </div>;
    diagram = <div style={{textAlign: 'center'}}><img src="/sample_2_bd.png" style={{ maxHeight: "450px", width:"100%"}} alt="ABCDE Diagram"></img></div>;
  } else if(activeStep === 3){
      notes = 
      <div style={{padding: "0px 20px"}}>
        <img src="/sample_2_ad_equations.png" style={{ width: "20rem"}} alt="AD Equations"></img>
        <ul>
          <li style={{marginBottom: "12px", marginTop:"12px"}}>
            The initial direction of F<sub>A</sub> is assumed but is HORIZONTAL because the 
            frictionless slot is VERTICAL.
          </li>
          <li style={{marginBottom: "12px"}}>
            F<sub>BD</sub> was assumed to be compressive, hence it is directed towards point D.
          </li>
          <li style={{marginBottom: "12px"}}>
            Since pin D is attached, we only removed member BD and the pin support at D. Hence, 
            we replace those with forces F<sub>BD</sub>, Dx and Dy.
          </li>
          <li style={{marginBottom: "12px"}}>
            The directions of Dx and Dy are NOT changed from the assumed direction in the whole 
            body diagram because these are forces on pin D from the pin support.
          </li>
          <li>
            There are 4 unknowns in the diagram, which makes this diagram STATICALLY INDETERMINATE. 
            But you can sum moment at D to solve for F<sub>A</sub>. We can then move to member ABC to 
            solve for F<sub>BD</sub>.
          </li>
        </ul>      
      </div>;
    diagram = <div style={{textAlign: 'center'}}><img src="/sample_2_ad_with_pin_d.png" style={{ maxHeight: "450px", width:"100%"}} alt="ID and DG Diagram"></img></div>;
  } else if(activeStep === 4){
    notes = 
      <div style={{padding: "0px 20px"}}>
        <img src="/sample_2_ad_equations.png" style={{ width: "20rem"}} alt="AD Equations"></img>
        <ul>
          <li style={{marginBottom: "12px", marginTop:"12px"}}>
            In the pin analysis, we assume that all members exert force on the pin and not on each 
            other. Hence, when we remove the pin itself, what is left is the force exerted 
            by the pin on member AD, which are ADx and ADy. They are different from Dx and Dy 
            and are labelled differently.
          </li>
          <li style={{marginBottom: "12px"}}>
            F<sub>BD</sub> is also absent here because it is assumed to act on the pin and not on member AD.
          </li>
          <li style={{marginBottom: "12px"}}>
            We can also use this diagram to compute for F<sub>A</sub> by summing moment at D. You can also 
            compute for ADx and ADy if they are needed.
          </li>
          <li>
            Click the diagram on the left at point D to see FBD of pin D.
          </li>
        </ul>      
      </div>;
    diagram = 
    <div style={{textAlign: 'center'}}>
      <ImageMapper 
          src = '/sample_2_ad_without_pin_d.png' 
          map = {AD_MAP} 
          width = {270}
          onClick = {(area) => selectDiagram(area)} 
        />
    </div>;
  } else if(activeStep === 5){
    notes = 
      <div style={{padding: "0px 20px"}}>
        <ul>
          <li style={{marginBottom: "12px"}}>
            While this is not needed for the solution, this is added to further help you 
            understand pin analysis.
          </li>
          <li style={{marginBottom: "12px"}}>
            Pin D holds together the pin support, member AD, and member BD. Removing all the
             members shows us the forces they exert on the pin.
          </li>
          <li style={{marginBottom: "12px"}}>
            Dx and Dy are the forces of the pin support on the pin. The directions are not reversed 
            from the whole body diagram because these are the same forces exerted by the pin 
            support on the pin.
          </li>
          <li>
            ADy and ADx are the forces exerted by member AD on pin D, hence the directions 
            are reversed from the FBD of member AD
          </li>
        </ul>      
      </div>;
    diagram = <div style={{textAlign: 'center'}}><img src="/sample_2_pin_d.png" style={{ maxHeight: "450px", width:"100%"}} alt="ID and DG Diagram"></img></div>;
  } else {
    notes = 
      <div style={{textAlign: 'left', padding: "0 20px"}}>
        <img src="/sample_2_abc_equation.png" style={{ width: "100%"}} alt="FBD Equations"></img>
        <div style={{padding: "12px 20px"}}>
          <ul>
            <li style={{marginBottom: "12px"}}>
              Proceed to whole body diagram to solve for Dx and Dy
            </li>
          </ul>      
        </div>
      </div>;
    diagram = <div style={{textAlign: 'center'}}><img src="/sample_2_abc.png" style={{ maxHeight: "450px", width:"100%"}} alt="Whole FBD"></img></div>;
  }




  return (
    <Layout>
      <div>
        <h2 style={{marginBottom: "5px"}}>Sample Problem 2 - With Pin Analysis</h2>
        <h3 style={{fontWeight: 400}}>Point A is a slotted connection that allows free vertical movement along the upper portion of member AD. If the frame is loaded as shown, determine the horizontal and vertical components of the reaction forces acting at the supports.</h3>
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
                    ml:1, 
                    mt: 3
                  }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button variant="contained" onClick={handleComplete} sx={{ mr: 1 }}>
                      Next
                    </Button>
                   
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}
