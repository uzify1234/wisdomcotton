import React , {useState,useEffect} from 'react'
import './Edituser.css';
import './Allcontracts.css';
import firebase from 'firebase';

import { useNavigate, useParams } from "react-router-dom";
import db from './Firebase';
import Mobilesidebar from './Mobilesidebar';


function Edituser() {
    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [canaddcontract, setcanaddcontract] = useState(false);
    const [caneditcontract, setcaneditcontract] = useState(false);
    const [canaddeditinvoice, setcanaddeditinvoice] = useState(false);

    const [currentuser, setcurrentuser] = useState(null);
    
    const [additionaluserinfo, setadditionaluserinfo] = useState(null);

    const [role, setrole] = useState("Admin");

    var {userid} = useParams();


    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setcurrentuser(user);
                db.collection('users').doc(user.uid).get().then(addinfo => {
                    setadditionaluserinfo(addinfo.data());
                }).catch(err => {
                    
                })
            } else {
       
            }
          });
    }, []);

    useEffect(() => {
        if(userid !== "new") {
            db.collection('users').doc(userid).get().then(userinfo => {
                setemail(userinfo.data().email);
                setname(userinfo.data().name);
                setrole(userinfo.data().role);
            }).catch(err => {

            })
        }
    }, [])

    const addtapped = () => {
        if(name == "" || name == null || name == undefined) {
            alert("Enter Name");
        }
        else if(email == "" || email == null || email == undefined) {
            alert("Enter Email");
        }
        else if(role == "" || role == null || role == undefined) {
            alert("Enter Role");
        }
        else if(userid == "new") {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
                var user = userCredential.user;

                db.collection('users').doc(user.uid).set({
                    name : name,
                    email : email,
                    role : role,
                    createdon : Math.round((new Date()).getTime() / 1000)
                }).then(allhj => {
                    setcurrentuser(user);
                    alert("User Created");
                }).catch(ekk => {

                })
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
        }
        else {
            var rll = "";
            if(role.toLowerCase() == "admin") {
                rll = "admin";
            }
            else if(role.toLowerCase() == "data entry") {
                rll = "dataentry";
            }
            else {
                rll = role.toLowerCase();
            }
            db.collection('users').doc(userid).update({
                name : name,
                email : email,
                role : rll
            }).then(up => {
                alert("User Updated");
            }).catch(erf => {

            })
        }
    }

    return (
        <div className = 'allcontracts edituser'>
             {currentuser && <div>
                <div className="onlymobile">
                <Mobilesidebar />

            </div>
            <h4>{userid == "new" ? 'Add User' : 'Edit User'}</h4>
            <div className="allinputs">
                <div className='eachinputholder'>
                    <h5>Email</h5>
                    <input type='email' placeholder='Enter Email' defaultValue={email} onChange={(e) => setemail(e.target.value)} />
                </div>
                {userid == "new" && <div className='eachinputholder'>
                    <h5>Password</h5>
                    <input type='password' placeholder='Enter Password' onChange={(e) => setpassword(e.target.value)} />
                </div>}
                <div className='eachinputholder'>
                    <h5>Name</h5>
                    <input type='text' placeholder='Enter Name' defaultValue={name} onChange={(e) => setname(e.target.value)} />
                </div>
                <div className='eachinputholder'>
                    <h5>Role</h5>
                    <select onChange={(e => setrole(e.target.value))}>
                        <option selected={additionaluserinfo !== null && additionaluserinfo !== undefined && additionaluserinfo.role !== undefined && additionaluserinfo.role.toLowerCase() == "admin"}>Admin</option>
                        <option selected={additionaluserinfo !== null && additionaluserinfo !== undefined && additionaluserinfo.role !== undefined && (additionaluserinfo.role.toLowerCase() == "dataentry" || additionaluserinfo.role.toLowerCase() == "data entry")}>Data Entry</option>
                    </select>
                </div>
            </div>
            <button onClick={addtapped}>{userid == "new" ? 'Add User' : 'Edit User'}</button>
            </div>}
        </div>
    )
}

export default Edituser
