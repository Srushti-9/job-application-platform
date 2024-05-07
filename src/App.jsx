import { useState, useEffect, useRef } from 'react';
import JobCard from './components/JobCard';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Filters from './components/Filters';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Import the Redux store
import JobListings from './components/JobListings';
import ScrollObserver from './components/ScrollObserver';

const theme = createTheme();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div>
          <h1>Job Listings</h1>
          <Filters />
          <JobListings />
          <ScrollObserver />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
