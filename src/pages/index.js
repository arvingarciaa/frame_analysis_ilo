import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from '../components/Layout'
import * as styles from "../styles/home.module.css"  

export default function Home({ data }) {
  const { title, description } = data.site.siteMetadata;
  return (
    <Layout>
      <section className={styles.header}>
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
          <Link className={styles.btn} to="/diagrams"> Link to Diagrams</Link>
        </div> 
      </section>
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
