import React, { useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./Messages.css";
import AuthContext from "../../contexts/AuthContext";
import { HiUsers } from "react-icons/hi";
import { MoonLoader } from "react-spinners";

export default function Messages() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);

  const authContext = useContext(AuthContext);
  const endRef = useRef(null); //end ref to create scroll

  const [currentUser, setCurrentUser] = useState("");
  const [socket, setSocket] = useState("");
  const [messagesArr, setMessagesArr] = useState([]);
  const [oldmessagesArr, setOldMessagesArr] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [reciever, setReciever] = useState("");
  const [serverRoomList, setServerRoomList] = useState("");

  useEffect(() => {
    endRef.current?.scrollIntoView({
      //make a scroll when new message add to array
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messagesArr]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);

    const newSocket = io(apiUrl);
    setSocket(newSocket);
    setCurrentUser(authContext.userInfos);
    return () => {
      newSocket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setName(authContext.userInfos.username);
    getRoomsFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  function getRoomsFromServer() {
    if (currentUser) {
      fetch(`${apiUrl}/room/all/${currentUser._id}`).then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) => setServerRoomList(data))
            .catch((err) => console.log(err));
        } else {
          setServerRoomList("");
        }
      });
    }
  }

  useEffect(() => {
    if (currentRoom) {
      enterRoom();
      setMessagesArr([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom]);

  function sendMessage(e) {
    e.preventDefault();
    if (name && message && currentRoom) {
      socket.emit("message", {
        name: name,
        text: message,
      });
      setMessage("");
      postMsgToServer();
    }
  }

  async function setRoomGetMsgFromServer(selectedRoomId, selectedRoomUsers) {
    let currentReciever = selectedRoomUsers.find(
      (user) => user._id !== currentUser._id
    );
    setReciever(currentReciever);

    setCurrentRoom(selectedRoomId);
    await fetch(`${apiUrl}/message/room/${selectedRoomId}`)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => setOldMessagesArr(data))
      .catch((err) => console.log(err));
  }
  async function postMsgToServer() {
    await fetch(`${apiUrl}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: currentUser._id,
        receiverId: reciever._id,
        roomId: currentRoom,
        message: message,
      }),
    })
      .then((res) => {
        if (res.ok === true) {
          console.log("success : ", res);
        } else {
          console.log("error : ", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function enterRoom() {
    socket.emit("enterRoom", {
      name: name,
      room: currentRoom,
    });
  }

  // Listen for messages
  socket &&
    socket.on("message", (data) => {
      // setActivity("");
      setMessagesArr([...messagesArr, data]);
    });

  return (
    <div className="messages">
      <div className="messages__container">
        {loading ? (
          <div className="loadingWrapper">
            <MoonLoader size="90px" color="#01796f" loading={loading} /> Is
            Loading...
          </div>
        ) : (
          <>
            <div className="messages__middle">
              {serverRoomList ? (
                serverRoomList.map((item) => (
                  <div
                    key={item._id}
                    className={
                      currentRoom === item._id
                        ? "roomItem activeRoom"
                        : "roomItem"
                    }
                    onClick={() =>
                      setRoomGetMsgFromServer(item._id, item.users)
                    }
                  >
                    <div className="roomItem__ownerWrapper">
                      <span className="roomItem__ownerIcon">
                        <HiUsers />
                      </span>
                      <h3 className="roomItem__ownerName">
                        {item.users[1].username} & {item.users[0].username}
                      </h3>
                    </div>

                    <div className="roomItem__dataWrapper">
                      <div className="roomItem__imgWrapper">
                        <img
                          className="roomItem__img"
                          src={item.property.image}
                        />
                      </div>
                      <div className="roomItem__textWrapper">
                        <div className="roomItem__text">
                          {item.property.title}
                        </div>
                        <div className="roomItem__text__desc">
                          <div>Price:{item.property.price}</div>
                          <div>Address:{item.property.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="roomItem__error__wrapper">
                  <div className="roomItem__error">
                    There is no Chat Item ...{" "}
                  </div>
                  <div>
                    First Find a property and send a message then you can follow
                    your chat here!
                  </div>
                </div>
              )}
            </div>

            <div className="messages__left ">
              <div className="chat-display">
                {oldmessagesArr &&
                  oldmessagesArr.map((oldMsg) => (
                    <div
                      key={oldMsg._id}
                      className={
                        oldMsg.senderName === name
                          ? "post post--left"
                          : "post post--right"
                      }
                    >
                      <div
                        className={
                          oldMsg.senderName === name
                            ? "post__header post__header--user"
                            : "post__header post__header--reply"
                        }
                      >
                        <span className="post__header--name">
                          {oldMsg.senderName}
                        </span>
                        <span className="post__header--time">
                          <span>{oldMsg.date}__</span>
                          <span>{oldMsg.time}</span>
                        </span>
                      </div>
                      <div className="post__text">{oldMsg.message}</div>
                    </div>
                  ))}
                {messagesArr.map((msg) => (
                  <div
                    key={msg._id}
                    className={
                      msg.name === name ? "post post--left" : "post post--right"
                    }
                  >
                    {msg.name !== "admin" ? (
                      <>
                        <div
                          className={
                            msg.name === name
                              ? "post__header post__header--user"
                              : "post__header post__header--reply"
                          }
                        >
                          <span className="post__header--name">{msg.name}</span>
                          <span className="post__header--time">{msg.time}</span>
                        </div>
                        <div className="post__text">{msg.text}</div>
                      </>
                    ) : (
                      <div className="post__text adminMsg">{msg.text}</div>
                    )}
                  </div>
                ))}
                <div ref={endRef} />
              </div>
              <form
                onSubmit={(e) => sendMessage(e)}
                className="form-message formWrapper"
              >
                <input
                  className="formInput msginput"
                  type="text"
                  placeholder="your message"
                  id="message"
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
                <button className="formBtn sendbutton" type="submit">
                  send
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
