import React from 'react';
import { Card, CardContent, Typography, Skeleton, Avatar } from '@mui/material';
import { styled } from '@mui/system';

const JobCardSkeletonWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
  width: 'calc(50% - 16px)',
  borderRadius: theme.spacing(2), // rounded corners
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    width: 'calc(33.3333% - 16px)',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
    '&:nth-of-type(3n)': {
      marginRight: 0, // No margin on the last card in a row
    },
  },
  [theme.breakpoints.up('lg')]: {
    width: 'calc(30% - 16px)', // For larger screens
    marginRight: theme.spacing(6),
    marginBottom: theme.spacing(4),
  },
}));

const JobCardSkeletonContent = styled(CardContent)(({ theme }) => ({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
}));

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
  marginRight: theme.spacing(2),
}));

const JobCardSkeleton = () => {
  return (
    <JobCardSkeletonWrapper variant="outlined">
      <JobCardSkeletonContent>
        <Skeleton variant="text" width={200} height={24} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <AvatarWrapper />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Skeleton variant="text" width={300} height={16} />
            <Skeleton variant="text" width={150} height={16} />
            <Skeleton variant="text" width={250} height={16} />
          </div>
        </div>
        <Skeleton variant="rectangular" width={250} height={150} />
        <Skeleton variant="text" width={200} height={16} />
        <Skeleton variant="text" width={150} height={16} />
        <Skeleton variant="text" width={200} height={16} />
        <Skeleton variant="text" width={100} height={16} />
        <Skeleton variant="text" width={100} height={16} />
      </JobCardSkeletonContent>
    </JobCardSkeletonWrapper>
  );
};

export default JobCardSkeleton;
