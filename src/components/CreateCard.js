import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import Table from "react-bootstrap/Table";

import React, { useEffect, useState } from "react";

import ListCard from "./ListCard";
function CreateCard() {
  const [dataDelete, setDataDelete] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataTypes, setDataTypes] = useState([]);
  const [dataCards, setDataCards] = useState([]);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const [showChoose, setShowChoose] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);
  const [handlerUser, setHandlerUser] = useState([]);
  const [handlerPasswordUser, setHandlerPasswordUser] = useState([]);
  const [handlerCardName, setHandlerCardName] = useState("No Name");
  const [handlerType, setHandlerType] = useState(1);
  const [handlerAttack, setHandlerAttack] = useState(1000);
  const [handlerDefense, setHandlerDefense] = useState(1000);
  useEffect(() => {
    fetch("http://localhost:9292/users")
      .then((res) => res.json())
      .then((data) => setDataUser(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:9292/types")
      .then((res) => res.json())
      .then((data) => setDataTypes(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:9292/cards")
      .then((res) => res.json())
      .then((data) => setDataCards(data));
  }, [dataEdit]);
  useEffect(() => {
    fetch("http://localhost:9292/cards")
      .then((res) => res.json())
      .then((data) => setDataCards(data));
  }, [showChoose]);

  function handlerButtonEdit(val) {
    setDataEdit(val);
    setShowEdit(false);
    setHandlerCardName(val.card_name);
    setHandlerAttack(val.card_attack);
    setHandlerDefense(val.card_defense);
    setHandlerType(val.type_id);
  }

  const displayAllCard = dataCards.map((data) => {
    return (
      <ListCard
        key={data.id}
        id={data.id}
        card_name={data.card_name}
        card_attack={data.card_attack}
        card_defense={data.card_defense}
        user_id={data.user_id}
        type_id={data.type_id}
        type_name={data.type_name}
        handlerButtonEdit={handlerButtonEdit}
      />
    );
  });

  function handlerLoginUser(event) {
    setHandlerUser(event.target.value);
  }
  function handlerLoginPasswordUser(event) {
    setHandlerPasswordUser(event.target.value);
  }

  function handlerSubmitCard(e) {
    e.preventDefault();

    const createdCard = {
      card_name: handlerCardName,
      card_attack: handlerAttack,
      card_defense: handlerDefense,
      type_id: handlerType,
      user_id: dataUser,
    };

    fetch("http://localhost:9292/create_card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdCard),
    });
    Swal.fire({
      title: "Card Created",
      text: "Successfully added!",
      icon: "success",
    });
    e.target.reset();
    setHandlerType(1);
    setHandlerAttack(1000);
    setHandlerDefense(1000);

    // console.log(createdCard);
  }
  //   http://localhost:9292/edit_card/3
  function handlerEditCard(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/edit_card/${dataEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card_name: handlerCardName,
        card_attack: handlerAttack,
        card_defense: handlerDefense,
        type_id: handlerType,
        user_id: dataUser,
      }),
    });
    Swal.fire({
      title: "Card Edited",
      text: "Successfully edit!",
      icon: "success",
    });
    e.target.reset();
    console.log(dataEdit);
    setDataEdit([]);
    setHandlerType(1);
    setHandlerAttack(1000);
    setHandlerDefense(1000);
    setShowEdit(true);
  }
  function handlerLogin(e) {
    e.preventDefault();
    if (handlerUser.length > 0) {
      dataUser.find((data) => {
        if (data.user_name == handlerUser) {
          if (data.user_password == handlerPasswordUser)
            if (data.user_role == "admin") {
              setDataUser(data.id);
              setShow(true);
            } else {
              Swal.fire({
                title: "Not Authorized",
                text: "Must be admin!",
                icon: "error",
              });
            }
          else {
            Swal.fire({
              title: "Not valid!",
              text: "Password not match!",
              icon: "warning",
            });
          }
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
  return (
    <>
      <div className="container">
        <header className="containerPaddingTop">
          <div className="container px-4 px-lg-5 h-100">
            {!show ? (
              <Form onSubmit={handlerLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Admin Login</Form.Label>
                  <Form.Control type="text" placeholder="Admin Name" required onChange={handlerLoginUser} />
                  <Form.Control type="password" placeholder="Password" required onChange={handlerLoginPasswordUser} />
                  <Form.Text className="text-muted">Only admin can add new card!</Form.Text>

                  {showErrorText ? <h5 style={{ color: "red" }}>Account not registered!</h5> : ""}
                </Form.Group>
                <Button variant="secondary" type="submit">
                  Login
                </Button>
              </Form>
            ) : (
              <>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowChoose(true);
                    }}
                  >
                    Create Card
                  </Button>
                  <Button
                    variant="secondary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowChoose(false);
                    }}
                  >
                    Card List
                  </Button>
                </div>
                {showChoose ? (
                  <>
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                      <div className="col-lg-8 align-self-end">
                        <h1 className="font-weight-bold">Create Card!</h1>
                        <Form onSubmit={handlerSubmitCard}>
                          <Form.Group className="mb-3">
                            <Form.Label>Card Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Card Name"
                              required
                              onChange={(e) => {
                                setHandlerCardName(e.target.value);
                              }}
                            />
                            <Form.Label>Type</Form.Label>
                            <Form.Select
                              id="Type"
                              onChange={(e) => {
                                setHandlerType(e.target.value);
                              }}
                            >
                              {dataTypes.map((dat) => {
                                //   console.log(dat.type_name);
                                return <option value={dat.id}>{dat.type_name}</option>;
                              })}
                            </Form.Select>
                            <Form.Label>Attack</Form.Label>
                            <Form.Select
                              id="attack"
                              onChange={(e) => {
                                setHandlerAttack(e.target.value);
                              }}
                            >
                              <option>1000</option>
                              <option>2000</option>
                              <option>3000</option>
                              <option>4000</option>
                              <option>5000</option>
                            </Form.Select>
                            <Form.Label>Defense</Form.Label>
                            <Form.Select
                              id="defense"
                              onChange={(e) => {
                                setHandlerDefense(e.target.value);
                              }}
                            >
                              <option>1000</option>
                              <option>2000</option>
                              <option>3000</option>
                              <option>4000</option>
                              <option>5000</option>
                            </Form.Select>
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </Form>
                      </div>
                    </div>
                  </>
                ) : (
                  <Table striped bordered hover variant="dark" style={{}}>
                    {showEdit ? (
                      <>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Card Name</th>
                            <th>Card Attack</th>
                            <th>Card Defense</th>
                            <th>Type Name</th>
                            <th>Button</th>
                          </tr>
                        </thead>
                        <tbody>{displayAllCard}</tbody>
                      </>
                    ) : (
                      <>
                        <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                          <div className="col-lg-8 align-self-end">
                            <h1 className="font-weight-bold">Edit Card!</h1>
                            <Form onSubmit={handlerEditCard}>
                              <Form.Group className="mb-3">
                                <Form.Label>Card Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={handlerCardName}
                                  placeholder="Card Name"
                                  required
                                  onChange={(e) => {
                                    setHandlerCardName(e.target.value);
                                  }}
                                />
                                <Form.Label>Type</Form.Label>
                                <Form.Select
                                  id="Type"
                                  value={handlerType}
                                  onChange={(e) => {
                                    setHandlerType(e.target.value);
                                  }}
                                >
                                  {dataTypes.map((dat) => {
                                    return <option value={dat.id}>{dat.type_name}</option>;
                                  })}
                                </Form.Select>
                                <Form.Label>Attack</Form.Label>
                                <Form.Select
                                  id="attack"
                                  value={handlerAttack}
                                  onChange={(e) => {
                                    setHandlerAttack(e.target.value);
                                  }}
                                >
                                  <option>1000</option>
                                  <option>2000</option>
                                  <option>3000</option>
                                  <option>4000</option>
                                  <option>5000</option>
                                </Form.Select>
                                <Form.Label>Defense</Form.Label>
                                <Form.Select
                                  id="defense"
                                  value={handlerDefense}
                                  onChange={(e) => {
                                    setHandlerDefense(e.target.value);
                                  }}
                                >
                                  <option>1000</option>
                                  <option>2000</option>
                                  <option>3000</option>
                                  <option>4000</option>
                                  <option>5000</option>
                                </Form.Select>
                              </Form.Group>
                              <Button variant="primary" type="submit">
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                onClick={(e) => {
                                  e.preventDefault();

                                  fetch(`http://localhost:9292/delete_card/${dataEdit.id}`, {
                                    method: "delete",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                  });
                                  Swal.fire({
                                    title: "Card Deleted",
                                    text: "Successfully Delete!",
                                    icon: "success",
                                  });
                                  setDataEdit([]);
                                  setShowEdit(true);
                                }}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="outline-warning"
                                type="submit"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowEdit(true);
                                }}
                              >
                                Cancel
                              </Button>
                            </Form>
                          </div>
                        </div>
                      </>
                    )}
                  </Table>
                )}
              </>
            )}
          </div>
        </header>
      </div>
    </>
  );
}
export default CreateCard;
