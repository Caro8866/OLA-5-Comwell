import "@/app/globals.css";
import DashboardWrapper from "@/components/cms/dashboardWrapper/DashboardWrapper";

import React from "react";

function Index() {
  return (
    <DashboardWrapper active="overview">
      <main>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti unde
          explicabo iste odit temporibus at, esse laboriosam exercitationem odio
          quis.
        </p>
      </main>
    </DashboardWrapper>
  );
}

export default Index;
