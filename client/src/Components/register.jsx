import Axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";

const Register  = () =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [toHome, setToHome] = useState(false);

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(res => {
            if(res && !res.status){
                setToHome(true)
            }
        })
    }, [])

    const RegisterUser = e => {
        e.preventDefault();
        Axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`, {
            "name": username,
            "password": password,
            "email": email
        })
        .then(res => {
            const token = new Cookies();
            token.set('token', res.data.token, {path: "/", maxAge: 604800})
            setToHome(true)
        })
        .catch(err => {setErrorMessage(err.response.data); console.log(err.response)});
    }

    return(
        <div className="container">
            {toHome? <Redirect to = "/" />: null}
            <div className="row my-3">
                <div className="col-6 width-screen-signup pt-5">
                    <h1 className="pt-5">Join the Stack Overflow Community</h1>
                    <ul>
                        <li>Get unstuck — ask a question</li>
                        <li>Unlock new privileges like voting and commenting</li>
                        <li>Save your favorite tags, filters, and jobs</li>
                        <li>Earn reputation and badges</li>
                    </ul>
                </div>
                <div className="col-6 small-screen-signup">
                    <p className="register-title">Create your Stack Overflow account. It's free and only takes a minute.</p>
                </div>
                <div className="col-6">
                    <form className="box box-shadow m-3 white-background black-text" onSubmit = {RegisterUser}>
                        <div className="form-group">
                            <p className="red-text"><b>{errorMessage}</b></p>
                        </div>
                        <div className="form-group">
                            <p className="form-label">Display name:</p>
                            <input type="text" className="form-control" value={username} onChange = {({target: {value}}) => setUsername(value)} />
                        </div>
                        <div className="form-group">
                            <p className="form-label">Email:</p>
                            <input type="email" className="form-control" value={email} onChange = {({target: {value}}) => setEmail(value)} />
                        </div>
                        <div className="form-group">
                            <p className="form-label">Password:</p>
                            <input type="password" className="form-control" value={password} onChange = {({target: {value}}) => setPassword(value)} />
                        </div>
                        <div className="form-group">
                            <p>Already have an account? <Link to= "/login">Log in</Link></p>
                            <input type="submit" value="Register" className="form-control btn blue-background white-text"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;