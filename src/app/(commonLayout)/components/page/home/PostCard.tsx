"use client";
import{ useState } from 'react';

const PostCard = () => {
  // Demo data
  const postData = {
    title: 'How to Improve Your JavaScript Skills',
    content: 'JavaScript is a versatile language. To become a better developer, focus on understanding the core concepts like closures, async/await, and event loops. Practice makes perfect!',
    authorName: 'John Doe',
    category: 'Tip',
    image: 'https://via.placeholder.com/600', // Placeholder image URL
    premiumContent: true,
    initialUpvotes: 120,
    initialDownvotes: 3,
    paidby: ['User1', 'User2', 'User3'], // List of users who paid
    comments: [
      { user: 'Jane Smith', message: 'This was very helpful, thanks!' },
      { user: 'Bob Johnson', message: 'Great article!' }
    ]
  };

  // State for upvotes, downvotes, and comment toggle
  const [upvotes, setUpvotes] = useState(postData.initialUpvotes);
  const [downvotes, setDownvotes] = useState(postData.initialDownvotes);
  const [commentVisible, setCommentVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(postData.comments);

  // Handler for upvoting
  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  // Handler for downvoting
  const handleDownvote = () => {
    setDownvotes(downvotes + 1);
  };

  // Handler for toggling comment section
  const toggleCommentSection = () => {
    setCommentVisible(!commentVisible);
  };

  // Handler for adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { user: 'New User', message: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white border border-gray-300 shadow-lg rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{postData.title}</h3>
        <span className="text-sm text-gray-500 font-semibold">{postData.category}</span>
      </div>
      {postData.premiumContent && (
        <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
          Premium
        </span>
      )}
      <img src={postData.image} alt={postData.title} className="w-full rounded-md mb-4" />
      <p className="text-gray-700 mb-4">{postData.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>By: {postData.authorName}</span>
        <div>
          <button
            onClick={handleUpvote}
            className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
          >
            👍 {upvotes}
          </button>
          <button
            onClick={handleDownvote}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            👎 {downvotes}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
        <span>Paid by: {postData.paidby.length} users</span>
        <span
          className="cursor-pointer hover:text-blue-500"
          onClick={toggleCommentSection}
        >
          {comments.length} Comments
        </span>
      </div>

      {/* Toggle Comment Section */}
      {commentVisible && (
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border rounded p-2 mb-2"
          ></textarea>
          <button
            onClick={handleAddComment}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Comment
          </button>
        </div>
      )}

      <div className="border-t pt-4">
        {comments.map((comment, index) => (
          <div key={index} className="mb-2">
            <strong>{comment.user}:</strong> <span>{comment.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
