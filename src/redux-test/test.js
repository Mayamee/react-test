import pkg from "@reduxjs/toolkit";
const { createEntityAdapter, createSlice, configureStore, createSelector } =
  pkg;

// Since we don't provide `selectId`, it defaults to assuming `entity.id` is the right field
const booksAdapter = createEntityAdapter({
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const booksSlice = createSlice({
  name: "books",
  initialState: booksAdapter.getInitialState({
    loading: "idle",
  }),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    addBook: booksAdapter.addOne,
    setLoading(state, action) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    addBooks(state, action) {
      if (state.loading === "pending") {
        // Or, call them as "mutating" helpers in a case reducer
        booksAdapter.setAll(state, action.payload);
        state.loading = "idle";
      }
    },
    setBook: booksAdapter.setOne,
    updateBook: booksAdapter.updateOne,
    removeBook: booksAdapter.removeOne,
    removeBooks: booksAdapter.removeMany,
    dropBooks: booksAdapter.removeAll,
    updateBooks: booksAdapter.updateMany,
    addOneBook: (state, action) => {
      booksAdapter.addOne(state, action.payload);
    },
    upsertBook: booksAdapter.upsertOne,
  },
});

const booksActions = booksSlice.actions;

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

const bookSelector = booksAdapter.getSelectors((state) => state.books);

// ==========================TESTING

store.subscribe(() => {
  console.clear();
  console.log(
    "=".repeat(20) + `Updated at ${new Date().toISOString()}` + "=".repeat(20)
  );
  console.log(JSON.stringify(store.getState(), null, 2));
});

const { dispatch } = store;

dispatch(booksActions.setLoading());
dispatch(
  booksActions.addBooks([
    { id: "book1", title: "Morphine" },
    { id: "book2", title: "Cataline" },
    { id: "book3", title: "Sudmorine" },
  ])
);
dispatch(
  booksActions.addBook({
    id: "book4",
    title: "Mizantropia",
  })
);
dispatch(
  booksActions.updateBook({
    id: "book1",
    changes: {
      title: "Updated",
      y: 20,
    },
  })
);
dispatch(
  booksActions.updateBook({
    id: "book1",
    changes: {
      title: "Updated",
      x: 10,
    },
  })
);

dispatch(booksActions.removeBooks(["book1"]));

dispatch(booksActions.dropBooks());
dispatch(booksActions.setLoading());
dispatch(
  booksActions.addBooks([
    { id: "book1", title: "Nobody" },
    { id: "book2", title: "Jobs" },
    { id: "book3", title: "Greeting" },
    { id: "book4", title: "Victory" },
    { id: "book5", title: "Sparta" },
    { id: "book6", title: "Notepad" },
    { id: "book7", title: "Code editor" },
  ])
);

dispatch(
  booksActions.updateBooks([
    {
      id: "book2",
      changes: {
        height: "100px",
      },
    },
    {
      id: "book2",
      changes: {
        height: "200",
      },
    },
    {
      id: "book2",
      changes: {
        height: "100px",
      },
    },
    {
      id: "book1",
      changes: {
        title: "Updated!!!!!!",
      },
    },
  ])
);

dispatch(
  booksActions.addOneBook({
    id: "book1",
    title: "jope",
  })
);

dispatch(
  booksActions.upsertBook({
    id: "book1",
    title: "nagy",
    creepy: true,
  })
);

dispatch(
  booksActions.upsertBook({
    id: "book1",
    title: "nagyyyie",
  })
);

dispatch(
  booksActions.updateBook({
    id: "book1",
    changes: {
      title: "kekekekekekeekek====",
      time: new Date().getTime(),
    },
  })
);

dispatch(
  booksActions.setBook({
    id: "book1",
    title: "setted",
  })
);

const selectAllBooks = (state) =>
  state.books.ids.map((id) => state.books.entities[id]);

const selectBookById = (state, id) => state.books.entities[id];
const reselectBookById = createSelector([selectBookById], () => v)

console.log(reselectBookById(store.getState()));

// console.log(bookSelector.selectAll(store.getState()))
// console.log(bookSelector.selectById(store.getState(), 'book1'))
// console.log(bookSelector.selectEntities(store.getState()))
// console.log(bookSelector.selectIds(store.getState()))
// console.log(bookSelector.selectTotal(store.getState()))
//TODO RESELECT