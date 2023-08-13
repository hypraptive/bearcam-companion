import './FrameView.css';
import React from 'react'
import { Card, View, Text, Heading } from "@aws-amplify/ui-react";
import { useState, useEffect } from 'react'
import { DataStore } from "aws-amplify";
import { Identifications } from "./models";
import {
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
  } from '@aws-amplify/ui-react';
  
export function Leader ({ user }) {
    const [identList, setIdentList] = useState([]);
    const [userRank, setUserRank] = useState([]);

    function groupIdents(list, key) {
        return list.reduce(function(rv, x) {
          //(rv[x[key]] = rv[x[key]] || []).push(x);
          rv[x[key]] = rv[x[key]] ? ++rv[x[key]] : 1;
          return rv;
        }, {});
    };

    useEffect(() => {
        async function getIdents() {
            var idents = await DataStore.query(Identifications);
            const gIdents = groupIdents(idents,"user");
            const pairIdents = Object.entries(gIdents).sort((a,b) => b[1]-a[1]);
            var curRank = 0;
            var lastCount = 0;
            for (var ident of pairIdents) {
                console.log(ident[0])
                if (ident[1] !== lastCount) {
                    lastCount = ident[1];
                    curRank += 1;
                }
                if (ident[0] === user.username) {
                    setUserRank(curRank)
                }
                ident.push(curRank);
            }
            setIdentList(pairIdents)
        }
        getIdents();
    }, [user.username]);
      
  return(
    <div>
    <View
      padding="1rem"
      maxWidth="100%"
    >
    <Card
      key="about-card"
      borderRadius="medium"
      variation="outlined"
    >
    <Heading level={6}>Your Rank</Heading>
    <View
      padding="1rem"
      maxWidth="100%"
    >
    <Text fontSize="1em"
    style={{
      textAlign: 'left'
    }}
    >
    You are ranked # {userRank} of {identList.length}!
    </Text>
    </View>
    <Heading level={6}>Leader Board</Heading>
    <View
      padding="1rem"
      maxWidth="100%"
    >
    <Text fontSize="1em"
    style={{
      textAlign: 'left'
    }}
    >

    <Table
    caption=""
    highlightOnHover={false}>
    <TableHead>
        <TableRow>
        <TableCell as="th">Rank</TableCell>
        <TableCell as="th">User</TableCell>
        <TableCell as="th">Identifications</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {
            identList.map( (ident, index) =>
            <TableRow>
            <TableCell>{ident[2]}</TableCell>
            <TableCell>{ident[0]}</TableCell>
            <TableCell>{ident[1]}</TableCell>
            </TableRow>
                )
        }
    </TableBody>
    </Table>
    </Text>
    </View>
    </Card>
    </View>
    </div>
  )
}

export default Leader;
