import  { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
    const [inputs, setInputs] = useState({
        fname: "",
        lname: "",
        email: "",
        number: "",
        dob: "",
        password: "",
        // gender: "",
    });

    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try{
            await axios.post("http://localhost:8800/api/auth/register", inputs);
        }catch(err){
            setErr(err.response.data);
        }
    }

    console.log(err);

    // console.log(inputs);

    return (
        <div className="register">
            <div className="card">
                <div className="form">
                    <h1>Register</h1>
                    <form action="">
                        <div className="name">
                            <input type="text" id="fname" name="fname" placeholder="First Name" onChange={handleChange} required/>
                            <input type="text" id="lname" name="lname" placeholder="Last Name" onChange={handleChange} required/>
                        </div>
                        <div className="contact">
                            <input type="email" id="email" name="email" placeholder="Email" onChange={handleChange} required/>
                            <input type="tel" id="number" name="number" placeholder="Phone Number" onChange={handleChange} required/>
                        </div>
                        <div className="dobPsw">
                            <input type="date" id="dob" name="dob" placeholder="Date of Birth" onChange={handleChange} required/>
                            <input type="password" id="password" name="password" placeholder="Password" minlength="8" maxlength="25" onChange={handleChange} required/>
                        </div>
                        {/* <div className="gender">
                            <div className="male">
                                <label for="male">Male</label>
                                <input type="radio" id="male" name="gender"  onChange={handleChange} />
                            </div>
                            <div className="female">
                                <label for="female">Female</label>
                                <input type="radio" id="female" name="gender"  onChange={handleChange} />
                            </div>
                        </div> */}

                        {err && err}
                        <div className="button">
                            <button onClick={handleClick}>Register</button>
                            <Link to="/login">
                                <button type="submit">Login</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
