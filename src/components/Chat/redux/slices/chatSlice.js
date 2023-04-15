import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const roomsAdapter = createEntityAdapter();

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: messagesAdapter.getInitialState(),
    rooms: roomsAdapter.getInitialState(),
    user: null,
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
    setUser: (state, { payload: user }) => {
      state.user = user;
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
  setUser,
  setStatus,
  setRooms,
} = chatSlice.actions;

export default chatSlice.reducer;
