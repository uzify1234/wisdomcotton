import React , {useState} from 'react'
import './Login.css'
import Logo from './wisdomcottonlogo.jpeg';
import firebase from 'firebase';

import { useNavigate, useParams } from "react-router-dom";
import db from './Firebase';

function Login() {
    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const logintapped = () => {
        if(email == "" || password == "") {
            alert("Email or Password can not be blank");
        }
        else {
            firebase.auth().signInWithEmailAndPassword(email,password).then(user => {
                navigate('/contracts');
            }).catch(err => {
                alert("Login Failed , Please make sure email and password are correct");
            })
        }
    }
    return (
        <div className="login">
            <img src={Logo} width={200} height={200}/>
            <h4>LOGIN</h4>
            <input type="email" placeholder="Enter Email" onChange={e => setemail(e.target.value)} />
            <input type="password" placeholder="Enter Password" onChange={e => setpassword(e.target.value)} />
            <button onClick={logintapped}>Login</button>

        </div>
    )
}

export default Login
