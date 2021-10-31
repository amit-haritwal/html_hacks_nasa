import { useState } from 'react';

import { Card, CardHeader, Avatar, IconButton, Divider, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function PlayerCard(props) {
	const { playerInfo, onSelectPlayer, teamDetails, setTeam, removePlayer } =
		props;

	const [selected, setSelected] = useState(false);
	function toggleSelect() {
		setSelected(!selected);
	}

	function handleOnPlayerAdd() {
		onSelectPlayer(playerInfo);
		toggleSelect();
	}
	function handleRemovePlayer() {
		removePlayer(playerInfo);
		toggleSelect();
	}

  return (
    <Card sx={{ maxWidth: 345, my: 1, mx: 0 }}>
      <CardHeader
        avatar={<Avatar src={playerInfo.displayPicture} aria-label="Player" />}
        action={
          onSelectPlayer && (
            <>
              {selected ? (
                <IconButton color="error"  onClick={handleRemovePlayer}>
                  <RemoveIcon />
                </IconButton>
              ) : (
                <IconButton color="primary" onClick={handleOnPlayerAdd}>
                  <AddIcon />
                </IconButton>
              )}
            </>
          )
        }
        title={playerInfo.playerName}
        subheader={playerInfo.playerType}
      />
      <Divider />
    </Card>
  );
}

export default PlayerCard;
