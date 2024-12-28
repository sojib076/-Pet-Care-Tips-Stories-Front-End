import { Card, Skeleton } from "@nextui-org/react";

const SidebarSkeleton = () => {
  return (
    <div className="space-y-4 p-4 ">
     
      <Card className="space-y-3 " radius="lg">
        <Skeleton className="flex items-center space-x-3">
          <div className="h-10 w-24 rounded-full bg-default-300" />
        
        </Skeleton>
      </Card>

    
      <Skeleton className="h-5 w-24 rounded-lg bg-default-300" />

     
      <div className="space-y-3">
        <Card className="p-2" radius="sm">
          <Skeleton className="h-4 w-32 rounded-lg bg-default-300" />
        </Card>
        <Card className="p-2" radius="sm">
          <Skeleton className="h-4 w-32 rounded-lg bg-default-300" />
        </Card>
      </div>

     
      <Skeleton className="h-[1px] w-full rounded bg-default-300" />

      
      <Skeleton className="h-5 w-32 rounded-lg bg-default-300" />

     
      <div className="space-y-3">
        <Card className="p-2" radius="sm">
          <Skeleton className="h-4 w-24 rounded-lg bg-default-300" />
        </Card>
        <Card className="p-2" radius="sm">
          <Skeleton className="h-4 w-24 rounded-lg bg-default-300" />
        </Card>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
