import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import Comments from "../comments/Comments";


const Post = ({post}) => {
    const [commentOpen, setCommentOpen] = useState(false);
//TEMP
const liked = false;

  return (
    <div className='post'>
        <div className="container">

        
        <div className="user">
            <div className="userInfo">
                <img src={post.profilePic} alt="" />
                <div className="details">
                    <Link to={`/profile/${post.userId}`} style={{textDecoration:"none",color:"inherit" }}>
                    <span className="name">{post.name}</span>
                    </Link>
                    <span className="date"> 1 dakika önce</span>
                    
                </div>
            </div>
            <MoreHorizIcon/>
        </div>
        <div className="content">
            <p>{post.desc}</p>
            <img src={post.img} alt="" />
        </div>
        <div className="info">
            <div className="item">
               {liked ? <FavoriteOutlinedIcon/> : <FavoriteBorderOutlinedIcon/>}
               23 Beğeni
            </div>
            <div className="item" onClick={()=> setCommentOpen(!commentOpen)}>
               <TextsmsOutlinedIcon/>
               23 Yorum
            </div>
            <div className="item">
               <SendOutlinedIcon/>
               Gönder
            </div>
        </div>
        {commentOpen && <Comments/>}
        </div>
    </div>
  )
}

export default Post