
import UserLayout from "./layout/Userlayout";
import DashboardLayout from "../../layout/dashboardLayout";




export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  



  return (
    <div>
      <DashboardLayout>
        <UserLayout>
          <div className="px-10 pt-10">
            {children}
          </div>
        </UserLayout>
      </DashboardLayout>

    </div>
  );
}
