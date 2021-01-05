import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const Logout = () => {
    const [toHome, setToHome] = useState(false)
    useEffect(() => {
        const token = new Cookies();
        token.remove('token');
        setToHome(true)
    }, [])
    return(
        <div>
            {toHome?<Redirect to = "/" />:null}
        </div>
    )
}

export default Logout;