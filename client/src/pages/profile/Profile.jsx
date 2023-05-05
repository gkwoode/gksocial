import "./profile.scss";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import Posts from "../../components/posts/Posts";
import { makeRequest } from "../../axios";
import { useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import { useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/authAPI";

const Profile = () => {
    const {currentUser} = useContext(AuthContext);
    const userId = parseInt(useLocation().pathname.split("/")[2]);
    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery(
        ["user"], () =>
        makeRequest.get("/users/find/" + userId).then((res) => {
          return res.data;
        }),
    );

    const { isLoading: rIsLoading, data: relationshipData } = useQuery(
        ["relationship"], () =>
        makeRequest.get("/relationships?fellowerUserId=" + userId).then((res) => {
          return res.data;
        }),
    );

    const mutation = useMutation(
        (following) => {
            if (following) return makeRequest.delete("/relationships?userId=" + userId);
            return makeRequest.post("/relationships", {userId});
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["relationship"]);
            }
        }
    );

    const handleFellow = () => {
        mutation.mutate(relationshipData.includes(currentUser.id));
    }

    return (
        <div className='profile'>
            {error ? "Something is wrong" : isLoading ? "Loading" : <>
                <div className="profileContainer">
                {/* Cover Page Image */}
                <div className="coverImage">
                    <img src={data.coverPic} alt="" />
                </div>
                {/* Profile Page Details */}
                <div className="profileDesc">
                    {/* Profile Image */}
                    <img src={data.profilePic} alt="" />
                    {/* Profile Name */}
                    <div className="profileDetails">
                        <span className="name">{data.fname} {data.lname}</span>
                        <div className="locationInfo">
                            <div className="location">
                                <PlaceIcon fontSize="smaller"/>
                                <span>{data.country}</span>
                            </div>
                            {rIsLoading ? "Loading" :
                            userId === currentUser.id ? (<button>Update</button>
                            ) : (
                            <button onClick={handleFellow}>{relationshipData.includes(currentUser.id) 
                            ? "Following" : "Follow"}
                            </button>)}
                        </div>
                    </div>

                    {/* Social Media Handles */}                   
                    <div className="socialHandles">
                        <a href="1#" target="_blank" rel="noreferrer">
                            <FacebookIcon fontSize="medium"/>
                        </a>
                        <a href="1#" target="_blank" rel="noreferrer">
                            <InstagramIcon fontSize="medium"/>
                        </a>
                        <a href="1#" target="_blank" rel="noreferrer">
                            <TwitterIcon fontSize="medium"/>
                        </a>
                        <a href="1#" target="_blank" rel="noreferrer">
                            <LinkedInIcon fontSize="medium"/>
                        </a>
                    </div>
                </div>
            </div>

            <hr />

            <div className="profileLinks">
                <a href="!#">Posts</a>
                <a href="!#">About</a>
                <a href="!#">Friends</a>
                <a href="!#">Photos</a>
            </div>

            <hr />

            {/* Call Post component */}
            {/* <Posts className="posts"/> */}
            <Posts userId={userId} />
            </>}
        </div>
    );
}

export default Profile;
