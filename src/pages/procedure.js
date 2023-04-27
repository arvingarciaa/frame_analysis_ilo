import React from 'react'
import Layout from '../components/Layout'
import * as styles from "../styles/procedure.module.css"  
import DetailsDialog from './diagrams/dialogs/details_dialog'
import Button from '@mui/material/Button';

export default function About() {
  const [openDetailsDialog, setDetailsDialog] = React.useState(false);
  const [detailsDialogSRC, setDetailsDialogSRC] = React.useState('');
  const [detailsDialogTitle, setDetailsDialogTitle] = React.useState('');


  const closeDialogs = () => {
    setDetailsDialog(false);
  };

  const handleOpenDetailsDialog = (title, src) => {
    setDetailsDialog(true);
    setDetailsDialogSRC(src);
    setDetailsDialogTitle(title);
  }

  return (
    <Layout>
      <div className={styles.content}>
        <section>
          <DetailsDialog 
            title={detailsDialogTitle}
            src={detailsDialogSRC}
            openDialog={openDetailsDialog} 
            closeDialog={closeDialogs} 
            setOpenDialog={setDetailsDialog}
          />
          <h1>Procedure for Frame Analysis</h1>
          <div className={styles.steps}>
            <ul>
              <li>
                <Button
                  color="warning"
                  onClick={() => handleOpenDetailsDialog('Identify two-force members and multi-force members', '2-force members.gif')}
                  variant="contained"
                >
                  Step 1
                </Button> Identify two-force members and multi-force members
              </li>
              <li>
                <Button
                  color="warning"
                  onClick={() => handleOpenDetailsDialog('Draw whole body diagram', 'whole_body_diagram.gif')}
                  variant="contained"
                >
                  Step 2
                </Button> Draw whole body diagram
              </li>
              <li>
                <Button
                  color="warning"
                  onClick={() => handleOpenDetailsDialog('Dismember the frame', 'dismember.gif')}
                  variant="contained"
                >
                  Step 3
                </Button> Dismember the frame
              </li>
              <li>
                <Button
                  color="warning"
                  variant="outlined"
                  className={styles.disabledButton}
                >
                  Step 4
                </Button> Identify two-force members and multi-force members
                <div className={styles.listInfo}>
                  <span>Important Concepts:</span>
                  <ul>
                    <li>
                      <Button
                        color="warning"
                        onClick={() => handleOpenDetailsDialog('Two-force Members', '2-force-diagrams.gif')}
                        variant="contained"
                      >
                        See GIF
                      </Button> Two-force Members
                    </li>
                    <li>
                      <Button
                        color="warning"
                        onClick={() => handleOpenDetailsDialog('Forces in pin connections connecting two members', 'pin-connections.gif')}
                        variant="contained"
                      >
                        See GIF
                      </Button> Forces in pin connections connecting two members
                    </li>
                    <li>
                      <Button
                        color="warning"
                        onClick={() => handleOpenDetailsDialog('Pin connections between two multi-force members', 'multiforce-members.gif')}
                        variant="contained"
                      >
                        See GIF
                      </Button> Pin connections between two multi-force members
                    </li>
                    <li>
                      <Button
                        color="warning"
                        onClick={() => handleOpenDetailsDialog('Pin connections between a multi-force member and a 2-force member', 'multiforce-2-force.gif')}
                        variant="contained"
                      >
                        See GIF
                      </Button> Pin connections between a multi-force member and a 2-force member
                    </li>
                    <li>
                      <Button
                        color="warning"
                        onClick={() => handleOpenDetailsDialog('Pin connections between more than two members: Pin Analysis', 'pin-analysis.gif')}
                        variant="contained"
                      >
                        See GIF
                      </Button> Pin connections between more than two members: Pin Analysis
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Button
                  color="warning"
                  onClick={() => handleOpenDetailsDialog('Step 3', '2-force-members.gif')}
                  variant="outlined"
                  className={styles.disabledButton}
                >
                  Step 5
                </Button> Solve for forces using equilibrium conditions
                <div className={styles.listInfo}>
                  <span>Important Concepts:</span>
                  <ul>
                    <li>
                      <Button
                        color="warning"
                        onClick={() => handleOpenDetailsDialog('Statistically determinate members', 'statically-determinate-diagrams.gif')}
                        variant="contained"
                      >
                        See GIF
                      </Button> Statistically determinate members
                    </li>
                    <li>
                      <Button
                        color="warning"
                        onClick={() => handleOpenDetailsDialog('Composite Diagrams', 'composite-diagrams.gif')}
                        variant="contained"
                      >
                        See GIF
                      </Button> Composite Diagrams
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}
