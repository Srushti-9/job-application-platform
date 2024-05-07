// JobListings.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectJobs,
  selectFilteredJobs,
  selectLoading,
  selectHasMore,
} from '../redux/jobsSlice';
import JobCard from './JobCard';
import JobCardSkeleton from './JobCardSkeleton';
import { styled } from '@mui/system';

const JobContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '0 16px', // Add left and right padding to the container
  justifyContent: 'center',
  // Media query for mobile devices
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'center', // Align items to center vertically
  },
});

const JobListings = () => {
  const jobs = useSelector(selectJobs);
  const filteredJobs = useSelector(selectFilteredJobs);
  const loading = useSelector(selectLoading);
  const hasMore = useSelector(selectHasMore);

  return (
    <JobContainer>
      {loading && jobs.length === 0
        ? Array.from({ length: 10 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))
        : filteredJobs.map((job, index) => <JobCard key={index} job={job} />)}
      {loading && jobs.length !== 0 && (
        <>
          <JobCardSkeleton />
          <JobCardSkeleton />
        </>
      )}
      {!hasMore && <p>No more jobs to load</p>}
    </JobContainer>
  );
};

export default JobListings;
