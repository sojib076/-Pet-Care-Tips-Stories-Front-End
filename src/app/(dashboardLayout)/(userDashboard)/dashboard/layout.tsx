
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
          <div className="lg:px-10 px-4 pt-10 dark:bg-gray-800 min-h-screen w-full ">
            {children}
          </div>
        </UserLayout>
      </DashboardLayout>

    </div>
  );
}
