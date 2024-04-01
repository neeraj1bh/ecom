import React from "react";
import Dashboard from "~/components/Dashboard";
import withAuth from "~/components/WithAuth";

function AuthenticatedDashboard() {
  return <Dashboard />;
}

export default withAuth(AuthenticatedDashboard);
