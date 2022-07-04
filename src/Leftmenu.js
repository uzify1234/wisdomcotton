import React, { useState , useEffect} from 'react'
import './Leftmenu.css'
import { useNavigate } from "react-router-dom";
import Logo from './wisdomcottonlogo.jpeg';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import firebase from 'firebase';
import db from './Firebase';


function Leftmenu() {
    const navigate = useNavigate();

    const [currentuser, setcurrentuser] = useState(null);

    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              setcurrentuser(user);
              // db.collection('users').doc(user.uid).get().then(addinfo => {
              //     setadditionaluserinfo(addinfo.data());
              // }).catch(err => {
                  
              // })
          } else {
     
          }
        });
  }, []);

    const logouttapped = () => {
        confirmAlert({
            title: '',
            message: 'Are you sure you want to Logout ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    firebase.auth().signOut().then(() => {
                        navigate('/');
                      }).catch((error) => {
                      });
                }
              },
              {
                label: 'No',
                onClick: () => {

                }
              }
            ]
          });
    }

    return (
        <div className='leftmenu'>
            {currentuser && <h3>{currentuser.email}</h3>}
            <img src={Logo} />
            <h4 onClick={() => {navigate('/contracts')}}>Contract</h4>
            <h4 onClick={() => {navigate('/allinvoices')}}>Invoices</h4>
            <h4 onClick={() => {navigate('/allusers')}}>Users</h4>
            <h4 onClick={() => {navigate('/reports')}}>Reports</h4>
            <h4 onClick={logouttapped}>Logout</h4>



        </div>
    )
}

export default Leftmenu
