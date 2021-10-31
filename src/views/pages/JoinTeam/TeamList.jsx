import PlayerCard from "./PlayerCard";

function TeamList(props) {
  const { players, onSelectPlayer, teamName, displayPicture, removePlayer } =
    props;
  return (
    <>
      <h1>{teamName}</h1>
      <div style={ListContainerStyle}>
        {players?.map((player) => {
          return (
            <PlayerCard
              playerInfo={player}
              removePlayer={removePlayer}
              onSelectPlayer={onSelectPlayer}
            />
          );
        })}
      </div>
    </>
  );
}
export default TeamList;

const ListContainerStyle = {
  height: "34rem",
  width: "auto",
  overflowY: "auto",
};
