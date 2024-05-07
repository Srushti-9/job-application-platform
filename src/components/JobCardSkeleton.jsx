import React from 'react';
import { Card, CardContent, Typography, Skeleton } from '@mui/material';

const JobCardSkeleton = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Skeleton variant="text" width={200} height={24} />
        <Skeleton variant="text" width={300} height={16} />
        <Skeleton variant="text" width={150} height={16} />
        <Skeleton variant="text" width={250} height={16} />
        <Skeleton variant="rectangular" width={250} height={150} />
        <Skeleton variant="text" width={200} height={16} />
        <Skeleton variant="text" width={150} height={16} />
        <Skeleton variant="text" width={200} height={16} />
        <Skeleton variant="text" width={100} height={16} />
        <Skeleton variant="text" width={100} height={16} />
      </CardContent>
    </Card>
  );
};

export default JobCardSkeleton;
