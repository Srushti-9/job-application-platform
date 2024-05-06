import React, { useState } from 'react';

const Filters = ({ onApplyFilters }) => {
  const [minExperience, setMinExperience] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [techStack, setTechStack] = useState('');
  const [jobRole, setRole] = useState('');
  const [minBasePay, setMinBasePay] = useState('');

  const handleApplyFilters = () => {
    const filters = {
      minExperience,
      companyName,
      location,
      remoteOnly,
      techStack,
      jobRole,
      minBasePay,
    };
    // Pass filters to parent component for further processing
    onApplyFilters(filters);
  };

  return (
    <div>
      <input
        type="text"
        value={minExperience}
        onChange={(e) => setMinExperience(e.target.value)}
        placeholder="Min Experience"
      />
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Company Name"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <label>
        Remote Only:
        <input
          type="checkbox"
          checked={remoteOnly}
          onChange={() => setRemoteOnly(!remoteOnly)}
        />
      </label>
      <input
        type="text"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
        placeholder="Tech Stack"
      />
      <input
        type="text"
        value={jobRole}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
      />
      <input
        type="text"
        value={minBasePay}
        onChange={(e) => setMinBasePay(e.target.value)}
        placeholder="Min Base Pay"
      />
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;
