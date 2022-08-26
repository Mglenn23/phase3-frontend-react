import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import ListLeaderboard from "./ListLeaderboard";
function Leaderboard() {
  const [dataLeaderboard, setDataLeaderboard] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292//get_leaderboard")
      .then((res) => res.json())
      .then((data) => setDataLeaderboard(data));
  }, []);
  const displayAllPlayer = dataLeaderboard.map((data, idx) => {
    let win;
    let lose;
    let draw;
    if (data.total_win == null) {
      win = 0;
    } else if (data.total_win != null) {
      win = data.total_win;
    }
    if (data.total_draw == null) {
      draw = 0;
    } else if (data.total_draw != null) {
      draw = data.total_draw;
    }
    if (data.total_lose == null) {
      lose = 0;
    } else if (data.total_lose != null) {
      lose = data.total_lose;
    }

    return <ListLeaderboard key={data.id} ranking={idx + 1} playerName={data.user_name} totalWin={win} totalLose={lose} totalDraw={draw} date={data.created_at} />;
  });
  return (
    <>
      <Table striped bordered hover variant="dark" style={{}}>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Player Name</th>
            <th>Total Win</th>
            <th>Total Lose</th>
            <th>Total Draw</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{displayAllPlayer}</tbody>
      </Table>
    </>
  );
}
export default Leaderboard;
