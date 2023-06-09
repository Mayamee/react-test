import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { Button, Container, Form, FormGroup, Stack } from 'react-bootstrap';
import { useFormik } from 'formik';
import {
  selectCurrentRoomName,
  selectMessagesByCurrentRoom,
  selectAllRooms,
  addMessage,
  removeMessage,
  setCurrentRoomId,
  setUserId,
  setUserName,
  setStatus,
  setRooms,
} from './redux/slices/chatSlice';
import cx from 'clsx';
import { useSocket } from './hooks/useSocket';

const roomsDB = [
  {
    id: 0,
    name: 'global',
  },
  {
    id: 1,
    name: 'room-1',
  },
  {
    id: 2,
    name: 'room-2',
  },
];

const Chat = () => {
  const currentRoomName = useSelector(selectCurrentRoomName);
  const currentRoomId = useSelector((state) => state.chat.currentRoomId);
  const roomMessages = useSelector(selectMessagesByCurrentRoom);
  const rooms = useSelector(selectAllRooms);
  const status = useSelector((state) => state.chat.status);
  const userId = useSelector((state) => state.chat.userId);
  const userName = useSelector((state) => state.chat.userName);
  const socket = useSocket('http://localhost:8090');
  const dispatch = useDispatch();
  const [isUserNameEditable, setIsUserNameEditable] = useState(false);
  const scrolledBlockRef = useRef(null);
  useEffect(() => {
    if (!scrolledBlockRef.current) return;
    scrolledBlockRef.current.scrollTop = scrolledBlockRef.current.scrollHeight;
  }, [roomMessages.length, roomMessages]);
  useEffect(() => {
    if (!socket) return;
    dispatch(setRooms(roomsDB));
    dispatch(setCurrentRoomId(roomsDB[0].id));
    socket.on('connect', () => {
      dispatch(setStatus('connected'));
      dispatch(setUserId(socket.id));
    });
    socket.on('receiveMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('removeMessage', (id) => {
      dispatch(removeMessage(id));
    });
    socket.on('disconnect', () => {
      dispatch(setStatus('disconnected'));
      dispatch(setUserId(null));
    });
    socket.emit('joinRoom', 'global');
  }, [socket]);
  const handleRemoveMessage = (id) => () => {
    socket.emit('removeMessage', id);
    dispatch(removeMessage(id));
  };
  const f = useFormik({
    initialValues: {
      message: '',
      username: userName,
    },
    validate: (values) => {
      const errors = {};
      if (values.message.length === 0) {
        errors.message = 'required';
      }
      return errors;
    },
    onSubmit: ({ message }, helpers) => {
      const messageObj = {
        id: Date.now().toLocaleString(),
        message,
        room: currentRoomId,
        date: Date.now(),
        from: userName,
        ownerId: userId,
      };
      socket.emit('sendMessage', messageObj);
      dispatch(addMessage(messageObj));
      helpers.setFieldValue('message', '');
      helpers.setFieldValue('username', userName);
    },
  });
  return (
    <>
      <Container>
        <div className="d-flex flex-column">
          <div className="text-center my-3" id="chat-heading">
            <h1>Websocket chat</h1>
          </div>
          <div id="chat-body">
            <div id="chat-input">
              <Form onSubmit={f.handleSubmit} noValidate>
                <div
                  className="mx-auto d-flex flex-column gap-3"
                  style={{
                    maxWidth: '600px',
                    minWidth: '200px',
                  }}
                >
                  <FormGroup className="d-flex">
                    <Form.Control
                      value={f.values.username}
                      onChange={f.handleChange}
                      disabled={!isUserNameEditable}
                      type="text"
                      name="username"
                      placeholder="Введите имя"
                    />
                    <Button
                      className="ms-2"
                      onClick={() => {
                        const username = f.values.username;
                        if (username.length === 0) return;
                        setIsUserNameEditable(!isUserNameEditable);
                        if (isUserNameEditable && username.length > 0) {
                          dispatch(setUserName(username));
                        }
                      }}
                    >
                      {isUserNameEditable ? 'Установить' : 'Изменить'}
                    </Button>
                  </FormGroup>
                  <fieldset disabled={status === 'disconnected'}>
                    <FormGroup className="d-flex">
                      <Form.Control
                        value={f.values.message}
                        onChange={f.handleChange}
                        type="text"
                        name="message"
                        placeholder="Введите сообщение"
                      />
                      <Button type="submit" className="ms-2">
                        Отправить
                      </Button>
                    </FormGroup>
                  </fieldset>
                </div>
              </Form>
            </div>
            <div
              id="chat-messages"
              className="mx-auto mt-3 shadow-sm p-3 rounded"
              ref={scrolledBlockRef}
              style={{
                maxWidth: '600px',
                minWidth: '200px',
                height: '400px',
                overflowY: 'auto',
              }}
            >
              <Stack id="chat-box">
                {roomMessages.length === 0 && <div className="text-muted">Нет сообщений</div>}
                {roomMessages.map((message) => {
                  return (
                    <div
                      key={message.id}
                      className="d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <div className="d-flex">
                          <div className="me-2">
                            <span className="fw-bold">{message.from}</span>
                          </div>
                          <div>
                            <span className="text-muted">
                              {new Date(message.date).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <div>{message.message}</div>
                      </div>
                      {userId === message.ownerId && (
                        <div className="btn-block">
                          <Button
                            onClick={handleRemoveMessage(message.id)}
                            variant="danger"
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </Stack>
            </div>
            <div
              className="mx-auto mt-3"
              style={{
                maxWidth: '600px',
                minWidth: '200px',
              }}
            >
              <FormGroup>
                <Form.Select
                  disabled={status === 'disconnected'}
                  aria-label="Select room"
                  value={currentRoomId}
                  onChange={(e) => {
                    socket.emit('joinRoom', +e.target.value);
                    dispatch(setCurrentRoomId(+e.target.value));
                  }}
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </div>
          </div>
        </div>
      </Container>
      <div
        className={cx({
          'bg-success': status === 'connected',
          'bg-danger': status === 'disconnected',
        })}
        style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          padding: '5px 10px',
          borderRadius: '10px',
          color: 'white',
        }}
      >
        {status === 'connected' ? (
          <>
            <p className="my-0">{status}</p>
            <p className="my-0">room: {currentRoomName}</p>
            <p className="my-0">user: {userName}</p>
          </>
        ) : (
          <p className="my-0">{status}</p>
        )}
      </div>
    </>
  );
};

export default Chat;
