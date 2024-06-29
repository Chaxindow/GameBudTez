import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import moment from "moment";
import Comments from "../comments/Comments";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { isLoading: likesLoading, error: likesError, data: likesData } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => res.data),
  });

  const { isLoading: commentsLoading, error: commentsError, data: commentsData } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + post.id).then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id]);
    },
  });

  const commentMutation = useMutation({
    mutationFn: (newComment) => makeRequest.post("/comments", newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", post.id]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => makeRequest.delete("/posts/" + postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleLike = () => {
    likeMutation.mutate(likesData.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + post.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.description}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {likesLoading ? (
              "loading"
            ) : likesData.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon style={{ color: "red" }} onClick={handleLike} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {likesData?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentsLoading ? "loading" : `${commentsData?.length} Yorum`}
          </div>
          <div className="item">
            <SendOutlinedIcon />
            Gönder
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
