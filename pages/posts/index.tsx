import { useState } from 'react';
import { useRouter } from 'next/router';
import { posts, Post } from '../../lib/data';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const post: Post | undefined = posts.find((p) => p.id === id);

  const [comments, setComments] = useState<string[]>([]);
  const [comment, setComment] = useState<string>('');

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {comments.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostPage;

