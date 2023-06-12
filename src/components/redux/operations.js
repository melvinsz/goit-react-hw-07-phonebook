import { nanoid } from 'nanoid';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAll = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetch(
    'https://6485a66ba795d24810b728b7.mockapi.io/contacts'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  const data = await response.json();
  data.map(dat => (dat.id = nanoid()));
  return { items: data };
});
