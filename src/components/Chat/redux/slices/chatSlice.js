import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const roomsAdapter = createEntityAdapter();

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: messagesAdapter.getInitialState(),
    rooms: roomsAdapter.getInitialState(),
    userId: null,
    userName: 'anonymous',
    currentRoomId: 0,
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
    setCurrentRoomId: (state, { payload: roomId }) => {
      state.currentRoomId = roomId;
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

export const selectMessagesByCurrentRoom = createSelector(
  [(state) => selectAllMessages(state), (state) => state.chat.currentRoomId],
  (messages, currentRoomId) => messages.filter((message) => message.room === currentRoomId)
);
export const { selectAll: selectAllRooms } = roomsAdapter.getSelectors((state) => state.chat.rooms);

export const selectCurrentRoomName = createSelector(
  [selectAllRooms, (state) => state.chat.currentRoomId],
  (rooms, currentRoomId) => rooms.find((room) => room.id === currentRoomId)?.name
);

export const {
  addMessage,
  removeMessage,
  cleanMessages,
  setCurrentRoomId,
  setUserId,
  setUserName,
  setStatus,
  setRooms,
} = chatSlice.actions;

export default chatSlice.reducer;
