import React,{useState,useEffect} from 'react'
import './Contract.css';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import db from './Firebase';
import firebase from 'firebase';
import Mobilesidebar from './Mobilesidebar';
import { useNavigate, useParams } from "react-router-dom";


function Contract() {

    const navigate = useNavigate();

    const [allrd, setallrd] = useState([10,12]);
    const [alltrash, setalltrash] = useState([]);
    const [allmoisture, setallmoisture] = useState([]);
    const [allcg, setallcg] = useState([]);
    const [rd, setrd] = useState("");
    const [trash, settrash] = useState("");
    const [moisture, setmoisture] = useState("");
    const [cg, setcg] = useState("");



    const [allbuyersname, setallbuyersname] = useState([]);
    const [allbuyersagent, setallbuyersagent] = useState([]);
    const [allsellersname, setallsellersname] = useState([]);
    const [allselleragent, setallselleragent] = useState([ ]);
    const [alllengths, setalllengths] = useState([]);
    const [allmics, setallmics] = useState([]);
    const [allstrengths, setallstrengths] = useState([]);


    const [buyersname, setbuyersname] = useState("");
    const [buyeragent, setbuyeragent] = useState("");
    const [sellersname, setsellersname] = useState("");
    const [selleragent, setselleragent] = useState("");
    const [lcmts, setlcmts] = useState("");
    const [quality, setquality] = useState("");
    const [item, setitem] = useState("");
    const [roadsea, setroadsea] = useState("");
    const [area, setarea] = useState("");
    const [length, setlength] = useState("");
    const [mic, setmic] = useState("");
    const [strength, setstrength] = useState("");
    const [rate, setrate] = useState("");
    const [commission, setcommission] = useState("");
    const [overseascommission, setoverseascommission] = useState("");
    const [contractedreate, setcontractedreate] = useState("");
    const [date, setdate] = useState(null);
    const [otherquality, setotherquality] = useState("");
    const [otheritem, setotheritem] = useState("");


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


    
    useEffect(() => {
       db.collection('buyersnamelist').get().then(alldata => {
           var tmp = [];
           alldata.docs.map(eachdata => {
            tmp.push(eachdata.id);
           })
           setallbuyersname(tmp);
       })

       db.collection('buyersagentlist').get().then(alldata => {
        var tmp = [];
        alldata.docs.map(eachdata => {
         tmp.push(eachdata.id);
        })
        setallbuyersagent(tmp);
    })

    db.collection('sellersagentlist').get().then(alldata => {
        var tmp = [];
        alldata.docs.map(eachdata => {
         tmp.push(eachdata.id);
        })
        setallselleragent(tmp);
    })

    db.collection('sellersnamelist').get().then(alldata => {
        var tmp = [];
        alldata.docs.map(eachdata => {
         tmp.push(eachdata.id);
        })
        setallsellersname(tmp);
    })

    db.collection('generallengthlist').get().then(alldata => {
        var tmp = [];
        alldata.docs.map(eachdata => {
         tmp.push(eachdata.id);
        })
        setalllengths(tmp);
    })

    db.collection('generalmiclist').get().then(alldata => {
        var tmp = [];
        alldata.docs.map(eachdata => {
         tmp.push(eachdata.id);
        })
        setallmics(tmp);
    })

    db.collection('generalstrengthlist').get().then(alldata => {
        var tmp = [];
        alldata.docs.map(eachdata => {
         tmp.push(eachdata.id);
        })
        setallstrengths(tmp);
    })


    }, [])

    const removeExtraSpace = (s) => s.trim().split(/ +/).join(' ');


    const Textcustominput = ({text,value,options,mode}) => {
        return <div className="eachinputholder">
                    <h5>{text}</h5>
                    <TextInput className="textinput" value ={value}  options={options} trigger={[""]} onSelect={(val) => onselect(mode,val)} onChange={(val) => onchange(mode,val)}/>
                </div>;
      };


    const onselect = (mode,e) => {
        if(mode == "buyersname") {
            setbuyersname(e.toUpperCase());
        }
        if(mode == "rd") {
            setrd(e.target.value);
        }
        if(mode == "trash") {
            settrash(e.target.value);
        }
        if(mode == "moisture") {
            setmoisture(e.target.value);
        }
        if(mode == "cg") {
            setcg(e.target.value);
        }
        if(mode == "buyeragent") {
            setbuyeragent(e.toUpperCase());
        }
        if(mode == "sellername") {
            setsellersname(e.toUpperCase());
        }
        if(mode == "selleragent") {
            setselleragent(e.toUpperCase());
        }
        if(mode == "lcmts") {
            setlcmts(e.target.value);
        }
        if(mode == "area") {
            setarea(e);
        }
        if(mode == "length") {
            setlength(e.target.value);
        }
        if(mode == "mic") {
            setmic(e.target.value);
        }
        if(mode == "strength") {
            setstrength(e.target.value);
        }
        if(mode == "rate") {
            setrate(e.target.value);
        }
        if(mode == "commission") {
            setcommission(e.target.value);
        }
        if(mode == "overseascommission") {
            setoverseascommission(e.target.value);
        }
        if(mode == "contractedreate") {
            setcontractedreate(e.target.value);
        }
        if(mode == "date") {
            setdate(e.target.value);
        }
        if(mode == "otherquality") {
            setotherquality(e);
        }
        if(mode == "otheritem") {
            setotheritem(e);
        }

    }
    const onchange = (mode,e) => {
        if(mode == "buyersname") {
            setbuyersname(e.toUpperCase());
        }
        if(mode == "rd") {
            setrd(e.target.value);
        }
        if(mode == "trash") {
            settrash(e.target.value);
        }
        if(mode == "moisture") {
            setmoisture(e.target.value);
        }
        if(mode == "cg") {
            setcg(e.target.value);
        }
        if(mode == "buyeragent") {
            setbuyeragent(e.toUpperCase());
        }
        if(mode == "sellername") {
            setsellersname(e.toUpperCase());
        }
        if(mode == "selleragent") {
            setselleragent(e.toUpperCase());
        }
        if(mode == "lcmts") {
            setlcmts(e.target.value);
        }
        if(mode == "area") {
            setarea(e);
        }
        if(mode == "length") {
            setlength(e.target.value);
        }
        if(mode == "mic") {
            setmic(e.target.value);
        }
        if(mode == "strength") {
            setstrength(e.target.value);
        }
        if(mode == "rate") {
            setrate(e.target.value);
        }
        if(mode == "commission") {
            setcommission(e.target.value);
        }
        if(mode == "overseascommission") {
            setoverseascommission(e.target.value);
        }
        if(mode == "contractedreate") {
            setcontractedreate(e.target.value);
        }
        if(mode == "date") {
            setdate(e.target.value);
        }
        if(mode == "otherquality") {
            setotherquality(e);
        }
        if(mode == "otheritem") {
            setotheritem(e);
        }

    }
    const dropdownselected = (e) => {
        setquality(e.target.value);
    }
    const dropdownselected2 = (e) => {
        setitem(e.target.value);
    }
    const dropdownselected3 = (e) => {
        setroadsea(e.target.value);
    }

    const blankempty = (text) => {
        if(text == "" || text == " " || text == null || text == undefined) {
            return true;
        }
        return false;
    }

    const addcontracttapped = () => {
        if(blankempty(buyersname)) {
            alert("Please Enter Buyers Name");
        }
        // else if(blankempty(buyeragent)) {
        //     alert("Please Enter Buyers Agent");
        // }
        else if(blankempty(sellersname)) {
            alert("Please Enter Sellers Name");
        }
        // else if(blankempty(selleragent)) {
        //     alert("Please Enter Sellers Agent");
        // }
        // else if(blankempty(lcmts)) {
        //     alert("Please Enter LC MTS");
        // }
        // else if(blankempty(quality)) {
        //     alert("Please Select Quality");
        // }
        // else if(quality == "Others" && blankempty(otherquality)) {
        //     alert("Please Enter Other Quality");
        // }
        // else if(blankempty(item)) {
        //     alert("Please Select Item");
        // }
        // else if(item == "Others" && blankempty(otheritem)) {
        //     alert("Please Enter Other Item");
        // }
        // else if(blankempty(roadsea)) {
        //     alert("Please Select Road/Sea");
        // }
        // else if(blankempty(area)) {
        //     alert("Please Enter Area");
        // }
        // else if(blankempty(date)) {
        //     alert("Please Select Contracted Date");
        // }
        // else if(blankempty(length)) {
        //     alert("Please Enter Length");
        // }
        // else if(blankempty(mic)) {
        //     alert("Please Enter MIC");
        // }
        // else if(blankempty(strength)) {
        //     alert("Please Enter Strength");
        // }
        else if(blankempty(rate)) {
            alert("Please Enter Rate");
        }
        // else if(blankempty(commission)) {
        //     alert("Please Enter Commission");
        // }
        // else if(blankempty(contractedreate)) {
        //     alert("Please Enter Contracted Rate");
        // }
        else {
            var randomid = "";

            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();

             year = "" + new Date().getFullYear();
            if(month == 1 || month == 2 || month == 3) {
                year = "" + (Number(year) - 1);
            }

            db.collection('contractscount').doc(""+year).get().then(ccval => {
                if(year === "2021") {
                    randomid = (210 + ccval.data().countvalue) + "-"+year;

                }
                else {
                    randomid = ccval.data().countvalue + "-"+year;

                }
             
                var node = {
                    buyername : buyersname,
                    buyeragent : buyeragent,
                    sellername : sellersname,
                    selleragent : selleragent,
                    lcmts : lcmts,
                    pendingmts : lcmts,
                    rd : rd,
                    trash : trash,
                    moisture : moisture,
                    cg : cg,
                    quality : quality,
                    otherquality : otherquality,
                    item : item,
                    otheritem : otheritem,
                    roadsea : roadsea,
                    area : area,
                    contracteddate : date,
                    length : length,
                    mic : mic,
                    strength : strength,
                    rate : rate,
                    commission : commission,
                    overseascommission: overseascommission,
                    contractedrate : contractedreate,
                    createdon : Math.round((new Date()).getTime() / 1000),
                    contractstatus : "LC Pending",
                    createdby : currentuser.uid,
                    financialyear : year
                }
                console.log(randomid);
                console.log(node);

                db.collection('contracts').doc(randomid).set(node).then(done => {
                    alert("Contract Added 1");
                    if(blankempty(buyersname) == false) {
                        db.collection('buyersnamelist').doc(removeExtraSpace(buyersname.toUpperCase())).set({found : true});
    
                    }
                    if(blankempty(buyeragent) == false) {
                        db.collection('buyersagentlist').doc(removeExtraSpace(buyeragent.toUpperCase())).set({found : true});
    
                    }
                    if(blankempty(sellersname) == false) {
                        db.collection('sellersnamelist').doc(removeExtraSpace(sellersname.toUpperCase())).set({found : true});
    
                    }
                    if(blankempty(selleragent) == false) {
                        db.collection('sellersagentlist').doc(removeExtraSpace(selleragent.toUpperCase())).set({found : true});
    
                    }
                    if(blankempty(item) == false) {
                        db.collection('itemlist').doc(item.toLowerCase()).set({found : true});
    
                    }
                    if(blankempty(roadsea) == false) {
                        db.collection('roadsealist').doc(roadsea.toLowerCase()).set({found : true});
    
                    }
                    if(blankempty(length) == false) {
                        db.collection('generallengthlist').doc(""+length).set({found : true});
    
                    }
                    if(blankempty(mic) == false) {
                        db.collection('generalmiclist').doc(""+mic).set({found : true});
    
                    }
                    if(blankempty(strength) == false) {
                        db.collection('generalstrengthlist').doc(""+strength).set({found : true});
    
                    }
                    db.collection('contractscount').doc(""+year).get().then(latcount => {
                        db.collection('contractscount').doc(""+year).update({
                            countvalue : latcount.data().countvalue + 1
                        }).then(efd => {
                            navigate('/contracts');
                        }).catch(jhg => {
                            
                        })
                    }).catch(efd => {

                    })
             
    
    
                }).catch(err => {
                })
            }).catch(efd => {
                
                if(month == 1 || month == 2 || month == 3) {
                    year = year - 1;
                }
                randomid = "1-"+year;
                var node = {
                    buyername : buyersname,
                    buyeragent : buyeragent,
                    sellername : sellersname,
                    selleragent : selleragent,
                    lcmts : lcmts,
                    pendingmts : lcmts,
                    rd : rd,
                    trash : trash,
                    moisture : moisture,
                    cg : cg,
                    quality : quality,
                    otherquality : otherquality,
                    item : item,
                    otheritem : otheritem,
                    roadsea : roadsea,
                    area : area,
                    contracteddate : date,
                    length : length,
                    mic : mic,
                    strength : strength,
                    rate : rate,
                    commission : commission,
                    overseascommission: overseascommission,
                    contractedrate : contractedreate,
                    createdon : Math.round((new Date()).getTime() / 1000),
                    contractstatus : "LC Pending",
                    createdby : currentuser.uid,
                    financialyear : year
                }
                console.log(randomid);
                console.log(node);
                db.collection('contracts').doc(""+randomid).set(node).then(done => {
                    alert("Contract Added 2");
                    if(blankempty(buyersname) == false) {
                        db.collection('buyersnamelist').doc(buyersname.toUpperCase().trim()).set({found : true});
    
                    }
                    if(blankempty(buyeragent) == false) {
                        db.collection('buyersagentlist').doc(buyeragent.toUpperCase().trim()).set({found : true});
    
                    }
                    if(blankempty(sellersname) == false) {
                        db.collection('sellersnamelist').doc(sellersname.toUpperCase().trim()).set({found : true});
    
                    }
                    if(blankempty(selleragent) == false) {
                        db.collection('sellersagentlist').doc(selleragent.toUpperCase().trim()).set({found : true});
    
                    }
                    if(blankempty(item) == false) {
                        db.collection('itemlist').doc(item.toLowerCase()).set({found : true});
    
                    }
                    if(blankempty(roadsea) == false) {
                        db.collection('roadsealist').doc(roadsea.toLowerCase()).set({found : true});
    
                    }
                    if(blankempty(length) == false) {
                        db.collection('generallengthlist').doc(""+length).set({found : true});
    
                    }
                    if(blankempty(mic) == false) {
                        db.collection('generalmiclist').doc(""+mic).set({found : true});
    
                    }
                    if(blankempty(strength) == false) {
                        db.collection('generalstrengthlist').doc(""+strength).set({found : true});
    
                    }
    
                    db.collection('contractscount').doc(""+year).set({
                        countvalue : 2
                    }).then(efd => {
                        navigate('/contracts');
                    }).catch(jhg => {

                    })
    
                }).catch(err => {
                })
            })

       
    
            
        }
    }





    return (
        <div className='contract'>
             {currentuser && <div>
                <div className="onlymobile">
                <Mobilesidebar />

            </div>
            <div className="upperview">
                <h4>Add Contract</h4>
            </div>

       
           
           
            <div className="halves">
                <div className="half1">
                    <div className="eachinputholder">
                        <h5>Buyer Name</h5>
                        <TextInput className="textinput" value ={buyersname}  options={allbuyersname} trigger={[""]} onSelect={(val) => onselect('buyersname',val)} onChange={(val) => onchange('buyersname',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>LC MTS</h5>
                        <input className="textinput" type = "text" defaultValue ={lcmts} options={[]} trigger={[""]} onSelect={(val) => onselect('lcmts',val)} onChange={(val) => onchange('lcmts',val)}/>
                    </div>
                    {item == "Others" && <div className="eachinputholder">
                        <h5>Specify Other Item</h5>
                        <TextInput className="textinput" value ={otheritem}  options={[]} trigger={[""]} onSelect={(val) => onselect('otheritem',val)} onChange={(val) => onchange('otheritem',val)}/>
                    </div>}
                    <div className="eachinputholder">
                        <h5>Length</h5>
                        <input className="textinput" type = "text" defaultValue ={length} options={[]} trigger={[""]} onSelect={(val) => onselect('length',val)} onChange={(val) => onchange('length',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Trash</h5>
                        <input className="textinput" type = "text" defaultValue ={trash} options={alltrash} trigger={[""]} onSelect={(val) => onselect('trash',val)} onChange={(val) => onchange('trash',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Commission</h5>
                        <input className="textinput" type = "text" defaultValue ={commission} options={[]} trigger={[""]} onSelect={(val) => onselect('commission',val)} onChange={(val) => onchange('commission',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Overseas Commission</h5>
                        <input className="textinput" type = "text" defaultValue ={overseascommission} options={[]} trigger={[""]} onSelect={(val) => onselect('overseascommission',val)} onChange={(val) => onchange('overseascommission',val)}/>
                    </div>

                </div>
                <div className="half1">
                    <div className="eachinputholder">
                        <h5>Buyer Agent</h5>
                        <TextInput className="textinput" value ={buyeragent}  options={allbuyersagent} trigger={[""]} onSelect={(val) => onselect('buyeragent',val)} onChange={(val) => onchange('buyeragent',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Quality</h5>
                        <select onChange={dropdownselected}>
                            <option></option>
                            <option>MCU-5</option>
                            <option>S-6</option>
                            <option>J-34</option>
                            <option>DCH-32</option>
                            <option>Others</option>
                        </select>
                    </div>
                       
                    <div className="eachinputholder">
                        <h5>MIC</h5>
                        <input className="textinput" type = "text" defaultValue ={mic} options={[]} trigger={[""]} onSelect={(val) => onselect('mic',val)} onChange={(val) => onchange('mic',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Moisture</h5>
                        <input className="textinput" type = "text" defaultValue ={moisture} options={[]} trigger={[""]} onSelect={(val) => onselect('moisture',val)} onChange={(val) => onchange('moisture',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Contract Rate</h5>
                        <input className="textinput" type = "text" defaultValue ={contractedreate} options={[]} trigger={[""]} onSelect={(val) => onselect('contractedreate',val)} onChange={(val) => onchange('contractedreate',val)}/>
                    </div>
           
              
   
                </div>
                <div className="half1">
                    <div className="eachinputholder">
                        <h5>Seller Name</h5>
                        <TextInput className="textinput" value ={sellersname}  options={allsellersname} trigger={[""]} onSelect={(val) => onselect('sellername',val)} onChange={(val) => onchange('sellername',val)}/>
                    </div>
                           
                   {quality == "Others" && <div className="eachinputholder">
                        <h5>Specify Other Quality</h5>
                        <TextInput className="textinput" value ={otherquality}  options={[]} trigger={[""]} onSelect={(val) => onselect('otherquality',val)} onChange={(val) => onchange('otherquality',val)}/>
                    </div>}
                    <div className="eachinputholder">
                        <h5>Area</h5>
                        <TextInput className="textinput" value ={area}  options={[]} trigger={[""]} onSelect={(val) => onselect('area',val)} onChange={(val) => onchange('area',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Strength</h5>
                        <input className="textinput" type = "text" defaultValue ={strength} options={[]} trigger={[""]} onSelect={(val) => onselect('strength',val)} onChange={(val) => onchange('strength',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>CG</h5>
                        <input className="textinput" type = "text" defaultValue ={cg} options={[]} trigger={[""]} onSelect={(val) => onselect('cg',val)} onChange={(val) => onchange('cg',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>PI Rate</h5>
                        <input className="textinput" type = "text" defaultValue ={rate} options={[]} trigger={[""]} onSelect={(val) => onselect('rate',val)} onChange={(val) => onchange('rate',val)}/>
                    </div>

                
                 
                </div>
                <div className="half1">
                    <div className="eachinputholder">
                        <h5>Seller Agent</h5>
                        <TextInput className="textinput" value ={selleragent}  options={allselleragent} trigger={[""]} onSelect={(val) => onselect('selleragent',val)} onChange={(val) => onchange('selleragent',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Item</h5>
                        <select onChange={dropdownselected2}>
                            <option></option>
                            <option>Organic</option>
                            <option>Conventional</option>
                            <option>BCI</option>
                            <option>IC2</option>
                            <option>IC1</option>
                            <option>Others</option>
                        </select>
                    </div>
                    <div className="eachinputholder">
                        <h5>RD</h5>
                        <input className="textinput" type = "text" defaultValue ={rd} options={allrd} trigger={[""]} onSelect={(val) => onselect('rd',val)} onChange={(val) => onchange('rd',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Road/Sea</h5>
                        <select onChange={dropdownselected3}>
                            <option></option>
                            <option>Road</option>
                            <option>Sea</option>
                            <option>Bhomra</option>
                            <option>Benapole</option>
                        </select>
                    </div>
           
                 
                    <div className="eachinputholder">
                        <h5>Contract Date</h5>
                        <input className="textinput" type = "date" defaultValue ={date} options={[]}  onChange={(val) => onchange('date',val)}/>
                    </div>
                    <div className="eachinputholder">
                    {additionaluserinfo !== null && additionaluserinfo !== undefined && additionaluserinfo.role !== undefined && (additionaluserinfo.role.toLowerCase() == "admin" || additionaluserinfo.role.toLowerCase() == "superadmin") &&<button onClick={addcontracttapped}>Add Contract</button>}
                    </div>
                    
                </div>

            </div>
            </div>}
        </div>
    )
}

export default Contract
