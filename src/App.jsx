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

  useEffect(() => {
    // console.log("refetch data");
    fetchData(); // Fetch initial data
  }, [filters]);

  useEffect(() => {
    console.log('scrolling');
    const options = {
      root: null,
      rootMargin: '700px',
      threshold: 0.9,
    };
    observer.current = new IntersectionObserver(handleObserver, options);
    if (observer.current && !loading && hasMore) {
      observer.current.observe(document.querySelector('.observe-bottom'));
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  const fetchData = async () => {
    if (!loading && hasMore) {
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
        console.log(data.jdList);
        if (data.jdList.length === 0) {
          setHasMore(false);
          console.log('if');
        } else {
          console.log('else');
          setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
          setOffset((prevOffset) => prevOffset + 10); // Update offset for next fetch
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    //console.log("filters applied");
    let filtered = [...jobs];
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
    setFilteredJobs(filtered);
  }, [jobs, filters]);

  const handleObserver = (entities) => {
    console.log('observer');
    const target = entities[0];

    if (target.isIntersecting && !loading && hasMore) {
      console.log('if observer');
      fetchData(); // Fetch more data when bottom is observed
    }
  };

  const handleApplyFilters = (filters) => {
    setFilters(filters);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Job Listings</h1>
        <Filters onApplyFilters={handleApplyFilters} />
        <JobContainer>
          {loading && jobs.length === 0
            ? Array.from({ length: 10 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))
            : filteredJobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
        </JobContainer>
        <JobContainer>
          {loading &&
            jobs.length !== 0 &&
            Array.from({ length: 2 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
        </JobContainer>
        {!hasMore && <p>No more jobs to load</p>}
        <div className="observe-bottom"></div>
      </div>
    </ThemeProvider>
  );
};
export default App;
