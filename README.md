# Candidate Application Platform

This project is a candidate application platform that allows users to view job listings, filter jobs based on various criteria, and implement infinite scroll for a seamless browsing experience.

## Features

- **Job Cards:** Each job listing is displayed as a card containing the following information:

  - Job title
  - Company name
  - Location
  - Job description (limited to a certain number of characters with an option to expand)
  - Experience required
  - Apply button/link

- **Filters:** Implemented filters allow users to refine the job listings based on:

  - Min experience
  - Company name
  - Location
  - Remote/on-site
  - Tech stack
  - Role
  - Min base pay

- **Infinite Scroll:** Infinite scroll is implemented to load additional job listings as the user scrolls down the page. The platform fetches and displays more jobs automatically without requiring the user to click on a "Load More" button.

- **Responsive Design:** The platform is responsive and works well on different screen sizes, including mobile devices.

## Technology Stack

- ReactJs
- Redux
- CSS
- Material UI

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Srushti-9/job-application-platform.git
```

2. Install dependencies:

```
npm install
```

3. Run the application:

```bash
npm run build
```

## Additional Information

1.The application uses Redux js toolkit for state management to efficiently manage the application's state.
2.ESLint and Prettier are used to ensure code quality and consistency.
3.The application follows best practices for performance optimization.
