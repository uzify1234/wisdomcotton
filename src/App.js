import logo from './logo.svg';
import React,{useState,useEffect} from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Leftmenu from './Leftmenu';
import Contract from './Contract';
import Editcontract from './Editcontract';
import Allcontracts from './Allcontracts';
import Editinvoice from './Editinvoice';
import Allinvoices from './Allinvoices';
import Allusers from './Allusers';
import Edituser from './Edituser';
import Reports from './Reports';
import Login from './Login';
import {createStore} from 'state-pool';

const store = createStore(); 
store.setState("financialyear", "2021");

function App() {

  const [financialyear, setFinancialyear, updateFinancialyear] = store.useState("financialyear");
  useEffect(() => {
    
    console.log("FY is "+financialyear);
  }, [])
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <Routes>
        <Route path="/" caseSensitive={false} element={
        <div className='holder'>
          <Login />
        </div>
        } />
        <Route path="/contracts" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Allcontracts />
        </div>
        } />
        <Route path="/reports" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Reports />
        </div>
        } />
        <Route path="/allinvoices" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Allinvoices />
        </div>
        } />
           <Route path="/allusers" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Allusers />
        </div>
        } />
        <Route path="/edituser/:userid" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Edituser />
        </div>
        } />
        <Route path="/addcontract" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Contract />
        </div>
        } />
        <Route path="/editcontract/:contractid" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Editcontract />
        </div>
        } />
        <Route path="/editinvoice/:invoiceid/:contractid" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Editinvoice />
        </div>
        } />
      </Routes>
    </Router>
      </header>
    </div>
  );
}

export default App;
