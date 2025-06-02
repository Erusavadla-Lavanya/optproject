// /app/jobs/page.tsx
'use client';
import React from 'react';
import CompanyList from '../components/CompanyList';


const JobsPage = () => {
  return (
    <div className="p-6">
      <CompanyList />
    </div>
  );
};

export default JobsPage;
