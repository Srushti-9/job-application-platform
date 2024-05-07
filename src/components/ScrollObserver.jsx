// ScrollObserver.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/jobsSlice';

const ScrollObserver = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.jobs.loading);
  const hasMore = useSelector((state) => state.jobs.hasMore);
  const observer = useRef();

  useEffect(() => {
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

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && !loading && hasMore) {
      dispatch(fetchJobs());
    }
  };

  return <div className="observe-bottom"></div>;
};

export default ScrollObserver;
