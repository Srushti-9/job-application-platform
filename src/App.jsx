import React, { useState, useEffect, useRef } from 'react';
import JobCard from './components/JobCard';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

  useEffect(() => {
    // Fetch data from API and update state
    fetchData();
  }, []);

  useEffect(() => {
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

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      fetchData();
      if (observer.current) {
        observer.current.disconnect();
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Job Listings</h1>
        <JobContainer>
          {jobs.map((job, index) => (
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
