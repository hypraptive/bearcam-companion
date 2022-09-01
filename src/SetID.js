import { SelectField, Flex } from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react'
import { Analytics, DataStore } from "aws-amplify";
import { Identifications } from "./models";

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
    '040',
    '057',
    '063',
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
    '402',
    '435 Holly',
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
    '634 Popeye',
    '708 Amelia',
    '717',
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
    '821',
    '831',
    '854 Divot',
    '856',
    '879',
    '901',
    '902',
    '903',
    '904',
    '905',
    '906',
    '907',
    '908',
    '909',
    '910',
    '912',
    '913'
  ]

  const [curSel, setCurSel] = useState("none");

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
