import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  //TEMPORARY
  const posts = [
    {
      id: 1,
      name: "Yiğit Sağlam",
      userId: 1,
      profilePic:
        "../images/yigitpp.jpg",
      desc: "TOTY BELLINGOAAAALLL",
      img: "../images/JudeBellingham.png",
    },
    {
      id: 2,
      name: "Mete Çalışkan",
      userId: 2,
      profilePic:
        "../images/metepp.jpg",
      desc: "TOTY BELLINGOAAALLL CONGRATSS",
    },
  ];

  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;