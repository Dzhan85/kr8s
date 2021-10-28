import React from "react";
import { Link } from "react-router-dom";

import styles from "../assets/css/ClusterConnect.module.css";
import logo from "../assets/css/imgs/Transparent_Image_3.png";
import underConstruction from "../assets/css/imgs/under-construction.png";

export default function ClusterConnect(props) {
  let clusters = props.clusters.map((cluster) => {
    return (
      <Link key={cluster} to="/dash" onClick={props.getClusterInfo}>
        <p className={styles.clusterContainer}>{cluster}</p>
      </Link>
    );
  });
  
  return (
    <div>
      <main className={styles.mainContainer}>
        <img height='150px' width='150px'src={logo}></img>
        <section>{clusters}</section>
        <section 
          className={styles.clusterContainer}
          style= {{ backgroundImage: `url(${underConstruction})`}}
        >
          Connect To New Cluster
        </section>
      </main>
    </div>
  );
}
