import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MATCHES } from "utils/data";
import TeamList from "./TeamList";
import PlayerCard from "./PlayerCard";
import { Grid } from "@mui/material";

function JoinTeam(props) {
  //mid
  const [matchInfo, setMatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);
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
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          {/* show teamA list */}
          {!loading && (
            <TeamList
              teamName={matchInfo?.teamA.teamName}
              players={matchInfo?.teamA.players}
              onSelectPlayer={selectPlayer}
            />
          )}
        </Grid>
        <Grid item xs={12} lg={4}>
          {selectedTeam.length > 0 &&
            selectedTeam.map((player) => {
              return <PlayerCard playerInfo={player} />;
            })}
        </Grid>
        <Grid item xs={12} lg={4}>
          {!loading && (
            <TeamList
              teamName={matchInfo?.teamB.teamName}
              players={matchInfo?.teamB.players}
              onSelectPlayer={selectPlayer}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default JoinTeam;
