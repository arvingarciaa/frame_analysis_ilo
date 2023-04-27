import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from '../components/Layout'
import * as styles from "../styles/home.module.css"  

export default function Home({ data }) {
  const { title, description } = data.site.siteMetadata;
  return (
    <Layout>
      <div className={styles.content}>
        <section>
          <div className={styles.hero}>
            <div>
              <h2>
                { title }
              </h2>
              <h3>
                { description }
              </h3>
              <div>
                <img src="/up_seal.png" alt="" height="80px" width="80px" style={{padding: 0, verticalAlign:'middle'}}/>
                <img src="/des_logo.png" alt="" height="80px" width="80px" style={{verticalAlign:'middle'}}/>
              </div>
            </div>
          </div> 
          
          <div className={styles.directory}>
            <Link className={styles.btnSecondary} target="_blank" to="https://youtu.be/WPKSAcp3LR0"> 
              Introduction and Learning Objectives 
            </Link>
            <Link className={styles.btn} to="/procedure"> Procedure for Frame Analysis </Link>
            <Link className={styles.btn} to="/diagrams"> Diagrams and Practice Problems</Link>
            <Link className={styles.btnSecondary} target="_blank" to="https://youtu.be/dQrhsR_jbcY"> Summary and References </Link>
          </div>
        </section>
      </div>
    </Layout>
    )
}

export const query = graphql`
  query SiteInfo {
    site {
      siteMetadata {
        description
        title
      }
    }
  }
`
