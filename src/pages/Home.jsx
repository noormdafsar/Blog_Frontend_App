import { useState, useEffect } from 'react';
import { getPosts } from '../services/api';
import { PostCard } from '../components/PostCard';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [selectedAuthor]);

  const fetchPosts = async () => {
    try {
      const response = await getPosts(selectedAuthor);
      setPosts(response.data.posts);
      
      // Only fetch authors list when showing all posts
      if (!selectedAuthor) {
        const uniqueAuthors = response.data.posts.reduce((acc, post) => {
          if (post.authorId && !acc.find(a => a.id === post.authorId._id)) {
            acc.push({
              id: post.authorId._id,
              email: post.authorId.email
            });
          }
          return acc;
        }, []);
        setAuthors(uniqueAuthors);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold">Latest Blog Posts</h1>
        <div className="w-full sm:w-auto">
          <select 
            className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.email}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
        {posts.length === 0 && (
          <p className="text-gray-500 text-center">No posts found</p>
        )}
      </div>
    </div>
  );
};