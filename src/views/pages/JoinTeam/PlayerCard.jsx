import { useState } from 'react';

import { Card, CardHeader, Avatar, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function PlayerCard(props) {
	const { playerInfo, onSelectPlayer, teamDetails, setTeam } = props;

	const [selected, setSelected] = useState(false);

	// function handleTeam() {
	// 	console.log('teamDetails', teamDetails, props);
	// 	console.log('playerInfo', playerInfo);
	// }

	function handleOnPlayerAdd() {
		onSelectPlayer(playerInfo);
		setSelected(!selected);
	}
	return (
		<Card sx={{ maxWidth: 345, my: 1, mx: 0 }}>
			<CardHeader
				avatar={
					<Avatar
						src="https://i.ibb.co/qmwPVm9/Cream11-Logo.png"
						aria-label="Player"
					/>
				}
				action={
					<IconButton aria-label="add" onClick={handleOnPlayerAdd}>
						{selected ? (
							<button>
								<RemoveIcon />
							</button>
						) : (
							<AddIcon />
						)}
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
