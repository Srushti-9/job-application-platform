import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import '../styles/Filters.css';
import debounce from 'lodash.debounce'; // Import debounce function from lodash
import { applyFilters } from '../redux/jobsSlice'; // Import the applyFilters action
import { useDispatch } from 'react-redux';

const Filters = () => {
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const [minExp, setMinExp] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [remoteOnly, setRemoteOnly] = useState('');
  const [techStack, setTechStack] = useState('');
  const [jobRole, setRole] = useState('');
  const [minBasePay, setMinBasePay] = useState('');

  useEffect(() => {
    //console.log("apply filters");
    // Define a function to gather filter values
    const gatherFilters = () => ({
      minExp,
      companyName,
      location,
      remoteOnly,
      techStack,
      jobRole,
      minBasePay,
    });

    // Apply filters whenever any filter value changes, debounce the function to prevent excessive API calls
    const applyFiltersDebounced = debounce(() => {
      //console.log("apply filters 1");
      const filters = gatherFilters();
      dispatch(applyFilters(filters)); // Dispatch applyFilters action with filter values
    }, 300); // Adjust the delay as needed (in milliseconds)

    // Watch for changes in filter values and apply filters
    applyFiltersDebounced();

    // Clean up to prevent memory leaks
    return () => {
      // Cancel the debounce function on unmount
      applyFiltersDebounced.cancel();
    };
  }, [
    dispatch,
    minExp,
    companyName,
    location,
    remoteOnly,
    techStack,
    jobRole,
    minBasePay,
  ]);

  return (
    <div className="filters-container">
      <div className="filter-row">
        <Autocomplete
          id="min-experience-select"
          value={minExp || null}
          onChange={(event, newValue) => {
            setMinExp(newValue);
          }}
          sx={{ width: 150 }}
          options={[...Array(10)].map((_, index) => String(index + 1))} // Convert numbers to strings
          renderInput={(params) => <TextField {...params} label="Experience" />}
        />
      </div>

      <div className="filter-row">
        <TextField
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          label="Company Name"
          variant="outlined"
        />
      </div>
      <div className="filter-row">
        <TextField
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          label="Location"
          variant="outlined"
        />
      </div>
      <div className="filter-row">
        <Autocomplete
          id="remote-select"
          value={remoteOnly || null}
          onChange={(event, newValue) => {
            setRemoteOnly(newValue);
          }}
          sx={{ width: 150 }}
          options={['Remote', 'Hybrid', 'In-office']}
          renderInput={(params) => <TextField {...params} label="Remote" />}
        />
      </div>
      <div className="filter-row">
        <TextField
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          label="Tech Stack"
          variant="outlined"
        />
      </div>
      <div className="filter-row">
        <TextField
          value={jobRole}
          onChange={(e) => setRole(e.target.value)}
          label="Role"
          variant="outlined"
        />
      </div>
      <div className="filter-row">
        <Autocomplete
          id="min-base-pay-select"
          value={minBasePay || null} // Set initial value to null
          onChange={(event, newValue) => {
            setMinBasePay(newValue); // Set to empty string if newValue is null
          }}
          sx={{ width: 150 }}
          options={['0L', '10L', '20L', '30L', '40L', '50L', '60L', '70L']}
          renderInput={(params) => (
            <TextField {...params} label="Min Base Pay" />
          )}
        />
      </div>
    </div>
  );
};

export default Filters;
