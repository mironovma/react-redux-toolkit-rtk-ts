import { FunctionComponent } from "react";
import { IPost } from "../models/IPost";

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItem: FunctionComponent<PostItemProps> = ({
  post,
  remove,
  update,
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    remove(post);
  };

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const title = prompt() || "";
    update({ ...post, title });
  };

  return (
    <div className="post">
      {post.id}. {post.title}
      <button onClick={handleUpdate}>Edit</button>
      <button onClick={handleRemove}>Delete</button>
    </div>
  );
};

export default PostItem;
