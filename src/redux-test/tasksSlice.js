// @ts-check
/* eslint-disable no-param-reassign */
import axios from "axios";

import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import routes from "../routes.js";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(routes.tasksPath());
  return response.data.items;
});

// BEGIN
export const sendTask = createAsyncThunk("tasks/sendTask", async (task) => {
  const { data } = await axios.post(routes.tasksPath(), task);
  return data;
});

export const removeTask = createAsyncThunk("tasks/removeTask", async (id) => {
  await axios.delete(routes.taskPath(id));
  return id;
});

const tasksAdapter = createEntityAdapter();
const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, tasksAdapter.addMany)
      .addCase(sendTask.fulfilled, tasksAdapter.addOne)
      .addCase(removeTask.fulfilled, tasksAdapter.removeOne);
  },
});
export const selectors = tasksAdapter.getSelectors((state) => state.tasks);

export default tasksSlice.reducer;
// END
