import React,{useState} from 'react'
import Sidebar from "react-sidebar";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import firebase from 'firebase';
import { useNavigate, useParams } from "react-router-dom";
import Logo from './wisdomcottonlogo.jpeg';
import './Mobilesidebar.css';
import Sidebaricon from './bars-solid.png';

function Mobilesidebar() {
    const navigate = useNavigate();

    const [sidebaropen, setsidebaropen] = useState(false);

    const onSetSidebarOpen = (open) => {
        setsidebaropen(open);
      }

      const logouttapped = () => {
        confirmAlert({
            title: '',
            message: 'Are you sure to want to Logout ?',
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

    const clickedbar = () => {
        setsidebaropen(!sidebaropen);
    }

    return (
        <div className='mobilesidebar'>
                                <img onClick={clickedbar} src={Sidebaricon} className='bars'/>

                {sidebaropen && <div className='actual'>
                <img onClick={clickedbar} src={Sidebaricon} className='bars'/>

                    <img src={Logo} />
                        <h4 onClick={() => {navigate('/contracts')}}>Contract</h4>
                        <h4 onClick={() => {navigate('/allinvoices')}}>Invoices</h4>
                        <h4 onClick={() => {navigate('/allusers')}}>Users</h4>
                        <h4 onClick={() => {navigate('/reports')}}>Reports</h4>
                        <h4 onClick={logouttapped}>Logout</h4>
                </div>}

                {/* <Sidebar
                    sidebar={<div>
           
                    </div>}
                    open={sidebaropen}
                    onSetOpen={setsidebaropen}
                    styles={{ sidebar: { background: "white" ,height : '100vh',fontSize : '0.5rem',zIndex : 1010} }}
                >
                </Sidebar> */}
        </div>
    )
}

export default Mobilesidebar
