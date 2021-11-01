import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Speedometer from "../components/Speedometer.jsx";
import Tile from "../components/Tile.jsx";
import List from "../components/List.jsx";
// import LineGraph from "../components/LineGraph.jsx";
import Header from "../components/Header.jsx";

import styles from "../assets/css/Pods.module.css";
import PodView from "../components/PodView.jsx";

export default function Pods(props) {
  const headerContent = `${props.clusterName} Pod Condition`;
  const [myPod, setMyPod] = useState({});

  function setCurrentPod(podName) {
    for (let i = 0; i < podsValues.length; i++) {
      if(podsValues[i].pod === podName) {
        setMyPod(podsValues[i]);
        return;
      }
    }  
  }

  let runningPods = 0, 
      pendingPods = 0,
      failedPods = 0,
      unknownPods = 0,
      succeededPods = 0;


  const podsValues = [];

  const podsHeaders = [
    { id: 'pod', label: 'Pod', minWidth: 100 },
    { id: 'initialized', label: 'Initialized', minWidth: 100 },
    { id: 'ready', label: 'Ready', minWidth: 100 },
    { id: 'containersReady', label: 'Containers Ready', minWidth: 100 },
    { id: 'podScheduled', label: 'Pod Scheduled', minWidth: 100 },
    { id: 'numContainers', label: 'Number of Containers', minWidth: 100 }];
    
  props.pods.forEach(pod => {
    const podValues = {};

    // Increment count for the current Pod Status
    switch(pod.status.phase) {
      case "Running":
        runningPods++;
        break;
      case "Pending":
        pendingPods++;
        break;
      case "Failed":
        failedPods++;
        break;
      case "Unknown":
        unknownPods++;
        break;
      case "Succeeded":
        succeededPods++;
        break;
    }

    // Build Current Pod Values object and add to the podsValues Array
    podValues['pod'] = pod.metadata.name;
    podValues['initialized'] = pod.status.conditions[0].status;
    podValues['ready'] = pod.status.conditions[1].status;
    podValues['containersReady'] = pod.status.conditions[2].status;
    podValues['podScheduled'] = pod.status.conditions[3].status;
    podValues['numContainers'] = pod.spec.containers.length;
    podValues['containers'] = pod.status.containerStatuses;

    podsValues.push(podValues);
  });    

  return (
    <Router>
      <Switch>
      
        <Route path='/pods'>
          <div className={styles.podsContainer}>
            <Header headerContent={headerContent} />
            <div className={styles.podsContainerHeader}>
              <Tile tileHeader="Running Pods" tileValue={runningPods} />
              <Tile tileHeader="Pending Pods" tileValue={pendingPods} />
              <Tile tileHeader="Failed Pods" tileValue={failedPods} />
              <Tile tileHeader="Unknown Pods" tileValue={unknownPods} />
              <Tile tileHeader="Succeeded Pods" tileValue={succeededPods} />
            </div>

            <div className={styles.podsContainerList}>
              <List
                listValueHeaders={podsHeaders}
                listValue={podsValues}
                setCurrentTarget={setCurrentPod}
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
                src="http://localhost:32000/d-solo/AAOMjeHmk/kubernetes-pod-and-cluster-monitoring-via-prometheus?orgId=1&refresh=10s&from=1635437894472&to=1635441494472&theme=dark&panelId=3"
                width="450"
                height="200"
                frameborder="0"
              ></iframe>
              <iframe
                src="http://localhost:32000/d-solo/AAOMjeHmk/kubernetes-pod-and-cluster-monitoring-via-prometheus?orgId=1&refresh=10s&from=1635437907441&to=1635441507441&theme=dark&panelId=2"
                width="450"
                height="200"
                frameborder="0"
              ></iframe>
              <iframe
                src="http://localhost:32000/d-solo/AAOMjeHmk/kubernetes-pod-and-cluster-monitoring-via-prometheus?orgId=1&refresh=10s&from=1635437052196&to=1635440652196&theme=dark&panelId=8"
                width="450"
                height="200"
                frameborder="0"
              ></iframe>
            </div>
          </div>
        </Route>

        <Route path="/podview">
          <PodView 
            pod={myPod}
          />
        </Route>
        
      </Switch>
    </Router>
  );
}
