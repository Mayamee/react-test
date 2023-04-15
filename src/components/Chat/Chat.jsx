import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button, Container, Form, FormGroup, Stack } from 'react-bootstrap';
import { useFormik } from 'formik';
import {
  selectAllMessages,
  selectAllRooms,
  addMessage,
  removeMessage,
  cleanMessages,
  setCurrentRoom,
  setUser,
  setStatus,
  setRooms,
} from './redux/slices/chatSlice';
import { io } from 'socket.io-client';
import cx from 'clsx';

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
  const messages = useSelector(selectAllMessages);
  const status = useSelector((state) => state.chat.status);
  const userId = useSelector((state) => state.chat.userId);
  const currentRoom = useSelector((state) => state.chat.currentRoom);
  // const rooms = useSelector(selectAllRooms);
  const rooms = roomsDB.map((room) => room.name);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const f = useFormik({
    initialValues: {
      message: '',
    },
    validate: (values) => {
      const errors = {};
      if (values.message.length === 0) {
        errors.message = 'required';
      }
      return errors;
    },
    onSubmit: ({ message }, { resetForm }) => {
      const messageObj = {
        id: Date.now().toLocaleString(),
        message,
        room: currentRoom,
        date: Date.now(),
      };
      socket.emit('sendMessage', messageObj);
      dispatch(addMessage(messageObj));
      resetForm();
    },
  });
  useEffect(() => {
    dispatch(setRooms(roomsDB));
    const socket = io('http://localhost:8090');
    socket.on('connect', () => {
      dispatch(setStatus('connected'));
      dispatch(setUser(socket.id));
    });
    socket.on('receiveMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('removeMessage', (id) => {
      dispatch(removeMessage(id));
    });
    socket.on('disconnect', () => {
      dispatch(setStatus('disconnected'));
      dispatch(setUser(null));
    });
    setSocket(socket);
    socket.emit('joinRoom', 'global');
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleRemoveMessage = (id) => () => {
    socket.emit('removeMessage', id);
    dispatch(removeMessage(id));
  };
  return (
    <>
      <Container>
        <div className="d-flex flex-column">
          <div className="text-center my-3" id="chat-heading">
            <h1>Simple ws chat</h1>
          </div>
          <div id="chat-body">
            <div id="chat-input">
              <Form
                onSubmit={f.handleSubmit}
                noValidate
                className="mx-auto d-flex flex-column gap-3"
                style={{
                  maxWidth: '600px',
                  minWidth: '200px',
                }}
              >
                <FormGroup>
                  <Form.Label>Выберите комнату</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      socket.emit('joinRoom', e.target.value);
                      dispatch(setCurrentRoom(e.target.value));
                    }}
                  >
                    {rooms.map((room) => (
                      <option key={room} value={room}>
                        {room}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
                <FormGroup className="d-flex">
                  <Form.Control
                    disabled={status === 'disconnected'}
                    value={f.values.message}
                    onChange={f.handleChange}
                    type="text"
                    name="message"
                    placeholder="Enter message"
                  />
                  <Button type="submit" className="ms-2" disabled={status === 'disconnected'}>
                    Отправить
                  </Button>
                </FormGroup>
              </Form>
            </div>
            <div
              id="chat-messages"
              className="mx-auto mt-3 shadow-sm p-3 rounded"
              style={{
                maxWidth: '600px',
                minWidth: '200px',
                height: '400px',
                overflowY: 'auto',
              }}
            >
              <Stack id="chat-box">
                {messages.length === 0 && <div className="text-muted">Нет сообщений</div>}
                {messages.map((message) => {
                  return (
                    <div
                      key={message.id}
                      className="d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <div className="d-flex">
                          <div className="me-2">
                            <span className="fw-bold">User</span>
                          </div>
                          <div>
                            <span className="text-muted">
                              {new Date(message.date).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <div>{message.message}</div>
                      </div>
                      <div className="btn-block">
                        <Button
                          onClick={handleRemoveMessage(message.id)}
                          variant="danger"
                          size="sm"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </Stack>
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
            <p className="my-0">room: {currentRoom}</p>
          </>
        ) : (
          <p className="my-0">{status}</p>
        )}
      </div>
    </>
  );
};

export default Chat;
