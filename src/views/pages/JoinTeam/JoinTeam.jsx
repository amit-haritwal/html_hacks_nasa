import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MATCHES } from "utils/data";
import TeamList from "./TeamList";
import PlayerCard from "./PlayerCard";
import { Grid, Button, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import TotalPoints from "./TotalPoints";
import useUserContract from "hooks/useUserContract";

function JoinTeam(props) {
  //mid
  const [matchInfo, setMatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreError, setScoreError] = useState(false);
  const params = useParams();
  const { createTeam, initContract } = useUserContract();
  useEffect(() => {
    MATCHES.forEach((match) => {
      if (match.match_id === params.mId) {
        setMatchInfo(match);
        setLoading(false);
      }
    });
  }, []);

  const [selectedTeam, setSelectedTeam] = useState([]);

  async function handleCreateTeam() {
    const instance = await initContract();
    // build 2darray
    let array = [];
    selectedTeam.forEach((player) => {
      array.push([
        player.playerType,
        `${player.pointRequired}`,
        player.playerId,
        "0",
        "0",
      ]);
    });
    array[0][3] = "1";
    array[1][4] = "1";
    await instance.createTeam(
      "0x883cC4DD066D607c4A533Bd2AABCC90BAab7C435",
      "2",
      array,
      {
        from: "0x883cC4DD066D607c4A533Bd2AABCC90BAab7C435",
      }
    );
  }

  function selectPlayer(playerInfo) {
    //console.log("hi");
    setSelectedTeam([...selectedTeam, playerInfo]);

    var totalscore = score + playerInfo.pointRequired;

    if (totalscore >= 100) {
      setScoreError(true);
    } else setScore(totalscore);

    if (selectedTeam.length === 11) {
      setSuccess(true);
    }

    if (selectedTeam.length > 11) {
      setSelectedTeam(selectedTeam.slice(1));
      console.log("error check");
      setError(true);
      // setSuccess(true);
    }
  }

  function removePlayer(playerInfo) {
    var totalscore = score - playerInfo.pointRequired;

    setScore(totalscore);

		setSelectedTeam(
			selectedTeam.filter((player) => {
				if (player.playerId === playerInfo.playerId) return false;
				return true;
			})
		);
	}
	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} lg={4} sx={{ my: 2 }}>
					<TotalPoints score={score} />
				</Grid>
				<Grid item xs={12} lg={4} sx={{ my: 2 }}>
					{error && (
						<Alert severity="error" sx={{ mb: 2 }}>
							<AlertTitle>Error</AlertTitle>
							<strong> Only 11 Players Are Allowed </strong>
						</Alert>
					)}
					{scoreError && (
						<Alert severity="error">
							<AlertTitle>Error</AlertTitle>
							<strong> Total Score Should Be Less Than 100 </strong>
						</Alert>
					)}
				</Grid>
				<Grid item align="center" xs={12} lg={4} sx={{ my: 2 }}>
					{success ? (
						<Button color="primary" variant="outlined">
							Create Team
						</Button>
					) : (
						<Alert severity="info">
							{' '}
							<AlertTitle>Please Select 11 Players</AlertTitle>{' '}
							<strong>{selectedTeam.length} Players Selected</strong>{' '}
						</Alert>
					)}
				</Grid>
			</Grid>
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
					<Typography variant="h2" align="center" gutterBottom>
						Your Team
					</Typography>
					<div style={{  height: "34rem", width: "auto", overflowY: "auto",}}>
					{selectedTeam.length > 0 &&
						selectedTeam.map((player) => {
							return (
								<PlayerCard
									playerInfo={player}
									teamDetails={selectedTeam}
									setTeam={setSelectedTeam}
								/>
							);
						})}
					</div>
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
