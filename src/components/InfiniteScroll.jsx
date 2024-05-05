// InfiniteScroll.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoreJobs } from '../actions/jobActions';

const InfiniteScroll = () => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1); // Track current page for pagination
  const jobs = useSelector(state => state.jobs);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) return;
    setIsFetching(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    dispatch(fetchMoreJobs(page));
    setPage(page + 1);
    setIsFetching(false);
  }, [isFetching, dispatch, page]);

  return <div className="infinite-scroll"></div>;
}

export default InfiniteScroll;
