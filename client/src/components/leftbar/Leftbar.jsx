import './leftbar.scss';
import friends from '../../assets/friends.png';
import groups from '../../assets/groups.png';
import messages from '../../assets/messages.png';
import watch from '../../assets/watch.png';
import gallery from '../../assets/gallery.png';
import marketplace from '../../assets/marketplace.png';
import events from '../../assets/events.png';
import settings from '../../assets/settings.png';
import { useContext } from 'react';
import { AuthContext } from '../../context/authAPI';
import { Link } from 'react-router-dom';

const Leftbar = () => {
    const {currentUser} = useContext(AuthContext);

    return (
        <div className='leftbar'>
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={currentUser.profilePic} alt="" />
                        <span>{currentUser.fname} {currentUser.lname}</span>
                    </div>
                    <hr />
                    <div className="item">
                        <Link to='/friends'><img src={friends} alt="" /></Link>
                        <Link to='/friends' style={{textDecoration: "none", color: "inherit"}}><span>Friends</span></Link>
                    </div>
                    <div className="item">
                        <Link to='/groups'><img src={groups} alt="" /></Link>
                        <Link to='/groups' style={{textDecoration: "none", color: "inherit"}}><span>Groups</span></Link>
                    </div>
                    <div className="item">
                        <Link to='/messages'><img src={messages} alt="" /></Link>
                        <Link to='/messages' style={{textDecoration: "none", color: "inherit"}}><span>Messages</span></Link>
                    </div>
                    <div className="item">
                        <Link to='/gallery'><img src={gallery} alt="" /></Link>
                        <Link to='/gallery' style={{textDecoration: "none", color: "inherit"}}><span>Gallery</span></Link>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    {/* <span className='other'>Others</span> */}
                    <div className="item">
                        <Link to='/watch'><img src={watch} alt="" /></Link>
                        <Link to='/watch' style={{textDecoration: "none", color: "inherit"}}><span>Watch</span></Link>
                    </div>
                    <div className="item">
                        <Link to='/marketplace'><img src={marketplace} alt="" /></Link>
                        <Link to='/marketplace' style={{textDecoration: "none", color: "inherit"}}><span>Marketplace</span></Link>  
                    </div>
                    <div className="item">
                        <Link to='/events'><img src={events} alt="" /></Link>
                        <Link to='/events' style={{textDecoration: "none", color: "inherit"}}><span>Events</span></Link>
                    </div>
                    <div className="item">
                        <Link to='/settings'><img src={settings} alt="" /></Link>
                        <Link to='/settings' style={{textDecoration: "none", color: "inherit"}}><span>Settings</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leftbar;
