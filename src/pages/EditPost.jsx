import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPosts, updatePost } from '../services/api';

export const EditPost = () => {
  const [post, setPost] = useState({ title: '', content: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPosts();
        const foundPost = response.data.find(p => p.id === parseInt(id));
        if (foundPost) {
          setPost(foundPost);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, post);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};