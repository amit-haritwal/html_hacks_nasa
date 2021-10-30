import PlayerCard from "./PlayerCard";

function TeamList(props) {
  const { players, onSelectPlayer, teamName, displayPicture } = props;
  return (
    <>
      <h1>{teamName}</h1>
      <div style={ListContainerStyle}>
        {players?.map((player) => {
          return (
            <PlayerCard  playerInfo={player} onSelectPlayer={onSelectPlayer} />
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
