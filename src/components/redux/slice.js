import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAll } from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        const hasName = state.contacts.items.some(
          item => item.name === action.payload.name
        );
        if (hasName) {
          Notiflix.Notify.warning(
            `Contact "${action.payload.name}" already exists.`
          );
          return;
        }
        state.contacts.items.push(action.payload);
      },
      prepare(name, number) {
        return { payload: { name, number, id: nanoid() } };
      },
    },
    deleteContact: (state, action) => {
      const index = state.contacts.items.findIndex(
        contact => contact.id === action.payload
      );
      state.contacts.items.splice(index, 1);
    },
    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchAll.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload.items;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
        state.contacts.items = initialState.contacts.items;
      });
  },
});

export const { addContact, deleteContact, filterContacts } =
  contactsSlice.actions;

export default contactsSlice.reducer;
