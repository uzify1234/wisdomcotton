import React,{useState,useEffect} from 'react'
import './Allinvoices.css';
import db from './Firebase';
import { resolvePath, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import firebase from 'firebase';
import Mobilesidebar from './Mobilesidebar';


function Allinvoices() {
    const navigate = useNavigate();
    const [financialyear, setfinancialyear] = useState(null);

    const [allinvoices, setallinvoices] = useState([]);
    const [allfilteredinvoices, setallfilteredinvoices] = useState([]);
    const [allsearchedinvoices, setallsearchedinvoices] = useState([]);

    const [dataloaded, setdataloaded] = useState(false);


    const [allbuyersname, setallbuyersname] = useState([]);
    const [allsellersname, setallsellersname] = useState([]);
    const [allitems, setallitems] = useState([]);
    const [allroadsea, setallroadsea] = useState([]);


    const [selectedbuyersname, setselectedbuyersname] = useState([]);
    const [selecteditem, setselecteditem] = useState([]);
    const [selectedsellername, setselectedsellername] = useState([]);
    const [selectedroadsea, setselectedroadsea] = useState([]);

    const [filterdataloaded, setfilterdataloaded] = useState(false);
    const [issearchmodeactive, setissearchmodeactive] = useState(false);

    const [additionaluserinfo, setadditionaluserinfo] = useState(null);


    const [currentuser, setcurrentuser] = useState(null);

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
                        setfilterdataloaded(true);
                    })
                })
            })
        })
        getmedata();

    }, [])

    useEffect(() => {
         getmedata();

        // var copy = allinvoices.filter(ekj => ekj.contractdata.financialyear == financialyear);
        // setallsearchedinvoices(copy);
        
    }, [financialyear]);

    const setfinancialyearandproceed = (e) => {
        setfinancialyear(e);
        db.collection('users').doc(currentuser.uid).update({
            'financialyear' : e
        });
    }

    const getmedata = async () => {

        setdataloaded(false);
        await db.collection('contracts').orderBy('createdon','desc').get().then(async allconts => {
            var holder = [];
                setallinvoices([]);
                setallfilteredinvoices([]);
                setallsearchedinvoices([]);
            
            await allconts.docs.map(async cont => {
                    await db.collection('contracts').doc(cont.id).collection('invoices').get().then(async allinvv => {
                        var tmp = [];
                        console.log(allinvv.docs);
                        await allinvv.docs.map(async eachinvv => {
                            var x = {contractid : cont.id,contractdata : cont.data(),invoiceid : eachinvv.id,invoicedata :eachinvv.data()};
                            if(cont.data().financialyear === financialyear) {
                            tmp.push(x);
                            holder.push(x);
                            setallinvoices(holder);
                            setallfilteredinvoices(holder);
                            setallsearchedinvoices(holder);
                            }
                        })
                        if(tmp.length === allinvv.size) {
                            // setallinvoices(holder);
                            // setallfilteredinvoices(holder);
                            // setallsearchedinvoices(holder);
                            setdataloaded(true);
                            console.log("Holder");
                            console.log(holder);
                        }

                    }).catch(eer=>{
                    })              
            })
        })
    }

    const searchchanged = (e) => {
        
        var type = (e.target.value.toLowerCase());
        console.log(allfilteredinvoices);
        var temp = [];
         temp = allfilteredinvoices.filter(eh => {
             console.log("|",eh.contractdata.sellername.toLowerCase(),"|");
             console.log("|",type,"|");

            if(eh != undefined && eh.contractdata != undefined) {

 
            return (eh.contractdata.buyername !== undefined && eh.contractdata.buyername !== null && eh.contractdata.buyername.toLowerCase().includes(type)) || 
            (eh.contractdata.buyeragent !== undefined && eh.contractdata.buyeragent !== null && eh.contractdata.buyeragent.toLowerCase().includes(type)) || 
            (eh.contractdata.sellername !== undefined && eh.contractdata.sellername !== null && eh.contractdata.sellername.toLowerCase().includes(type)) || 
            (eh.contractdata.selleragent !== undefined && eh.contractdata.selleragent !== null && eh.contractdata.selleragent.toLowerCase().includes(type)) || 
            (eh.contractdata.contracteddate !== undefined && eh.contractdata.contracteddate !== null && eh.contractdata.contracteddate.toLowerCase().includes(type)) || 
            (eh.id !== undefined && eh.id !== null && eh.id.toLowerCase().includes(type)) || 
            (eh.contractdata.quality !== undefined && eh.contractdata.quality !== null && eh.contractdata.quality.toLowerCase().includes(type)) || 
            (eh.contractdata.item !== undefined && eh.contractdata.item !== null && eh.contractdata.item.toLowerCase().includes(type)) || 
            (eh.contractdata.otherquality !== undefined && eh.contractdata.otherquality !== null && eh.contractdata.otherquality.toLowerCase().includes(type)) || 
            (eh.contractdata.otheritem !== undefined && eh.contractdata.otheritem !== null && eh.contractdata.otheritem.toLowerCase().includes(type))
            }
        })
        setallsearchedinvoices(temp);
        setissearchmodeactive(true);
        
        console.log(temp);
        if(type == "" || type == " "){
            if(selectedbuyersname.length > 0 || selectedsellername.length > 0 || selecteditem.length > 0 || selectedroadsea.length > 0) { }
            else {
                setallsearchedinvoices(allfilteredinvoices);
            }

            setissearchmodeactive(false);
        }
    }


    const customStyles = {
        content: {
            top: '130px',
            left: '18vw',
            width : '76vw',
            right: 'auto',
            height : '70vh',
            border : '2px solid black',
            borderRadius : '5px',
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
            

            

            var wholeandsole = [];
            
            !issearchmodeactive && allinvoices.map(eachcontract => {
                console.log(eachcontract.contractdata.buyername);
                var bc1 = selectedbuyersname.filter(eachk => eachk.toLowerCase() == eachcontract.contractdata.buyername.toLowerCase());  
                var bc2 = selectedsellername.filter(eachk => eachk.toLowerCase()  == eachcontract.contractdata.sellername.toLowerCase() );  
                var bc3 = selecteditem.filter(eachk => eachk.toLowerCase()  == eachcontract.contractdata.item.toLowerCase() );  
                var bc4 = selectedroadsea.filter(eachk => eachk.toLowerCase()  == eachcontract.contractdata.roadsea.toLowerCase() );  
                console.log("Length 1 ",bc1);
                console.log("Length 2 ",bc2);
                console.log("Length 3 ",bc3);
                console.log("Length 4 ",bc4);
                if(bc1.length > 0 || bc2.length > 0 || bc3.length > 0 || bc4.length > 0) {
                    wholeandsole.push(eachcontract);
                }

            })

            issearchmodeactive && allsearchedinvoices.map(eachcontract => {
                console.log(eachcontract.contractdata.buyername);
                var bc1 = selectedbuyersname.filter(eachk => eachk.toLowerCase() == eachcontract.contractdata.buyername.toLowerCase());  
                var bc2 = selectedsellername.filter(eachk => eachk.toLowerCase()  == eachcontract.contractdata.sellername.toLowerCase() );  
                var bc3 = selecteditem.filter(eachk => eachk.toLowerCase()  == eachcontract.contractdata.item.toLowerCase() );  
                var bc4 = selectedroadsea.filter(eachk => eachk.toLowerCase()  == eachcontract.contractdata.roadsea.toLowerCase() );  
                console.log("Length 1 ",bc1);
                console.log("Length 2 ",bc2);
                console.log("Length 3 ",bc3);
                console.log("Length 4 ",bc4);
                if(bc1.length > 0 || bc2.length > 0 || bc3.length > 0 || bc4.length > 0) {
                    wholeandsole.push(eachcontract);
                }

            })
            !issearchmodeactive && setallfilteredinvoices(wholeandsole);
            setallsearchedinvoices(wholeandsole);
            setIsOpen(false);
        }

        const clearfiltertapped = () => {
            setselectedbuyersname([]);
            setselectedsellername([]);
            setselecteditem([]);
            setselectedroadsea([]);
            setallfilteredinvoices(allinvoices);
            setallsearchedinvoices(allinvoices);
            setIsOpen(false);
        }


    return (
        <div className='allinvoices'>
             {currentuser && <div>
                <div className="onlymobile">
                <Mobilesidebar />

            </div>
            <div className="upperview">
                <div>
                    <h4>All Invoices</h4>
                    <button className = "onlydesktop" onClick={() => { setIsOpen(true)}}>Filter Invoices</button>
                    <button className = "onlymobile" onClick={() => { setIsOpenmobile(true)}}>Filter Invoices</button>

                </div>

                <div className="extra">
                        <h4>Financial Year</h4>
                        <select style={{padding : 10}} onChange={e =>{setfinancialyearandproceed(e.target.value);}}>
                        <option selected={financialyear === "2021"} value="2021">2021-2022</option>
                            <option selected={financialyear === "2022"} value="2022">2022-2023</option>
                            <option selected={financialyear === "2023"} value="2023">2023-2024</option>
                        </select>
                    </div>
                
                <input type='text' placeholder='Search Here' onChange={searchchanged}/>
            </div>

            <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Filter Invoices"
                    
                >
                    <div style={{display : 'flex',flexDirection : 'row',justifyContent : 'space-between',alignItems :'center'}}>
                    <h2 style={{color : 'black'}}>Filter Invoices</h2>
                        <div>
                        <button  onClick={applyfiltertapped} style={{border : 'none',padding : '10px',fontWeight : 'bolder',marginLeft : '10px'}}>Apply Filter</button>

                        <button  onClick={clearfiltertapped} style={{border : 'none',padding : '10px',fontWeight : 'bolder',marginLeft : '10px'}}>Clear Filter</button>

                        <button onClick={closeModal} style={{border : 'none',padding : '10px',fontWeight : 'bolder',marginLeft : '10px'}}>Close</button>
                        </div>
                    </div>
                    {filterdataloaded && <div className="whole" style={{display : 'flex',flexDirection : 'row' , justifyContent : 'space-between'}}>
                        <div className="inner">
                            <h4>Buyers Name</h4>
                            {
                                allbuyersname.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' defaultChecked={selectedbuyersname.filter((erf) => erf == eachdata).length > 0} value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'buyersname')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Sellers Name</h4>
                            {
                                allsellersname.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' defaultChecked={selectedsellername.filter((erf) => erf == eachdata).length > 0} value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'sellersname')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Item</h4>
                            {
                                allitems.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' defaultChecked={selecteditem.filter((erf) => erf == eachdata).length > 0} value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'item')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Road/Sea</h4>
                            {
                                allroadsea.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' defaultChecked={selectedroadsea.filter((erf) => erf == eachdata).length > 0} value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'roadsea')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                    </div>}
        
                </Modal>
            

                <Modal
                    isOpen={modalIsOpenmobile}
                    onRequestClose={closeModalmobile}
                    style={customStylesmobile}
                    contentLabel="Filter Invoices"
                    
                >
                    <div style={{display : 'flex',flexDirection : 'row',justifyContent : 'space-between',alignItems :'center'}}>
                    <h2 style={{color : 'black'}}>Filter Invoices</h2>
                        <div>
                        <button  onClick={applyfiltertapped} style={{border : 'none',padding : '20px',fontWeight : 'bolder',marginLeft : '10px'}}>Apply Filter</button>

                        <button  onClick={clearfiltertapped} style={{border : 'none',padding : '20px',fontWeight : 'bolder',marginLeft : '10px'}}>Clear Filter</button>

                        <button onClick={closeModal} style={{border : 'none',padding : '20px',fontWeight : 'bolder',marginLeft : '10px'}}>Close</button>
                        </div>
                    </div>
                    {filterdataloaded && <div className="whole" style={{display : 'flex',flexDirection : 'row' , justifyContent : 'space-between'}}>
                        <div className="inner">
                            <h4>Buyers Name</h4>
                            {
                                allbuyersname.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' defaultChecked={selectedbuyersname.filter((erf) => erf == eachdata).length > 0} value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'buyersname')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Sellers Name</h4>
                            {
                                allsellersname.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' defaultChecked={selectedsellername.filter((erf) => erf == eachdata).length > 0} value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'sellersname')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Item</h4>
                            {
                                allitems.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' defaultChecked={selecteditem.filter((erf) => erf == eachdata).length > 0} value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'item')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                        <div className="inner">
                            <h4>Road/Sea</h4>
                            {
                                allroadsea.map(eachdata => {
                                    return (<div className='checkboxregion' style={{display : 'flex',flexDirection : 'row',alignItems : 'center'}}><input type='checkbox' defaultChecked={selectedroadsea.filter((erf) => erf == eachdata).length > 0} value={eachdata} onChange={(e) => checkboxtapped(e.target.value,'roadsea')} /><h4 style={{margin : '8px',marginLeft : '5px',fontSize : '0.7rem'}}>{eachdata}</h4></div>)
                                })
                            }
                        </div>
                    </div>}
        
                </Modal>
            <div className='lowerview'>
            <div className='contline specialline' >
                                <div className='subline'><h5>WCCN</h5></div>
                                <div className='subline'><h5>Buyer Name</h5></div>
                                 <div className='subline'><h5>Seller Name</h5></div>
                                 <div className='subline'><h5>PI No</h5></div>
                                 <div className='subline'><h5>Road/Sea</h5></div>
                                 <div className='subline'><h5>Invoice No</h5></div>
                                 <div className='subline'><h5>Invoice Bales</h5></div>
                                 <div className='subline'><h5>Invoice MTS</h5></div>
                                 <div className='subline'><h5>Current Status</h5></div>
                            </div>
                            <div className="alldata">
                {
                     dataloaded && allsearchedinvoices.map(eachinvoice => {
                        return(
                            <div className='contline' onClick={() => { navigate(`/editinvoice/${eachinvoice.invoiceid}/${eachinvoice.contractid}`)}}>
                                <div className='subline'><h4>{eachinvoice.contractid.split("-")[0]}</h4></div>
                                <div className='subline'><h4>{eachinvoice.contractdata.buyername}</h4></div>
                                 <div className='subline'><h4>{eachinvoice.contractdata.sellername}</h4></div>
                                 <div className='subline'><h4>{eachinvoice.contractdata.pinumber}</h4></div>
                                 <div className='subline'><h4>{eachinvoice.contractdata.roadsea}</h4></div>
                                 <div className='subline'><h4>{eachinvoice.invoicedata.invoicenumber}</h4></div>
                                 <div className='subline'><h4>{eachinvoice.invoicedata.invoicebales}</h4></div>
                                 <div className='subline'><h4>{eachinvoice.invoicedata.invoicemts}</h4></div>
                                 <div className='subline'><h4>{eachinvoice.invoicedata.invoicestatus}</h4></div>
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

export default Allinvoices
