const LoadingSkeleton = () => {
    return (
      <div className="max-w-4xl mx-auto p-8 animate-pulse">
        {/* Page Title Skeleton */}
        <div className="h-8 w-48 bg-gray-300 mb-6 rounded"></div>
  
        {/* Title Input Skeleton */}
        <div className="mb-4">
          <div className="h-4 w-32 bg-gray-300 mb-2 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
        </div>
  
        {/* Content Editor Skeleton */}
        <div className="mb-4">
          <div className="h-4 w-32 bg-gray-300 mb-2 rounded"></div>
          <div className="h-40 w-full bg-gray-200 rounded-lg"></div>
        </div>
  
        {/* Category Selection Skeleton */}
        <div className="mb-4">
          <div className="h-4 w-32 bg-gray-300 mb-2 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
        </div>
  
        {/* Monetization Checkbox Skeleton */}
        <div className="mb-4 flex items-center">
          <div className="h-4 w-4 bg-gray-300 mr-2 rounded"></div>
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
        </div>
  
        {/* Submit Button Skeleton */}
        <div className="h-10 w-32 bg-blue-300 rounded-lg"></div>
      </div>
    );
  };
  
  export default LoadingSkeleton;