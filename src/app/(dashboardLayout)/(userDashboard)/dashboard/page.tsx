
"use client"; 
import { useUser } from "@/context/uAuthContext";
; // Import signOut for logging out


const DashboardPage = () => {

  const { user } = useUser(); 

 console.log("User:", user);
 
 

  return (
    <div>
      <h1>User Dashboard Page</h1>
     
      
    
     
    </div>
  );
};

export default DashboardPage;
