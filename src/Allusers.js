import React,{useState,useEffect} from 'react'
import './Allcontracts.css';
import db from './Firebase';
import { useNavigate } from "react-router-dom";
import firebase from 'firebase';
import Mobilesidebar from './Mobilesidebar';

function Allusers() {


    const navigate = useNavigate();

    const [allusers, setallusers] = useState([]);
    const [allfilteredusers, setallfilteredusers] = useState([]);

    useEffect(() => {
        var tmp = [];
    db.collection('users').orderBy('createdon','desc').get().then(allconts => {
        allconts.docs.map(cont => {
            if(cont.data().role == "superadmin" || cont.data().role == "super admin" || cont.data().role == "Super Admin") {}else {
            var x = {id : cont.id,data : cont.data()};
            tmp.push(x);
            }
          
        })
        setallfilteredusers(tmp);
        setallusers(tmp);
    })
    }, [])

    const searchchanged = (e) => {
        
        var type = (e.target.value.toLowerCase());
        console.log(type);
        var temp = [];
         temp = allusers.filter(eh => {
            if(eh != undefined && eh.data != undefined) {
            return eh.data.email.toLowerCase().includes(type) || eh.data.name.toLowerCase().includes(type) || eh.data.role.toLowerCase().includes(type)
            }
        })
        setallfilteredusers(temp);
        if(type == "" || type == " "){
            setallfilteredusers(allusers);
        }
    }

    const [currentuser, setcurrentuser] = useState(null);
    const [additionaluserinfo, setadditionaluserinfo] = useState(null);

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

    return (
        <div className='allcontracts allusers'>
             {currentuser && <div>
            <div className="onlymobile">
                <Mobilesidebar />

            </div>
            <div className="upperview">

                <div>

                    <h4>All Users</h4>
                    {additionaluserinfo !== null && additionaluserinfo !== undefined && additionaluserinfo.role !== undefined && (additionaluserinfo.role.toLowerCase() == "admin" || additionaluserinfo.role.toLowerCase() == "superadmin") && <button onClick={() => { navigate('/edituser/new')}}>Add New User</button>}
                </div>
                
                <input type='text' placeholder='Serach Here' onChange={searchchanged}/>
            </div>
            
            <div className='lowerview'>
                {
                    allfilteredusers.map(eachuser => {
                        return(
                            <div className='contline' onClick={() => { navigate(`/edituser/${eachuser.id}`)}}>
                                <div className='subline'><h5>Name</h5><h4>{eachuser.data.name}</h4></div>

                                <div className='subline'><h5>Email</h5><h4>{eachuser.data.email}</h4></div>
                                <div className='subline'><h5>Role</h5><h4>{eachuser.data.role}</h4></div>
                                {/* <div className='subline'><h5>Can Edit Contract</h5><h4>{eachuser.data.caneditcontract}</h4></div>
                                <div className='subline'><h5>Can Add/Edit Invoice</h5><h4>{eachuser.data.canaddeditinvoice}</h4></div> */}
                                 <div className='subline'><h5>Created On</h5><h4>{new Date(eachuser.data.createdon * 1000).toLocaleString()}</h4></div>
                            </div>
                        )
                    })
                }
            </div>
            
            </div>}
        </div>
    )
}

export default Allusers
