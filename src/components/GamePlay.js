import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import Card from "react-bootstrap/Card";
import AnimationVid from "./allSkill.gif";
import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function GamePlay() {
  const [dataUser, setDataUser] = useState([]);
  const [dataTypes, setDataTypes] = useState([]);
  //   const [dataCards, setDataCards] = useState([]);

  const [show, setShow] = useState(false);
  const [showRegis, setShowRegis] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);
  const [showEnemyStatus, setShowEnemyStatus] = useState(false);
  const [handlerUser, setHandlerUser] = useState([]);
  const [handlerPasswordUser, setHandlerPasswordUser] = useState([]);

  const [handlerRegisterUser, setHandlerRegisterUser] = useState([]);
  const [handlerRegisterPasswordUser, setHandlerRegisterPasswordUser] = useState([]);
  const [handlerRegisterSelectRole, setHandlerRegisterSelectRole] = useState("user");

  const [randomPhotoPlayer, setRandomPhotoPlayer] = useState([]);
  const [randomPhotoEnemy, setRandomPhotoEnemy] = useState([]);
  const [randomPlayer, setRandomPlayer] = useState([]);
  const [randomEnemy, setRandomEnemy] = useState([]);

  const [attackPlayer, setAttackPlayer] = useState([]);
  const [defensePlayer, setDefensePlayer] = useState([]);
  const [defenseEnemy, setDefenseEnemy] = useState([]);
  const [attackEnemy, setAttackEnemy] = useState([]);

  const [playerGot, setPlayerGot] = useState(0);
  const [enemyGot, setEnemyGot] = useState(0);
  const [textGotElement, setTextGotElement] = useState("elementColorNone");

  const [randomElement, setRandomElement] = useState([]);
  const [showPickElement, setShowPickElement] = useState(true);

  const [reset, setReset] = useState([]);
  const [arrStatus, setArrStatus] = useState([]);
  const [hp, setHp] = useState([40]);
  const [hpColor, setHpColor] = useState("success");

  //   let arrCardBot = [];
  useEffect(() => {
    fetch("https://last-airbender-api.herokuapp.com/api/v1/characters/random")
      .then((res) => res.json())
      .then((data) => {
        data.map((dat) => {
          setRandomPhotoPlayer(dat.photoUrl);
        });
      });
    fetch("https://last-airbender-api.herokuapp.com/api/v1/characters/random")
      .then((res) => res.json())
      .then((data) => {
        data.map((dat) => {
          setRandomPhotoEnemy(dat.photoUrl);
        });
      });
  }, [randomPlayer]);
  useEffect(() => {
    fetch("http://localhost:9292/users")
      .then((res) => res.json())
      .then((data) => setDataUser(data));
  }, [showRegis]);
  useEffect(() => {
    fetch("http://localhost:9292/types")
      .then((res) => res.json())
      .then((data) => setDataTypes(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:9292/get_Card_data")
      .then((res) => res.json())
      .then((data) => {
        setRandomPlayer(data);
        setAttackPlayer(data.card_attack);
        setDefensePlayer(data.card_defense);
      });
    fetch("http://localhost:9292/get_Card_data")
      .then((res) => res.json())
      .then((data) => {
        setRandomEnemy(data);
        setAttackEnemy(data.card_attack);
        setDefenseEnemy(data.card_defense);
      });
  }, [reset]);

  useEffect(() => {
    console.log("bukan ini:" + arrStatus);
    console.log(dataUser);
    const counts = {};
    arrStatus.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    console.log(counts.lose);
    if (hp >= 61) {
      setHpColor("success");
    } else if (hp <= 60 && hp > 30) {
      setHpColor("warning");
    } else if (hp <= 30 && hp >= 1) {
      setHpColor("danger");
    }
    if (hp > 100) {
      setHp(100);
    } else if (hp <= 0) {
      Swal.fire({
        title: "Try Again",
        text: "Play Again!",
        icon: "error",
      });

      const createdLeaderboard = {
        user_name: dataUser.name,
        total_win: counts.win,
        total_lose: counts.lose,
        total_draw: counts.draw,
        user_id: dataUser.id,
      };

      fetch("http://localhost:9292/add_leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createdLeaderboard),
      });
      setArrStatus([]);
      setHpColor("success");
      setHp(100);
    }
  }, [arrStatus]);

  useEffect(() => {
    // console.log(randomElement.type_name);
    // console.log(randomPlayer.type_name);
    // console.log(randomEnemy.type_name);

    // console.log(randomElement);

    function total_Attack_Same_Name(val) {
      return parseInt(val.card_attack) + 200;
    }

    let player_element = randomPlayer.type_name;
    let enemy_element = randomEnemy.type_name;
    let random_element = randomElement.type_name;
    if (random_element == player_element && player_element == enemy_element) {
      let totalEnemy = total_Attack_Same_Name(randomEnemy);
      setAttackEnemy(totalEnemy);

      let totalPlayer = total_Attack_Same_Name(randomPlayer);
      setAttackPlayer(totalPlayer);

      if (totalEnemy) {
        setEnemyGot(totalEnemy - parseInt(randomEnemy.card_attack));
        setPlayerGot(totalPlayer - parseInt(randomPlayer.card_attack));
        setTextGotElement("elementColorPlus");
      }
    } else if (random_element == player_element) {
      let total = total_Attack_Same_Name(randomPlayer);
      setAttackPlayer(total);
      setPlayerGot(total - parseInt(randomPlayer.card_attack));

      if (total) {
        setTextGotElement("elementColorPlus");
      }
    } else if (random_element == enemy_element) {
      let total = total_Attack_Same_Name(randomEnemy);
      setAttackEnemy(total);
      setEnemyGot(total - parseInt(randomEnemy.card_attack));

      if (total) {
        setTextGotElement("elementColorMinus");
      }
    } else {
      setTextGotElement("elementColorNone");
    }

    // console.log("rand el:" + random_element);
    // console.log("enemy el:" + enemy_element);
    // console.log("player el:" + player_element);

    // setPlayerGot(total_Attack_Player);
  }, [randomElement]);
  //   console.log(randomPlayer);

  function handlerLoginUser(event) {
    setHandlerUser(event.target.value);
  }
  function handlerLoginPasswordUser(event) {
    setHandlerPasswordUser(event.target.value);
  }

  function handlerLogin(e) {
    e.preventDefault();
    if (handlerUser.length > 0) {
      dataUser.find((data) => {
        if (data.user_name == handlerUser && data.user_password == handlerPasswordUser) {
          setDataUser({ id: data.id, name: data.user_name });
          setShow(true);
        } else {
          setTimeout(() => {
            setShowErrorText(true);
          }, 250);
          setTimeout(() => {
            setShowErrorText(false);
          }, 1200);
        }
      });
    }
  }
  function handlerRegister(e) {
    e.preventDefault();
    console.log(handlerRegisterUser);
    console.log(handlerRegisterPasswordUser);
    console.log(handlerRegisterSelectRole);
    const createdUser = {
      user_name: handlerRegisterUser,
      user_password: handlerRegisterPasswordUser,
      user_role: handlerRegisterSelectRole,
    };

    fetch("http://localhost:9292/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdUser),
    });
    Swal.fire({
      title: "User Registered",
      text: "Successfully added!",
      icon: "success",
    });
    setShowRegis(false);
    e.target.reset();
  }

  return (
    <>
      <div className="containerPlay">
        <header className="containerPaddingTop">
          <div className="container px-4 px-lg-5 h-100">
            {!show ? (
              <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                {showRegis ? (
                  <>
                    <h1 id="battleGame" className="font-weight-bold">
                      Register
                    </h1>
                    <div className="loginBox" style={{ padding: "60px", height: "350px" }}>
                      <Form onSubmit={handlerRegister}>
                        <Form.Group className="mb-3" style={{ paddingBottom: "20px" }}>
                          <Form.Control
                            type="text"
                            placeholder="User Name"
                            required
                            onChange={(e) => {
                              e.preventDefault();
                              setHandlerRegisterUser(e.target.value);
                            }}
                            style={{ width: "50%", marginLeft: "25%" }}
                          />
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => {
                              e.preventDefault();
                              setHandlerRegisterPasswordUser(e.target.value);
                            }}
                            style={{ width: "50%", marginLeft: "25%" }}
                          />

                          <Form.Select
                            style={{ width: "50%", marginLeft: "25%" }}
                            onChange={(e) => {
                              setHandlerRegisterSelectRole(e.target.value);
                            }}
                          >
                            <option>user</option>
                            <option>admin</option>
                          </Form.Select>
                        </Form.Group>
                        <Button id="buttonPick" variant="secondary" type="submit">
                          Create
                        </Button>
                        <h5>OR</h5>
                        <Button
                          id="buttonAttack"
                          variant="secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowRegis(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </Form>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 id="battleGame" className="font-weight-bold">
                      Login
                    </h1>
                    <div className="loginBox" style={{ padding: "60px", height: "350px" }}>
                      <Form onSubmit={handlerLogin}>
                        <Form.Group className="mb-3" style={{ paddingBottom: "20px" }}>
                          <Form.Control type="text" placeholder="User Name" required onChange={handlerLoginUser} style={{ width: "50%", marginLeft: "25%" }} />
                          <Form.Control type="password" placeholder="Password" required onChange={handlerLoginPasswordUser} style={{ width: "50%", marginLeft: "25%" }} />

                          {showErrorText ? <h5 style={{ color: "red" }}>Account not registered!</h5> : ""}
                        </Form.Group>
                        <Button id="buttonPick" type="submit">
                          Login
                        </Button>
                        <h5>OR</h5>
                        <Button
                          id="buttonAttack"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowRegis(true);
                          }}
                        >
                          Register
                        </Button>
                      </Form>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                <h1 id="battleGame" className="font-weight-bold">
                  Versus
                </h1>
                {/* {"Welcome! " + dataUser.name} */}
                <div className="col-lg-8 align-self-end">
                  <div style={{ display: "flex", flexDirection: "row", padding: "5%" }}>
                    <Card border="primary" style={{ flex: 1 }}>
                      <Card.Img style={{ width: "100%", height: "100px" }} variant="top" src={randomPhotoPlayer} />
                      <Card.Body style={{ backgroundColor: "#34557d", color: "white" }}>
                        <Card.Title>{randomPlayer.card_name}</Card.Title>
                        <Card.Text>Attack: {attackPlayer} </Card.Text>
                        <Card.Text>Defense: {defensePlayer}</Card.Text>
                        <Card.Img src={randomPlayer.type_img} />
                        <Card.Text style={{ fontSize: "15px" }}> Welcome {dataUser.name}</Card.Text>
                      </Card.Body>
                    </Card>
                    <Card className="border-0" style={{ width: "2px", flex: 1, margin: "5%", background: "transparent" }}>
                      <Card.Body>
                        <h5 id="elementGame" className="font-weight-bold">
                          Element
                        </h5>

                        <Card.Img style={{ paddingTop: "30%" }} src={randomElement.type_img} />
                        <Card.Text>
                          <h5>{randomElement.type_name}</h5>
                        </Card.Text>
                        <Card.Text>
                          <p className={textGotElement}>Your Attack : +{playerGot}</p>
                          <br></br>
                          <p className={textGotElement}>Enemy Attack : +{enemyGot}</p>
                        </Card.Text>

                        <ProgressBar now={hp} label={`${hp}hp`} variant={hpColor} />
                      </Card.Body>
                    </Card>
                    <Card border="danger" style={{ flex: 1 }}>
                      <Card.Img style={{ width: "100%", height: "100px" }} variant="top" src={randomPhotoEnemy} />
                      {showEnemyStatus ? (
                        <Card.Body style={{ backgroundColor: "#761e11", color: "white" }}>
                          <Card.Title>{randomEnemy.card_name}</Card.Title>
                          <Card.Text>Attack: {attackEnemy}</Card.Text>
                          <Card.Text>Defense: {defenseEnemy}</Card.Text>
                          <Card.Img src={randomEnemy.type_img} />
                        </Card.Body>
                      ) : (
                        <Card.Body style={{ backgroundColor: "#761e11", color: "white" }}>
                          <Card.Title>{randomEnemy.card_name}</Card.Title>
                          <Card.Text>Attack: Hided</Card.Text>
                          <Card.Text>Defense: Hided</Card.Text>
                          <Card.Img src={randomEnemy.type_img} />
                        </Card.Body>
                      )}
                    </Card>
                  </div>
                  {showPickElement ? (
                    <>
                      <Button
                        id="buttonPick"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();

                          let random = dataTypes[Math.floor(Math.random() * dataTypes.length)];
                          setRandomElement(random);
                          setShowPickElement(false);
                          setShowEnemyStatus(true);
                          Swal.fire({
                            title: "",
                            width: 890,
                            padding: "3em",
                            imageUrl: "https://media0.giphy.com/media/1vCU6WV0ilmZG/200.gif) ",
                            imageHeight: 400,
                            showConfirmButton: false,
                            timer: 4650,
                            background: `#fff url(${AnimationVid}) no-repeat center`,
                            backdrop: `
                                rgba(0, 0, 0, 0.89)
                                      url("")
                                      left top
                                      no-repeat
                                    `,
                          });
                        }}
                      >
                        Pick Element
                      </Button>
                      <br></br>

                      <h5>OR</h5>
                    </>
                  ) : (
                    ""
                  )}
                  <Button
                    id="buttonAttack"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();

                      // console.log("Attack Player:" + attackPlayer);
                      // console.log("Defense Player:" + defensePlayer);
                      // console.log("Attack Enemy:" + attackEnemy);
                      // console.log("Defense Enemy:" + defenseEnemy);
                      if (attackPlayer == attackEnemy) {
                        // newArray.push("draw");

                        let copyArr = arrStatus.slice();
                        copyArr.push("draw");
                        setArrStatus(copyArr);

                        setHp(hp);
                        Swal.fire({
                          title: "Draw",
                          text: "Opps Draw!",
                          icon: "warning",
                        });
                      } else if (attackPlayer > attackEnemy) {
                        // newArray.push("win");
                        let copyArr = arrStatus.slice();
                        copyArr.push("win");
                        let totalHp = parseInt(hp) + 10;
                        setHp(totalHp);
                        setArrStatus(copyArr);
                        Swal.fire({
                          title: "Win",
                          text: "You Win!",
                          icon: "success",
                        });
                      } else if (attackPlayer < attackEnemy) {
                        // newArray.push("lose");
                        let copyArr = arrStatus.slice();
                        copyArr.push("lose");
                        let totalHp = parseInt(hp) - 20;
                        setHp(totalHp);
                        setArrStatus(copyArr);
                        Swal.fire({
                          title: "Lose",
                          text: "You Lose!",
                          icon: "error",
                        });
                      }

                      setShowEnemyStatus(false);
                      setShowPickElement(true);
                      setReset([]);
                      setRandomElement([]);
                      setPlayerGot([]);
                      setEnemyGot([]);
                      //   Swal.fire({
                      //     title: "",
                      //     width: 890,
                      //     padding: "3em",
                      //     imageUrl: "https://media0.giphy.com/media/1vCU6WV0ilmZG/200.gif) ",
                      //     imageHeight: 400,
                      //     showConfirmButton: false,
                      //     timer: 4650,
                      //     background: `#fff url(${AnimationVid}) no-repeat center`,
                      //     backdrop: `
                      //     rgba(0, 0, 0, 0.89)
                      //           url("/images/nyan-cat.gif")
                      //           left top
                      //           no-repeat
                      //         `,
                      //   });
                    }}
                  >
                    Attack
                  </Button>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
    </>
  );
}
export default GamePlay;
