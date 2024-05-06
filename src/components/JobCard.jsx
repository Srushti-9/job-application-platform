import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from '@mui/system';
import JobDetailsDialog from './JobDetailsDialog';

const JobCardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
  width: 'calc(50% - 16px)',
  borderRadius: theme.spacing(2), // rounded corners
  boxShadow: theme.shadows[3],
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

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
}));

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
  marginRight: theme.spacing(2),
}));

const InfoContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '& > *': {
    textTransform: 'capitalize', // Capitalize the first letter of each child element
  },
});

const SalaryRange = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const AboutCompany = styled(Typography)(({ theme }) => ({
  wordBreak: 'break-word',
  flex: 1,
}));

const ButtonContainer = styled('div')({
  alignSelf: 'center',
  padding: '10px',
});

const PostedContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper, // Match with the background color of the card
  padding: theme.spacing(1), // Adjust padding as needed
  boxShadow: theme.shadows[3], // Add elevation
  width: 'fit-content', // Set width to fit-content
  fontSize: theme.typography.body2.fontSize * 0.8, // Reduce font size
}));

const JobCard = ({ job }) => {
  const {
    jdLink,
    jobDetailsFromCompany,
    maxJdSalary,
    minJdSalary,
    location,
    jobRole,
    companyName,
    logoUrl,
    salaryCurrencyCode,
    minExp,
  } = job;

  const [showFullDetails, setShowFullDetails] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const ExperienceContainer = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary, // Grey shade
  }));

  return (
    <>
      <JobCardWrapper variant="outlined">
        <CardContentWrapper>
          <InfoContainer>
            <PostedContainer>
              <AccessTimeIcon fontSize="small" style={{ fontSize: '0.7rem' }} />
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginLeft: '4px', fontSize: '0.7rem' }}
              >
                Posted 3 days ago
              </Typography>
            </PostedContainer>
          </InfoContainer>
          <InfoContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <AvatarWrapper alt={companyName} src={logoUrl} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" component="h2">
                  {jobRole}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {companyName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {location}
                </Typography>
              </div>
            </div>
            <SalaryRange variant="body2" color="textSecondary">
              {minJdSalary !== null && maxJdSalary !== null
                ? `Estimated Salary Range: ${minJdSalary} - ${maxJdSalary} ${salaryCurrencyCode}`
                : minJdSalary !== null
                  ? `Estimated Salary: ${minJdSalary} ${salaryCurrencyCode}`
                  : maxJdSalary !== null
                    ? `Estimated Salary: ${maxJdSalary} ${salaryCurrencyCode}`
                    : 'Salary not available'}
            </SalaryRange>
            <Typography
              variant="body2"
              style={{ fontSize: '1rem', fontWeight: '500' }}
            >
              About Company:
            </Typography>
            <Typography
              variant="body2"
              style={{ fontSize: '0.8rem', fontWeight: 'bold' }}
            >
              About Us:
            </Typography>
            <AboutCompany variant="body2" color="textSecondary">
              {showFullDetails
                ? jobDetailsFromCompany
                : `${jobDetailsFromCompany.slice(0, 100)}...`}
              {!showFullDetails && (
                <Button color="primary" onClick={handleDialogOpen}>
                  Show More
                </Button>
              )}
            </AboutCompany>
            {minExp && (
              <ExperienceContainer>
                <Typography variant="body2" fontWeight="bold">
                  Minimum Experience
                </Typography>
                <Typography variant="body2">{minExp} years</Typography>
              </ExperienceContainer>
            )}
          </InfoContainer>

          <ButtonContainer>
            <Button
              variant="contained"
              color="primary"
              href={jdLink}
              target="_blank"
              style={{ marginTop: '8px' }}
            >
              Easy Apply
            </Button>
          </ButtonContainer>
        </CardContentWrapper>
      </JobCardWrapper>
      <JobDetailsDialog
        open={openDialog}
        handleClose={handleDialogClose}
        jobDetails={jobDetailsFromCompany}
      />
    </>
  );
};

export default JobCard;
