import React from 'react'
import Layout from '../components/Layout'
import * as styles from "../styles/about.module.css"  

export default function About() {
  return (
    <Layout>
      <div className={styles.content}>
        <section>
          <h1>About this Project</h1>
          <p>
            This application aims to help engineering students in understanding analysis of frame structures by 
            providing sample problems and practice problems. In the sample problems, students can view the solutions 
            of the problems with explanation, specially on the construction of free body diagrams. The students 
            can then hone their skills in creating free body diagrams and formulating equilibrium equations through 
            the practice problems
          </p>
          <p>
            This application is developed by Gianina Martha A. Tajanlangit, from the Department of Engineering Science, 
            College of Engineering and Agro-Industrial Technology, University of the Philippines Los Baños (UPLB), and 
            Arvin John Garcia through the UPLB Centennial Faculty Grant for Interactive Learning Object. 
          </p>
          <p>
            For any inquiries regarding the application, you may contact the author at gatajanlangit@up.edu.ph.
          </p>
        </section>
      </div>
      
    </Layout>
  )
}
