import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";
import { Link, Redirect } from "react-router-dom";
import getUserByToken from "../Lib/getUserByToken";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toHome, setToHome] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(res => {
            if(res && !res.status){
                setToHome(true)
            }
        })
    }, [])

    const LoginUser = e => {
        e.preventDefault();
        Axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, {
            "email": email,
            "password": password
        })
        .then(res => {
            const token = new Cookies();
            token.set('token', res.data.token, {path: "", maxAge: 604800})
            setToHome(true)
        })
        .catch(() => setErrorMessage("Something went wrong. Please try again."))
    }

    return(
        <div className="container">
            {toHome? <Redirect to = "/" />: null}
            <div className="my-5">
                <center><img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="Stackoverflow icon" className="login-img"/></center>
                <form className="login-form box box-shadow white-background black-text" onSubmit = {LoginUser}>
                    <div className="form-group">
                        <p className="red-text"><b>{errorMessage}</b></p>
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
                        <p>Don’t have an account? <Link to = "/register">Sign up</Link></p>
                        <input type="submit" value="Login" className="form-control btn blue-background white-text"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login