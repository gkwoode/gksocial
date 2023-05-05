import "./share.scss";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authAPI";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from "../../axios";

const Share = () => {
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const queryClient = useQueryClient();

    const upload = async () => {
        try{
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        }catch(err){
            console.log(err);
        }
    };

    const mutation = useMutation((newPost) => {
        return makeRequest.post("/posts", newPost);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'])
        },
      })

    const handleClick = async (e) => {
        e.preventDefault();

        let imageURL = "";
        if(file) imageURL = await upload();
        mutation.mutate({desc, image: imageURL});
        setDesc("");
        setFile(null);
    };

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img src={"/upload/" + currentUser.profilePic} alt="" />
                    <input type="text" 
                    placeholder="What's on your mind?" 
                    onChange={(e)=>setDesc(e.target.value)}
                    value={desc}
                    />
                    {/* <div className="imgUpload">
                        {file && <img className="file" src={URL.createObjectURL(file)} alt="" />}
                    </div> */}
                </div>

                <hr />

                <div className="bottom">
                    <div className="items">
                        <input 
                        type="file" 
                        id="file" 
                        style={{display: "none"}} 
                        onChange={(e)=>setFile(e.target.files[0])} 
                        />
                        <label htmlFor="file">
                            <div className="item" htmlFor="file">
                                <PhotoLibraryOutlinedIcon />
                                <span>Add Photo</span>
                            </div>
                        </label>
                        <div className="item">
                            <PeopleAltOutlinedIcon />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <button onClick={handleClick}>Share</button>
                </div>
            </div>
        </div>
    );
}

export default Share;
