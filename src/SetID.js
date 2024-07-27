import { SelectField, Flex } from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react'
import { Analytics, DataStore } from "aws-amplify";
import { Identifications, Objects, Images } from "./models";

export default function SetID ({ boxID, curList, username }) {
  const bearList = [
    'Not a bear',
    'Unknown',
    'Unknown Adult',
    'Unknown Subadult',
    'Known Adult',
    'Known Subadult',
    'Cub (COY)',
    'Cub (1.5yo)',
    'Cub (2.5yo)',
    'Cub (3.5yo)',
    '014',
    '015',
    '017',
    '018 (Humphrey)',
    '019',
    '020',
    '021',
    '022',
    '023',
    '025',
    '026',
    '027',
    '028',
    '029',
    '032 Chunk',
    '039',
    '057',
    '058',
    '063',
    '065',
    '068',
    '083 Wayne Brother',
    '087',
    '088',
    '089 Backpack',
    '094',
    '097',
    '099',
    '101',
    '102',
    '103',
    '115',
    '128 Grazer',
    '129',
    '131',
    '132',
    '133',
    '135',
    '136',
    '137',
    '138',
    '139',
    '144',
    '146',
    '147',
    '148',
    '151 Walker',
    '153',
    '155',
    '161',
    '164 (Bucky)',
    '166',
    '167',
    '171',
    '174',
    '182',
    '184',
    '187',
    '193',
    '196',
    '201',
    '203',
    '204',
    '205',
    '207',
    '208',
    '210',
    '212',
    '214',
    '215',
    '217',
    '220',
    '224',
    '225',
    '228',
    '230',
    '261',
    '273',
    '274 Overflow',
    '284 (Electra)',
    '289',
    '299',
    '306',
    '307',
    '308',
    '335 (Jolly)',
    '344',
    '345',
    '346',
    '348',
    '353',
    '354',
    '356',
    '358',
    '359',
    '361',
    '383',
    '384',
    '396',
    '399',
    '402',
    '428 (Studious)',
    '429 (Social',
    '435 Holly',
    '469 (Patches)',
    '474',
    '477 Sara',
    '480 Otis',
    '482 Brett',
    '503 Cubadult',
    '504',
    '505',
    '602',
    '603',
    '610',
    '611',
    '615',
    '634 Popeye',
    '708 Amelia',
    '717',
    '718',
    '719',
    '747',
    '755 Scare D Bear',
    '775 Lefty',
    '801',
    '803',
    '804',
    '805',
    '806',
    '807',
    '808',
    '809 (Velcro)',
    '810',
    '811',
    '812',
    '813 Nostril Bear',
    '820',
    '821 (Pepper)',
    '831',
    '854 Divot',
    '856',
    '879',
    '901',
    '902 (Fifi/Bonsai/Peanut)',
    '903 (Gully)',
    '904',
    '905',
    '906',
    '907',
    '908',
    '909',
    '910',
    '911',
    '912',
    '913'
  ]

  const [curSel, setCurSel] = useState("none");

  function groupIdents(list, key) {
    return list.reduce(function(rv, x) {
      //(rv[x[key]] = rv[x[key]] || []).push(x);
      rv[x[key]] = rv[x[key]] ? ++rv[x[key]] : 1;
      return rv;
    }, {});
  };

  // Update Bear Count and Bear List
  async function updateBearInfo(boxId) {
    // get image from boxID
    const box = await DataStore.query(Objects, boxId);
    const image = await DataStore.query(Images, box.imagesID);

    // get boxes for image
    const boxes = await DataStore.query(Objects, c => c.imagesID("eq", image.id));
    
    // count number of bears and get list
    var bearCount = 0
    var bearList = ""
    for (const box of boxes) {
      if (box.label === "Bear") {
        bearCount += 1
        const idents = await DataStore.query(Identifications, c => c.objectsID("eq", box.id));
        if (idents.length) {
          const gIdents = groupIdents(idents,"name");
          const pairIdents = Object.entries(gIdents).sort((a,b) => b[1]-a[1]);
          console.log("Ident:", pairIdents[0][0]);
          bearList = bearList + pairIdents[0][0] + ","
        } else {
          console.log("Ident:", "Unknown");
          bearList = bearList + "Unknown,"
        }
      }
    }
    bearList = bearList.substring(0,bearList.length-1);
    console.log("Bear count =", bearCount)
    console.log("Bear list =", bearList)

    // update bearCount
    const origImage = await DataStore.query(Images, image.id);
    await DataStore.save(
      Images.copyOf(origImage, updated => {
        updated.bearCount = bearCount;
        updated.bearList = bearList;
      })
    );
  }
  

  useEffect(() => {
    //console.log("user ", username)
    var userIdent = curList.find((ident) => {
      return ident.user === username;
    })
    var userSel = "none"
    if (userIdent) {
      userSel = userIdent.name
    }
    //console.log("userSel ", userSel)
    setCurSel(userSel);
  }, [curList, username]);

  async function handleIDSelect(idValue) {
    var userIdent = curList.find((ident) => {
      return ident.user === username;
    })
    if (userIdent) {
      // modify exiting ident
      console.log("Modify ident", userIdent.id, idValue)
      await DataStore.save(
        Identifications.copyOf(userIdent, updated => {
          updated.name = idValue;
        })
      );
      Analytics.record({ name: 'modifyId' });
    } else {
      // create new ident
      console.log("New Ident", idValue, username, boxID)
      await DataStore.save(
        new Identifications({
          name: idValue,
          user: username,
          objectsID: boxID
        })
      );
      Analytics.record({ name: 'createId' });
    }
    updateBearInfo(boxID);
  }

  return(
    <Flex direction="column">
      <SelectField
        label={"Selected: " + curSel}
        placeholder="Pick a bear..."
        options={bearList}
        onChange={(e) => handleIDSelect(e.target.value)}
      ></SelectField>

    </Flex>
  )
}
