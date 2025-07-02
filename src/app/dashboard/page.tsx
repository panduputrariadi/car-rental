import React from "react";
import { SessionProvider } from 'next-auth/react';
const DashboardPage = () => {
  console.log(SessionProvider);
  
  return <div>DashboardPage</div>;
};

export default DashboardPage;
