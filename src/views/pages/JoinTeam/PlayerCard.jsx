import {useState} from 'react';

import { Card, CardHeader, Avatar, IconButton, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
function PlayerCard(props) {
  const { playerInfo, onSelectPlayer } = props;

  function handleOnPlayerAdd() {
    onSelectPlayer(playerInfo);
  }
  return (
    <Card sx={{ maxWidth: 345 , my:1, mx:0}}>
      <CardHeader
        avatar={
          <Avatar
            src="https://i.ibb.co/qmwPVm9/Cream11-Logo.png"
            aria-label="Player"
          />
        }
        action={
          <IconButton aria-label="add" onClick={handleOnPlayerAdd}>
            <AddIcon />
          </IconButton>
        }
        title={playerInfo.playerName}
        subheader={playerInfo.playerType}
      />
      <Divider />
    </Card>
  );
}

export default PlayerCard;
