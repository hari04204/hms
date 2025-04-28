import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  records: [],
  loading: false,
  error: null
};

const medicalRecordSlice = createSlice({
  name: 'medicalRecords',
  initialState,
  reducers: {
    fetchRecordsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRecordsSuccess: (state, action) => {
      state.loading = false;
      state.records = action.payload;
    },
    fetchRecordsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addRecord: (state, action) => {
      state.records.push(action.payload);
    },
    updateRecord: (state, action) => {
      const index = state.records.findIndex(record => record._id === action.payload._id);
      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },
    deleteRecord: (state, action) => {
      state.records = state.records.filter(record => record._id !== action.payload);
    }
  }
});

export const {
  fetchRecordsStart,
  fetchRecordsSuccess,
  fetchRecordsFailure,
  addRecord,
  updateRecord,
  deleteRecord
} = medicalRecordSlice.actions;

export default medicalRecordSlice.reducer; 