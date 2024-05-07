import { useState, useEffect, useRef } from 'react';
import JobCard from './components/JobCard';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Filters from './components/Filters';
import JobCardSkeleton from './components/JobCardSkeleton'; // the skeleton component

const theme = createTheme();

const JobContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '0 16px', // Add left and right padding to the container
  justifyContent: 'center',
});

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({}); // State to store filter values

  // useEffect to refetch data when filters change
  useEffect(() => {
    console.log('refetch data');
    fetchData(); // Refetch data
  }, [filters]);

  // useEffect(() => {
  //   console.log("filtes applied");
  //   // Initialize filtered jobs with original jobs if no filters are applied
  //   if (!filtersApplied()) {
  //     setFilteredJobs(jobs);
  //   }
  // }, [jobs]);

  useEffect(() => {
    console.log('scrolling');
    if (!loading && hasMore) {
      const options = {
        //root: null,
        //rootMargin: "0px",
        threshold: 1.0,
      };
      observer.current = new IntersectionObserver(handleObserver, options);
      if (observer.current) {
        observer.current.observe(document.querySelector('.observe-bottom'));
      }
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, hasMore]);

  const fetchData = async () => {
    setLoading(true);
    try {
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
      if (data.jdList.length === 0) {
        setHasMore(false);
        //console.log("if");
      } else {
        //console.log("else");
        setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
        setOffset((prevOffset) => prevOffset + 10);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to update filtered jobs when jobs or filters change
  useEffect(() => {
    console.log('filtes applied');
    let filtered = [...jobs];
    // Apply filters
    if (filters.minExp) {
      filtered = filtered.filter((job) => {
        return job.minExp >= filters.minExp;
      });
    }
    if (filters.companyName) {
      filtered = filtered.filter((job) =>
        job.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())
      );
    }
    if (filters.location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    // can add the filter - based on the value - currently, in api data we don't have the attr
    // if (filters.remoteOnly !== null) {
    //   filtered = filtered.filter((job) => job.remote === filters.remoteOnly);
    // }

    if (filters.jobRole) {
      filtered = filtered.filter((job) =>
        job.jobRole.toLowerCase().includes(filters.jobRole.toLowerCase())
      );
    }

    if (filters.minBasePay) {
      // Convert minBasePay filter value to a number before filtering
      const minBasePayValue = parseInt(filters.minBasePay.replace('L', ''));
      filtered = filtered.filter((job) => {
        return job.minJdSalary >= minBasePayValue;
      });
    }
    // Update filtered jobs state
    setFilteredJobs(filtered);
  }, [jobs, filters]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      fetchData();
      if (observer.current) {
        observer.current.disconnect();
      }
    }
  };

  // Filter jobs based on user input
  const handleApplyFilters = (filters) => {
    // Update filters state
    setFilters(filters);
  };

  const filtersApplied = () => {
    // Check if any filters are applied
    return Object.values(filters).some((value) => value !== '');
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Job Listings</h1>
        <Filters onApplyFilters={handleApplyFilters} />{' '}
        {/* Pass filter handler to Filters component */}
        <JobContainer>
          {loading
            ? // Display the skeleton loading component while loading
              Array.from({ length: 10 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))
            : filteredJobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
        </JobContainer>
        {loading && <p>Loading...</p>}
        {!hasMore && <p>No more jobs to load</p>}
        <div className="observe-bottom"></div>
      </div>
    </ThemeProvider>
  );
};
export default App;
