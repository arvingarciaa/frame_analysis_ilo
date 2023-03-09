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
import PointDialog from './dialogs/practice_1_whole_fbd_point'
import DiagramHelp from './dialogs/diagram_help'
import AnswersHelp from './dialogs/answers_help'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import NorthEastIcon from '@mui/icons-material/NorthEast'
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

const steps = [
  'Determine 2-force members',
  'Whole FBD',
  'FBD of ACE',
  'FBD of pulley at D without pin D',
  'FBD of pin D',
  'Final answers',
];
const WRONG_PREFILL = "#d813134c"
const DEFAULT_PREFILL = "#fcba034c"
const CORRECT_PREFILL = "#3de2744C"

export default function SampleProblem1() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [wrongSteps, setWrongSteps] = React.useState({});
  const [completed, setCompleted] = React.useState({});
  const [openWholeWholeADialog, setOpenWholeFBDDialog] = React.useState(false);
  const [openDiagramHelpDialog, setDiagramHelpDialog] = React.useState(false);
  const [openAnswersHelpDialog, setAnswersHelpDialog] = React.useState(false);
  const [hasTwoForceMembers, setHasTwoForceMembers] = React.useState('');
  const [hasTwoForceMembersError, setHasTwoForceMembersError] = React.useState(false);
  const [twoForceMembersListError, setTwoForceMembersListError] = React.useState(false);
  const [twoForceMembersName, setTwoForceMembersName] = React.useState([]);
  const [wholeFBDFirstEquationTooltipOpen, setWholeFBDFirstEquationTooltipOpen] = React.useState(false);
  const [wholeFBDSecondEquationTooltipOpen, setWholeFBDSecondEquationTooltipOpen] = React.useState(false);
  const [revealFinalAnswer, setRevealFinalAnswer] = React.useState(false);
  const [checkAnswersToggle, setCheckAnswersToggle] = React.useState(false);
  const [wholeFBDThirdEquationTooltipOpen, setWholeFBDThirdEquationTooltipOpen] = React.useState(false);
  const [snackbarInfo, setSnackbarInfo] = React.useState([false, 'success', 'There is an error - please check your answers!']);
  const [wholeFBDPointsData, setWholeFBDPointsData] = React.useState({
    "A": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
    "B": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
    "D": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
  });
  const [ACEPointsData, setACEPointsData] = React.useState({
    "A": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
    "100": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
    "C": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
    "F": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
  });
  const [pulleyDPointsData, setPulleyDPointsData] = React.useState({
    "Top": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
    "D": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
    "Right": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
  });
  const [pinDPointsData, setPinDPointsData] = React.useState({
    "D": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
    "CD": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
    "F": {
      verticalForceDirection: "none",
      verticalForceLabel: "",
      horizontalForceDirection: "none",
      horizontalForceLabel: "",
      inclinedForceDirection: "none",
      inclinedForceAngle: 0,
      inclinedForceLabel: "",
      momentDirection: "none",
      momentLabel: "",
    },
  });
  const [pointID, setPointID] = React.useState('');
  const [mapWholeFBD, setMapWholeFBD] = React.useState({
    name: "my-map",
    areas: [
      {
        id: 0,
        title: "A",
        name: "A",
        shape: "rect",
        coords: [
          59,
          2,
          99,
          38,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 1,
        title: "D",
        name: "D",
        shape: "rect",
        coords: [
          330,
          220,
          390,
          280,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 2,
        title: "B",
        name: "B",
        shape: "rect",
        coords: [
          3,
          170,
          40,
          210,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
    ]
  });
  const [mapACE, setMapACE] = React.useState({
    name: "ACE-map",
    areas: [
      {
        id: 0,
        title: "A",
        name: "A",
        shape: "rect",
        coords: [
          134,
          5,
          184,
          50,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 1,
        title: "100",
        name: "100",
        shape: "rect",
        coords: [
          134,
          230,
          184,
          275,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 2,
        title: "C",
        name: "C",
        shape: "rect",
        coords: [
          134,
          300,
          184,
          345,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 3,
        title: "F",
        name: "F",
        shape: "rect",
        coords: [
          245,
          370,
          295,
          425,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
    ]
  });
  const [mapPulleyD, setMapPulleyD] = React.useState({
    name: "pulley-d-map",
    areas: [
      {
        id: 0,
        title: "Top",
        name: "Top",
        shape: "rect",
        coords: [
          181,
          84,
          221,
          124,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 1,
        title: "D",
        name: "D",
        shape: "rect",
        coords: [
          181,
          145,
          221,
          185,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 2,
        title: "Right",
        name: "Right",
        shape: "rect",
        coords: [
          250,
          145,
          290,
          185,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
    ]
  });
  const [mapPinD, setMapPinD] = React.useState({
    name: "pin-d-map",
    areas: [
      {
        id: 0,
        title: "CD",
        name: "CD",
        shape: "rect",
        coords: [
          205,
          160,
          245,
          200,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 1,
        title: "D",
        name: "D",
        shape: "rect",
        coords: [
          160,
          205,
          200,
          245,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 2,
        title: "F",
        name: "F",
        shape: "rect",
        coords: [
          115,
          260,
          155,
          300,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
    ]
  });
  const [wholeFBDAnswers, setWholeFBDAnswers] = React.useState([
    {
      firstSign: "+",
      firstSignError: false,
      firstComponent: "1",
      firstComponentError: false,
      firstComponentValue: "",
      firstComponentValueError: false,
      firstLabel: 'B',
      firstLabelError: false,
      firstMomentArm: '',
      firstMomentArmError: false,
      secondSign: '+',
      secondSignError: false,
      secondComponent: "1",
      secondComponentError: false,
      secondComponentValue: "",
      secondComponentValueError: false,
      secondLabel: '100',
      secondLabelError: false,
      secondMomentArm: '',
      secondMomentArmError: false,
      answer: '',
      answerError: false,
      answerDirection: '',
      answerDirectionError: false,
    },
    {
      firstSign: "+",
      firstSignError: false,
      firstComponent: "1",
      firstComponentError: false,
      firstComponentValue: "",
      firstComponentValueError: false,
      firstLabel: "Ax",
      firstLabelError: false,
      secondSign: "+",
      secondSignError: false,
      secondComponent: "1",
      secondComponentError: false,
      secondComponentValue: "",
      secondComponentValueError: false,
      secondLabel: "B",
      secondLabelError: false,
      answer: "",
      answerError: false,
      answerDirection: '',
      answerDirectionError: false,
    },
    {
      firstSign: "+",
      firstSignError: false,
      firstComponent: "1",
      firstComponentError: false,
      firstComponentValue: "",
      firstComponentValueError: false,
      firstLabel: "Ay",
      firstLabelError: false,
      secondSign: "+",
      secondSignError: false,
      secondComponent: "1",
      secondComponentError: false,
      secondComponentValue: "",
      secondComponentValueError: false,
      secondLabel: "100",
      secondLabelError: false,
      answer: "",
      answerError: false,
      answerDirection: '',
      answerDirectionError: false,
    },
  ]);
  const [ACEAnswers, setACEAnswers] = React.useState([
    {
      firstSign: "+",
      firstSignError: false,
      firstComponent: "1",
      firstComponentError: false,
      firstComponentValue: "",
      firstComponentValueError: false,
      firstLabel: 'Ax',
      firstLabelError: false,
      firstMomentArm: '',
      firstMomentArmError: false,
      secondSign: '+',
      secondSignError: false,
      secondComponent: "1",
      secondComponentError: false,
      secondComponentValue: "",
      secondComponentValueError: false,
      secondLabel: '100',
      secondLabelError: false,
      secondMomentArm: '',
      secondMomentArmError: false,
      thirdSign: '+',
      thirdSignError: false,
      thirdComponent: "1",
      thirdComponentError: false,
      thirdComponentValue: "",
      thirdComponentValueError: false,
      thirdLabel: 'Fed',
      thirdLabelError: false,
      thirdMomentArm: '',
      thirdMomentArmError: false,
      fourthSign: '+',
      fourthSignError: false,
      fourthComponent: "1",
      fourthComponentError: false,
      fourthComponentValue: "",
      fourthComponentValueError: false,
      fourthLabel: 'Fed',
      fourthLabelError: false,
      fourthMomentArm: '',
      fourthMomentArmError: false,
      answer: '',
      answerError: false,
      answerDirection: '',
      answerDirectionError: false,
    },
  ]);
  const [pinDAnswers, setPinDAnswers] = React.useState([
    {
      firstSign: "+",
      firstSignError: false,
      firstComponent: "1",
      firstComponentError: false,
      firstComponentValue: "",
      firstComponentValueError: false,
      firstLabel: 'CDx',
      firstLabelError: false,
      firstMomentArm: '',
      firstMomentArmError: false,
      secondSign: '+',
      secondSignError: false,
      secondComponent: "1",
      secondComponentError: false,
      secondComponentValue: "",
      secondComponentValueError: false,
      secondLabel: 'Fed',
      secondLabelError: false,
      secondMomentArm: '',
      secondMomentArmError: false,
      thirdSign: '+',
      thirdSignError: false,
      thirdComponent: "1",
      thirdComponentError: false,
      thirdComponentValue: "",
      thirdComponentValueError: false,
      thirdLabel: '100',
      thirdLabelError: false,
      thirdMomentArm: '',
      thirdMomentArmError: false,
      answer: '',
      answerError: false,
      answerDirection: '',
      answerDirectionError: false,
    },
    {
      firstSign: "+",
      firstSignError: false,
      firstComponent: "1",
      firstComponentError: false,
      firstComponentValue: "",
      firstComponentValueError: false,
      firstLabel: 'CDy',
      firstLabelError: false,
      firstMomentArm: '',
      firstMomentArmError: false,
      secondSign: '+',
      secondSignError: false,
      secondComponent: "1",
      secondComponentError: false,
      secondComponentValue: "",
      secondComponentValueError: false,
      secondLabel: 'Fed',
      secondLabelError: false,
      secondMomentArm: '',
      secondMomentArmError: false,
      thirdSign: '+',
      thirdSignError: false,
      thirdComponent: "1",
      thirdComponentError: false,
      thirdComponentValue: "",
      thirdComponentValueError: false,
      thirdLabel: '100',
      thirdLabelError: false,
      thirdMomentArm: '',
      thirdMomentArmError: false,
      answer: '',
      answerError: false,
      answerDirection: '',
      answerDirectionError: false,
    },
  ])

  const [pulleyDAnswers, setPulleyDAnswers] = React.useState([
    {
      answerDirection: '',
      answerDirectionError: false,
    },
    {
      answerDirection: '',
      answerDirectionError: false,
    }
  ])

  const handleOpenSnackbar = (status, text) => {
    let temp = [...snackbarInfo];
    temp[0] = true;
    if(status === "error"){
        temp[1] = "error";
        temp[2] = text ?? "There is an error - please check all your answers!";
    } else if (status === "info") {
      temp[1] = "info";
      temp[2] = text ?? 'Point saved, click on the "Check Answers" button to verify your answer.';
    } else {
      temp[1] = "success";
      temp[2] = text ?? "Your answers are correct - you may now proceed to the next section.";
    }
    setSnackbarInfo(temp);
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    let temp = [...snackbarInfo];
    temp[0] = false;
    setSnackbarInfo(temp);
  };

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

  const checkWholeFBDAnswers = () => {
    const newWholeFBDAnswers = [...wholeFBDAnswers];
    //Equation #1
    newWholeFBDAnswers[0]['firstSignError'] = newWholeFBDAnswers[0]['firstSign'] !== "+";
    newWholeFBDAnswers[0]['firstComponentError'] = newWholeFBDAnswers[0]['firstComponent'] !== "1";
    newWholeFBDAnswers[0]['firstLabelError'] = newWholeFBDAnswers[0]['firstLabel'] !== "B";
    newWholeFBDAnswers[0]['firstMomentArmError'] = newWholeFBDAnswers[0]['firstMomentArm'] !== "160";
    newWholeFBDAnswers[0]['secondSignError'] = newWholeFBDAnswers[0]['secondSign'] !== "-";
    newWholeFBDAnswers[0]['secondComponentError'] = newWholeFBDAnswers[0]['secondComponent'] !== "1";
    newWholeFBDAnswers[0]['secondLabelError'] = newWholeFBDAnswers[0]['secondLabel'] !== "100";
    newWholeFBDAnswers[0]['secondMomentArmError'] = newWholeFBDAnswers[0]['secondMomentArm'] !== "280";
    newWholeFBDAnswers[0]['answerError'] = newWholeFBDAnswers[0]['answer'] !== "175";
    newWholeFBDAnswers[0]['answerDirectionError'] = newWholeFBDAnswers[0]['answerDirection'] !== "right";
    
    //Equation #2
    newWholeFBDAnswers[1]['firstSignError'] = newWholeFBDAnswers[1]['firstSign'] !== "+";
    newWholeFBDAnswers[1]['firstComponentError'] = newWholeFBDAnswers[1]['firstComponent'] !== "1";
    newWholeFBDAnswers[1]['firstLabelError'] = newWholeFBDAnswers[1]['firstLabel'] !== "Ax";
    newWholeFBDAnswers[1]['secondSignError'] = newWholeFBDAnswers[1]['secondSign'] !== "+";
    newWholeFBDAnswers[1]['secondComponentError'] = newWholeFBDAnswers[1]['secondComponent'] !== "1";
    newWholeFBDAnswers[1]['secondLabelError'] = newWholeFBDAnswers[1]['secondLabel'] !== "B";
    newWholeFBDAnswers[1]['answerError'] = newWholeFBDAnswers[1]['answer'] !== "175";
    newWholeFBDAnswers[1]['answerDirectionError'] = newWholeFBDAnswers[1]['answerDirection'] !== "left";

    //Equation #3
    newWholeFBDAnswers[2]['firstSignError'] = newWholeFBDAnswers[2]['firstSign'] !== "+";
    newWholeFBDAnswers[2]['firstComponentError'] = newWholeFBDAnswers[2]['firstComponent'] !== "1";
    newWholeFBDAnswers[2]['firstLabelError'] = newWholeFBDAnswers[2]['firstLabel'] !== "Ay"
    newWholeFBDAnswers[2]['secondSignError'] = newWholeFBDAnswers[2]['secondSign'] !== "-";
    newWholeFBDAnswers[2]['secondComponentError'] = newWholeFBDAnswers[2]['secondComponent'] !== "1";
    newWholeFBDAnswers[2]['secondLabelError'] = newWholeFBDAnswers[2]['secondLabel'] !== "100";
    newWholeFBDAnswers[2]['answerError'] = newWholeFBDAnswers[2]['answer'] !== "100";
    newWholeFBDAnswers[2]['answerDirectionError'] = newWholeFBDAnswers[2]['answerDirection'] !== "up";
    
    return(
      newWholeFBDAnswers[0]['firstSignError'] ||
      newWholeFBDAnswers[0]['firstComponentError'] ||
      newWholeFBDAnswers[0]['firstLabelError'] ||
      newWholeFBDAnswers[0]['firstMomentArmError'] ||
      newWholeFBDAnswers[0]['secondSignError'] ||
      newWholeFBDAnswers[0]['secondComponentError'] ||
      newWholeFBDAnswers[0]['secondLabelError'] ||
      newWholeFBDAnswers[0]['secondMomentArmError'] ||
      newWholeFBDAnswers[0]['answerError'] ||
      newWholeFBDAnswers[0]['answerDirectionError'] ||
      newWholeFBDAnswers[1]['firstSignError'] ||
      newWholeFBDAnswers[1]['firstComponentError'] ||
      newWholeFBDAnswers[1]['firstLabelError'] ||
      newWholeFBDAnswers[1]['secondSignError'] ||
      newWholeFBDAnswers[1]['secondComponentError'] ||
      newWholeFBDAnswers[1]['secondLabelError'] ||
      newWholeFBDAnswers[1]['answerError'] ||
      newWholeFBDAnswers[1]['answerDirectionError'] ||
      newWholeFBDAnswers[2]['firstSignError'] ||
      newWholeFBDAnswers[2]['firstComponentError'] ||
      newWholeFBDAnswers[2]['firstLabelError'] ||
      newWholeFBDAnswers[2]['secondSignError'] ||
      newWholeFBDAnswers[2]['secondComponentError'] ||
      newWholeFBDAnswers[2]['secondLabelError'] ||
      newWholeFBDAnswers[2]['answerError'] ||
      newWholeFBDAnswers[2]['answerDirectionError']
    )
  };

  const checkPinDAnswers = () => {
    const newPinDAnswers = [...pinDAnswers];
    //Equation #1
    newPinDAnswers[0]['firstSignError'] = newPinDAnswers[0]['firstSign'] !== "+";
    newPinDAnswers[0]['firstComponentError'] = newPinDAnswers[0]['firstComponent'] !== "1";
    newPinDAnswers[0]['firstLabelError'] = newPinDAnswers[0]['firstLabel'] !== "CDx";
    newPinDAnswers[0]['secondSignError'] = newPinDAnswers[0]['secondSign'] !== "+";
    newPinDAnswers[0]['secondComponentError'] = newPinDAnswers[0]['secondComponent'] !== "cos";
    newPinDAnswers[0]['secondComponentValueError'] = newPinDAnswers[0]['secondComponentValue'] !== "28.07249";
    newPinDAnswers[0]['secondLabelError'] = newPinDAnswers[0]['secondLabel'] !== "Fed";
    newPinDAnswers[0]['thirdSignError'] = newPinDAnswers[0]['thirdSign'] !== "-";
    newPinDAnswers[0]['thirdComponentError'] = newPinDAnswers[0]['thirdComponent'] !== "1";
    newPinDAnswers[0]['thirdLabelError'] = newPinDAnswers[0]['thirdLabel'] !== "100";
    newPinDAnswers[0]['answerError'] = newPinDAnswers[0]['answer'] !== "166.24558";
    newPinDAnswers[0]['answerDirectionError'] = newPinDAnswers[0]['answerDirection'] !== "left";
    
    //Equation #2
    newPinDAnswers[1]['firstSignError'] = newPinDAnswers[1]['firstSign'] !== "+";
    newPinDAnswers[1]['firstComponentError'] = newPinDAnswers[1]['firstComponent'] !== "1";
    newPinDAnswers[1]['firstLabelError'] = newPinDAnswers[1]['firstLabel'] !== "CDy";
    newPinDAnswers[1]['secondSignError'] = newPinDAnswers[1]['secondSign'] !== "+";
    newPinDAnswers[1]['secondComponentError'] = newPinDAnswers[1]['secondComponent'] !== "sin";
    newPinDAnswers[1]['secondComponentValueError'] = newPinDAnswers[1]['secondComponentValue'] !== "28.07249";
    newPinDAnswers[1]['secondLabelError'] = newPinDAnswers[1]['secondLabel'] !== "Fed";
    newPinDAnswers[1]['thirdSignError'] = newPinDAnswers[1]['thirdSign'] !== "-";
    newPinDAnswers[1]['thirdComponentError'] = newPinDAnswers[1]['thirdComponent'] !== "1";
    newPinDAnswers[1]['thirdLabelError'] = newPinDAnswers[1]['thirdLabel'] !== "100";
    newPinDAnswers[1]['answerError'] = newPinDAnswers[1]['answer'] !== "41.99766";
    newPinDAnswers[1]['answerDirectionError'] = newPinDAnswers[1]['answerDirection'] !== "down";

  
    return(
      newPinDAnswers[0]['firstSignError'] ||
      newPinDAnswers[0]['firstComponentError'] ||
      newPinDAnswers[0]['firstLabelError'] ||
      newPinDAnswers[0]['secondSignError'] ||
      newPinDAnswers[0]['secondComponentError'] ||
      newPinDAnswers[0]['secondComponentValueError'] ||
      newPinDAnswers[0]['secondLabelError'] ||
      newPinDAnswers[0]['thirdSignError'] ||
      newPinDAnswers[0]['thirdComponentError'] ||
      newPinDAnswers[0]['thirdLabelError'] ||
      newPinDAnswers[0]['answerError'] ||
      newPinDAnswers[0]['answerDirectionError'] ||
      newPinDAnswers[1]['firstSignError'] ||
      newPinDAnswers[1]['firstComponentError'] ||
      newPinDAnswers[1]['firstLabelError'] ||
      newPinDAnswers[1]['secondSignError'] ||
      newPinDAnswers[1]['secondComponentError'] ||
      newPinDAnswers[1]['secondComponentValueError'] ||
      newPinDAnswers[1]['secondLabelError'] ||
      newPinDAnswers[1]['thirdSignError'] ||
      newPinDAnswers[1]['thirdComponentError'] ||
      newPinDAnswers[1]['thirdLabelError'] ||
      newPinDAnswers[1]['answerError'] ||
      newPinDAnswers[1]['answerDirectionError']
    )
  };

  const checkPulleyDAnswers = () => {
    const newPulleyDAnswers = [...pulleyDAnswers];
    newPulleyDAnswers[0]['answerDirectionError'] = newPulleyDAnswers[0]['answerDirection'] !== 'right'
    
    newPulleyDAnswers[1]['answerDirectionError'] = newPulleyDAnswers[1]['answerDirection'] !== 'up'

    return (
      newPulleyDAnswers[0]['answerDirectionError'] ||
      newPulleyDAnswers[1]['answerDirectionError'] 
    )
  };

  const checkACEAnswers = () => {
    const newACEAnswers = [...ACEAnswers];
    //Equation #1
    newACEAnswers[0]['firstSignError'] = newACEAnswers[0]['firstSign'] !== "+";
    newACEAnswers[0]['firstComponentError'] = newACEAnswers[0]['firstComponent'] !== "1";
    newACEAnswers[0]['firstComponentValueError'] = newACEAnswers[0]['firstComponentValue'] !== "";
    newACEAnswers[0]['firstLabelError'] = newACEAnswers[0]['firstLabel'] !== "Ax";
    newACEAnswers[0]['firstMomentArmError'] = newACEAnswers[0]['firstMomentArm'] !== "220";
    newACEAnswers[0]['secondSignError'] = newACEAnswers[0]['secondSign'] !== "-";
    newACEAnswers[0]['secondComponentError'] = newACEAnswers[0]['secondComponent'] !== "1";
    newACEAnswers[0]['secondComponentValueError'] = newACEAnswers[0]['secondComponentValue'] !== "";
    newACEAnswers[0]['secondLabelError'] = newACEAnswers[0]['secondLabel'] !== "100";
    newACEAnswers[0]['secondMomentArmError'] = newACEAnswers[0]['secondMomentArm'] !== "30";
    newACEAnswers[0]['thirdSignError'] = newACEAnswers[0]['thirdSign'] !== "+";
    newACEAnswers[0]['thirdComponentError'] = newACEAnswers[0]['thirdComponent'] !== "cos";
    newACEAnswers[0]['thirdComponentValueError'] = newACEAnswers[0]['thirdComponentValue'] !== "28.07249";
    newACEAnswers[0]['thirdLabelError'] = newACEAnswers[0]['thirdLabel'] !== "Fed";
    newACEAnswers[0]['thirdMomentArmError'] = newACEAnswers[0]['thirdMomentArm'] !== "80";
    newACEAnswers[0]['fourthSignError'] = newACEAnswers[0]['fourthSign'] !== "+";
    newACEAnswers[0]['fourthComponentError'] = newACEAnswers[0]['fourthComponent'] !== "sin";
    newACEAnswers[0]['fourthComponentValueError'] = newACEAnswers[0]['fourthComponentValue'] !== "28.07249";
    newACEAnswers[0]['fourthLabelError'] = newACEAnswers[0]['fourthLabel'] !== "Fed";
    newACEAnswers[0]['fourthMomentArmError'] = newACEAnswers[0]['fourthMomentArm'] !== "100";
    newACEAnswers[0]['answerError'] = newACEAnswers[0]['answer'] !== "301.74500";
    newACEAnswers[0]['answerDirectionError'] = newACEAnswers[0]['answerDirection'] !== "c";
    
    
    return(
      newACEAnswers[0]['firstSignError'] ||
      newACEAnswers[0]['firstComponentError'] ||
      newACEAnswers[0]['firstComponentValueError'] ||
      newACEAnswers[0]['firstLabelError'] ||
      newACEAnswers[0]['firstMomentArmError'] ||
      newACEAnswers[0]['secondSignError'] ||
      newACEAnswers[0]['secondComponentError'] ||
      newACEAnswers[0]['secondComponentValueError'] ||
      newACEAnswers[0]['secondLabelError'] ||
      newACEAnswers[0]['secondMomentArmError'] ||
      newACEAnswers[0]['thirdSignError'] ||
      newACEAnswers[0]['thirdComponentError'] ||
      newACEAnswers[0]['thirdComponentValueError'] ||
      newACEAnswers[0]['thirdLabelError'] ||
      newACEAnswers[0]['thirdMomentArmError'] ||
      newACEAnswers[0]['fourthSignError'] ||
      newACEAnswers[0]['fourthComponentError'] ||
      newACEAnswers[0]['fourthComponentValueError'] ||
      newACEAnswers[0]['fourthLabelError'] ||
      newACEAnswers[0]['fourthMomentArmError'] ||
      newACEAnswers[0]['answerError']
    )

   
    
  }
  
  const handleFieldUpdate = (id, field, val, section) => {
    let newAnswers;
    switch(section){
      case "ACE":
        newAnswers = [...ACEAnswers];
        newAnswers[id][field] = val;
        setACEAnswers(newAnswers)
        break;
      case "pinD":
        newAnswers = [...pinDAnswers];
        newAnswers[id][field] = val;
        setPinDAnswers(newAnswers);
        break;
      case "pulleyD":
        newAnswers = [...pulleyDAnswers];
        newAnswers[id][field] = val;
        setPulleyDAnswers(newAnswers);
        break;
      default:
        newAnswers = [...wholeFBDAnswers];
        newAnswers[id][field] = val;
        setWholeFBDAnswers(newAnswers);
        break;
    }
  }
  
  const handleComplete = () => {
    let count = 0;
    setCheckAnswersToggle(!checkAnswersToggle);
    switch(activeStep){
      case 0:
        setTwoForceMembersListError(JSON.stringify(twoForceMembersName) !== '["DE"]')
        setHasTwoForceMembersError(hasTwoForceMembers !== 1)
        if(hasTwoForceMembers === 1 && JSON.stringify(twoForceMembersName) === '["DE"]'){
          handleOpenSnackbar("success");
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          handleNext();
        } else {
          handleOpenSnackbar("error");
          const newWrongSteps = {...wrongSteps};
          newWrongSteps[activeStep] = true;
          setWrongSteps(newWrongSteps);
        }
        break;
      case 1:
        const newMapWholeFBD = mapWholeFBD;
        if(wholeFBDPointsData["A"]["verticalForceDirection"] === "up" && wholeFBDPointsData["A"]["horizontalForceDirection"] === "right"){
          newMapWholeFBD.areas[0].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapWholeFBD.areas[0].preFillColor = WRONG_PREFILL;
        }
        if(wholeFBDPointsData["B"]["horizontalForceDirection"] === "right"){
          newMapWholeFBD.areas[2].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapWholeFBD.areas[2].preFillColor = WRONG_PREFILL;
        }
        if(wholeFBDPointsData["D"]["verticalForceDirection"] === "down"){
          newMapWholeFBD.areas[1].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapWholeFBD.areas[1].preFillColor = WRONG_PREFILL;
        }
        setMapWholeFBD({...newMapWholeFBD})
        if(count === 3 && !checkWholeFBDAnswers()){
          handleOpenSnackbar("success");
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          handleNext();
        } else {
          handleOpenSnackbar("error");
        }
        break;
      case 2:
        const newMapACE = mapACE;
        if(ACEPointsData["A"]["verticalForceDirection"] === "up" && ACEPointsData["A"]["horizontalForceDirection"] === "left"){
          newMapACE.areas[0].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapACE.areas[0].preFillColor = WRONG_PREFILL;
        }
        if(ACEPointsData["100"]["horizontalForceDirection"] === "right"){
          newMapACE.areas[1].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapACE.areas[1].preFillColor = WRONG_PREFILL;
        }
        if(ACEPointsData["C"]["verticalForceDirection"] === "up" && ACEPointsData["C"]["horizontalForceDirection"] === "right"){
          newMapACE.areas[2].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapACE.areas[2].preFillColor = WRONG_PREFILL;
        }
        if(ACEPointsData["F"]["inclinedForceDirection"] === "ne" && ACEPointsData["F"]["inclinedForceAngle"] === "28.07249"){
          newMapACE.areas[3].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapACE.areas[3].preFillColor = WRONG_PREFILL;
        }
        setMapACE({...newMapACE})
        if(!checkACEAnswers() && count === 4){
          handleOpenSnackbar("success");
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          handleNext();
        } else {
          handleOpenSnackbar("error");
        }
        break;
      case 3:
        const newMapPulleyD = mapPulleyD;
        if(pulleyDPointsData["Top"]["horizontalForceDirection"] === "left"){
          newMapPulleyD.areas[0].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapPulleyD.areas[0].preFillColor = WRONG_PREFILL;
        }
        if(pulleyDPointsData["D"]["horizontalForceDirection"] === "right" && pulleyDPointsData["D"]["verticalForceDirection"] === "up"){
          newMapPulleyD.areas[1].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapPulleyD.areas[1].preFillColor = WRONG_PREFILL;
        }
        if(pulleyDPointsData["Right"]["verticalForceDirection"] === "down"){
          newMapPulleyD.areas[2].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapPulleyD.areas[2].preFillColor = WRONG_PREFILL;
        }
        setMapPulleyD({...newMapPulleyD})
        if(!checkPulleyDAnswers() && count === 3){
          handleOpenSnackbar("success");
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          handleNext();
        } else {
          handleOpenSnackbar("error");
        }
        break;
      case 4:
        const newMapPinD = mapPinD;
        if(pinDPointsData["CD"]["horizontalForceDirection"] === "right" && pinDPointsData["CD"]["verticalForceDirection"] === "up"){
          newMapPinD.areas[0].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapPinD.areas[0].preFillColor = WRONG_PREFILL;
        }
        if(pinDPointsData["D"]["horizontalForceDirection"] === "left" && pinDPointsData["D"]["verticalForceDirection"] === "down"){
          newMapPinD.areas[1].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapPinD.areas[1].preFillColor = WRONG_PREFILL;
        }
        if(pinDPointsData["F"]["inclinedForceDirection"] === "ne" && pinDPointsData["F"]["inclinedForceAngle"] === "28.07249"){
          newMapPinD.areas[2].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapPinD.areas[2].preFillColor = WRONG_PREFILL;
        }
        setMapPinD({...newMapPinD})
        console.log(checkPinDAnswers())
        if(!checkPinDAnswers() && count === 3){
          handleOpenSnackbar("success");
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          handleNext();
        } else {
          handleOpenSnackbar("error");
        }
        break;
      default:
        if(isLastStep() && completedSteps() === totalSteps() - 1){
          setRevealFinalAnswer(true)
          handleOpenSnackbar("success","Congratulations! You have finished the practice problem.");
        } else {
          handleOpenSnackbar("error", "There is an unfinished section - please check all your answers!");
        }
        break;
    }
  };

  const handleOpenWholeWholeDialog = (area) => {
    setPointID(area.name)
    setOpenWholeFBDDialog(true);
  };

  const names = [
    'DE',
    'ACE',
    'BD',
  ];

  const getDisabled = val => {
    if (completed[val]) return { disabled: true };
    return {};
  };
  
  const savePoints = (data) => {
    if(data[1] === 1 && data[0] === "A"){
      let tempData = ACEPointsData;
      tempData[data[0]]['verticalForceLabel'] = data[3];
      tempData[data[0]]['horizontalForceLabel'] = data[5];
      setACEPointsData(tempData);
    } else if(data[1] === 2 && data[0] === "A"){
      let tempData = wholeFBDPointsData;
      tempData[data[0]]['verticalForceLabel'] = data[3];
      tempData[data[0]]['horizontalForceLabel'] = data[5];
      setWholeFBDPointsData(tempData);
    }
    let tempData;
    switch(data[1]){
      case 1:
        tempData = wholeFBDPointsData;
        break;
      case 2: 
        tempData = ACEPointsData;
        break;
      case 3:
        tempData = pulleyDPointsData;
        break;
      default:
        tempData = pinDPointsData;
        break;
    }
    tempData[data[0]]['verticalForceDirection'] = data[2];
    tempData[data[0]]['verticalForceLabel'] = data[3];
    tempData[data[0]]['horizontalForceDirection'] = data[4];
    tempData[data[0]]['horizontalForceLabel'] = data[5];
    tempData[data[0]]['inclinedForceDirection'] = data[6];
    tempData[data[0]]['inclinedForceAngle'] = data[7];
    tempData[data[0]]['inclinedForceLabel'] = data[8];
    tempData[data[0]]['momentDirection'] = data[9];
    tempData[data[0]]['momentLabel'] = data[10];
    switch(data[1]){
      case 1:
        setWholeFBDPointsData(tempData);
        break;
      case 2: 
        setACEPointsData(tempData);
        break;
      case 3:
        setPulleyDPointsData(tempData);
        break;
      default:
        setPinDPointsData(tempData);
        break;
    }
    handleOpenSnackbar("info");
  };

  const handleOpenDiagramHelpDialog = () => {
    setDiagramHelpDialog(true);
  };

  const handleOpenAnswersHelpDialog = () => {
    setAnswersHelpDialog(true);
  };

  const closeDialogs = () => {
    setAnswersHelpDialog(false);
    setDiagramHelpDialog(false);
  }

  let diagram;
  let notes;
  if(activeStep === 0){
    notes = 
      <div style={{padding: "0 20px"}}>
        <p>Are there any 2-force members?</p>
        <Box>
          <FormControl fullWidth error={hasTwoForceMembersError}>
            <Select
              id="demo-simple-select"
              value={hasTwoForceMembers}
              {...getDisabled(0)}
              onChange={(event) => setHasTwoForceMembers(event.target.value)}
              defaultValue='0'
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>Yes</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div style={{ visibility: hasTwoForceMembers !== 1 ? 'hidden' : 'visible', paddingTop: '25px' }}>
          Select all 2-force members
          <FormControl sx={{ mt: 3}} fullWidth error={twoForceMembersListError}>
            <Select
              id="demo-multiple-checkbox"
              multiple
              {...getDisabled(0)}
              value={twoForceMembersName}
              onChange={(event) => {
                const {
                  target: { value },
                } = event;
                setTwoForceMembersName(
                  // On autofill we get a stringified value.
                  typeof value === 'string' ? value.split(',') : value,
                );}
              }
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={twoForceMembersName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <p style={{visibility: "hidden"}}>
            Yes, ID and CG are 2-force members 
            because they only have connections and forces in points I and D 
            for member ID and C and G for member CG.
        </p>
      </div>;
    diagram = 
      <div style={{textAlign: 'center'}}>
        <ImageMapper 
          src = '/practice_2_whole_fbd.png' 
          width = {450}
          key={checkAnswersToggle} 
        />
        <IconButton aria-label="info" onClick={handleOpenDiagramHelpDialog} size="large" color="warning" sx={{ position:"relative", top: '-450px', right: '190px', zIndex: 5}}>
          <InfoIcon />
        </IconButton>
      </div>;
  } else if(activeStep === 1) {
    notes = 
      <div style={{textAlign: 'left', padding: "0 20px"}}>
        <h3 style={{fontWeight: 400, padding: 0}}>Equations:</h3>
        <span style={{fontWeight: 200, fontSize: "14px", padding: 0}}>
          Note: Fill up the forces in the diagram with the correct labels before 
          answering the equations. Those in underline will be automatically generated 
          from the diagram.
        </span>
        <Box mt="15px" mb="30px">
          <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          > 
            
            <span style={{fontSize:"20px"}}>
              <FunctionsIcon sx={{fontSize:'2em', verticalAlign: 'bottom'}}/>
              M<sub>A</sub> = 0 = 
              <FormControl FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[0].firstSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[0]['firstSign']}
                    onChange={(event) => handleFieldUpdate(0, 'firstSign', event.target.value)}
                  >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[0].firstComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[0]['firstComponent']}
                    onChange={(event) => handleFieldUpdate(0, 'firstComponent', event.target.value)}
                  >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="cos">cos</MenuItem>
                  <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: wholeFBDAnswers[0]['firstComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen && wholeFBDAnswers[0]['firstComponent'] !== "1"}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={wholeFBDAnswers[0].firstComponentValueError}
                    value={wholeFBDAnswers[0].firstComponentValue}
                    onChange={(event) => handleFieldUpdate(0, 'firstComponentValue', event.target.value)}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[0].firstLabelError}>
                <Tooltip 
                    title="Label" 
                    arrow
                    open = {wholeFBDFirstEquationTooltipOpen}
                    onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                    onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                    placement = "top"
                    PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {wholeFBDPointsData["B"]["horizontalForceLabel"] === "" ? '___' : wholeFBDPointsData["B"]["horizontalForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>       
              (
                <FormControl sx={{verticalAlign: 'bottom'}}>
                  <Tooltip 
                    title="Moment Arm" 
                    arrow
                    open = {wholeFBDFirstEquationTooltipOpen}
                    onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                    onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                    placement = "bottom"
                    PopperProps={{style:{zIndex:4}}}
                  >
                    <TextField 
                      id="outlined-basic" 
                      size="small"
                      error={wholeFBDAnswers[0].firstMomentArmError}
                      inputProps = {{ sx: { padding: '2px 6px !important', width:'58px !important' } }}
                      value={wholeFBDAnswers[0].firstMomentArm}
                      onChange={(event) => handleFieldUpdate(0, 'firstMomentArm', event.target.value)}
                    />
                  </Tooltip>
                </FormControl>
              ) 
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[0].secondSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[0].secondSign}
                    onChange={(event) => handleFieldUpdate(0, 'secondSign', event.target.value)}
                  >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl> 
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[0].secondComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[0].secondComponent}
                    onChange={(event) => handleFieldUpdate(0, 'secondComponent', event.target.value)}
                  >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="cos">cos</MenuItem>
                  <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: wholeFBDAnswers[0]['secondComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen && wholeFBDAnswers[0]['secondComponent'] !== "1"}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={wholeFBDAnswers[0].secondComponentValueError}
                    value={wholeFBDAnswers[0].secondComponentValue}
                    onChange={(event) => handleFieldUpdate(0, 'secondComponentValue', event.target.value)}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[0].secondLabelError}>
                <Tooltip 
                  title="Label" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {wholeFBDPointsData["D"]["verticalForceLabel"] === "" ? '___' : wholeFBDPointsData["D"]["verticalForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>
              (
              <FormControl sx={{verticalAlign: 'bottom'}}>
                <Tooltip 
                  title="Moment Arm" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    error={wholeFBDAnswers[0].secondMomentArmError}
                    inputProps = {{ sx: { padding: '2px 6px !important', width:'58px !important' } }}
                    value={wholeFBDAnswers[0].secondMomentArm}
                    onChange={(event) => handleFieldUpdate(0, 'secondMomentArm', event.target.value)}
                  />
                </Tooltip>
              </FormControl>
              )
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
          }}>
            <h2 style={{padding: '20px', 
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              B = 
              <Tooltip 
                  title="Answer for summation of moment at A" 
                  arrow
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  error={wholeFBDAnswers[0].answerError}
                  inputProps = {{ sx: { padding: '2px 10px !important', width:'75px !important' } }}
                  value={wholeFBDAnswers[0].answer}
                  onChange={(event) => handleFieldUpdate(0, 'answer', event.target.value)}
                />
              </Tooltip>
              N, 
              <FormControl sx={{mr:0.25, ml:0.5, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[0].answerDirectionError}>
                <Tooltip 
                  title="Force direction" 
                  arrow
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '4px 8px 0px 8px !important' } }}
                    value={wholeFBDAnswers[0].answerDirection}
                    onChange={(event) => handleFieldUpdate(0, 'answerDirection', event.target.value)}
                  >
                  <MenuItem value="up"><NorthIcon /></MenuItem>
                  <MenuItem value="down"><SouthIcon /></MenuItem>
                  <MenuItem value="left"><WestIcon /></MenuItem>
                  <MenuItem value="right"><EastIcon /></MenuItem>
                  <MenuItem value="c">C</MenuItem>
                  <MenuItem value="t">T</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
            </h2>
          </div>
        </Box>
        <Box mt="15px" mb="30px">
          <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          > 
            <span style={{fontSize:"20px"}}>
              <FunctionsIcon sx={{fontSize:'2em', verticalAlign: 'bottom'}}/>
              F<sub>x</sub> = 0 = 
              <FormControl FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[1].firstSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[1]['firstSign']}
                    onChange={(event) => handleFieldUpdate(1, 'firstSign', event.target.value)}
                  >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[1].firstComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[1]['firstComponent']}
                    onChange={(event) => handleFieldUpdate(1, 'firstComponent', event.target.value)}
                  >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="cos">cos</MenuItem>
                  <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: wholeFBDAnswers[1]['firstComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen && wholeFBDAnswers[1]['firstComponent'] !== "1"}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={wholeFBDAnswers[1].firstComponentValueError}
                    value={wholeFBDAnswers[1].firstComponentValue}
                    onChange={(event) => handleFieldUpdate(1, 'firstComponentValue', event.target.value)}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[1].firstLabelError}>
                <Tooltip 
                    title="Label" 
                    arrow
                    open = {wholeFBDSecondEquationTooltipOpen}
                    onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                    onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                    placement = "top"
                    PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {wholeFBDPointsData["A"]["horizontalForceLabel"] === "" ? '___' : wholeFBDPointsData["A"]["horizontalForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>
              <FormControl FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[1].firstSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[1]['secondSign']}
                    onChange={(event) => handleFieldUpdate(1, 'secondSign', event.target.value)}
                  >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[1].secondComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[1]['secondComponent']}
                    onChange={(event) => handleFieldUpdate(1, 'secondComponent', event.target.value)}
                  >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="cos">cos</MenuItem>
                  <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: wholeFBDAnswers[1]['secondComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen && wholeFBDAnswers[1]['secondComponent'] !== "1"}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={wholeFBDAnswers[1].secondComponentValueError}
                    value={wholeFBDAnswers[1].secondComponentValue}
                    onChange={(event) => handleFieldUpdate(1, 'secondComponentValue', event.target.value)}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[1].secondLabelError}>
                <Tooltip 
                    title="Label" 
                    arrow
                    open = {wholeFBDSecondEquationTooltipOpen}
                    onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                    onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                    placement = "top"
                    PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {wholeFBDPointsData["B"]["horizontalForceLabel"] === "" ? '___' : wholeFBDPointsData["B"]["horizontalForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
          }}>
            <h2 style={{padding: '20px', 
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              Ax = 
              <Tooltip 
                  title="Answer for summation of moment along X" 
                  arrow
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  error={wholeFBDAnswers[1].answerError}
                  inputProps = {{ sx: { padding: '2px 10px !important', width:'65px !important' } }}
                  value={wholeFBDAnswers[1].answer}
                  onChange={(event) => handleFieldUpdate(1, 'answer', event.target.value)}
                />
              </Tooltip>
              N, 
              <FormControl sx={{mr:0.25, ml:0.5, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[1].answerDirectionError}>
                <Tooltip 
                  title="Force direction" 
                  arrow
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '4px 8px 0px 8px !important' } }}
                    value={wholeFBDAnswers[1].answerDirection}
                    onChange={(event) => handleFieldUpdate(1, 'answerDirection', event.target.value)}
                  >
                  <MenuItem value="up"><NorthIcon /></MenuItem>
                  <MenuItem value="down"><SouthIcon /></MenuItem>
                  <MenuItem value="left"><WestIcon /></MenuItem>
                  <MenuItem value="right"><EastIcon /></MenuItem>
                  <MenuItem value="c">C</MenuItem>
                  <MenuItem value="t">T</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
            </h2>
          </div>
        </Box>
        <Box mt="15px" mb="30px">
          <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          > 
            <span style={{fontSize:"20px"}}>
              <FunctionsIcon sx={{fontSize:'2em', verticalAlign: 'bottom'}}/>
              F<sub>y</sub> = 0 = 
              <FormControl FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[2].firstSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDThirdEquationTooltipOpen}
                  onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[2]['firstSign']}
                    onChange={(event) => handleFieldUpdate(2, 'firstSign', event.target.value)}
                  >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[2].firstComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDThirdEquationTooltipOpen}
                  onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[2]['firstComponent']}
                    onChange={(event) => handleFieldUpdate(2, 'firstComponent', event.target.value)}
                  >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="cos">cos</MenuItem>
                  <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: wholeFBDAnswers[2]['firstComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDThirdEquationTooltipOpen && wholeFBDAnswers[2]['firstComponent'] !== "1"}
                  onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={wholeFBDAnswers[2].firstComponentValueError}
                    value={wholeFBDAnswers[2].firstComponentValue}
                    onChange={(event) => handleFieldUpdate(2, 'firstComponentValue', event.target.value)}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[2].firstLabelError}>
                <Tooltip 
                    title="Label" 
                    arrow
                    open = {wholeFBDThirdEquationTooltipOpen}
                    onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                    onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                    placement = "top"
                    PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {wholeFBDPointsData["A"]["verticalForceLabel"] === "" ? '___' : wholeFBDPointsData["A"]["verticalForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl> 
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[2].secondSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDThirdEquationTooltipOpen}
                  onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[2].secondSign}
                    onChange={(event) => handleFieldUpdate(2, 'secondSign', event.target.value)}
                  >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl> 
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[2].secondComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDThirdEquationTooltipOpen}
                  onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={wholeFBDAnswers[2].secondComponent}
                    onChange={(event) => handleFieldUpdate(2, 'secondComponent', event.target.value)}
                  >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="cos">cos</MenuItem>
                  <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: wholeFBDAnswers[2]['secondComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDThirdEquationTooltipOpen && wholeFBDAnswers[2]['secondComponent'] !== "1"}
                  onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={wholeFBDAnswers[2].secondComponentValueError}
                    value={wholeFBDAnswers[2].secondComponentValue}
                    onChange={(event) => handleFieldUpdate(2, 'secondComponentValue', event.target.value)}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[2].secondLabelError}>
                <Tooltip 
                  title="Label" 
                  arrow
                  open = {wholeFBDThirdEquationTooltipOpen}
                  onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {wholeFBDPointsData["D"]["verticalForceLabel"] === "" ? '___' : wholeFBDPointsData["D"]["verticalForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
          }}>
            <h2 style={{padding: '20px', 
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              Ay =
              <Tooltip 
                  title="Answer for summation of moment along Y" 
                  arrow
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  error={wholeFBDAnswers[2].answerError}
                  inputProps = {{ sx: { padding: '2px 10px !important', width:'75px !important' } }}
                  value={wholeFBDAnswers[2].answer}
                  onChange={(event) => handleFieldUpdate(2, 'answer', event.target.value)}
                />
              </Tooltip>
              N, 
              <FormControl sx={{mr:0.25, ml:0.5, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[2].answerDirectionError}>
                <Tooltip 
                  title="Force direction" 
                  arrow
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '4px 8px 0px 8px !important' } }}
                    value={wholeFBDAnswers[2].answerDirection}
                    onChange={(event) => handleFieldUpdate(2, 'answerDirection', event.target.value)}
                  >
                  <MenuItem value="up"><NorthIcon /></MenuItem>
                  <MenuItem value="down"><SouthIcon /></MenuItem>
                  <MenuItem value="left"><WestIcon /></MenuItem>
                  <MenuItem value="right"><EastIcon /></MenuItem>
                  <MenuItem value="c">C</MenuItem>
                  <MenuItem value="t">T</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
            </h2>
          </div>
        </Box>
      </div>;
    diagram = 
      <div style={{textAlign: 'center'}}>
        <ImageMapper 
          src = '/practice_2_whole_fbd_member.png' 
          map = {mapWholeFBD} 
          onClick = {(area) => handleOpenWholeWholeDialog(area)}
          width = {450}
          height = {420}
          key={checkAnswersToggle} 
        />
        <IconButton aria-label="info" onClick={handleOpenDiagramHelpDialog} size="large" color="warning" sx={{ position:"relative", top: '-470px', right: '230px', zIndex: 5}}>
          <InfoIcon />
        </IconButton>
        <div style={{
          position: "relative", 
          top: '-475px', 
          left: '130px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapWholeFBD.areas[0].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {wholeFBDPointsData["A"]["verticalForceLabel"]} <NorthIcon sx={{padding: 0}} /><br/>
            {wholeFBDPointsData["A"]["horizontalForceLabel"]} <EastIcon sx={{padding: 0}} /> 
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-375px', 
          left: '-80px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapWholeFBD.areas[2].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "left",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {wholeFBDPointsData["B"]["horizontalForceLabel"]} <EastIcon sx={{padding: 0}} /> <br/>
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-295px', 
          left: '410px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapWholeFBD.areas[1].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {wholeFBDPointsData["D"]["verticalForceLabel"]} <SouthIcon sx={{padding: 0}} />
          </span>
        </div>
      </div>;
  } else if(activeStep === 2){
    notes = 
    <div style={{textAlign: 'left', padding: "0 20px"}}>
      <h3 style={{fontWeight: 400, padding: 0}}>Equations:</h3>
      <span style={{fontWeight: 200, fontSize: "14px", padding: 0}}>
        Note: Fill up the forces in the diagram with the correct labels before 
        answering the equations. Those in underline will be automatically generated
        from the diagram.
      </span>
      <Box mt="15px" mb="30px">
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        > 
          <span style={{fontSize:"20px"}}>
            <FunctionsIcon sx={{fontSize:'2em', verticalAlign: 'bottom'}}/>
            M<sub>F</sub> = 0 = 
            <FormControl FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].firstSignError}>
              <Tooltip 
                title="Sign" 
                arrow
                open = {wholeFBDFirstEquationTooltipOpen}
                onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                placement = "top"
                PopperProps={{style:{zIndex:4}}}
              >
                <Select
                  labelId="select-vertical-force-direction-label"
                  id="select-vertical-force-direction"
                  displayEmpty
                  defaultValue="+"
                  IconComponent = {''}
                  inputProps = {{ sx: { padding: '2px 8px !important' } }}
                  value={ACEAnswers[0]['firstSign']}
                  onChange={(event) => handleFieldUpdate(0, 'firstSign', event.target.value, 'ACE')}
                >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].firstComponentError}>
              <Tooltip 
                title="Component" 
                arrow
                open = {wholeFBDFirstEquationTooltipOpen}
                onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
                <Select
                  labelId="select-vertical-force-direction-label"
                  id="select-vertical-force-direction"
                  displayEmpty
                  defaultValue="1"
                  IconComponent = {''}
                  inputProps = {{ sx: { padding: '2px 8px !important' } }}
                  value={ACEAnswers[0]['firstComponent']}
                  onChange={(event) => handleFieldUpdate(0, 'firstComponent', event.target.value, 'ACE')}
                >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: ACEAnswers[0]['firstComponent'] !== "1" ? "" : "none"}} size="small" >
              <Tooltip 
                title="Value" 
                arrow
                open = {wholeFBDFirstEquationTooltipOpen && ACEAnswers[0]['firstComponent'] !== "1"}
                onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                  error={ACEAnswers[0].firstComponentValueError}
                  value={ACEAnswers[0].firstComponentValue}
                  onChange={(event) => handleFieldUpdate(0, 'firstComponentValue', event.target.value, 'ACE')}
                />
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].firstLabelError}>
              <Tooltip 
                  title="Label" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
              >
                <span>
                  {ACEPointsData["A"]["horizontalForceLabel"] === "" ? '___' : ACEPointsData["A"]["horizontalForceLabel"]} 
                </span>
              </Tooltip>
            </FormControl>       
            (
              <FormControl sx={{verticalAlign: 'bottom'}}>
                <Tooltip 
                  title="Moment Arm" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    error={ACEAnswers[0].firstMomentArmError}
                    inputProps = {{ sx: { padding: '2px 6px !important', width:'58px !important' } }}
                    value={ACEAnswers[0].firstMomentArm}
                    onChange={(event) => handleFieldUpdate(0, 'firstMomentArm', event.target.value, 'ACE')}
                  />
                </Tooltip>
              </FormControl>
            ) 
            
            <br />
            <FormControl sx={{mr:0.25, ml:18.8, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].secondSignError}>
              <Select
                labelId="select-vertical-force-direction-label"
                id="select-vertical-force-direction"
                displayEmpty
                defaultValue="+"
                IconComponent = {''}
                inputProps = {{ sx: { padding: '2px 8px !important' } }}
                value={ACEAnswers[0].secondSign}
                onChange={(event) => handleFieldUpdate(0, 'secondSign', event.target.value, 'ACE')}
              >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
              </Select>
            </FormControl> 
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].secondComponentError}>
              <Select
                labelId="select-vertical-force-direction-label"
                id="select-vertical-force-direction"
                displayEmpty
                defaultValue="1"
                IconComponent = {''}
                inputProps = {{ sx: { padding: '2px 8px !important' } }}
                value={ACEAnswers[0].secondComponent}
                onChange={(event) => handleFieldUpdate(0, 'secondComponent', event.target.value, 'ACE')}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: ACEAnswers[0]['secondComponent'] !== "1" ? "" : "none"}} size="small" >
              <TextField 
                id="outlined-basic" 
                size="small"
                inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                error={ACEAnswers[0].secondComponentValueError}
                value={ACEAnswers[0].secondComponentValue}
                onChange={(event) => handleFieldUpdate(0, 'secondComponentValue', event.target.value, 'ACE')}
              />
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].secondLabelError}>
              <span>
                {ACEPointsData["100"]["horizontalForceLabel"] === "" ? '___' : ACEPointsData["100"]["horizontalForceLabel"]} 
              </span>
            </FormControl>
            (
            <FormControl sx={{verticalAlign: 'bottom'}}>
              <TextField 
                id="outlined-basic" 
                size="small"
                error={ACEAnswers[0].secondMomentArmError}
                inputProps = {{ sx: { padding: '2px 6px !important', width:'58px !important' } }}
                value={ACEAnswers[0].secondMomentArm}
                onChange={(event) => handleFieldUpdate(0, 'secondMomentArm', event.target.value, 'ACE')}
              />
            </FormControl>
            )
            <br />
            <FormControl sx={{mr:0.25, ml:18.8, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].thirdSignError}>
              <Select
                labelId="select-vertical-force-direction-label"
                id="select-vertical-force-direction"
                displayEmpty
                defaultValue="+"
                IconComponent = {''}
                inputProps = {{ sx: { padding: '2px 8px !important' } }}
                value={ACEAnswers[0].thirdSign}
                onChange={(event) => handleFieldUpdate(0, 'thirdSign', event.target.value, 'ACE')}
              >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
              </Select>
            </FormControl> 
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].thirdComponentError}>
              <Select
                labelId="select-vertical-force-direction-label"
                id="select-vertical-force-direction"
                displayEmpty
                defaultValue="1"
                IconComponent = {''}
                inputProps = {{ sx: { padding: '2px 8px !important' } }}
                value={ACEAnswers[0].thirdComponent}
                onChange={(event) => handleFieldUpdate(0, 'thirdComponent', event.target.value, 'ACE')}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: ACEAnswers[0]['thirdComponent'] !== "1" ? "" : "none"}} size="small" >
              <TextField 
                id="outlined-basic" 
                size="small"
                inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                error={ACEAnswers[0].thirdComponentValueError}
                value={ACEAnswers[0].thirdComponentValue}
                onChange={(event) => handleFieldUpdate(0, 'thirdComponentValue', event.target.value, 'ACE')}
              />
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].thirdLabelError}>
              <span>
                {ACEPointsData["F"]["inclinedForceLabel"] === "" ? '___' : ACEPointsData["F"]["inclinedForceLabel"]} 
              </span>
            </FormControl>
            (
            <FormControl sx={{verticalAlign: 'bottom'}}>
              <TextField 
                id="outlined-basic" 
                size="small"
                error={ACEAnswers[0].thirdMomentArmError}
                inputProps = {{ sx: { padding: '2px 6px !important', width:'58px !important' } }}
                value={ACEAnswers[0].thirdMomentArm}
                onChange={(event) => handleFieldUpdate(0, 'thirdMomentArm', event.target.value, 'ACE')}
              />
            </FormControl>
            )
            <br />
            <FormControl sx={{mr:0.25, ml:18.8, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].fourthSignError}>
              <Select
                labelId="select-vertical-force-direction-label"
                id="select-vertical-force-direction"
                displayEmpty
                defaultValue="+"
                IconComponent = {''}
                inputProps = {{ sx: { padding: '2px 8px !important' } }}
                value={ACEAnswers[0].fourthSign}
                onChange={(event) => handleFieldUpdate(0, 'fourthSign', event.target.value, 'ACE')}
              >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
              </Select>
            </FormControl> 
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].fourthComponentError}>
              <Select
                labelId="select-vertical-force-direction-label"
                id="select-vertical-force-direction"
                displayEmpty
                defaultValue="1"
                IconComponent = {''}
                inputProps = {{ sx: { padding: '2px 8px !important' } }}
                value={ACEAnswers[0].fourthComponent}
                onChange={(event) => handleFieldUpdate(0, 'fourthComponent', event.target.value, 'ACE')}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: ACEAnswers[0]['fourthComponent'] !== "1" ? "" : "none"}} size="small" >
              <TextField 
                id="outlined-basic" 
                size="small"
                inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                error={ACEAnswers[0].fourthComponentValueError}
                value={ACEAnswers[0].fourthComponentValue}
                onChange={(event) => handleFieldUpdate(0, 'fourthComponentValue', event.target.value, 'ACE')}
              />
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].fourthLabelError}>
              <span>
                {ACEPointsData["F"]["inclinedForceLabel"] === "" ? '___' : ACEPointsData["F"]["inclinedForceLabel"]} 
              </span>
            </FormControl>
            (
            <FormControl sx={{verticalAlign: 'bottom'}}>
              <TextField 
                id="outlined-basic" 
                size="small"
                error={ACEAnswers[0].fourthMomentArmError}
                inputProps = {{ sx: { padding: '2px 6px !important', width:'58px !important' } }}
                value={ACEAnswers[0].fourthMomentArm}
                onChange={(event) => handleFieldUpdate(0, 'fourthMomentArm', event.target.value, 'ACE')}
              />
            </FormControl>
            )
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}>
          <h2 style={{padding: '20px', 
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            F<sub style={{fontSize: "12px"}}>BC</sub> = 
            <Tooltip 
                title="Answer for summation of moment at F" 
                arrow
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
              <TextField 
                id="outlined-basic" 
                size="small"
                error={ACEAnswers[0].answerError}
                inputProps = {{ sx: { padding: '2px 10px !important', width:'75px !important' } }}
                value={ACEAnswers[0].answer}
                onChange={(event) => handleFieldUpdate(0, 'answer', event.target.value, 'ACE')}
              />
            </Tooltip>
            N, 
            <FormControl sx={{mr:0.25, ml:0.5, verticalAlign: 'bottom'}} size="small" error={ACEAnswers[0].answerDirectionError}>
              <Tooltip 
                title="Force direction" 
                arrow
                placement = "top"
                PopperProps={{style:{zIndex:4}}}
              >
                <Select
                  labelId="select-vertical-force-direction-label"
                  id="select-vertical-force-direction"
                  displayEmpty
                  defaultValue="1"
                  IconComponent = {''}
                  inputProps = {{ sx: { padding: '4px 8px 0px 8px !important' } }}
                  value={ACEAnswers[0].answerDirection}
                  onChange={(event) => handleFieldUpdate(0, 'answerDirection', event.target.value, 'ACE')}
                >
                <MenuItem value="up"><NorthIcon /></MenuItem>
                <MenuItem value="down"><SouthIcon /></MenuItem>
                <MenuItem value="left"><WestIcon /></MenuItem>
                <MenuItem value="right"><EastIcon /></MenuItem>
                <MenuItem value="c">C</MenuItem>
                <MenuItem value="t">T</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
          </h2>
        </div>
      </Box>
    </div>;
    diagram = 
      <div style={{textAlign: 'center', height: '420px'}}>
        <ImageMapper 
          src = '/practice_2_ACE.png' 
          map = {mapACE} 
          onClick = {(area) => handleOpenWholeWholeDialog(area)}
          width = {400}
          height = {420}
          key={checkAnswersToggle} 
          sx = {{position:'absolute'}}
        />
        <IconButton aria-label="info" onClick={handleOpenDiagramHelpDialog} size="large" color="warning" sx={{ position:"relative", top: '-430px', right: '140px', zIndex: 5}}>
          <InfoIcon />
        </IconButton>
        <div style={{
          position: "relative", 
          top: '-470px', 
          left: '195px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapACE.areas[0].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {ACEPointsData["A"]["horizontalForceLabel"]} <WestIcon sx={{padding: 0}} /> <br/>
            {ACEPointsData["A"]["verticalForceLabel"]} <NorthIcon sx={{padding: 0}} />
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-315px', 
          left: '195px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapACE.areas[1].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {ACEPointsData["100"]["horizontalForceLabel"]} <EastIcon sx={{padding: 0}} /> <br/>
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-300px', 
          left: '195px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapACE.areas[2].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {ACEPointsData["C"]["horizontalForceLabel"]} <EastIcon sx={{padding: 0}} /> <br/>
            {ACEPointsData["C"]["verticalForceLabel"]} <NorthIcon sx={{padding: 0}} />
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-295px', 
          left: '300px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapACE.areas[3].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {ACEPointsData["F"]["inclinedForceLabel"]} <NorthEastIcon sx={{padding: 0}} /> <br/>
          </span>
        </div>
      </div>;
  } else if(activeStep === 3){
    notes = 
    <div style={{textAlign: 'left', padding: "0 20px"}}>
      <h3 style={{fontWeight: 400, padding: 0}}>Equations:</h3>
      <span style={{fontWeight: 200, fontSize: "14px", padding: 0}}>
        Note: Fill up the forces in the diagram with the correct labels before 
        answering the equations. Those in underline will be automatically generated 
        from the diagram.
      </span>
      <Box mt="15px" mb="30px">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}>
          <h2 style={{padding: '20px', 
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              width: '100%'
            }}>
            D<sub style={{fontSize: "12px"}}>X</sub> = 
            { pulleyDPointsData["Top"]["horizontalForceLabel"] !== "" ? pulleyDPointsData["Top"]["horizontalForceLabel"] : '___'}
            N, 
            <FormControl sx={{mr:0.25, ml:0.5, verticalAlign: 'bottom'}} size="small" error={pulleyDAnswers[0].answerDirectionError}>
              <Tooltip 
                title="Force direction" 
                arrow
                placement = "top"
                PopperProps={{style:{zIndex:4}}}
              >
                <Select
                  labelId="select-vertical-force-direction-label"
                  id="select-vertical-force-direction"
                  displayEmpty
                  defaultValue="1"
                  IconComponent = {''}
                  inputProps = {{ sx: { padding: '4px 8px 0px 8px !important' } }}
                  value={pulleyDAnswers[0].answerDirection}
                  onChange={(event) => handleFieldUpdate(0, 'answerDirection', event.target.value, 'pulleyD')}
                >
                <MenuItem value="up"><NorthIcon /></MenuItem>
                <MenuItem value="down"><SouthIcon /></MenuItem>
                <MenuItem value="left"><WestIcon /></MenuItem>
                <MenuItem value="right"><EastIcon /></MenuItem>
                <MenuItem value="c">C</MenuItem>
                <MenuItem value="t">T</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
          </h2>
          <h2 style={{padding: '20px', 
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            D<sub style={{fontSize: "12px"}}>Y</sub> = 
            { pulleyDPointsData["Right"]["verticalForceLabel"] !== "" ? pulleyDPointsData["Right"]["verticalForceLabel"] : '___'}
            N, 
            <FormControl sx={{mr:0.25, ml:0.5, verticalAlign: 'bottom'}} size="small" error={pulleyDAnswers[1].answerDirectionError}>
              <Tooltip 
                title="Force direction" 
                arrow
                placement = "top"
                PopperProps={{style:{zIndex:4}}}
              >
                <Select
                  labelId="select-vertical-force-direction-label"
                  id="select-vertical-force-direction"
                  displayEmpty
                  defaultValue="1"
                  IconComponent = {''}
                  inputProps = {{ sx: { padding: '4px 8px 0px 8px !important' } }}
                  value={pulleyDAnswers[1].answerDirection}
                  onChange={(event) => handleFieldUpdate(1, 'answerDirection', event.target.value, 'pulleyD')}
                >
                <MenuItem value="up"><NorthIcon /></MenuItem>
                <MenuItem value="down"><SouthIcon /></MenuItem>
                <MenuItem value="left"><WestIcon /></MenuItem>
                <MenuItem value="right"><EastIcon /></MenuItem>
                <MenuItem value="c">C</MenuItem>
                <MenuItem value="t">T</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            </h2>
        </div>
      </Box>
    </div>;
    diagram = 
      <div style={{textAlign: 'center', height: '300px'}}>
        <ImageMapper 
          src = '/practice_2_pulley_d.png' 
          map = {mapPulleyD} 
          onClick = {(area) => handleOpenWholeWholeDialog(area)}
          width = {400}
          height = {330}
          key={checkAnswersToggle} 
        />
        <IconButton aria-label="info" onClick={handleOpenDiagramHelpDialog} size="large" color="warning" sx={{ position:"relative", top: '-330px', right: '120px', zIndex: 5}}>
          <InfoIcon />
        </IconButton>
        <div style={{
          position: "relative", 
          top: '-340px', 
          left: '100px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapPulleyD.areas[0].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {pulleyDPointsData["Top"]["horizontalForceLabel"]} <WestIcon sx={{padding: 0}} /> <br/>
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-370px', 
          left: '265px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapPulleyD.areas[1].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {pulleyDPointsData["D"]["horizontalForceLabel"]} <EastIcon sx={{padding: 0}} /> <br/>
            {pulleyDPointsData["D"]["verticalForceLabel"]} <NorthIcon sx={{padding: 0}} />
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-300px', 
          left: '285px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapPulleyD.areas[2].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {pulleyDPointsData["Right"]["verticalForceLabel"]} <SouthIcon sx={{padding: 0}} />
          </span>
        </div>
      </div>;
  } else if(activeStep === 4){
    notes = 
    <div style={{textAlign: 'left', padding: "0 20px"}}>
        <h3 style={{fontWeight: 400, padding: 0}}>Equations:</h3>
        <span style={{fontWeight: 200, fontSize: "14px", padding: 0}}>
          Note: Fill up the forces in the diagram with the correct labels before 
          answering the equations. Those in underline will be automatically generated 
          from the diagram.
        </span>
        <Box mt="15px" mb="30px">
          <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          > 
            <span style={{fontSize:"20px"}}>
              <FunctionsIcon sx={{fontSize:'2em', verticalAlign: 'bottom'}}/>
              F<sub>x</sub> = 0 = 
              <FormControl FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[0].firstSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[0]['firstSign']}
                    onChange={(event) => handleFieldUpdate(0, 'firstSign', event.target.value, 'pinD')}
                  >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[0].firstComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[0]['firstComponent']}
                    onChange={(event) => handleFieldUpdate(0, 'firstComponent', event.target.value, 'pinD')}
                  >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="cos">cos</MenuItem>
                  <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: pinDAnswers[0]['firstComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen && pinDAnswers[0]['firstComponent'] !== "1"}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={pinDAnswers[0].firstComponentValueError}
                    value={pinDAnswers[0].firstComponentValue}
                    onChange={(event) => handleFieldUpdate(0, 'firstComponentValue', event.target.value, 'pinD')}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[0].firstLabelError}>
                <Tooltip 
                    title="Label" 
                    arrow
                    open = {wholeFBDFirstEquationTooltipOpen}
                    onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                    onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                    placement = "top"
                    PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {pinDPointsData["CD"]["horizontalForceLabel"] === "" ? '___' : pinDPointsData["CD"]["horizontalForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>       
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[0].secondSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[0].secondSign}
                    onChange={(event) => handleFieldUpdate(0, 'secondSign', event.target.value, 'pinD')}
                  >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl> 
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[0].secondComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[0].secondComponent}
                    onChange={(event) => handleFieldUpdate(0, 'secondComponent', event.target.value, 'pinD')}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="cos">cos</MenuItem>
                    <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: pinDAnswers[0]['secondComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen && pinDAnswers[0]['secondComponent'] !== "1"}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={pinDAnswers[0].secondComponentValueError}
                    value={pinDAnswers[0].secondComponentValue}
                    onChange={(event) => handleFieldUpdate(0, 'secondComponentValue', event.target.value, 'pinD')}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[0].secondLabelError}>
                <Tooltip 
                  title="Label" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {pinDPointsData["F"]["inclinedForceLabel"] === "" ? '___' : pinDPointsData["F"]["inclinedForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>       
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[0].thirdSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[0].thirdSign}
                    onChange={(event) => handleFieldUpdate(0, 'thirdSign', event.target.value, 'pinD')}
                  >
                    <MenuItem value="+">+</MenuItem>
                    <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl> 
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[0].thirdComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[0].thirdComponent}
                    onChange={(event) => handleFieldUpdate(0, 'thirdComponent', event.target.value, 'pinD')}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="cos">cos</MenuItem>
                    <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: pinDAnswers[0]['thirdComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen && pinDAnswers[0]['thirdComponent'] !== "1"}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={pinDAnswers[0].thirdComponentValueError}
                    value={pinDAnswers[0].thirdComponentValue}
                    onChange={(event) => handleFieldUpdate(0, 'thirdComponentValue', event.target.value, 'pinD')}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[0].thirdLabelError}>
                <Tooltip 
                  title="Label" 
                  arrow
                  open = {wholeFBDFirstEquationTooltipOpen}
                  onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {pinDPointsData["D"]["horizontalForceLabel"] === "" ? '___' : pinDPointsData["D"]["horizontalForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
          }}>
            <h2 style={{padding: '20px', 
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              CD<sub>x</sub> = 
              <Tooltip 
                  title="Answer for summation of moment at A" 
                  arrow
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  error={pinDAnswers[0].answerError}
                  inputProps = {{ sx: { padding: '2px 10px !important', width:'75px !important' } }}
                  value={pinDAnswers[0].answer}
                  onChange={(event) => handleFieldUpdate(0, 'answer', event.target.value, 'pinD')}
                />
              </Tooltip>
              N, 
              <FormControl sx={{mr:0.25, ml:0.5, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[0].answerDirectionError}>
                <Tooltip 
                  title="Force direction" 
                  arrow
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '4px 8px 0px 8px !important' } }}
                    value={pinDAnswers[0].answerDirection}
                    onChange={(event) => handleFieldUpdate(0, 'answerDirection', event.target.value, 'pinD')}
                  >
                  <MenuItem value="up"><NorthIcon /></MenuItem>
                  <MenuItem value="down"><SouthIcon /></MenuItem>
                  <MenuItem value="left"><WestIcon /></MenuItem>
                  <MenuItem value="right"><EastIcon /></MenuItem>
                  <MenuItem value="c">C</MenuItem>
                  <MenuItem value="t">T</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
            </h2>
          </div>
        </Box>
        <Box mt="15px" mb="30px">
          <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          > 
            <span style={{fontSize:"20px"}}>
              <FunctionsIcon sx={{fontSize:'2em', verticalAlign: 'bottom'}}/>
              F<sub>y</sub> = 0 = 
              <FormControl FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[1].firstSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[1]['firstSign']}
                    onChange={(event) => handleFieldUpdate(1, 'firstSign', event.target.value, 'pinD')}
                  >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[1].firstComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[1]['firstComponent']}
                    onChange={(event) => handleFieldUpdate(1, 'firstComponent', event.target.value, 'pinD')}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="cos">cos</MenuItem>
                    <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: pinDAnswers[1]['firstComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen && pinDAnswers[1]['firstComponent'] !== "1"}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={pinDAnswers[1].firstComponentValueError}
                    value={pinDAnswers[1].firstComponentValue}
                    onChange={(event) => handleFieldUpdate(1, 'firstComponentValue', event.target.value, 'pinD')}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[1].firstLabelError}>
                <Tooltip 
                    title="Label" 
                    arrow
                    open = {wholeFBDSecondEquationTooltipOpen}
                    onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                    onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                    placement = "top"
                    PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {pinDPointsData["CD"]["verticalForceLabel"] === "" ? '___' : pinDPointsData["CD"]["verticalForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>       
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[1].secondSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[1].secondSign}
                    onChange={(event) => handleFieldUpdate(1, 'secondSign', event.target.value, 'pinD')}
                  >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl> 
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[1].secondComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[1].secondComponent}
                    onChange={(event) => handleFieldUpdate(1, 'secondComponent', event.target.value, 'pinD')}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="cos">cos</MenuItem>
                    <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: pinDAnswers[1]['secondComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen && pinDAnswers[1]['secondComponent'] !== "1"}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={pinDAnswers[1].secondComponentValueError}
                    value={pinDAnswers[1].secondComponentValue}
                    onChange={(event) => handleFieldUpdate(1, 'secondComponentValue', event.target.value, 'pinD')}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[1].secondLabelError}>
                <Tooltip 
                  title="Label" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {pinDPointsData["F"]["inclinedForceLabel"] === "" ? '___' : pinDPointsData["F"]["inclinedForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>       
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[1].thirdSignError}>
                <Tooltip 
                  title="Sign" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="+"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[1].thirdSign}
                    onChange={(event) => handleFieldUpdate(1, 'thirdSign', event.target.value, 'pinD')}
                  >
                    <MenuItem value="+">+</MenuItem>
                    <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl> 
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[1].thirdComponentError}>
                <Tooltip 
                  title="Component" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '2px 8px !important' } }}
                    value={pinDAnswers[1].thirdComponent}
                    onChange={(event) => handleFieldUpdate(1, 'thirdComponent', event.target.value, 'pinD')}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="cos">cos</MenuItem>
                    <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: pinDAnswers[1]['thirdComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen && pinDAnswers[1]['thirdComponent'] !== "1"}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                    error={pinDAnswers[1].thirdComponentValueError}
                    value={pinDAnswers[1].thirdComponentValue}
                    onChange={(event) => handleFieldUpdate(1, 'thirdComponentValue', event.target.value, 'pinD')}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[1].thirdLabelError}>
                <Tooltip 
                  title="Label" 
                  arrow
                  open = {wholeFBDSecondEquationTooltipOpen}
                  onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {pinDPointsData["D"]["verticalForceLabel"] === "" ? '___' : pinDPointsData["D"]["verticalForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
          }}>
            <h2 style={{padding: '20px', 
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              CD<sub>y</sub> = 
              <Tooltip 
                  title="Answer for summation of moment at A" 
                  arrow
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  error={pinDAnswers[1].answerError}
                  inputProps = {{ sx: { padding: '2px 10px !important', width:'75px !important' } }}
                  value={pinDAnswers[1].answer}
                  onChange={(event) => handleFieldUpdate(1, 'answer', event.target.value, 'pinD')}
                />
              </Tooltip>
              N, 
              
              <FormControl sx={{mr:0.25, ml:0.5, verticalAlign: 'bottom'}} size="small" error={pinDAnswers[1].answerDirectionError}>
                <Tooltip 
                  title="Force direction" 
                  arrow
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <Select
                    labelId="select-vertical-force-direction-label"
                    id="select-vertical-force-direction"
                    displayEmpty
                    defaultValue="1"
                    IconComponent = {''}
                    inputProps = {{ sx: { padding: '4px 8px 0px 8px !important' } }}
                    value={pinDAnswers[1].answerDirection}
                    onChange={(event) => handleFieldUpdate(1, 'answerDirection', event.target.value, 'pinD')}
                  >
                  <MenuItem value="up"><NorthIcon /></MenuItem>
                  <MenuItem value="down"><SouthIcon /></MenuItem>
                  <MenuItem value="left"><WestIcon /></MenuItem>
                  <MenuItem value="right"><EastIcon /></MenuItem>
                  <MenuItem value="c">C</MenuItem>
                  <MenuItem value="t">T</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
            </h2>
          </div>
        </Box>
    </div>;
    diagram = 
      <div style={{textAlign: 'center', height: '400px'}}>
        <ImageMapper 
          src = '/practice_2_pin_d.png' 
          map = {mapPinD} 
          onClick = {(area) => handleOpenWholeWholeDialog(area)}
          width = {400}
          height = {400}
          key={checkAnswersToggle} 
        />
        <IconButton aria-label="info" onClick={handleOpenDiagramHelpDialog} size="large" color="warning" sx={{ position:"relative", top: '-300px', right: '100px', zIndex: 5}}>
          <InfoIcon />
        </IconButton>
        <div style={{
          position: "relative", 
          top: '-340px', 
          left: '255px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapPinD.areas[0].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {pinDPointsData["CD"]["verticalForceLabel"]} <NorthIcon sx={{padding: 0}} /><br/>
            {pinDPointsData["CD"]["horizontalForceLabel"]} <EastIcon sx={{padding: 0}} /> 
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-350px', 
          left: '70px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapPinD.areas[1].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {pinDPointsData["D"]["horizontalForceLabel"]} <WestIcon sx={{padding: 0}} /> <br/>
            {pinDPointsData["D"]["verticalForceLabel"]} <SouthIcon sx={{padding: 0}} />
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-300px', 
          left: '65px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapPinD.areas[2].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{fontSize: '2em', padding:0}}>
            {pinDPointsData["F"]["inclinedForceLabel"]} <NorthEastIcon sx={{padding: 0}} />
          </span>
        </div>
      </div>;
  } else{
    notes = 
      <div style={{padding: "0 20px"}}>
        <div style={{
          width: "100%", 
          textAlign:"center",
          display: !revealFinalAnswer ? '' : 'none',
          padding: 0,
        }}>
          <h3>Answers will be revealed after clearing all sections</h3>
        </div>
        <div style={{
            opacity: revealFinalAnswer ? 1 : 0,
            transition: 'visibility 0s, opacity 0.5s linear',
            visibility: revealFinalAnswer ? 'visible' : 'hidden',
            padding: 0,
          }}>
          <p style={{margin:0}}>
            <span className={styles.answer}>CDx</span> = 166.2456 N, <WestIcon sx={{fontSize: ".8rem", p:0}}/> <br/>
            <span className={styles.answer}>CDy</span> = 41.9977 N, <SouthIcon sx={{fontSize: ".8rem", p:0}}/> <br/>
            <span className={styles.answer}>Dx</span> = 100 N, <WestIcon sx={{fontSize: ".8rem", p:0}}/> <br/>
            <span className={styles.answer}>Dy</span> = 100 N, <SouthIcon sx={{fontSize: ".8rem", p:0}}/> <br/>
            <span className={styles.answer}>F<sub>ED</sub></span> = 301.7450 N, C <br/>
          </p>

        </div>
      </div>;
    diagram = <div style={{textAlign: 'center'}}><img src="/practice_2_whole_fbd.png" style={{ maxHeight: "450px", width:"100%"}} alt="Whole FBD"></img></div>;
  }
  return (
    <Layout>
      <div>
        <PointDialog 
          openDialog={openWholeWholeADialog} 
          pointID={pointID} 
          key={pointID} 
          section={activeStep} 
          pointsData={
            activeStep === 1 ? wholeFBDPointsData : 
            activeStep === 2 ? ACEPointsData :
            activeStep === 3 ? pulleyDPointsData :
            pinDPointsData
          } 
          savePoints={savePoints} 
          setOpenDialog={setOpenWholeFBDDialog} 
        />
        <DiagramHelp 
          openDialog={openDiagramHelpDialog} 
          closeDialog={closeDialogs} 
          setOpenDialog={setDiagramHelpDialog} 
        />
        <AnswersHelp 
          openDialog={openAnswersHelpDialog} 
          closeDialog={closeDialogs} 
          setOpenDialog={setAnswersHelpDialog} 
        />
        <h2 style={{marginBottom: "5px"}}>Practice Problem 2</h2>
        <h3 style={{fontWeight: 400}}>
          Determine the forces acting on the pin at point D.
        </h3>
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
              padding: '0',
            }}>
                <React.Fragment>
                  <span style={{  textAlign: 'center' }}>
                    <Typography variant='h6' sx={{ mt: 2, mb: 0, py: 1, color: completed[activeStep] ? '#5EBA7D' : ''}}>
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
                      variant="outlined"
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <IconButton onClick={handleOpenAnswersHelpDialog} size="large" color="warning" aria-label="delete" sx={{ mr:1, display:activeStep === 5 ? "none": ""}}>
                      <InfoIcon />
                    </IconButton>
                    <Button variant="contained" onClick={handleComplete} sx={{ mr: 1 }}>
                      {isLastStep() ? 'Reveal Answers' : 'Check Answers'}
                    </Button>
                  </Box>
                </React.Fragment>
            </div>
          </Grid>
        </Grid>
        <Snackbar open={snackbarInfo[0]} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} variant="filled"  severity={snackbarInfo[1]} sx={{ width: '100%' }}>
            {snackbarInfo[2]}
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  )
}
