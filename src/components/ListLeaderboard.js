import React from "react";

function ListLeaderboard({ ranking, playerName, totalWin, totalLose, totalDraw, date }) {
  return (
    <>
      <tr>
        <td>{ranking}</td>
        <td>{playerName}</td>
        <td>{totalWin}</td>
        <td>{totalLose}</td>
        <td>{totalDraw}</td>
        <td>{date}</td>
      </tr>
    </>
  );
}
export default ListLeaderboard;
