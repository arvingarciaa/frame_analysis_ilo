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
import NorthWestIcon from '@mui/icons-material/NorthWest';
import SouthIcon from '@mui/icons-material/South';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

const steps = [
  'Determine 2-Force Members',
  'Whole FBD without pulley H',
  'FBD of FCD',
  'Final Answers',
];
const WRONG_PREFILL = "#d813134c"
const DEFAULT_PREFILL = "#fcba034c"
const CORRECT_PREFILL = "#3de2744C"


const MAP = {
  name: "my-map",
  areas: [
    {
      id: 0,
      title: "FCD",
      name: 2,
      shape: "rect",
      coords: [
        355,
        123,
        376,
        354,
      ],
      fillColor: "#00ff194c",
      strokeColor: "black",
    },
    {
      id: 3,
      title: "Whole FBD",
      name: 1,
      shape: "poly",
      coords: [
        145,
        275,
        435,
        80,
        435,
        109,
        385,
        147,
        385,
        305,
        145,
        305,
      ],
      fillColor: "#00ff194c",
      strokeColor: "black",
    },
    
  ]
};

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
  const [wholeFBDHasError, setWholeFBDHasError] = React.useState(false);
  const [revealFinalAnswer, setRevealFinalAnswer] = React.useState(false);
  const [FCDHasError, setFCDHasError] = React.useState(false);
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
    "G": {
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
  const [FCDPointsData, setFCDPointsData] = React.useState({
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
    "9.25": {
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
    "Fbc": {
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
  const [pointID, setPointID] = React.useState('');
  const [pointDialogTitle, setPointDialogTitle] = React.useState('');
  const [mapWholeFBD, setMapWholeFBD] = React.useState({
    name: "my-map",
    areas: [
      {
        id: 0,
        title: "G",
        name: "G",
        shape: "rect",
        coords: [
          495,
          20,
          525,
          90,
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
          385,
          350,
          425,
          400,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 2,
        title: "A",
        name: "A",
        shape: "rect",
        coords: [
          78,
          278,
          125,
          325,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
    ]
  });
  const [mapFCD, setMapFCD] = React.useState({
    name: "FCD-map",
    areas: [
      {
        id: 0,
        title: "F",
        name: "F",
        shape: "rect",
        coords: [
          277,
          8,
          321,
          53,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 1,
        title: "9.25",
        name: "9.25",
        shape: "rect",
        coords: [
          277,
          155,
          321,
          200,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 2,
        title: "Fbc",
        name: "Fbc",
        shape: "rect",
        coords: [
          277,
          225,
          321,
          270,
        ],
        fillColor: "#00ff194c",
        strokeColor: "black",
        preFillColor: DEFAULT_PREFILL, 
      },
      {
        id: 3,
        title: "D",
        name: "D",
        shape: "rect",
        coords: [
          277,
          340,
          321,
          385,
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
      firstLabel: 'D',
      firstLabelError: false,
      firstMomentArm: '',
      firstMomentArmError: false,
      secondSign: '+',
      secondSignError: false,
      secondComponent: "1",
      secondComponentError: false,
      secondComponentValue: "",
      secondComponentValueError: false,
      secondLabel: '9.25',
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
      secondLabel: "9.25",
      secondLabelError: false,
      thirdSign: "+",
      thirdSignError: false,
      thirdComponent: "1",
      thirdComponentError: false,
      thirdComponentValue: "",
      thirdComponentValueError: false,
      thirdLabel: "D",
      thirdLabelError: false,
      answer: "",
      answerError: false,
      answerDirection: '',
      answerDirectionError: false,
    },
  ])
  const [FCDAnswers, setFCDAnswers] = React.useState([
    {
      firstSign: "+",
      firstSignError: false,
      firstComponent: "1",
      firstComponentError: false,
      firstComponentValue: "",
      firstComponentValueError: false,
      firstLabel: 'Fbc',
      firstLabelError: false,
      firstMomentArm: '',
      firstMomentArmError: false,
      secondSign: '+',
      secondSignError: false,
      secondComponent: "1",
      secondComponentError: false,
      secondComponentValue: "",
      secondComponentValueError: false,
      secondLabel: '9.25',
      secondLabelError: false,
      secondMomentArm: '',
      secondMomentArmError: false,
      answer: '',
      answerError: false,
    },
    {
      firstSign: "+",
      firstSignError: false,
      firstComponent: "1",
      firstComponentError: false,
      firstComponentValue: "",
      firstComponentValueError: false,
      firstLabel: 'Fx',
      firstLabelError: false,
      secondSign: '+',
      secondSignError: false,
      secondComponent: "1",
      secondComponentError: false,
      secondComponentValue: "",
      secondComponentValueError: false,
      secondLabel: 'Fbc',
      secondLabelError: false,
      thirdSign: "+",
      thirdSignError: false,
      thirdComponent: "1",
      thirdComponentError: false,
      thirdComponentValue: "",
      thirdComponentValueError: false,
      thirdLabel: '9.25',
      thirdLabelError: false,
      answer: '',
      answerError: false,
    },
    {
      firstSign: "+",
      firstSignError: false,
      firstComponent: "1",
      firstComponentError: false,
      firstComponentValue: "",
      firstComponentValueError: false,
      firstLabel: "Fy",
      firstLabelError: false,
      secondSign: "+",
      secondSignError: false,
      secondComponent: "1",
      secondComponentError: false,
      secondComponentValue: "",
      secondComponentValueError: false,
      secondLabel: "Fbc",
      secondLabelError: false,
      thirdSign: "+",
      thirdSignError: false,
      thirdComponent: "1",
      thirdComponentError: false,
      thirdComponentValue: "1",
      thirdComponentValueError: false,
      thirdLabel: "9.25",
      thirdLabelError: false,
      answer: "",
      answerError: false,
    },
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
    newWholeFBDAnswers[0]['firstLabelError'] = newWholeFBDAnswers[0]['firstLabel'] !== "D";
    newWholeFBDAnswers[0]['firstMomentArmError'] = newWholeFBDAnswers[0]['firstMomentArm'] !== "2.28194";
    newWholeFBDAnswers[0]['secondSignError'] = newWholeFBDAnswers[0]['secondSign'] !== "-";
    newWholeFBDAnswers[0]['secondComponentError'] = newWholeFBDAnswers[0]['secondComponent'] !== "1";
    newWholeFBDAnswers[0]['secondLabelError'] = newWholeFBDAnswers[0]['secondLabel'] !== "9.25";
    newWholeFBDAnswers[0]['secondMomentArmError'] = newWholeFBDAnswers[0]['secondMomentArm'] !== "3.00322";
    newWholeFBDAnswers[0]['answerError'] = newWholeFBDAnswers[0]['answer'] !== "12.17378";
    newWholeFBDAnswers[0]['answerDirectionError'] = newWholeFBDAnswers[0]['answerDirection'] !== "up";
    
    //Equation #2
    newWholeFBDAnswers[1]['firstSignError'] = newWholeFBDAnswers[1]['firstSign'] !== "+";
    newWholeFBDAnswers[1]['firstComponentError'] = newWholeFBDAnswers[1]['firstComponent'] !== "1";
    newWholeFBDAnswers[1]['firstLabelError'] = newWholeFBDAnswers[1]['firstLabel'] !== "Ax";
    newWholeFBDAnswers[1]['answerError'] = newWholeFBDAnswers[1]['answer'] !== "0";

    //Equation #3
    newWholeFBDAnswers[2]['firstSignError'] = newWholeFBDAnswers[2]['firstSign'] !== "+";
    newWholeFBDAnswers[2]['firstComponentError'] = newWholeFBDAnswers[2]['firstComponent'] !== "1";
    newWholeFBDAnswers[2]['firstLabelError'] = newWholeFBDAnswers[2]['firstLabel'] !== "Ay"
    newWholeFBDAnswers[2]['secondSignError'] = newWholeFBDAnswers[2]['secondSign'] !== "-";
    newWholeFBDAnswers[2]['secondComponentError'] = newWholeFBDAnswers[2]['secondComponent'] !== "1";
    newWholeFBDAnswers[2]['secondLabelError'] = newWholeFBDAnswers[2]['secondLabel'] !== "9.25";
    newWholeFBDAnswers[2]['thirdSignError'] = newWholeFBDAnswers[2]['thirdSign'] !== "+";
    newWholeFBDAnswers[2]['thirdComponentError'] = newWholeFBDAnswers[2]['thirdComponent'] !== "1";
    newWholeFBDAnswers[2]['thirdLabelError'] = newWholeFBDAnswers[2]['thirdLabel'] !== "D";
    newWholeFBDAnswers[2]['answerError'] = newWholeFBDAnswers[2]['answer'] !== "2.92378";
    newWholeFBDAnswers[2]['answerDirectionError'] = newWholeFBDAnswers[2]['answerDirection'] !== "down";

    setWholeFBDHasError(
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
      newWholeFBDAnswers[1]['answerError'] ||
      newWholeFBDAnswers[2]['firstSignError'] ||
      newWholeFBDAnswers[2]['firstComponentError'] ||
      newWholeFBDAnswers[2]['firstLabelError'] ||
      newWholeFBDAnswers[2]['secondSignError'] ||
      newWholeFBDAnswers[2]['secondComponentError'] ||
      newWholeFBDAnswers[2]['secondLabelError'] ||
      newWholeFBDAnswers[2]['thirdSignError'] ||
      newWholeFBDAnswers[2]['thirdComponentError'] ||
      newWholeFBDAnswers[2]['thirdLabelError'] ||
      newWholeFBDAnswers[2]['answerError'] ||
      newWholeFBDAnswers[2]['answerDirectionError']
    )
  }

  const checkFCDAnswers = () => {
    const newFCDAnswers = [...FCDAnswers];
    //Equation #1
    newFCDAnswers[0]['firstSignError'] = newFCDAnswers[0]['firstSign'] !== "-";
    newFCDAnswers[0]['firstComponentError'] = newFCDAnswers[0]['firstComponent'] !== "cos";
    newFCDAnswers[0]['firstComponentValueError'] = newFCDAnswers[0]['firstComponentValue'] !== "21.80141";
    newFCDAnswers[0]['firstLabelError'] = newFCDAnswers[0]['firstLabel'] !== "Fbc";
    newFCDAnswers[0]['firstMomentArmError'] = newFCDAnswers[0]['firstMomentArm'] !== "1.75099";
    newFCDAnswers[0]['secondSignError'] = newFCDAnswers[0]['secondSign'] !== "-";
    newFCDAnswers[0]['secondComponentError'] = newFCDAnswers[0]['secondComponent'] !== "cos";
    newFCDAnswers[0]['secondComponentValueError'] = newFCDAnswers[0]['secondComponentValue'] !== "52.5";
    newFCDAnswers[0]['secondLabelError'] = newFCDAnswers[0]['secondLabel'] !== "9.25";
    newFCDAnswers[0]['secondMomentArmError'] = newFCDAnswers[0]['secondMomentArm'] !== "1.40789";
    newFCDAnswers[0]['answerError'] = newFCDAnswers[0]['answer'] !== "4.87644";
    newFCDAnswers[0]['answerDirectionError'] = newFCDAnswers[0]['answerDirection'] !== "c";
    
    //Equation #2
    newFCDAnswers[1]['firstSignError'] = newFCDAnswers[1]['firstSign'] !== "+";
    newFCDAnswers[1]['firstComponentError'] = newFCDAnswers[1]['firstComponent'] !== "1";
    newFCDAnswers[1]['firstLabelError'] = newFCDAnswers[1]['firstLabel'] !== "Fx";
    newFCDAnswers[1]['secondSignError'] = newFCDAnswers[1]['secondSign'] !== "-";
    newFCDAnswers[1]['secondComponentError'] = newFCDAnswers[1]['secondComponent'] !== "cos";
    newFCDAnswers[1]['secondComponentValueError'] = newFCDAnswers[1]['secondComponentValue'] !== "21.80141";
    newFCDAnswers[1]['secondLabelError'] = newFCDAnswers[1]['secondLabel'] !== "Fbc";
    newFCDAnswers[1]['thirdSignError'] = newFCDAnswers[1]['thirdSign'] !== "-";
    newFCDAnswers[1]['thirdComponentError'] = newFCDAnswers[1]['thirdComponent'] !== "cos";
    newFCDAnswers[1]['thirdComponentValueError'] = newFCDAnswers[1]['thirdComponentValue'] !== "52.5";
    newFCDAnswers[1]['thirdLabelError'] = newFCDAnswers[1]['thirdLabel'] !== "9.25";
    newFCDAnswers[1]['answerError'] = newFCDAnswers[1]['answer'] !== "1.10338";
    newFCDAnswers[1]['answerDirectionError'] = newFCDAnswers[1]['answerDirection'] !== "right";

    //Equation #3
    newFCDAnswers[2]['firstSignError'] = newFCDAnswers[2]['firstSign'] !== "+";
    newFCDAnswers[2]['firstComponentError'] = newFCDAnswers[2]['firstComponent'] !== "1";
    newFCDAnswers[2]['firstLabelError'] = newFCDAnswers[2]['firstLabel'] !== "Fy"
    newFCDAnswers[2]['secondSignError'] = newFCDAnswers[2]['secondSign'] !== "+";
    newFCDAnswers[2]['secondComponentError'] = newFCDAnswers[2]['secondComponent'] !== "sin";
    newFCDAnswers[2]['secondComponentValueError'] = newFCDAnswers[2]['secondComponentValue'] !== "21.80141";
    newFCDAnswers[2]['secondLabelError'] = newFCDAnswers[2]['secondLabel'] !== "Fbc";
    newFCDAnswers[2]['thirdSignError'] = newFCDAnswers[2]['thirdSign'] !== "+";
    newFCDAnswers[2]['thirdComponentError'] = newFCDAnswers[2]['thirdComponent'] !== "sin";
    newFCDAnswers[2]['thirdComponentValueError'] = newFCDAnswers[2]['thirdComponentValue'] !== "52.5";
    newFCDAnswers[2]['thirdLabelError'] = newFCDAnswers[2]['thirdLabel'] !== "9.25";
    newFCDAnswers[2]['answerError'] = newFCDAnswers[2]['answer'] !== "5.52745";
    newFCDAnswers[2]['answerDirectionError'] = newFCDAnswers[2]['answerDirection'] !== "down";

    setFCDHasError(
      newFCDAnswers[0]['firstSignError'] ||
      newFCDAnswers[0]['firstComponentError'] ||
      newFCDAnswers[0]['firstComponentValueError'] ||
      newFCDAnswers[0]['firstLabelError'] ||
      newFCDAnswers[0]['firstMomentArmError'] ||
      newFCDAnswers[0]['secondSignError'] ||
      newFCDAnswers[0]['secondComponentError'] ||
      newFCDAnswers[0]['secondComponentValueError'] ||
      newFCDAnswers[0]['secondLabelError'] ||
      newFCDAnswers[0]['secondMomentArmError'] ||
      newFCDAnswers[0]['answerError'] ||
      newFCDAnswers[0]['answerDirectionError'] ||

      newFCDAnswers[1]['firstSignError'] ||
      newFCDAnswers[1]['firstComponentError'] ||
      newFCDAnswers[1]['firstLabelError'] ||
      newFCDAnswers[1]['secondSignError'] ||
      newFCDAnswers[1]['secondComponentError'] ||
      newFCDAnswers[1]['secondComponentValueError'] ||
      newFCDAnswers[1]['secondLabelError'] ||
      newFCDAnswers[1]['thirdSignError'] ||
      newFCDAnswers[1]['thirdComponentError'] ||
      newFCDAnswers[1]['thirdComponentValueError'] || 
      newFCDAnswers[1]['thirdLabelError'] ||
      newFCDAnswers[1]['answerError'] ||
      newFCDAnswers[1]['answerDirectionError'] ||

      newFCDAnswers[2]['firstSignError'] ||
      newFCDAnswers[2]['firstComponentError'] ||
      newFCDAnswers[2]['firstLabelError'] ||
      newFCDAnswers[2]['secondSignError'] ||
      newFCDAnswers[2]['secondComponentError'] ||
      newFCDAnswers[2]['secondComponentValueError'] ||
      newFCDAnswers[2]['secondLabelError'] ||
      newFCDAnswers[2]['thirdSignError'] ||
      newFCDAnswers[2]['thirdComponentError'] ||
      newFCDAnswers[2]['thirdComponentValueError'] ||
      newFCDAnswers[2]['thirdLabelError'] ||
      newFCDAnswers[2]['answerError'] ||
      newFCDAnswers[2]['answerDirectionError']
    )
  }
  
  const handleFieldUpdate = (id, field, val, section) => {
    let newAnswers;
    if(section === "FCD"){
      newAnswers = [...FCDAnswers];
      newAnswers[id][field] = val;
      setFCDAnswers(newAnswers)
    } else {
      newAnswers = [...wholeFBDAnswers];
      newAnswers[id][field] = val;
      setWholeFBDAnswers(newAnswers);
    }
  }
  
  const handleComplete = () => {
    let count = 0;
    setCheckAnswersToggle(!checkAnswersToggle);
    switch(activeStep){
      case 0:
        setTwoForceMembersListError(JSON.stringify(twoForceMembersName) !== '["BC"]')
        setHasTwoForceMembersError(hasTwoForceMembers !== 1)
        if(hasTwoForceMembers === 1 && JSON.stringify(twoForceMembersName) === '["BC"]'){
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
          newMapWholeFBD.areas[2].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapWholeFBD.areas[2].preFillColor = WRONG_PREFILL;
        }
        if(wholeFBDPointsData["G"]["verticalForceDirection"] === "down" && wholeFBDPointsData["G"]["horizontalForceDirection"] === "none"){
          newMapWholeFBD.areas[0].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapWholeFBD.areas[0].preFillColor = WRONG_PREFILL;
        }
        if(wholeFBDPointsData["D"]["verticalForceDirection"] === "up" && wholeFBDPointsData["D"]["horizontalForceDirection"] === "none" ){
          newMapWholeFBD.areas[1].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapWholeFBD.areas[1].preFillColor = WRONG_PREFILL;
        }
        setMapWholeFBD({...newMapWholeFBD})
        checkWholeFBDAnswers();
        if(count === 3 && !wholeFBDHasError){
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
        const newMapFCD = mapFCD;
        if(FCDPointsData["F"]["verticalForceDirection"] === "up" && FCDPointsData["F"]["horizontalForceDirection"] === "right"){
          newMapFCD.areas[0].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapFCD.areas[0].preFillColor = WRONG_PREFILL;
        }
        if(FCDPointsData["9.25"]["inclinedForceDirection"] === "nw" && FCDPointsData["9.25"]["inclinedForceAngle"] === "52.5"){
          newMapFCD.areas[1].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapFCD.areas[1].preFillColor = WRONG_PREFILL;
        }
        if(FCDPointsData["Fbc"]["inclinedForceDirection"] === "nw" && FCDPointsData["Fbc"]["inclinedForceAngle"] === "21.80141"){
          newMapFCD.areas[2].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapFCD.areas[2].preFillColor = WRONG_PREFILL;
        }
        if(FCDPointsData["D"]["verticalForceDirection"] === "up"){
          newMapFCD.areas[3].preFillColor = CORRECT_PREFILL;
          count++;
        } else {
          newMapFCD.areas[3].preFillColor = WRONG_PREFILL;
        }
        setMapFCD({...newMapFCD})
        checkFCDAnswers()
        if(!FCDHasError && count === 4){
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
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          setRevealFinalAnswer(true)
          handleOpenSnackbar("success","Congratulations! You have finished the practice problem.");
        } else {
          handleOpenSnackbar("error", "There is an unfinished section - please check all your answers!");
        }
        break;
    }
  };

  const selectDiagram = (area) => {
    setActiveStep(area.name)
  }

  const handleOpenWholeWholeDialog = (area, title) => {
    setPointID(area.name)
    setPointDialogTitle(title+' '+area.name);
    setOpenWholeFBDDialog(true);
  };

  const handleOpenDiagramHelpDialog = () => {
    setDiagramHelpDialog(true);
  };

  const handleOpenAnswersHelpDialog = () => {
    setAnswersHelpDialog(true);
  };

  const names = [
    'ABEFG',
    'BC',
    'FCD',
  ];

  const getDisabled = val => {
    if (completed[val]) return { disabled: true };
    return {};
  };
  
  const savePoints = (data) => {
    let tempData;
    if(data[1] === 1) tempData = wholeFBDPointsData
    else tempData = FCDPointsData
    tempData[data[0]]['verticalForceDirection'] = data[2];
    tempData[data[0]]['verticalForceLabel'] = data[3];
    tempData[data[0]]['horizontalForceDirection'] = data[4];
    tempData[data[0]]['horizontalForceLabel'] = data[5];
    tempData[data[0]]['inclinedForceDirection'] = data[6];
    tempData[data[0]]['inclinedForceAngle'] = data[7];
    tempData[data[0]]['inclinedForceLabel'] = data[8];
    tempData[data[0]]['momentDirection'] = data[9];
    tempData[data[0]]['momentLabel'] = data[10];
    if(data[1] === 1) tempData = setWholeFBDPointsData(tempData)
    else tempData = setFCDPointsData(tempData)
    handleOpenSnackbar("info");
  }


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
        <Box sx={{ minWidth: 120 }}>
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
      <div style={{textAlign: 'center', height: '430px'}}>
        <ImageMapper 
          src = '/practice_1_whole_fbd.png' 
          map = {MAP} 
          onClick = {(area) => selectDiagram(area)} 
          width = {650}
          height = {430}
          key={checkAnswersToggle} 
          sx = {{position:'absolute'}}
        />
        <IconButton aria-label="info" onClick={handleOpenDiagramHelpDialog} size="large" color="warning" sx={{ position:"relative", top: '-425px', right: '180px', zIndex: 5}}>
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
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'70px !important' } }}
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
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'70px !important' } }}
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
                    {wholeFBDPointsData["G"]["verticalForceLabel"] === "" ? '___' : wholeFBDPointsData["G"]["verticalForceLabel"]} 
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
              D = 
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
              kN, 
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
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'70px !important' } }}
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
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'70px !important' } }}
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
                  placement = "bottom"
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
                  placement = "top"
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
                  placement = "top"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'70px !important' } }}
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
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <span>
                    {wholeFBDPointsData["G"]["verticalForceLabel"] === "" ? '___' : wholeFBDPointsData["G"]["verticalForceLabel"]} 
                  </span>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[2].thirdSignError}>
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
                    value={wholeFBDAnswers[2].thirdSign}
                    onChange={(event) => handleFieldUpdate(2, 'thirdSign', event.target.value)}
                  >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl> 
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[2].thirdComponentError}>
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
                    value={wholeFBDAnswers[2].thirdComponent}
                    onChange={(event) => handleFieldUpdate(2, 'thirdComponent', event.target.value)}
                  >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="cos">cos</MenuItem>
                  <MenuItem value="sin">sin</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: wholeFBDAnswers[2]['thirdComponent'] !== "1" ? "" : "none"}} size="small" >
                <Tooltip 
                  title="Value" 
                  arrow
                  open = {wholeFBDThirdEquationTooltipOpen && wholeFBDAnswers[2]['thirdComponent'] !== "1"}
                  onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                  onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                  placement = "bottom"
                  PopperProps={{style:{zIndex:4}}}
                >
                  <TextField 
                    id="outlined-basic" 
                    size="small"
                    inputProps = {{ sx: { padding: '2px 2px !important', width:'70px !important' } }}
                    error={wholeFBDAnswers[2].thirdComponentValueError}
                    value={wholeFBDAnswers[2].thirdComponentValue}
                    onChange={(event) => handleFieldUpdate(2, 'thirdComponentValue', event.target.value)}
                  />
                </Tooltip>
              </FormControl>
              <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={wholeFBDAnswers[2].thirdLabelError}>
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
              kN, 
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
      <div style={{textAlign: 'center', height: '400px'}}>
        <ImageMapper 
          src = '/practice_1_whole_fbd_member.png' 
          map = {mapWholeFBD} 
          onClick = {(area) => handleOpenWholeWholeDialog(area, 'Force at point')}
          width = {600}
          height = {390}
          key={checkAnswersToggle} 
          sx = {{position:'absolute'}}
        />
        <IconButton aria-label="info" onClick={handleOpenDiagramHelpDialog} size="large" color="warning" sx={{ position:"relative", top: '-410px', right: '190px', zIndex: 5}}>
          <InfoIcon />
        </IconButton>
        <div style={{
          position: "relative", 
          top: '-160px', 
          left: '20px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapWholeFBD.areas[2].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{padding:0}}>
            <EastIcon sx={{padding: 0, width: '2.5em', height: '2.5em'}} />
          </span>
          <span style={{padding:0, top: '-10px', right: '27px', fontSize: '1.5em', position: 'absolute'}}>
            {wholeFBDPointsData["A"]["horizontalForceLabel"]}
          </span>
        </div>
        <div style={{
          position: "relative", 
          bottom: '180px', 
          left: '70px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapWholeFBD.areas[2].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{padding:0}}>
            <NorthIcon sx={{padding: 0, width: '2.5em', height: '2.5em'}} />
          </span>
          <span style={{padding:0, bottom: '15px', left: '40px', fontSize: '1.5em', position: 'absolute'}}>
            {wholeFBDPointsData["A"]["verticalForceLabel"]}
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-185px', 
          left: '375px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapWholeFBD.areas[1].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{padding:0}}>
            <NorthIcon sx={{padding: 0, width: '2.5em', height: '2.5em'}} />
          </span>
          <span style={{padding:0, bottom: '15px', left:'50px', fontSize: '1.5em', position: 'absolute'}}>
            {wholeFBDPointsData["D"]["verticalForceLabel"]}
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-550px', 
          left: '480px', 
          zIndex: 3, 
          width:"fit-content",
          textAlign: "right",
          visibility: mapWholeFBD.areas[0].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
        }}>
          <span style={{padding:0}}>
            <SouthIcon sx={{padding: 0, width: '2.5em', height: '2.5em'}} />
          </span>
          <span style={{padding:0, bottom: '15px', left:'50px', fontSize: '1.5em', position: 'absolute'}}>
            {wholeFBDPointsData["G"]["verticalForceLabel"]}
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
            <FormControl FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[0].firstSignError}>
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
                  value={FCDAnswers[0]['firstSign']}
                  onChange={(event) => handleFieldUpdate(0, 'firstSign', event.target.value, 'FCD')}
                >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[0].firstComponentError}>
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
                  value={FCDAnswers[0]['firstComponent']}
                  onChange={(event) => handleFieldUpdate(0, 'firstComponent', event.target.value, 'FCD')}
                >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: FCDAnswers[0]['firstComponent'] !== "1" ? "" : "none"}} size="small" >
              <Tooltip 
                title="Value" 
                arrow
                open = {wholeFBDFirstEquationTooltipOpen && FCDAnswers[0]['firstComponent'] !== "1"}
                onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                  error={FCDAnswers[0].firstComponentValueError}
                  value={FCDAnswers[0].firstComponentValue}
                  onChange={(event) => handleFieldUpdate(0, 'firstComponentValue', event.target.value, 'FCD')}
                />
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[0].firstLabelError}>
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
                  {FCDPointsData["Fbc"]["inclinedForceLabel"] === "" ? '___' : FCDPointsData["Fbc"]["inclinedForceLabel"]} 
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
                    error={FCDAnswers[0].firstMomentArmError}
                    inputProps = {{ sx: { padding: '2px 6px !important', width:'58px !important' } }}
                    value={FCDAnswers[0].firstMomentArm}
                    onChange={(event) => handleFieldUpdate(0, 'firstMomentArm', event.target.value, 'FCD')}
                  />
                </Tooltip>
              </FormControl>
            ) 
            <FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[0].secondSignError}>
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
                  value={FCDAnswers[0].secondSign}
                  onChange={(event) => handleFieldUpdate(0, 'secondSign', event.target.value, 'FCD')}
                >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
                </Select>
              </Tooltip>
            </FormControl> 
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[0].secondComponentError}>
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
                  value={FCDAnswers[0].secondComponent}
                  onChange={(event) => handleFieldUpdate(0, 'secondComponent', event.target.value, 'FCD')}
                >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: FCDAnswers[0]['secondComponent'] !== "1" ? "" : "none"}} size="small" >
              <Tooltip 
                title="Value" 
                arrow
                open = {wholeFBDFirstEquationTooltipOpen && FCDAnswers[0]['secondComponent'] !== "1"}
                onOpen={() => setWholeFBDFirstEquationTooltipOpen(true)}
                onClose={() => setWholeFBDFirstEquationTooltipOpen(false)}
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                  error={FCDAnswers[0].secondComponentValueError}
                  value={FCDAnswers[0].secondComponentValue}
                  onChange={(event) => handleFieldUpdate(0, 'secondComponentValue', event.target.value, 'FCD')}
                />
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[0].secondLabelError}>
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
                  {FCDPointsData["9.25"]["inclinedForceLabel"] === "" ? '___' : FCDPointsData["9.25"]["inclinedForceLabel"]} 
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
                  error={FCDAnswers[0].secondMomentArmError}
                  inputProps = {{ sx: { padding: '2px 6px !important', width:'58px !important' } }}
                  value={FCDAnswers[0].secondMomentArm}
                  onChange={(event) => handleFieldUpdate(0, 'secondMomentArm', event.target.value, 'FCD')}
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
                error={FCDAnswers[0].answerError}
                inputProps = {{ sx: { padding: '2px 10px !important', width:'75px !important' } }}
                value={FCDAnswers[0].answer}
                onChange={(event) => handleFieldUpdate(0, 'answer', event.target.value, 'FCD')}
              />
            </Tooltip>
            kN, 
            <FormControl sx={{mr:0.25, ml:0.5, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[0].answerDirectionError}>
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
                  value={FCDAnswers[0].answerDirection}
                  onChange={(event) => handleFieldUpdate(0, 'answerDirection', event.target.value, 'FCD')}
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
            <FormControl FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[1].firstSignError}>
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
                  value={FCDAnswers[1]['firstSign']}
                  onChange={(event) => handleFieldUpdate(1, 'firstSign', event.target.value, 'FCD')}
                >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[1].firstComponentError}>
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
                  value={FCDAnswers[1]['firstComponent']}
                  onChange={(event) => handleFieldUpdate(1, 'firstComponent', event.target.value, 'FCD')}
                >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: FCDAnswers[1]['firstComponent'] !== "1" ? "" : "none"}} size="small" >
              <Tooltip 
                title="Value" 
                arrow
                open = {wholeFBDSecondEquationTooltipOpen && FCDAnswers[1]['firstComponent'] !== "1"}
                onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                  error={FCDAnswers[1].firstComponentValueError}
                  value={FCDAnswers[1].firstComponentValue}
                  onChange={(event) => handleFieldUpdate(1, 'firstComponentValue', event.target.value, 'FCD')}
                />
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[1].firstLabelError}>
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
                  {FCDPointsData["F"]["horizontalForceLabel"] === "" ? '___' : FCDPointsData["F"]["horizontalForceLabel"]} 
                </span>
              </Tooltip>
            </FormControl>       
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[1].secondSignError}>
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
                  value={FCDAnswers[1].secondSign}
                  onChange={(event) => handleFieldUpdate(1, 'secondSign', event.target.value, 'FCD')}
                >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
                </Select>
              </Tooltip>
            </FormControl> 
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[1].secondComponentError}>
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
                  value={FCDAnswers[1].secondComponent}
                  onChange={(event) => handleFieldUpdate(1, 'secondComponent', event.target.value, 'FCD')}
                >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: FCDAnswers[1]['secondComponent'] !== "1" ? "" : "none"}} size="small" >
              <Tooltip 
                title="Value" 
                arrow
                open = {wholeFBDSecondEquationTooltipOpen && FCDAnswers[1]['secondComponent'] !== "1"}
                onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                  error={FCDAnswers[1].secondComponentValueError}
                  value={FCDAnswers[1].secondComponentValue}
                  onChange={(event) => handleFieldUpdate(1, 'secondComponentValue', event.target.value, 'FCD')}
                />
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[1].secondLabelError}>
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
                  {FCDPointsData["Fbc"]["inclinedForceLabel"] === "" ? '___' : FCDPointsData["Fbc"]["inclinedForceLabel"]} 
                </span>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[1].thirdSignError}>
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
                  value={FCDAnswers[1].thirdSign}
                  onChange={(event) => handleFieldUpdate(1, 'thirdSign', event.target.value, 'FCD')}
                >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
                </Select>
              </Tooltip>
            </FormControl> 
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[1].thirdComponentError}>
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
                  value={FCDAnswers[1].thirdComponent}
                  onChange={(event) => handleFieldUpdate(1, 'thirdComponent', event.target.value, 'FCD')}
                >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: FCDAnswers[1]['thirdComponent'] !== "1" ? "" : "none"}} size="small" >
              <Tooltip 
                title="Value" 
                arrow
                open = {wholeFBDSecondEquationTooltipOpen && FCDAnswers[1]['thirdComponent'] !== "1"}
                onOpen={() => setWholeFBDSecondEquationTooltipOpen(true)}
                onClose={() => setWholeFBDSecondEquationTooltipOpen(false)}
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                  error={FCDAnswers[1].thirdComponentValueError}
                  value={FCDAnswers[1].thirdComponentValue}
                  onChange={(event) => handleFieldUpdate(1, 'thirdComponentValue', event.target.value, 'FCD')}
                />
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[1].thirdLabelError}>
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
                  {FCDPointsData["9.25"]["inclinedForceLabel"] === "" ? '___' : FCDPointsData["9.25"]["inclinedForceLabel"]} 
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
            Fx = 
            <Tooltip 
                title="Answer for summation of moment along X" 
                arrow
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
              <TextField 
                id="outlined-basic" 
                size="small"
                error={FCDAnswers[1].answerError}
                inputProps = {{ sx: { padding: '2px 10px !important', width:'65px !important' } }}
                value={FCDAnswers[1].answer}
                onChange={(event) => handleFieldUpdate(1, 'answer', event.target.value, 'FCD')}
              />
            </Tooltip>
            kN,
            <FormControl sx={{mr:0.25, ml:0.5, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[1].answerDirectionError}>
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
                  value={FCDAnswers[1].answerDirection}
                  onChange={(event) => handleFieldUpdate(1, 'answerDirection', event.target.value, 'FCD')}
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
            <FormControl FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[2].firstSignError}>
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
                  value={FCDAnswers[2]['firstSign']}
                  onChange={(event) => handleFieldUpdate(2, 'firstSign', event.target.value, 'FCD')}
                >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[2].firstComponentError}>
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
                  value={FCDAnswers[2]['firstComponent']}
                  onChange={(event) => handleFieldUpdate(2, 'firstComponent', event.target.value, 'FCD')}
                >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: FCDAnswers[2]['firstComponent'] !== "1" ? "" : "none"}} size="small" >
              <Tooltip 
                title="Value" 
                arrow
                open = {wholeFBDThirdEquationTooltipOpen && FCDAnswers[2]['firstComponent'] !== "1"}
                onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                  error={FCDAnswers[2].firstComponentValueError}
                  value={FCDAnswers[2].firstComponentValue}
                  onChange={(event) => handleFieldUpdate(2, 'firstComponentValue', event.target.value, 'FCD')}
                />
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[2].firstLabelError}>
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
                  {FCDPointsData["F"]["verticalForceLabel"] === "" ? '___' : FCDPointsData["F"]["verticalForceLabel"]} 
                </span>
              </Tooltip>
            </FormControl>    
            <FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[2].thirdSignError}>
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
                  value={FCDAnswers[2].thirdSign}
                  onChange={(event) => handleFieldUpdate(2, 'secondSign', event.target.value, 'FCD')}
                >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
                </Select>
              </Tooltip>
            </FormControl> 
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[2].secondComponentError}>
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
                  value={FCDAnswers[2].secondComponent}
                  onChange={(event) => handleFieldUpdate(2, 'secondComponent', event.target.value, 'FCD')}
                >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: FCDAnswers[2]['secondComponent'] !== "1" ? "" : "none"}} size="small" >
              <Tooltip 
                title="Value" 
                arrow
                open = {wholeFBDThirdEquationTooltipOpen && FCDAnswers[2]['secondComponent'] !== "1"}
                onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                  error={FCDAnswers[2].secondComponentValueError}
                  value={FCDAnswers[2].secondComponentValue}
                  onChange={(event) => handleFieldUpdate(2, 'secondComponentValue', event.target.value, 'FCD')}
                />
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[2].secondLabelError}>
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
                  {FCDPointsData["Fbc"]["inclinedForceLabel"] === "" ? '___' : FCDPointsData["Fbc"]["inclinedForceLabel"]} 
                </span>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, ml:1, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[2].thirdSignError}>
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
                  value={FCDAnswers[2].thirdSign}
                  onChange={(event) => handleFieldUpdate(2, 'thirdSign', event.target.value, 'FCD')}
                >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
                </Select>
              </Tooltip>
            </FormControl> 
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[2].thirdComponentError}>
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
                  value={FCDAnswers[2].thirdComponent}
                  onChange={(event) => handleFieldUpdate(2, 'thirdComponent', event.target.value, 'FCD')}
                >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="cos">cos</MenuItem>
                <MenuItem value="sin">sin</MenuItem>
                </Select>
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom', display: FCDAnswers[2]['thirdComponent'] !== "1" ? "" : "none"}} size="small" >
              <Tooltip 
                title="Value" 
                arrow
                open = {wholeFBDThirdEquationTooltipOpen && FCDAnswers[2]['thirdComponent'] !== "1"}
                onOpen={() => setWholeFBDThirdEquationTooltipOpen(true)}
                onClose={() => setWholeFBDThirdEquationTooltipOpen(false)}
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
                <TextField 
                  id="outlined-basic" 
                  size="small"
                  inputProps = {{ sx: { padding: '2px 2px !important', width:'33px !important' } }}
                  error={FCDAnswers[2].thirdComponentValueError}
                  value={FCDAnswers[2].thirdComponentValue}
                  onChange={(event) => handleFieldUpdate(2, 'thirdComponentValue', event.target.value, 'FCD')}
                />
              </Tooltip>
            </FormControl>
            <FormControl sx={{mr:0.25, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[2].thirdLabelError}>
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
                  {FCDPointsData["9.25"]["inclinedForceLabel"] === "" ? '___' : FCDPointsData["9.25"]["inclinedForceLabel"]} 
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
            Fy = 
            <Tooltip 
                title="Answer for summation of moment along Y" 
                arrow
                placement = "bottom"
                PopperProps={{style:{zIndex:4}}}
              >
              <TextField 
                id="outlined-basic" 
                size="small"
                error={FCDAnswers[2].answerError}
                inputProps = {{ sx: { padding: '2px 10px !important', width:'65px !important' } }}
                value={FCDAnswers[2].answer}
                onChange={(event) => handleFieldUpdate(2, 'answer', event.target.value, 'FCD')}
              />
            </Tooltip>
            kN,
            <FormControl sx={{mr:0.25, ml:0.5, verticalAlign: 'bottom'}} size="small" error={FCDAnswers[2].answerDirectionError}>
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
                  value={FCDAnswers[2].answerDirection}
                  onChange={(event) => handleFieldUpdate(2, 'answerDirection', event.target.value, 'FCD')}
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
          src = '/practice_1_FCD.png' 
          map = {mapFCD} 
          onClick = {(area) => handleOpenWholeWholeDialog(area, 'Force at point')}
          width = {600}
          height = {390}
          key={checkAnswersToggle} 
          sx = {{position:'absolute'}}
        />
        <IconButton 
          aria-label="info" 
          onClick={handleOpenDiagramHelpDialog} 
          size="large" 
          color="warning" 
          sx={{ position:"relative", top: '-410px', right: '150px', zIndex: 5}}
        >
          <InfoIcon />
        </IconButton>
        <div style={{
          position: "relative", 
          top: '-481px', 
          left: '269px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapFCD.areas[0].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{padding:0}}>
            <NorthIcon sx={{padding: 0, width: '2.5em', height: '2.5em'}} />
          </span>
          <span style={{padding:0, bottom: '45px', left:'50px', fontSize: '1.5em', position: 'absolute'}}>
            {FCDPointsData["F"]["verticalForceLabel"]}
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-505px', 
          left: '305px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapFCD.areas[0].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{padding:0}}>
            <EastIcon sx={{padding: 0, width: '2.5em', height: '2.5em'}} />
          </span>
          <span style={{padding:0, bottom: '-10px', left: '40px', fontSize: '1.5em', position: 'absolute'}}>
            {FCDPointsData["F"]["horizontalForceLabel"]}
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-435px', 
          left: '235px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapFCD.areas[1].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{padding:0}}> 
            <NorthWestIcon sx={{padding: 0, width: '2.5em', height: '2.5em'}} /> 
          </span>
          <span style={{padding:0, bottom: '10px', right: '55px', fontSize: '1.5em', position: 'absolute'}}>
            {FCDPointsData["9.25"]["inclinedForceLabel"]}
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-425px', 
          left: '235px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapFCD.areas[2].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{padding:0}}> 
            <NorthWestIcon sx={{padding: 0, width: '2.5em', height: '2.5em'}} /> 
          </span>
          <span style={{padding:0, bottom: '10px', right: '55px', fontSize: '1.5em', position: 'absolute'}}>
            {FCDPointsData["Fbc"]["inclinedForceLabel"]}
          </span>
        </div>
        <div style={{
          position: "relative", 
          top: '-315px', 
          left: '270px', 
          zIndex: 1, 
          width:"fit-content",
          visibility: mapFCD.areas[3].preFillColor !== CORRECT_PREFILL ? 'hidden' : 'visible',
          textAlign: "right",
        }}>
          <span style={{padding:0}}>
            <NorthIcon sx={{padding: 0, width: '2.5em', height: '2.5em'}} />
          </span>
          <span style={{padding:0, bottom: '15px', left:'50px', fontSize: '1.5em', position: 'absolute'}}>
            {FCDPointsData["D"]["verticalForceLabel"]}
          </span>
        </div>
      </div>;
  }
  else{
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
            <span className={styles.answer}>Ax</span> = 0 <br/>
            <span className={styles.answer}>Ay</span> = 2.9238 kN, <SouthIcon sx={{fontSize: ".8rem", p:0}}/> <br/>
            <span className={styles.answer}>Fx</span> = 1.1034 kN, <WestIcon sx={{fontSize: ".8rem", p:0}}/> <br/>
            <span className={styles.answer}>Fy</span> = 5.5274 kN, <NorthIcon sx={{fontSize: ".8rem", p:0}}/> <br/>
            <span className={styles.answer}>F<sub>BC</sub></span> = 4.8764 kN, C <br/>
            Directions for Ax and Ay are reversed because the question requires forces felt by AFGH, not ABCDE.
          </p>

        </div>
      </div>;
    diagram = <div style={{textAlign: 'center'}}><img src="/practice_1_whole_fbd.png" style={{ maxHeight: "450px", width:"100%"}} alt="Whole FBD"></img></div>;
  }



  return (
    <Layout>
      <section>
        <PointDialog 
          openDialog={openWholeWholeADialog} 
          pointID={pointID} 
          key={pointID} 
          section={activeStep} 
          pointsData={activeStep === 1 ? wholeFBDPointsData : FCDPointsData} 
          savePoints={savePoints} 
          title={pointDialogTitle}
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
        <h2 style={{marginBottom: "5px"}}>Practice Problem 1</h2>
        <h3 style={{fontWeight: 400}}>Determine force exerted by member BC, member FCD and the
          pin support on ABEFG.
        </h3>
        <h5 style={{fontWeight: 200, marginTop: 3}}>
          Note: ABEFG is one whole member
          as well as FCD. Assume negligible distance between the ring in
          FCD and the centerline of FCD.
        </h5>
        <h5 style={{fontWeight: 600, marginTop: 3}}>
          For all pulleys, radius is 0.2 m
        </h5>
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
                    <IconButton onClick={handleOpenAnswersHelpDialog} size="large" color="warning" aria-label="delete" sx={{ mr:1, display:activeStep === 3 ? "none": ""}}>
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
      </section>
    </Layout>
  )
}
