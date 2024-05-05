import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const JobCard = ({ job }) => {
  const { jdUid, jdLink, jobDetailsFromCompany, maxJdSalary, minJdSalary, salaryCurrencyCode, location, minExp, maxExp, jobRole, companyName, logoUrl } = job;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {jobRole}
        </Typography>
        <Typography color="textSecondary">
          {companyName} - {location}
        </Typography>
        <Typography variant="body2" component="p">
          {jobDetailsFromCompany}
        </Typography>
        <Typography color="textSecondary">
          Experience: {minExp} - {maxExp} years
        </Typography>
        <Typography color="textSecondary">
          Salary: {minJdSalary} - {maxJdSalary} {salaryCurrencyCode}
        </Typography>
        <Button variant="contained" color="primary" href={jdLink} target="_blank">
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};


export default JobCard;
