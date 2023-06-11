import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { createSlice } from '@reduxjs/toolkit';

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
            `Contact "${action.payload.name}" already exist.`
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
});

export const { addContact, deleteContact, filterContacts } =
  contactsSlice.actions;
