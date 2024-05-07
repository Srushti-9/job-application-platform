import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_, { getState }) => {
    const { offset, filters } = getState().jobs;
    // You can perform your fetch operation here
    // Replace this with your actual API call
    const response = await fetch(
      'https://api.weekday.technology/adhoc/getSampleJdJSON',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: 10, offset }),
      }
    );
    const data = await response.json();
    return data.jdList;
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    hasMore: true,
    offset: 0,
    filters: {},
    filteredJobs: [], // New state to store filtered jobs
  },
  reducers: {
    applyFilters: (state, action) => {
      state.filters = action.payload;
      state.offset = 0; // Reset offset when applying filters
      state.hasMore = true; // Reset hasMore flag
      state.filteredJobs = filterJobs(state.jobs, action.payload); // Apply filters
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.offset += 10;
        state.jobs = [...state.jobs, ...action.payload];
        state.filteredJobs = filterJobs(state.jobs, state.filters); // Apply filters
        if (action.payload.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.loading = false;
      });
  },
});

const filterJobs = (jobs, filters) => {
  // Implement your filtering logic here
  let filtered = [...jobs];
  if (filters.minExp) {
    filtered = filtered.filter((job) => {
      return job.minExp >= filters.minExp;
    });
  }
  if (filters.companyName) {
    filtered = filtered.filter((job) =>
      job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())
    );
  }
  if (filters.location) {
    filtered = filtered.filter((job) =>
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  if (filters.jobRole) {
    filtered = filtered.filter((job) =>
      job.jobRole.toLowerCase().includes(filters.jobRole.toLowerCase())
    );
  }
  if (filters.minBasePay) {
    const minBasePayValue = parseInt(filters.minBasePay.replace('L', ''));
    filtered = filtered.filter((job) => {
      return job.minJdSalary >= minBasePayValue;
    });
  }
  return filtered;
};

export const { applyFilters } = jobsSlice.actions;

export const selectJobs = (state) => state.jobs.jobs;
export const selectLoading = (state) => state.jobs.loading;
export const selectHasMore = (state) => state.jobs.hasMore;
export const selectFilteredJobs = (state) => state.jobs.filteredJobs; // Selector for filtered jobs

export default jobsSlice.reducer;
