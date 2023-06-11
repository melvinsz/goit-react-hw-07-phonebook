import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  contacts: [],
  filter: '',
};

const contactsList = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        const hasName = state.contacts.some(
          contact => contact.name === action.payload.name
        );
        if (hasName) {
          Notiflix.Notify.warning(
            `Contact "${action.payload.name}" already exist.`
          );
          return;
        }
        state.contacts.push(action.payload);
      },
      prepare(name, number) {
        return { payload: { name, number, id: nanoid() } };
      },
    },
    deleteContact: (state, action) => {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload
      );
      state.contacts.splice(index, 1);
    },
    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactReducer = persistReducer(
  persistConfig,
  contactsList.reducer
);

export const { addContact, deleteContact, filterContacts } =
  contactsList.actions;

// Selectors

export const getContactsValue = state => state.contacts.contacts;
export const getFilterValue = state => state.contacts.filter;
