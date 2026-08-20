"use client";

import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import AdminGate from "@/components/admin/AdminGate";
import AdminShell from "@/components/admin/AdminShell";
import DashboardTab from "@/components/admin/DashboardTab";
import BookingsTab from "@/components/admin/BookingsTab";
import PatientsTab from "@/components/admin/PatientsTab";
import AdminTestsTab from "@/components/admin/AdminTestsTab";
import AdminPackagesTab from "@/components/admin/AdminPackagesTab";
import AdminReportsTab from "@/components/admin/AdminReportsTab";

const SESSION_KEY = "healthpath_admin_demo_session";

export default function AdminPage() {
  function handleLogout() {
    window.sessionStorage.removeItem(SESSION_KEY);
    window.location.reload();
  }

  return (
    <Section className="pt-10">
      <Container>
        <SectionHeading
          eyebrow="Internal"
          title="Admin Dashboard"
          description="Front-end-only demo using mock data. No real authentication or patient data is used."
        />
        <div className="mt-8">
          <AdminGate>
            <AdminShell onLogout={handleLogout}>
              {(tab) => {
                switch (tab) {
                  case "dashboard":
                    return <DashboardTab />;
                  case "bookings":
                    return <BookingsTab />;
                  case "patients":
                    return <PatientsTab />;
                  case "tests":
                    return <AdminTestsTab />;
                  case "packages":
                    return <AdminPackagesTab />;
                  case "reports":
                    return <AdminReportsTab />;
                  default:
                    return null;
                }
              }}
            </AdminShell>
          </AdminGate>
        </div>
      </Container>
    </Section>
  );
}
