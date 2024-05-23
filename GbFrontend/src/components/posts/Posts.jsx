import Post from "../post/Post";
import "./posts.scss";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then((res) => {
        console.log(data);
        return res.data;
      }),
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
