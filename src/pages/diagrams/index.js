import * as React from "react"
import Layout from '../../components/Layout'
import * as styles from "../../styles/diagram.module.css"  
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'gatsby'


export default function Home() {
  return (
    <Layout>
      <section>
        <div className={styles.portfolio}>
          <h2>
            Diagrams
          </h2>
          <h3>
            Below are the diagrams you can interact with.
          </h3>
            <Container maxWidth="md">
              <Grid container rowSpacing={3}>
                <Grid item md={6}>
                  <Link to="/diagrams/sample_problem_1">
                    <Card sx={{ margin: '0px 10px', height: '372.5px' }} elevation={8}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="180"
                          image="/sample_1_whole_fbd.jpg"
                          alt="beam"
                          sx={{objectFit: "contain"}}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" color="black">
                            Sample Problem 1
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            The frame shown is composed of members AFGH, CG, ID, ABCDE, and two pulleys 
                            B and E. It is pin-supported at points H and I, and supports a 50-kg weight. 
                            Determine the forces exerted on member AFGH.
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
                <Grid item md={6}>
                  <Link to="/diagrams/practice_problem_1">
                    <Card sx={{ margin: '0px 10px', }}  elevation={8}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="180"
                          image="/practice_1_whole_fbd.png"
                          alt="beam"
                          sx={{objectFit: "contain"}}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" color="black">
                            Practice Problem 1
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            This frame supports an 18.5 kN load at pulley H. It is composed of member ABEFG, BC, 
                            FCD, and pulleys at E, G and H. There is a pin support at A and a roller support at D. 
                            Determine the force exerted by member BC, member FCD, and the pin support on member 
                            ABEFG. For all pulleys, radius is 0.2 m.
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
                <Grid item md={6}>
                  <Link to="/diagrams/sample_problem_2">
                    <Card sx={{ margin: '0px 10px', }}  elevation={8}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="180"
                          image="/sample_2_whole_fbd.png"
                          alt="beam"
                          sx={{objectFit: "contain"}}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div"  color="black">
                            Sample Problem 2 - Pin Analysis
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                          The frame above is composed of members AD, BD, and ABC, and is connected to 
                          the ground by pin supports at C and D. Point A is a slotted connection that 
                          allows free vertical movement along the upper portion of member AD. If the 
                          frame is loaded as shown, determine the horizontal and vertical components of 
                          the reaction forces acting at the supports.
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
                <Grid item md={6}>
                  <Link to="/diagrams/practice_problem_2">
                    <Card sx={{ margin: '0px 10px', height: '392.5px'}}  elevation={8}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="180"
                          image="/practice_2_whole_fbd.png"
                          alt="beam"
                          sx={{objectFit: "contain"}}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div"  color="black">
                            Practice Problem 2 - Pin Analysis
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            The frame is composed of member ACE, ED, BCD, and pulley D. It has a roller 
                            support at B and a pin support at A. If it supports a 100-N load at D, 
                            determine the forces actin on the pin at point D.
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              </Grid>
            </Container>
        </div> 
      </section>
    </Layout>
    )
}
