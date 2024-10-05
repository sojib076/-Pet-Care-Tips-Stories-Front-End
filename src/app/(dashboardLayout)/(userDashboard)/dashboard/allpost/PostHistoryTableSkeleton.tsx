

const PostHistoryTableSkeleton = () => {
  // Simulate a certain number of rows for the skeleton
  const skeletonRows = Array.from({ length: 5 });

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Title</th>
          <th className="px-4 py-2 text-left">Category</th>
          <th className="px-4 py-2 text-left">Content</th>
          <th className="px-4 py-2 text-left">Type</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {skeletonRows.map((_, index) => (
          <tr key={index} className="animate-pulse">
            <td className="px-4 py-2 border-b">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </td>
            <td className="px-4 py-2 border-b">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </td>
            <td className="px-4 py-2 border-b">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </td>
            <td className="px-4 py-2 border-b">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </td>
            <td className="px-4 py-2 border-b">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostHistoryTableSkeleton;
