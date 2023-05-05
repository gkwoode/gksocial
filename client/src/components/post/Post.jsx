import "./post.scss";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
// import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Comments from "../comments/Comments";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authAPI";

const Post = ({post}) => {
    const [commentOpen, setComments] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const queryClient = useQueryClient();
    

    const { isLoading, error, data } = useQuery(
        ['likes', post.id], () =>
        makeRequest.get("/likes?postId=" + post.id).then((res) => {
          return res.data;
        }),
    );

    const mutation = useMutation((liked) => { 
        if(liked) return makeRequest.delete("/likes?postId=" + post.id);
        return makeRequest.post("/likes", {postId: post.id});
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(['likes']);
        }
    });

    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id));
    };


    return (
        <div className="post">
            <div className="container">
                <div className="user">

                    {/* UserInfo: Image, Name, When posted, and Option */}
                    <div className="userLeft">
                        <Link to={`/profile/${post.userId}`}>
                            <img src={post.profilePic} alt="" />
                        </Link>
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{textDecoration: "none", color: "#0054b4"}}>
                                <span className="name">{post.fname} {post.lname}</span>
                            </Link>
                            <span className="time">{moment(post.postDate).fromNow()}</span>
                        </div>
                    </div>
                    <div className="userRight">
                        <MoreHorizOutlinedIcon />
                    </div>
                </div>
                
                {/* PostInfo: Description and Media */}
                <div className="postInfo">
                    <span>{post.desc}</span>
                    <img src={"./upload/" + post.image} alt="" />
                </div>

                {/* <span> {data.length} </span> */}

                <hr />

                {/* PostActions: Like, Comment, and Share */}
                <div className="postActions">
                    <div className="like"  onClick={handleLike}>
                        {/* {(isLoading) ? <ThumbUpOffAltRoundedIcon style={{color:"red"}}/> : (error) ? <ThumbUpOffAltRoundedIcon style={{color:"red"}}/> : (data.length === 0) ? <ThumbUpOffAltRoundedIcon style={{color:"red"}}/> : (data.length > 0) ? <ThumbUpOutlinedIcon/> : <ThumbUpOffAltRoundedIcon style={{color:"red"}}/>} */}
                        {isLoading ? ( "Loading") : error ? ( "Something went wrong") :
                        data.includes(currentUser.id) 
                        ? <ThumbUpOutlinedIcon style={{color:"red"}}/> 
                        : <ThumbUpOutlinedIcon/>}
                        <span>{data?.length} Like</span>
                    </div>
                    <div className="comment" onClick={()=>setComments(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        <span>Comment</span>
                    </div>
                    <div className="share">
                        <ShareOutlinedIcon />
                        <span>Share</span>
                    </div>
                </div>

                {/* PostComments: Comments */}
                {commentOpen && <Comments postId={post.id}/>}
            </div>
        </div>
    )
}

export default Post;
