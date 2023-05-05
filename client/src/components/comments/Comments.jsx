import "./comments.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authAPI";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Comments = ({postId}) => {
  const [desc, setDesc] = useState("");
  const {currentUser} = useContext(AuthContext);
  const queryClient = useQueryClient();
  
  const { isLoading, error, data } = useQuery(
    ['comments'], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    }),
  );

  const mutation = useMutation((newComment) => { 
    return makeRequest.post("/comments", newComment).then((res) => {
      return res.data;
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({desc, postId});
    setDesc("");
  };

  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser.profilePic} alt=""/>
            <input 
            type="text" 
            placeholder="comment"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={handleClick}>Send</button>
        </div>
  
      { error 
        ? "Something is wrong" 
        : isLoading ? "Loading"
        : data.map((comment) => (
        <div className="comment" comment={comment} key={comment.id}>
            <img src={comment.profilePic} alt=""/>
            <div className="commentInfo">
                <div className="item">
                    <span className="name">{comment.fname} {comment.lname}</span>
                    <span className="time">{moment(comment.postDate).fromNow()}</span>
                </div>
                <p className="commentDesc">{comment.desc}</p>
            </div>            
        </div>
      ))}
    </div>
  );
};

export default Comments;