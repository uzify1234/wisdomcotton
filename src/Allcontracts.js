import React,{useState,useEffect} from 'react'
import './Allcontracts.css';
import db from './Firebase';
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import firebase from 'firebase';
import Mobilesidebar from './Mobilesidebar';



function Allcontracts() {
    const navigate = useNavigate();

    const [financialyear, setfinancialyear] = useState(null);
    const [allcontracts, setallcontracts] = useState([]);
    const [allfilteredcontracts, setallfilteredcontracts] = useState([]);
    const [allsearchedcontracts, setallsearchedcontracts] = useState([]);

    const [allbuyersname, setallbuyersname] = useState([]);
    const [allsellersname, setallsellersname] = useState([]);
    const [allbuyersagent, setallbuyersagent] = useState([]);
    const [allsellersagent, setallsellersagent] = useState([]);
    const [allitems, setallitems] = useState([]);
    const [allroadsea, setallroadsea] = useState([]);


    const [selectedbuyersname, setselectedbuyersname] = useState([]);
    const [selectedbuyersagent, setselectedbuyersagent] = useState([]);
    const [selecteditem, setselecteditem] = useState([]);
    const [selectedsellername, setselectedsellername] = useState([]);
    const [selectedselleragent, setselectedselleragent] = useState([]);
    const [selectedroadsea, setselectedroadsea] = useState([]);

    const [filterdataloaded, setfilterdataloaded] = useState(false);

    const [issearchmodeactive, setissearchmodeactive] = useState(false);


    const [currentuser, setcurrentuser] = useState(null);
    const [additionaluserinfo, setadditionaluserinfo] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setcurrentuser(user);
                db.collection('users').doc(user.uid).get().then(addinfo => {
                    setadditionaluserinfo(addinfo.data());
                    if(addinfo.data().financialyear) {
                     setfinancialyear(addinfo.data().financialyear);
                    }
                    else {
                        setfinancialyear("2021");
                    }
                }).catch(err => {
                    
                })
            } else {
       
            }
          });
    }, []);


    useEffect(() => {
        var tmp = [];
        db.collection('buyersnamelist').get().then(alldata => {
            var tmp = [];
            alldata.docs.map(eachdata => {
             tmp.push(eachdata.id);
         


            })
            setallbuyersname(tmp);
            console.log(tmp);
            db.collection('sellersnamelist').get().then(alldata => {
                var tmp = [];
                alldata.docs.map(eachdata => {
                 tmp.push(eachdata.id);
                })
                setallsellersname(tmp);
                db.collection('itemlist').get().then(alldata => {
                    var tmp = [];
                    alldata.docs.map(eachdata => {
                     tmp.push(eachdata.id);
                    })
                    setallitems(tmp);
                    db.collection('roadsealist').get().then(alldata => {
                        var tmp = [];
                        alldata.docs.map(eachdata => {
                         tmp.push(eachdata.id);
                        })
                        setallroadsea(tmp);
                        db.collection('buyersagentlist').get().then(alldata => {
                            var tmp = [];
                            alldata.docs.map(eachdata => {
                             tmp.push(eachdata.id);
                            })
                            setallbuyersagent(tmp);
                            db.collection('sellersagentlist').get().then(alldata => {
                                var tmp = [];
                                alldata.docs.map(eachdata => {
                                 tmp.push(eachdata.id);
                                })
                                setallsellersagent(tmp);
                                setfilterdataloaded(true);
                            })
                        })
                    })
                    
                })
            })
        })

        // getmedata(financialyear);

    }, [])


    useEffect(() => {
        getmedata(financialyear);
    }, [financialyear])

    const getmedata = async (fy) => {
        var tmp = [];
        if(financialyear === null) {
            return;
        }

        await db.collection('contracts').orderBy('createdon','desc').where('financialyear','==',fy).get().then(async allconts => {
            if(allconts.size === 0) {
                setallfilteredcontracts([]);
                setallsearchedcontracts([]);
                setallcontracts([]);
            }
             await allconts.docs.map(async cont => {
                await db.collection('contracts').doc(cont.id).collection('invoices').get().then(async allinv => {
                        var count = 0;
                        await allinv.docs.map(invv => {
                            count = count + Number(invv.data().invoicemts);
                        })                
                        var x = {id : cont.id,data : cont.data()};
                        x.data.pendingmts = (Number(x.data.lcmts) - count).toFixed(2);
                        await tmp.push(x);
                        if(tmp.length === allconts.size) {
                        setallfilteredcontracts(tmp);
                        setallsearchedcontracts(tmp);
                        setallcontracts(tmp);
                        console.log(tmp);
                        }
                })
            })
        })


    }

    const setfinancialyearandproceed = (e) => {
        setfinancialyear(e);
        db.collection('users').doc(currentuser.uid).update({
            'financialyear' : e
        });
    }

    const searchchanged = (e) => {
        
        var type = (e.target.value.toLowerCase());
        console.log(type);
        var temp = [];
         temp = allfilteredcontracts.filter(eh => {
             console.log(eh);
            if(eh != undefined && eh.data != undefined) {
            return (eh.data.buyername !== undefined && eh.data.buyername !== null && eh.data.buyername.toLowerCase().includes(type)) || 
            (eh.data.buyeragent !== undefined && eh.data.buyeragent !== null && eh.data.buyeragent.toLowerCase().includes(type)) || 
            (eh.data.sellername !== undefined  && eh.data.sellername !== null  && eh.data.sellername.toLowerCase().includes(type)) || 
            (eh.data.selleragent !== undefined && eh.data.selleragent !== null && eh.data.selleragent.toLowerCase().includes(type)) || 
            (eh.data.contracteddate !== undefined && eh.data.contracteddate !== null && eh.data.contracteddate.toLowerCase().includes(type)) || 
            (eh.id !== undefined && eh.id !== null && eh.id.toLowerCase().includes(type)) || 
            (eh.data.quality !== undefined && eh.data.quality !== null && eh.data.quality.toLowerCase().includes(type)) || 
            (eh.data.item !== undefined && eh.data.item !== null && eh.data.item.toLowerCase().includes(type)) || 
            (eh.data.otherquality !== undefined && eh.data.otherquality !== null && eh.data.otherquality.toLowerCase().includes(type)) || 
            (eh.data.otheritem !== undefined && eh.data.otheritem !== null && eh.data.otheritem.toLowerCase().includes(type))
            }
        })
        setallsearchedcontracts(temp);
        setissearchmodeactive(true);
        if(type == "" || type == " "){
            setallsearchedcontracts(allfilteredcontracts);
            setissearchmodeactive(false);
        }
    }

    const customStyles = {
        content: {
            top: '15vh',
            left: '18vw',
            width : '76vw',
            right: 'auto',
            height : '70vh',
            border : '2px solid black',
            borderRadius : '5px'
       },
        subtitle : {
            color : 'black'
        },
      };

      const customStylesmobile = {
        content: {
            top: '25vh',
            left: '0vw',
            width : '100vw',
            right: 'auto',
            height : '70vh',
            border : '2px solid black',
            borderRadius : '5px',
            zIndex : 1020,
            backgroundColor : 'white'
        },
        subtitle : {
            color : 'black'
        },
      };
      
      // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    //   Modal.setAppElement('#yourAppElement');
      
        let subtitle;
        const [modalIsOpen, setIsOpen] = React.useState(false);
      
        function openModal() {
          setIsOpen(true);
        }
      
        function afterOpenModal() {
          // references are now sync'd and can be accessed.
          subtitle.style.color = '#f00';
        }
      
        function closeModal() {
          setIsOpen(false);
        }

        let subtitlemobile;
        const [modalIsOpenmobile, setIsOpenmobile] = React.useState(false);
      
        function openModalmobile() {
          setIsOpenmobile(true);
        }
      
        function afterOpenModalmobile() {
          // references are now sync'd and can be accessed.
          subtitlemobile.style.color = '#f00';
        }
      
        function closeModalmobile() {
          setIsOpenmobile(false);
        }

        const checkboxtapped = (val,cat) => {
 
            if(cat == "buyersname") {
                var check = selectedbuyersname.filter(ef => ef == val);
                if(check.length > 0) { 
                    setselectedbuyersname(selectedbuyersname.filter(function(person) { 
                        return person !== val
                    }));
                }
                else {
                    var copy = selectedbuyersname;
                    copy.push(val);
                    setselectedbuyersname(copy);
                }
            }
            if(cat == "buyersagent") {
                var check = selectedbuyersagent.filter(ef => ef == val);
                if(check.length > 0) { 
                    setselectedbuyersagent(selectedbuyersagent.filter(function(person) { 
                        return person !== val
                    }));
                }
                else {
                    var copy = selectedbuyersagent;
                    copy.push(val);
                    setselectedbuyersagent(copy);
                }
            }
            if(cat == "sellersname") {
                var check = selectedsellername.filter(ef => ef == val);
                if(check.length > 0) { 
                    setselectedsellername(selectedsellername.filter(function(person) { 
                        return person !== val
                    }));
                }
                else {
                    var copy = selectedsellername;
                    copy.push(val);
                    setselectedsellername(copy);
                }
            }
            if(cat == "sellersagent") {
                var check = selectedselleragent.filter(ef => ef == val);
                if(check.length > 0) { 
                    setselectedselleragent(selectedselleragent.filter(function(person) { 
                        return person !== val
                    }));
                }
                else {
                    var copy = selectedselleragent;
                    copy.push(val);
                    setselectedselleragent(copy);
                }
            }
            if(cat == "item") {
                var check = selecteditem.filter(ef => ef == val);
                if(check.length > 0) { 
                    setselecteditem(selecteditem.filter(function(person) { 
                        return person !== val
                    }));
                }
                else {
                    var copy = selecteditem;
                    copy.push(val);
                    setselecteditem(copy);
                }
            }
            if(cat == "roadsea") {
                var check = selectedroadsea.filter(ef => ef == val);
                if(check.length > 0) { 
                    setselectedroadsea(selectedroadsea.filter(function(person) { 
                        return person !== val
                    }));
                }
                else {
                    var copy = selectedroadsea;
                    copy.push(val);
                    setselectedroadsea(copy);
                }
            }
        }

        const applyfiltertapped = (e) => {
            console.log("Search Mode");
            console.log(issearchmodeactive);

            console.log(allfilteredcontracts);
            

            var wholeandsole = [];
            
            !issearchmodeactive && allcontracts.map(eachcontract => {
                console.log(eachcontract.data.buyername);
                var bc1 = selectedbuyersname.filter(eachk => eachk.toLowerCase() == eachcontract.data.buyername.toLowerCase());  
                var bc2 = selectedsellername.filter(eachk => eachk.toLowerCase()  == eachcontract.data.sellername.toLowerCase() );  
                var bc3 = selecteditem.filter(eachk => eachk.toLowerCase()  == eachcontract.data.item.toLowerCase() );  
                var bc4 = selectedroadsea.filter(eachk => eachk.toLowerCase()  == eachcontract.data.roadsea.toLowerCase() );  
                var bc5 = selectedbuyersagent.filter(eachk => eachk.toLowerCase() == eachcontract.data.buyeragent.toLowerCase());  
                var bc6 = selectedselleragent.filter(eachk => eachk.toLowerCase()  == eachcontract.data.selleragent.toLowerCase() );  

                if(bc1.length > 0 || bc2.length > 0 || bc3.length > 0 || bc4.length > 0 || bc5.length > 0 || bc6.length > 0) {
                    wholeandsole.push(eachcontract);
                }

            })

            issearchmodeactive && allsearchedcontracts.map(eachcontract => {
                console.log(eachcontract.data.buyername);
                var bc1 = selectedbuyersname.filter(eachk => eachk.toLowerCase() == eachcontract.data.buyername.toLowerCase());  
                var bc2 = selectedsellername.filter(eachk => eachk.toLowerCase()  == eachcontract.data.sellername.toLowerCase() );  
                var bc3 = selecteditem.filter(eachk => eachk.toLowerCase()  == eachcontract.data.item.toLowerCase() );  
                var bc4 = selectedroadsea.filter(eachk => eachk.toLowerCase()  == eachcontract.data.roadsea.toLowerCase() );  
                var bc5 = selectedbuyersagent.filter(eachk => eachk.toLowerCase() == eachcontract.data.buyeragent.toLowerCase());  
                var bc6 = selectedselleragent.filter(eachk => eachk.toLowerCase()  == eachcontract.data.selleragent.toLowerCase() );

                if(bc1.length > 0 || bc2.length > 0 || bc3.length > 0 || bc4.length > 0|| bc5.length > 0 || bc6.length > 0) {
                    wholeandsole.push(eachcontract);
                }

            })
            !issearchmodeactive && setallfilteredcontracts(wholeandsole);
            setallsearchedcontracts(wholeandsole);
            setIsOpen(false);
        }

        const clearfiltertapped = () => {
            setselectedbuyersname([]);
            setselectedsellername([]);
            setselecteditem([]);
            setselectedroadsea([]);
            setallfilteredcontracts(allcontracts);
            setallsearchedcontracts(allcontracts);
            setIsOpen(false);
        }



    return (
        <div className='allcontracts'>
            {currentuser && <div>
                <div className="onlymobile">
                <Mobilesidebar />

            </div>
            <div className="upperview">
                <div>
                    <h4>All Contracts</h4>
                  {additionaluserinfo !== null && additionaluserinfo !== undefined && additionaluserinfo.role !== undefined && (additionaluserinfo.role.toLowerCase() == "admin" || additionaluserinfo.role.toLowerCase() == "superadmin") && <button onClick={() => { navigate('/addcontract')}}>Add New Contract</button>}
                    <button className = "onlydesktop" onClick={() => { setIsOpen(true)}}>Filter Contract</button>
                    <button className = "onlymobile" onClick={() => { setIsOpenmobile(true)}}>Filter Contract</button>

                </div>

                <div className="extra">
                        <h4>Financial Year</h4>
                        <select style={{padding : 10}} onChange={e =>{setfinancialyearandproceed(e.target.value);}}>
                            <option selected={financialyear === "2021"} value="2021">2021-2022</option>
                            <option selected={financialyear === "2022"} value="2022">2022-2023</option>
                            <option selected={financialyear === "2023"} value="2023">2023-2024</option>
                        </select>
                    </div>


                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Filter Contracts"
                    
                >
                    <div style={{display : 'flex',flexDirection : 'row',justifyContent : 'space-between',alignItems :'center'}}>
                    <h2 style={{color : 'black'}}>Filter Contracts</h2>
                        <div>
                        <button  onClick={applyfiltertapped} style={{border : 'none',padding : '10px',fontWeight : 'bolder',marginLeft : '10px',marginBottom : '5px'}}>Apply Filter</button>

                        <button  onClick={clearfiltertapped} style={{border : 'none',padding : '10px',fontWeight : 'bolder',marginLeft : '10px',marginBottom : '5px'}}>Clear Filter</button>

                        <button onClick={closeModal} style={{border : 'none',padding : '10px',fontWeight : 'bolder',marginLeft : '10px',marginBottom : '5px'}}>Close</button>
                        </div>
                    </div>
                    {filterdataloaded && <div className="whole" style={{display : 'flex',flexDirection : 'row' , justifyContent : 'space-between'}}>
                        <div className="inner">
                            <h4>Buyers Name</h4>
                            {
                                allbuyersname.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' value={eachdata} defaultChecked={selectedbuyersname.filter((erf) => erf == eachdata).length > 0} onChange={(e) => checkboxtapped(e.target.value,'buyersname')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Sellers Name</h4>
                            {
                                allsellersname.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' value={eachdata} defaultChecked={selectedsellername.filter((erf) => erf == eachdata).length > 0} onChange={(e) => checkboxtapped(e.target.value,'sellersname')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Buyers Agent</h4>
                            {
                                allbuyersagent.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' value={eachdata} defaultChecked={selectedbuyersagent.filter((erf) => erf == eachdata).length > 0} onChange={(e) => checkboxtapped(e.target.value,'buyersagent')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Sellers Agent</h4>
                            {
                                allsellersagent.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' value={eachdata} defaultChecked={selectedselleragent.filter((erf) => erf == eachdata).length > 0} onChange={(e) => checkboxtapped(e.target.value,'sellersagent')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Item</h4>
                            {
                                allitems.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' value={eachdata} defaultChecked={selecteditem.filter((erf) => erf == eachdata).length > 0} onChange={(e) => checkboxtapped(e.target.value,'item')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Road/Sea</h4>
                            {
                                allroadsea.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' value={eachdata} defaultChecked={selectedroadsea.filter((erf) => erf == eachdata).length > 0} onChange={(e) => checkboxtapped(e.target.value,'roadsea')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                    </div>}
        
                </Modal>


            
                <Modal
                    isOpen={modalIsOpenmobile}
                    onRequestClose={closeModalmobile}
                    style={customStylesmobile}
                    contentLabel="Filter Contracts"
                    
                >
                    <div style={{display : 'flex',flexDirection : 'row',justifyContent : 'space-between',alignItems :'center'}}>
                    <h2 style={{color : 'black'}}>Filter Contracts</h2>
                        <div>
                        <button  onClick={applyfiltertapped} style={{border : 'none',padding : '20px',fontWeight : 'bolder',marginLeft : '10px',marginBottom : '5px'}}>Apply Filter</button>

                        <button  onClick={clearfiltertapped} style={{border : 'none',padding : '20px',fontWeight : 'bolder',marginLeft : '10px',marginBottom : '5px'}}>Clear Filter</button>

                        <button onClick={closeModal} style={{border : 'none',padding : '20px',fontWeight : 'bolder',marginLeft : '10px',marginBottom : '5px'}}>Close</button>
                        </div>
                    </div>
                    {filterdataloaded && <div className="whole" style={{display : 'flex',flexDirection : 'row' , justifyContent : 'space-between'}}>
                        <div className="inner">
                            <h4>Buyers Name</h4>
                            {
                                allbuyersname.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'buyersname')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Sellers Name</h4>
                            {
                                allsellersname.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'sellersname')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Item</h4>
                            {
                                allitems.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'item')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Road/Sea</h4>
                            {
                                allroadsea.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'roadsea')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                    </div>}
        
                </Modal>
                
                <input type='text' placeholder='Search Here' onChange={searchchanged}/>
            </div>
            
            <div className='lowerview'>
                <div className='contline specialline'>
                                <div className='subline'><h5>Contract Date</h5></div>

                                <div className='subline'><h5>WCCN</h5></div>
                                <div className='subline'><h5>Buyer Name</h5></div>
                                <div className='subline'><h5>Seller Name</h5></div>
                                <div className='subline'><h5>Item</h5></div>
 
                                 <div className='subline'><h5>Road/Sea</h5></div>
                                 <div className='subline'><h5>Rate</h5></div>
                                 <div className='subline'><h5>LC Mts</h5></div>
                                 <div className='subline'><h5>LC Number</h5></div>
                                 <div className='subline'><h5>Pending Mts</h5></div>
                                 <div className='subline'><h5>PI Number</h5></div>

                            </div>
                <div className='alldata'>
                {
                     allsearchedcontracts.map(eachcontract => {
                        return(
                            <div className='contline' onClick={() => { navigate(`/editcontract/${eachcontract.id}`)}}>
                                <div className='subline'><h4>{eachcontract.data.contracteddate}</h4></div>

                                <div className='subline'><h4>{eachcontract.id.split("-")[0]}</h4></div>
                                <div className='subline'><h4>{eachcontract.data.buyername}</h4></div>
                                <div className='subline'><h4>{eachcontract.data.sellername}</h4></div>
                                <div className='subline'><h4>{eachcontract.data.item}</h4></div>
 
                                 <div className='subline'><h4>{eachcontract.data.roadsea}</h4></div>
                                 <div className='subline'><h4>{eachcontract.data.rate}</h4></div>
                                 <div className='subline'><h4>{eachcontract.data.lcmts}</h4></div>
                                 <div className='subline'><h4>{eachcontract.data.lcnumber}</h4></div>
                                 <div className='subline'><h4>{eachcontract.data.pendingmts}</h4></div>
                                 <div className='subline'><h4>{eachcontract.data.pinumber}</h4></div>

                            </div>
                        )
                    })
                }
                </div>
           
            </div> 
            
            </div>}
        </div>
    )
}

export default Allcontracts
