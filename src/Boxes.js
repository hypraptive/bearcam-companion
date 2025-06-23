import './Boxes.css';
import BoxIDs from './BoxIDs';
import SetID from './SetID';
import React from 'react'
import { useState, useEffect } from 'react'
import { DataStore } from "aws-amplify";
import { Identifications } from "./models";

export default function Boxes({ box, username }) {
  const [identList, setIdentList] = useState([]);
  const [identAgg, setIdentAgg] = useState([["???", 1]]);
  const [identCount, setIdentCount] = useState(1);

  const boxTop = `${box.top*100}%`
  const boxLeft = `${box.left*100}%`
  const boxHeight = `${box.height*100}%`
  const boxWidth = `${box.width*100}%`
  //console.log("Box: ", box.id)

  function groupIdents(list, key) {
    return list.reduce(function(rv, x) {
      //(rv[x[key]] = rv[x[key]] || []).push(x);
      rv[x[key]] = rv[x[key]] ? ++rv[x[key]] : 1;
      return rv;
    }, {});
  };

  useEffect(() => {
    async function getIdents() {
      var idents = await DataStore.query(Identifications, c => c.objectsID("eq", box.id));
      //console.log("Identifications retrieved successfully!", JSON.stringify(idents, null, 2));
      //console.log("Identifications retrieved successfully!", idents.length);
      //console.log("Idents:", JSON.stringify(idents, null, 2));
      var pairIdents = [["???", 1]];

      var count = 1;
      if (idents.length) {
        const gIdents = groupIdents(idents,"name");
        pairIdents = Object.entries(gIdents).sort((a,b) => b[1]-a[1]);
        count = idents.length;
        //console.log("Pairs:", JSON.stringify(pairIdents, null, 2));
      }

      setIdentList(idents);
      //console.log("Count:", count)
      setIdentCount(count);
      setIdentAgg(pairIdents);
    }
      getIdents();
      //DataStore.observe(Identifications).subscribe(getIdents);
    }, [box.id, identList]);
    //<div className="labelname">{box.label} ({Math.trunc(box.confidence)}%)</div>

    if (box.label === "Bear") {
      return(
            <div className="bbox-bear tooltip" key={box.id}
              style={{top: boxTop, left: boxLeft, height: boxHeight, width: boxWidth }} >
              <div>
                <div className="identname">{identAgg[0][0]} ({identAgg[0][1]}/{identCount})</div>
              </div>
              <div className="identdetails">
                {
                  identAgg.map( (ident) =>
                  <BoxIDs  key={box.id + "-" + ident[0]} ident={ident} />
                  )
                }
                <SetID boxID={box.id} curList={identList} username={username} />
              </div>
            </div>
      )
    } else {
      return(
            <div className="bbox tooltip" key={box.id}
              style={{top: boxTop, left: boxLeft, height: boxHeight, width: boxWidth }} >
              <div className="labelname">{box.label} ({Math.trunc(box.confidence)}%)</div>
            </div>
      )
    }
}
