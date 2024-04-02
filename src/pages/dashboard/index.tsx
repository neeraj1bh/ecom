import React from "react";

import withAuth from "~/components/WithAuth";
import Dashboard from "~/views/Dashboard";

function AuthenticatedDashboard() {
  return <Dashboard />;
}

export default withAuth(AuthenticatedDashboard);
