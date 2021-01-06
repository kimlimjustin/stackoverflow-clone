import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import getUserByToken from '../Lib/getUserByToken';
import { Link } from "react-router-dom";

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [firstRender, setFirstRender] = useState(true)

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(result => {
            if(result) setUserInfo(result)
            if(firstRender) setFirstRender(false)
        })
    }, [firstRender])

    useEffect(() => console.log(userInfo), [userInfo])

    return(
        <div className="container">
            {!userInfo && !firstRender?
            <div className="mt-5 intro-pg pt-5">
                <h1 className="intro-title">We &lt;3 people who code</h1>
                <p className="mt-3 intro-text">We build products that empower developers and connect them to solutions that enable productivity, growth, and discovery.</p>
                <Link to = "/login" className="btn btn-dark mr-2">Log in</Link>
                <Link to = "/register" className="btn btn-light ml-2">Sign up</Link>
            </div>
        :null}
        </div>
    )
}

export default Home;