import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Card from './Card';

const MainLayout = () => {
  const [filters, setFilters] = useState({ categories: [], regions: [], productTypes: [], budget: 10000 });

  return (
    <div className="flex justify-center mt-8">
      <div className="flex w-full max-w-screen-xl">
        <div className="w-1/6">
          <LeftSidebar setFilters={setFilters} />
        </div>
        <div className="w-4/6">
          <Card filters={filters} />
        </div>
        <div className="w-1/6">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
