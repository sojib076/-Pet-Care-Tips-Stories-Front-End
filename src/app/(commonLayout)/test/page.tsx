// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useUpvotePost } from '@/hook/post.hook';
// import { addCommentToPost, downvotePost, getSinglePost } from '@/Services/Post'; // Assuming `getSinglePost` fetches a single post



// const PostCard = () => {
//   const { mutate: upvotePost } = useUpvotePost();
//   const [posts, setPosts] = useState<Post[]>([]); // Array to hold the posts
//   const [page, setPage] = useState(1); // Current page number for infinite scroll
//   const [hasMore, setHasMore] = useState(true); // To check if there are more posts to load
//   const [isFetching, setIsFetching] = useState(false); // To avoid multiple fetching at once
//   const [commentInput, setCommentInput] = useState<{ [key: string]: string }>({}); // Holds input values for comments

//   // Fetch posts using Axios with pagination
//   const fetchPosts = async (pageNumber: number) => {
//     try {
//       setIsFetching(true); // Set fetching to true to avoid multiple requests
//       const response = await axios.get(`http://localhost:5000/api/v1/post/get?page=${pageNumber}&limit=1`);
//       const newPosts = response.data.data.posts;

//       setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//       setHasMore(response.data.data.hasMore); // Check if there are more posts
//       setIsFetching(false);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       setIsFetching(false);
//     }
//   };

//   // Fetch initial posts
//   useEffect(() => {
//     fetchPosts(page);
//   }, []);

//   // Scroll event handler for infinite scrolling
//   const handleScroll = () => {
//     if (
//       window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
//       !isFetching &&
//       hasMore
//     ) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   // Fetch more posts whenever the page state is updated (for pagination)
//   useEffect(() => {
//     if (page > 1 && !isFetching) {
//       fetchPosts(page);
//     }
//   }, [page]);

//   // Attach scroll listener
//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [isFetching, hasMore]);

//   // Optimistic update for upvote and downvote
//   const updatePostInState = (postId: string, updatedData: Partial<Post>) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) => (post._id === postId ? { ...post, ...updatedData } : post))
//     );
//   };

//   // Refetch the post from the server after mutation
//   const refetchSinglePost = async (postId: string) => {
//     try {
//       const { data } = await getSinglePost(postId); // Fetch updated post
//       updatePostInState(postId, data); // Update only the specific post
//     } catch (error) {
//       console.error('Error refetching post:', error);
//     }
//   };

//   // Upvote handler with optimistic UI update
//   const handleUpvote = async (postId: string) => {
//     const post = posts.find((p) => p._id === postId);
//     if (post) {
//       // Optimistically update the UI
//       updatePostInState(postId, { upvotes: post.upvotes + 1 });
//       try {
//         await upvotePost(postId); // Upvote the post via API
//         await refetchSinglePost(postId); // Refetch and update the specific post from the server
//       } catch (error) {
//         console.error('Error upvoting post:', error);
//       }
//     }
//   };

//   // Downvote handler with optimistic UI update
//   const handleDownvote = async (postId: string) => {
//     const post = posts.find((p) => p._id === postId);
//     if (post) {
//       // Optimistically update the UI
//       updatePostInState(postId, { downvotes: post.downvotes + 1 });
//       try {
//         await downvotePost(postId); // Downvote the post via API
//         await refetchSinglePost(postId); // Refetch and update the specific post from the server
//       } catch (error) {
//         console.error('Error downvoting post:', error);
//       }
//     }
//   };

//   // Comment submit handler
//   const handleCommentSubmit = async (postId: string) => {
//     const comment = commentInput[postId];
//     if (comment) {
//       try {
//         await addCommentToPost(postId, comment); // Submit comment via API
//         setCommentInput((prevState) => ({ ...prevState, [postId]: '' })); // Clear comment input
//         await refetchSinglePost(postId); // Refetch and update the specific post from the server
//       } catch (error) {
//         console.error('Error adding comment:', error);
//       }
//     }
//   };

//   // Handle comment input change
//   const handleCommentChange = (postId: string, value: string) => {
//     setCommentInput((prevState) => ({
//       ...prevState,
//       [postId]: value,
//     }));
//   };

//   const handleFollow = (authorId: string) => {
//     console.log(`Followed author: ${authorId}`);
//   };

//   const handleReadMore = (postId: string) => {
//     console.log(`Read more for post: ${postId}`);
//   };

//   return (
//     <div className="grid gap-6">
//       {posts.map((post) => (
//         <div
//           key={post._id}
//           className="max-w-xl mx-auto bg-white border border-gray-300 rounded-lg p-4 mb-6 shadow-sm"
//         >
//           {/* Header with Author Info */}
//           <div className="flex items-start space-x-3 mb-3">
//             <img
//               src={post.author.img || '/default-profile.png'}
//               alt={post.author.name || 'Anonymous'}
//               className="w-10 h-10 rounded-full"
//             />
//             <div className="flex-grow">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="text-base font-semibold">{post.author.name || 'Anonymous'}</h3>
//                   <span className="text-xs text-gray-500">@{post.author.username || 'user123'}</span>
//                 </div>
//                 <button
//                   className="text-blue-500 font-semibold text-xs hover:underline"
//                   onClick={() => handleFollow(post.author._id)}
//                 >
//                   Follow
//                 </button>
//               </div>
//               <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
//             </div>
//           </div>

//           {/* Post Content */}
//           <div className="text-sm text-gray-700 mb-2">
//             <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) }} />
//             {post.content.length > 150 && (
//               <button className="text-blue-500 font-semibold text-xs hover:underline">
//                 Read more
//               </button>
//             )}
//           </div>

//           {/* Post Engagement */}
//           <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
//             <div className="flex space-x-4">
//               <button
//                 className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
//                 onClick={() => handleUpvote(post._id)}
//               >
//                 👍 <span>{post.upvotes}</span>
//               </button>
//               <button
//                 className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
//                 onClick={() => handleDownvote(post._id)}
//               >
//                 👎 <span>{post.downvotes}</span>
//               </button>
//             </div>
//             <div className="text-xs">{post.comments.length} Comments</div>
//           </div>

//           {/* Divider */}
//           <div className="border-t border-gray-300 pt-3">
//             {post.comments.length > 0 ? (
//               <div className="text-xs text-gray-500">
//                 {post.comments
//                   .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//                   .slice(0, 4) // Only take the most recent comments
//                   .map((comment) => (
//                     <div key={comment._id} className="mb-2">
//                       <strong>{comment.userId.name || 'Anonymous'}:</strong> {comment.content}
//                       <div className="text-gray-400">{new Date(comment.createdAt).toLocaleString()}</div>
//                     </div>
//                   ))}
//                 {post.comments.length > 2 && (
//                   <button
//                     className="text-blue-500 font-semibold text-xs hover:underline"
//                     onClick={() => console.log(`View all comments for post: ${post._id}`)}
//                   >
//                     View all comments
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <div className="text-xs text-gray-500">No comments yet</div>
//             )}
//           </div>

//           {/* Comment Input */}
//           <div className="mt-3">
//             <textarea
//               className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
//               placeholder="Write a comment..."
//               value={commentInput[post._id] || ''}
//               onChange={(e) => handleCommentChange(post._id, e.target.value)}
//             />
//             <button
//               className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
//               onClick={() => handleCommentSubmit(post._id)}
//             >
//               Submit Comment
//             </button>
//           </div>
//         </div>
//       ))}
//       {!hasMore && <p className="text-center">No more posts to load.</p>}
//     </div>
//   );
// };

// export default PostCard;
