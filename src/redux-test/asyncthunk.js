import pkg from "@reduxjs/toolkit";
const {
  createAsyncThunk,
  configureStore,
  createSlice,
  createEntityAdapter,
  createReducer,
  createAction,
} = pkg;
import { nanoid } from "nanoid";

const fetchTodos = createAsyncThunk("todos/getAll", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  return await res.json();
});

const fetchTodo = createAsyncThunk(
  "todos/getTodoById",
  async (id, { dispatch, getState }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return await res.json();
  }
);

const todosAdapter = createEntityAdapter({
  // selectId: (elem) => elem
});

const todoSlice = createSlice({
  name: "todos",
  initialState: todosAdapter.getInitialState({
    fetching: false,
    err: null,
  }),
  reducers: {
    addTodos: todosAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        todosAdapter.addMany(state, payload);
        state.fetching = true;
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        state.fetching = true;
        state.err = payload;
      })
      .addCase(fetchTodo.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchTodo.fulfilled, (state, { payload }) => {
        state.fetching = false;
        todosAdapter.addOne(state, payload);
      })
      .addCase(fetchTodo.rejected, (state, { payload }) => {
        state.fetching = false;
        state.err = payload;
      });
  },
});

const initialState = {
  counter: 0,
};

// const test_inc = createAction("inc", (text) => ({
//   payload: {
//     id: nanoid(10),
//     title: text,
//     createdAt: new Date().toISOString(),
//   },
// }));
const test_inc = createAction("inc");
const test_dec = createAction("dec");
const test_add = createAction("add");
// const tt_inc = (n) => ({
//   type: "inc",
//   payload: n,
// });
const testReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(test_inc, (state) => {
      state.counter += 1;
    })
    .addCase(test_dec, (state) => {
      state.counter -= 1;
    })
    .addCase(test_add, (state, { payload }) => {
      state.counter += payload;
    });
});

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    test: testReducer,
  },
});

store.subscribe(() => {
  console.log("Checking state...");
  console.log(JSON.stringify(store.getState(), null, 2));
});

// store.dispatch(fetchTodos());
// store.dispatch(fetchTodo(7)).then((data) => {
//   console.log(data);
// });

const test_thunk =
  (n = 1) =>
  async (dispatch, getState) => {
    const timer = setInterval(() => {
      dispatch(test_add(n));
    }, 3000);
    setTimeout(() => {
      clearInterval(timer);
    }, 10000);
  };

store.dispatch(test_thunk(10));
const acontrol = new AbortController();
console.log(acontrol.signal);
