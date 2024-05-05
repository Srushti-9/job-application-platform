import React from 'react';
import { Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from '@mui/system';

const JobCardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: 'calc(33.3333% - 16px)', 
    marginRight: theme.spacing(2), 
    '&:nth-child(3n)': {
      marginRight: 0, // No margin on the last card in a row
    },
  },
}));

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  flex: '1 0 auto',
}));

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
  marginRight: theme.spacing(2),
}));

const InfoContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const SalaryRange = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const JobCard = ({ job }) => {
  const { jdLink, jobDetailsFromCompany, maxJdSalary, minJdSalary, location, jobRole, companyName, logoUrl } = job;

  return (
    <JobCardWrapper variant="outlined">
      <AvatarWrapper alt={companyName} src={logoUrl} />
      <CardContentWrapper>
        <InfoContainer>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2" color="textSecondary" style={{ marginLeft: '4px' }}>
              Posted 3 days ago
            </Typography>
          </div>
          <Typography variant="h5" component="h2">
            {jobRole}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {companyName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {location}
          </Typography>
          <SalaryRange variant="body2" color="textSecondary">
            Estimated Salary Range: {minJdSalary} - {maxJdSalary} USD
          </SalaryRange>
          <Typography variant="body2">
            About Company:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {jobDetailsFromCompany}
          </Typography>
        </InfoContainer>
        <Button variant="contained" color="primary" href={jdLink} target="_blank" style={{ marginTop: '8px' }}>
          Apply
        </Button>
      </CardContentWrapper>
    </JobCardWrapper>
  );
};

export default JobCard;
