import { Link } from 'react-router-dom';

export const PostCard = ({ post, onDelete, canEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>By {post.authorId?.email}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      {canEdit && (
        <div className="mt-4 flex justify-end space-x-2">
          <Link
            to={`/dashboard/edit/${post._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(post._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
