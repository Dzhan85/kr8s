import React from "react";

import Speedometer from "../components/Speedometer.jsx";
import Tile from "../components/Tile.jsx";
import List from "../components/List.jsx";
import LineGraph from "../components/LineGraph.jsx";
import Header from "../components/Header.jsx";

import styles from "../assets/css/Pods.module.css";

// DUMMY DATA
const podsHeaders = [{ id: "pods", label: "Pods", minWidth: 100 }];
const podsValues = [];
for (let i = 0; i < 20; i++) {
  podsValues.push({ id: i, pods: `pod${i}` });
}
const listValueHeaders = podsHeaders;
const listValue = podsValues;

export default function Pods(props) {
  const headerContent = `${props.clusterName} Pod Condition`;

  return (
    <div className={styles.podsContainer}>
      <Header headerContent={headerContent} />
      <div className={styles.podsContainerHeader}>
        {/* TODO: Add tileValue references */}
        <Tile tileHeader="Number of Running Pods" tileValue="20" />
        <Tile tileHeader="Number of Pending Pods" tileValue="0" />
        <Tile tileHeader="Number of Failed Pods" tileValue="3" />
        <Tile tileHeader="Number of Unknown Pods" tileValue="0" />
      </div>

      <div className={styles.podsContainerList}>
        {/* TODO: Add listValue references */}
        <List
          listValueHeaders={listValueHeaders}
          listValue={listValue}
          reroute="/podview"
        />
      </div>

      <div className={styles.podsContainerHeader}>
        {/* TODO: Add grafana link for each speedometer */}
        {/* <LineGraph src={props.grafana.cpu} />
        <LineGraph src={props.grafana.memory} />
        <Speedometer src={props.grafana.restarts} /> */}
        {/* using dashboard 6663 */}
        <iframe
          src="http://localhost:32000/d-solo/sO3bv1Fnz/kr8s-dashboard?orgId=1&theme=dark&panelId=10"
          width="280"
          height="180"
          frameborder="0"
          className={styles.podsiframe}
        ></iframe>
        <iframe
          src="http://localhost:32000/d-solo/sO3bv1Fnz/kr8s-dashboard?orgId=1&theme=dark&panelId=12"
          width="280"
          height="180"
          frameborder="0"
          className={styles.podsiframe}
        ></iframe>
        <iframe
          src="http://localhost:32000/d-solo/sO3bv1Fnz/kr8s-dashboard?orgId=1&theme=dark&panelId=14"
          width="280"
          height="180"
          frameborder="0"
          className={styles.podsiframe}
        ></iframe>
      </div>
    </div>
  );
}
