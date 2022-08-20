import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { Annotorious } from '@recogito/annotorious';
import { Link } from 'react-router-dom';
import { DataStore } from "aws-amplify";
import { Objects } from "./models";

import '@recogito/annotorious/dist/annotorious.min.css';

// Search for TODO:
// Optional: Add comment field to Objects to save
// Optional: .setAuthInfo (https://recogito.github.io/annotorious/api-docs/annotorious/#setauthinfo)

function EditView({images, user}) {
  let params = useParams();
  //console.log("Images", images)
  const curIndex = images.findIndex(obj => obj.id === params.imageId)
  const curImage = images[curIndex]

  // Ref to the image DOM element
  const imgEl = useRef();

  // The current Annotorious instance
  const [ anno, setAnno ] = useState();

  // Annotorious annotation xamples at
  // https://recogito.github.io/annotorious/getting-started/web-annotation/

  // Convert Objects entry to annotation for annotorious
  function obj2anno(obj) {
    const value = "xywh=percent:" + obj.left*100 + "," + obj.top*100 + "," + obj.width*100 + "," + obj.height*100;
    return {
        "@context": "http://www.w3.org/ns/anno.jsonld",
        "id": obj.id,
        "type": "Annotation",
        "body": [{
          "type": "TextualBody",
          "purpose": "tagging",
          "value": obj.label
        }],
        "target": {
          "selector": {
            "type": "FragmentSelector",
            "conformsTo": "http://www.w3.org/TR/media-frags/",
            "value": value
          }
        }
    }
  }

  function getBoxInfo(value) {
    const percentages = value.split(":")[1].split(",");
    // order: xywh
    const left = parseFloat(percentages[0])/100;
    const top = parseFloat(percentages[1])/100;
    const width = parseFloat(percentages[2])/100;
    const height = parseFloat(percentages[3])/100;
    return {top, left, width, height};
  }

  function getLabel(annotation) {
    const body = annotation.body;
    var label = "";
    for (let i in body) {
      if (body[i].purpose === "tagging") {
        label = body[i].value;
      }
    }
    return (label);
  }

  // Init Annotorious when the component
  // mounts, and keep the current 'anno'
  // instance in the application state
  useEffect(() => {
    let annotorious = null;

    if (imgEl.current) {
      // Init
      annotorious = new Annotorious({
        image: imgEl.current,
        fragmentUnit: 'percent',
        widgets: [
          { widget: 'TAG', vocabulary: [ 'Bear', 'Bird', 'Fish', 'Moose', 'Person', 'Wolf'] }
        ]
      });

      // Attach event handlers here
      annotorious.on('createAnnotation', async annotation => {
        // createAnnotation - can override id with overrideId(newId);
        // id, label, confidence, width, height, left, top
        // Don't forget imagesID
        const label = getLabel(annotation);
        console.log("Label:", label);

        const {top, left, width, height} = getBoxInfo(annotation.target.selector.value);
        console.log("Box:", top, left, width, height);

        await DataStore.save(
          new Objects({
            id: annotation.id,
            label: label,
            confidence: 100.0,
            width: width,
            height: height,
            left: left,
            top: top,
            imagesID: curImage.id
          })
        );

        console.log('created', annotation);
      });

      annotorious.on('updateAnnotation', async (annotation, previous) => {
        // TODO:updateAnnotation
        const label = getLabel(annotation);
        console.log("Label:", label);

        const {top, left, width, height} = getBoxInfo(annotation.target.selector.value);
        console.log("Box:", top, left, width, height);

        const original = await DataStore.query(Objects, annotation.id);
        await DataStore.save(
          Objects.copyOf(original, updated => {
            updated.label = label;
            updated.confidence = 100.0;
            updated.width = width;
            updated.height = height;
            updated.left = left;
            updated.top = top;
          })
        );

        console.log('updated', annotation, previous);
      });

      annotorious.on('deleteAnnotation', async annotation => {
        // deleteAnnotation
        const todelete = await DataStore.query(Objects, annotation.id);
        DataStore.delete(todelete);
        console.log('deleted', annotation);
      });
    }

    // Only support rectangle tool
    annotorious.setDrawingTool('rect');

    // Keep current Annotorious instance in state
    setAnno(annotorious);

    // Cleanup: destroy current instance
    return () => annotorious.destroy();
  }, [curImage]);

  // Load Objects for image
  useEffect(() => {
    async function getBoxes() {
      if (curImage.id) {
        const boxes = await DataStore.query(Objects, c => c.imagesID("eq", curImage.id));
        //console.log("Boxes", boxes)
        if (boxes.length > 0) {
          console.log("Got", boxes.length, "boxes");
          for (let i in boxes) {
            //console.log("Box", i, boxes[i]);
            // Convert box to W3C Web Annotation Model (https://www.w3.org/TR/annotation-model/)
            const res = obj2anno(boxes[i]);
            //console.log("Anno:",res)
            // Add to Annotorious: anno.addAnnotation(annotation [, readOnly]);
            anno.addAnnotation(res);
            console.log("Added Annotation for", boxes[i].id)
          }
          const annotations = anno.getAnnotations();
          console.log("Added", annotations.length, "annotations")
        }
      }
    }

    if (anno) {
      console.log("Get boxes for", curImage.id)
      getBoxes();
    }
  }, [anno, curImage]);

  return (
    <div>
      <img
        ref={imgEl}
        src={curImage.url}
        alt={curImage.id} />
      <Link to={`/image/${curImage.id}`}>
        Back to View Image
      </Link>
    </div>
  );
}

export default EditView;

// Annotorious format
// {
//   "@context": "http://www.w3.org/ns/anno.jsonld",
//   "id": "#a88b22d0-6106-4872-9435-c78b5e89fede",
//   "type": "Annotation",
//   "body": [{
//     "type": "TextualBody",
//     "value": "It's Hallstatt in Upper Austria"
//   }],
//   "target": {
//     "selector": {
//       "type": "FragmentSelector",
//       "conformsTo": "http://www.w3.org/TR/media-frags/",
//       "value": "xywh=percent:17.574257850646973,6.894022623697917,62.04620520273845,72.31389928747106"
//     }
//   }
// }
