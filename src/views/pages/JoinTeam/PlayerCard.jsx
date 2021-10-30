import { useState } from 'react';

import { Card, CardHeader, Avatar, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function PlayerCard({
	playerInfo,
	onSelectPlayer,
	teamDetails,
	setTeam,
	showSymbol,
}) {
	// const {
	// 	playerInfo,
	// 	onSelectPlayer,
	// } = props;

	const [selected, setSelected] = useState(false);

	function handleTeam() {
		console.log('teamDetails', teamDetails, showSymbol);
		console.log('playerInfo', playerInfo);
	}

	function handleOnPlayerAdd() {
		onSelectPlayer(playerInfo);
		setSelected(!selected);
	}
	return (
		<Card sx={{ maxWidth: 345, my: 1, mx: 0 }}>
			<CardHeader
				avatar={<Avatar src={playerInfo.displayPicture} aria-label="Player" />}
				action={
					<IconButton aria-label="add" onClick={handleOnPlayerAdd}>
						{selected ? (
							<button
								onClick={() => {
									handleTeam();
								}}>
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
