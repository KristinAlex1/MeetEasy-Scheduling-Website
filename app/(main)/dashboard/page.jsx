"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "../meetings/layout";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const { isLoaded, user } = useUser();

  return (
    <>
      <AppLayout>
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.firstName}</CardTitle>
          </CardHeader>
        </Card>
      </AppLayout>
    </>
  );
};

export default Dashboard;
