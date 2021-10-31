import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MATCHES } from 'utils/data';
import TeamList from './TeamList';
import PlayerCard from './PlayerCard';
import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function JoinTeam(props) {
	//mid
	const [matchInfo, setMatchInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const params = useParams();

	useEffect(() => {
		MATCHES.forEach((match) => {
			if (match.match_id === params.mId) {
				setMatchInfo(match);
				setLoading(false);
			}
		});
	}, []);

	const [selectedTeam, setSelectedTeam] = useState([]);

	function selectPlayer(playerInfo) {
		//console.log("hi");
		setSelectedTeam([...selectedTeam, playerInfo]);

		if (selectedTeam.length === 11) {
			setSuccess(true);
		}

		if (selectedTeam.length > 11) {
			setSelectedTeam(selectedTeam.slice(1));
			console.log('error check');
			setError(true);
			// setSuccess(true);
		}
	}

	function removePlayer(playerInfo) {
		setSelectedTeam(
			selectedTeam.filter((player) => {
				if (player.playerId === playerInfo.playerId) return false;
				return true;
			})
		);
	}
	return (
		<>
			{error && (
				<Alert severity="error">
					<AlertTitle>Error</AlertTitle>
					<strong> Only 11 Players Are Allowed </strong>
				</Alert>
			)}
			{success && (
				<div>
					<button>Create Team</button>
				</div>
			)}

			<Grid container spacing={2}>
				<Grid item xs={12} lg={4}>
					{/* show teamA list */}
					{!loading && (
						<TeamList
							displayPicture={matchInfo?.teamA.displayPicture}
							teamName={matchInfo?.teamA.teamName}
							players={matchInfo?.teamA.players}
							onSelectPlayer={selectPlayer}
							removePlayer={removePlayer}
						/>
					)}
				</Grid>
				<Grid item xs={12} lg={4}>
					{selectedTeam.length > 0 &&
						selectedTeam.map((player) => {
							{
								/* console.log('selectedteam', selectedTeam); */
							}

							return (
								<PlayerCard
									playerInfo={player}
									teamDetails={selectedTeam}
									setTeam={setSelectedTeam}
								/>
							);
						})}
				</Grid>

				<Grid item xs={12} lg={4}>
					{!loading && (
						<TeamList
							teamName={matchInfo?.teamB.teamName}
							players={matchInfo?.teamB.players}
							removePlayer={removePlayer}
							onSelectPlayer={selectPlayer}
						/>
					)}
				</Grid>
			</Grid>
		</>
	);
}

export default JoinTeam;
