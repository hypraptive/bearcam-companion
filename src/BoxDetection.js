import React, { useState } from 'react';

import './App.css';
import { Amplify, Predictions, DataStore } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import { Button } from '@aws-amplify/ui-react';
import { Objects } from "./models";

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

export default function BoxDetection({image}) {
  //const [response, setResponse] = useState("Click upload for test ")

  const [boxList, setBoxList] = useState([])

  // const [response, setResponse] = useState({ "labels": [ { "name": "Brown Bear", "boundingBoxes": [], "metadata": { "confidence": 94.71234893798828, "parents": [ { "name": "Bear" }, { "name": "Wildlife" }, { "name": "Mammal" }, { "name": "Animal" } ] } }, { "name": "Bear", "boundingBoxes": [ { "height": 0.43010085821151733, "left": 0.3877471387386322, "top": 0.3014882504940033, "width": 0.43040770292282104 } ], "metadata": { "confidence": 94.71234893798828, "parents": [ { "name": "Wildlife" }, { "name": "Mammal" }, { "name": "Animal" } ] } }, { "name": "Mammal", "boundingBoxes": [], "metadata": { "confidence": 94.71234893798828, "parents": [ { "name": "Animal" } ] } }, { "name": "Animal", "boundingBoxes": [], "metadata": { "confidence": 94.71234893798828, "parents": [] } }, { "name": "Wildlife", "boundingBoxes": [], "metadata": { "confidence": 94.71234893798828, "parents": [ { "name": "Animal" } ] } }, { "name": "Water", "boundingBoxes": [], "metadata": { "confidence": 55.531490325927734, "parents": [] } } ] })

  const [response, setResponse] = useState({ "labels": [ { "name": "Mammal", "boundingBoxes": [], "metadata": { "confidence": 91.53262329101562, "parents": [ { "name": "Animal" } ] } }, { "name": "Animal", "boundingBoxes": [], "metadata": { "confidence": 91.53262329101562, "parents": [] } }, { "name": "Brown Bear", "boundingBoxes": [], "metadata": { "confidence": 87.50741577148438, "parents": [ { "name": "Bear" }, { "name": "Wildlife" }, { "name": "Mammal" }, { "name": "Animal" } ] } }, { "name": "Wildlife", "boundingBoxes": [], "metadata": { "confidence": 87.50741577148438, "parents": [ { "name": "Animal" } ] } }, { "name": "Bear", "boundingBoxes": [ { "height": 0.31082990765571594, "left": 0.30625173449516296, "top": 0.4327436685562134, "width": 0.16304358839988708 }, { "height": 0.27813971042633057, "left": 0.6130136847496033, "top": 0.3633682429790497, "width": 0.26234132051467896 } ], "metadata": { "confidence": 87.50741577148438, "parents": [ { "name": "Wildlife" }, { "name": "Mammal" }, { "name": "Animal" } ] } }, { "name": "Nature", "boundingBoxes": [], "metadata": { "confidence": 82.90247344970703, "parents": [] } }, { "name": "Elephant", "boundingBoxes": [ { "height": 0.3217243254184723, "left": 0.07372771948575974, "top": 0.39511731266975403, "width": 0.21218346059322357 } ], "metadata": { "confidence": 82.64056396484375, "parents": [ { "name": "Wildlife" }, { "name": "Mammal" }, { "name": "Animal" } ] } }, { "name": "Outdoors", "boundingBoxes": [], "metadata": { "confidence": 79.14771270751953, "parents": [] } }, { "name": "Water", "boundingBoxes": [], "metadata": { "confidence": 72.9056396484375, "parents": [] } }, { "name": "Sea", "boundingBoxes": [], "metadata": { "confidence": 70.29981231689453, "parents": [ { "name": "Outdoors" }, { "name": "Water" }, { "name": "Nature" } ] } }, { "name": "Ocean", "boundingBoxes": [], "metadata": { "confidence": 70.29981231689453, "parents": [ { "name": "Outdoors" }, { "name": "Water" }, { "name": "Nature" } ] } }, { "name": "River", "boundingBoxes": [], "metadata": { "confidence": 60.10761260986328, "parents": [ { "name": "Outdoors" }, { "name": "Water" }, { "name": "Nature" } ] } } ] })

  function identifyFromFile(event) {
    const { target: { files } } = event;
    const [file,] = files || [];

    if (!file) {
      return;
    }
    Predictions.identify({
      labels: {
        source: {
          file,
        },
        type: "LABELS" // "LABELS" will detect objects , "UNSAFE" will detect if content is not safe, "ALL" will do both default on aws-exports.js
      }
    })
      .then((result) => {
        //const data = JSON.parse(result)
        setResponse(result)
      })
      .catch(err => setResponse(JSON.stringify(err, null, 2)))
  }

  async function saveBox (label, confidence, width, height, left, top, imagesID) {
    await DataStore.save(
      new Objects({
        label: label,
        confidence: confidence,
        width: width,
        height: height,
        left: left,
        top: top,
        imagesID: imagesID
      })
    );
  }

  function getBoxes (image) {
    const { labels } = response;
    console.log("imageID", image.id)
    labels.forEach(object => {
      //console.log("Label", object.name)
      //if (object.name === "Bear") {
        //console.log(JSON.stringify(object, null, 2))
        console.log("name", object.name)
        console.log("confidence", object.metadata.confidence)
        setBoxList(object.boundingBoxes)
        object.boundingBoxes.forEach(box => {
          console.log("box", box)
          saveBox(object.name, object.metadata.confidence,
                  box.width, box.height, box.left, box.top, image.id)
        })
      //}
      //const { name, boundingBoxes } = object
    });
    // const jBears = response.labels.filter(obj => {
    //    return obj.Name === "Bear"
    //  })
    //  const jBoxes = jBears[0].instances
    //  jBoxes.forEach((x, i) => {
    //    console.log("Confidence: ", x.confidence)
    //    console.log("Bounding Box: ", x.boundingBox)
    //    console.log("Images ID", image.id)
    //  })
     //setBoxList([])
   }

    // const strBears = JSON.stringify(jBears, null, 2)
    // const jInstances = jBears[0].Instances
    // const strInstances = JSON.stringify(jInstances, null, 2)

  return (
    <div className="Text">
      <div>
        <h3>Labels identification</h3>
        <input type="file" onChange={identifyFromFile}></input>
        <p>{JSON.stringify(response, null, 2)}</p>
        <h3>Get Boxes</h3>
        <Button onClick={() => getBoxes(image)} color="gray">Get Boxes</Button>
        <p>{JSON.stringify(boxList, null, 2)}</p>
      </div>
    </div>
  );
}
