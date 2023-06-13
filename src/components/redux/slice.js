import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchAll } from './operations';

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
      })
      .addCase(addContact.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = state.contacts.items.concat(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(deleteContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        const index = state.contacts.items.findIndex(
          contact => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contacts.items.splice(index, 1);
        }
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      });
  },
});

export const { filterContacts } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
