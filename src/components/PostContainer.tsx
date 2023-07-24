import { IPost } from "../models/IPost";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";

const PostContainer = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = postAPI.useFetchAllPostsQuery(100);

  const [createPost, { isSuccess: isSuccessPOST }] =
    postAPI.useCreatePostMutation();

  const [deletePost, {}] = postAPI.useDeletePostMutation();
  const [updatePost, {}] = postAPI.useUpdatePostMutation();

  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title } as IPost);
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  return (
    <div>
      <div>
        {isSuccessPOST && "Данные успешно отправлены!"}
        <button onClick={handleCreate}>Добавить новую запись</button>
      </div>

      {isLoading && "Идет загрзука записей..."}
      {isError && "Произошла ошибка"}
      {posts &&
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            update={handleUpdate}
            remove={handleRemove}
          />
        ))}
    </div>
  );
};

export default PostContainer;
