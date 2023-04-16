import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const roomsAdapter = createEntityAdapter();

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: messagesAdapter.getInitialState(),
    rooms: roomsAdapter.getInitialState(),
    userId: null,
    userName: 'anonymous',
    currentRoom: 'global',
    status: 'disconnected',
  },
  reducers: {
    addMessage: (state, { payload }) => {
      messagesAdapter.addOne(state.messages, payload);
    },
    removeMessage: (state, { payload: id }) => {
      messagesAdapter.removeOne(state.messages, id);
    },
    cleanMessages: (state) => {
      messagesAdapter.removeAll(state.messages);
    },
    setUserId: (state, { payload: userId }) => {
      state.userId = userId;
    },
    setUserName: (state, { payload: userName }) => {
      state.userName = userName;
    },
    setCurrentRoom: (state, { payload: room }) => {
      state.currentRoom = room;
    },
    setStatus: (state, { payload: status }) => {
      state.status = status;
    },
    setRooms: (state, { payload: rooms }) => {
      roomsAdapter.setAll(state.rooms, rooms);
    },
  },
});

export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(
  (state) => state.chat.messages
);

export const { selectAll: selectAllRooms } = roomsAdapter.getSelectors((state) => state.chat.rooms);

export const {
  addMessage,
  removeMessage,
  cleanMessages,
  setCurrentRoom,
  setUserId,
  setUserName,
  setStatus,
  setRooms,
} = chatSlice.actions;

export default chatSlice.reducer;
