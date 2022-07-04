import React,{useState,useEffect,useRef} from 'react'
import './Contract.css';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import { useNavigate, useParams } from "react-router-dom";
import db from './Firebase';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import firebase from 'firebase';
import Mobilesidebar from './Mobilesidebar';


function Editcontract() {
    const navigate = useNavigate();
    var {contractid} = useParams();

    const [dataloaded, setdataloaded] = useState(false);

    var balesref = useRef(null);
    var pendingbalesref = useRef(null);
    var pendingmtsref = useRef(null);
    var balespendingref = useRef(null);

    const [samplecount, setsamplecount] = useState(0);
    const [notsamplecouunt, setnotsamplecouunt] = useState(0);
    const [testedcount, settestedcount] = useState(0);
    const [nottestedcount, setnottestedcount] = useState(0);
    const [lotcounttotal, setlotcounttotal] = useState(0);


    const [currentuser, setcurrentuser] = useState(null);
    const [additionaluserinfo, setadditionaluserinfo] = useState(null);

    const [haslccancelled, sethaslccancelled] = useState(false);
    const [contractstatus, setcontractstatus] = useState("");

    const [createdby, setcreatedby] = useState("");
    const [createdon, setcreatedon] = useState("");


    const cancellc = () => {
        db.collection('contracts').doc(contractid).update({
            contractstatus : 'lccancelled'
        }).then(done => {
            alert("LC Cancelled");
            sethaslccancelled(true);
            setcontractstatus("LC Cancelled");
        })
    }


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

   


    const deletetapped = () => {
        confirmAlert({
            title: 'Delete Contract ?',
            message: 'Are you sure to delete this contract ?.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    db.collection('contracts').doc(contractid).delete().then(df => {
                        alert("Contract Deleted");
                        navigate('/contracts');
                        
                    })
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

    useEffect(() => {
        console.log("Contract Id ",contractid);
        db.collection('contracts').doc(contractid).get().then(condata => {
            if(condata.data().contractstatus == "lccancelled"){
                sethaslccancelled(true);
            }
            setcreatedon(checkandset(condata.data().createdon));
            db.collection('users').doc(condata.data().createdby).get().then(uds => {
                setcreatedby(checkandset(uds.data().name));

            })
            setbuyeragent(checkandset(condata.data().buyeragent));
            setbuyersname(checkandset(condata.data().buyername));
            setsellersname(checkandset(condata.data().sellername));
            setselleragent(checkandset(condata.data().selleragent));
            setquality(checkandset(condata.data().quality));
            setitem(checkandset(condata.data().item));
            setroadsea(checkandset(condata.data().roadsea));
            setarea(checkandset(condata.data().area));
            setcommission(checkandset(condata.data().commission));
            setoverseascommission(checkandset(condata.data().overseascommission));
            setcontractedreate(checkandset(condata.data().contractedrate));
            setdate(checkandset(condata.data().contracteddate));
            setpinumber(checkandset(condata.data().pinumber));
            setpidate(checkandset(condata.data().pidate));
            setcropyear(checkandset(condata.data().cropyear));
            setlcmts(checkandset(condata.data().lcmts));
            setcontractstatus(condata.data().contractstatus);
            // setbales(checkandset(condata.data().lcmts) != "" ? parseFloat(condata.data().lcmts) * 6 : "");
            setrate(checkandset(condata.data().rate));
            // setpendingbales(checkandset(condata.data().pendingbales));
            // setpendingmts(checkandset(condata.data().pendingmts));


            setlcnumber(checkandset(condata.data().lcnumber));
            setlcpaymentterms(checkandset(condata.data().lcpaymentterms));
            setlcbank(checkandset(condata.data().lcbank));
            setblnumber(checkandset(condata.data().blnumber));
            setadvisingbank(checkandset(condata.data().advisingbank));
            setlcdate(checkandset(condata.data().lcdate));
            setexpirydate(checkandset(condata.data().expirydate));
            setshippingdate(checkandset(condata.data().shippingdate));
            setlength(checkandset(condata.data().length));
            setmic(checkandset(condata.data().mic));
            setstrength(checkandset(condata.data().strength));
            setrd(checkandset(condata.data().rd));
            settrash(checkandset(condata.data().trash));
            setmoisture(checkandset(condata.data().moisture));
            setcg(checkandset(condata.data().cg));
            settrash2(checkandset(condata.data().trash2));
            setmoisture2(checkandset(condata.data().moisture2));
            setcg2(checkandset(condata.data().cg2));
            setlength2(checkandset(condata.data().length2));
            setmic2(checkandset(condata.data().mic2));
            setstrength2(checkandset(condata.data().strength2));
            setrd2(checkandset(condata.data().rd2));
            setlotnumbers(checkandset(condata.data().lotnumbers));
            setoriginallotnumbers(checkandset(condata.data().lotnumbers));
            setlotsampled(checkandset(condata.data().lotsampled));
            setsamplecount(checkandset(condata.data().lotsampled) == "" ? 0 :checkandset(condata.data().lotsampled).split(",").length)
            setnotsamplecouunt(checkandset(condata.data().lotnotsampled) == "" ? 0 :checkandset(condata.data().lotnotsampled).split(",").length)
            settestedcount(checkandset(condata.data().lottested) == "" ? 0 : checkandset(condata.data().lottested).split(",").length)
            setlotcounttotal(checkandset(condata.data().lotnumbers) == "" ? 0 : checkandset(condata.data().lotnumbers).split(",").length)
            setnottestedcount(checkandset(condata.data().lotnottested) == "" ? 0 :checkandset(condata.data().lotnottested).split(",").length)
            setlcremarks(checkandset(condata.data().lcremarks));
            setlotnotsampled(checkandset(condata.data().lotnotsampled));
            setlottested(checkandset(condata.data().lottested));
            setlotnottested(checkandset(condata.data().lotnottested));
            setbalesdone(checkandset(condata.data().balesdone));
            // setbalespending(checkandset(condata.data().bales) != "" && checkandset(condata.data().balesdone) != "" ? parseFloat(condata.data().bales) - parseFloat(condata.data().balesdone) : "");
            setwisdomperson(checkandset(condata.data().wisdomperson));
            setipnumber(checkandset(condata.data().ipnumber));
            setipstatus(checkandset(condata.data().ipstatus));
            setipremarks(checkandset(condata.data().ipremarks));
            setqualityanalysis(checkandset(condata.data().qualityanalysis));
            setremark(checkandset(condata.data().remark));
            setqualityclaim(condata.data().qualityclaim ?? "Yes");
            

  

            db.collection('contracts').doc(contractid).collection('invoices').get().then(allinv => {
                var hold = [];
                var count = 0;
                var count2 = 0;
                allinv.docs.map(invv => {
                    hold.push(invv);
                    count = count + Number(invv.data().invoicebales);
                    count2 = count2 + Number(invv.data().invoicemts);
                })
                setallinvoices(hold);
                setallinvoicesbalescount(count);
                setallinvoicesmtscount(count2);
                renderotherinitials(condata.data(),count,count2);

                setdataloaded(true);
                

            })

        
        })
    }, [])


    // componentDidMount = () => {
    // }
    const checkandset = (text) => {
        if(text == null || text == undefined) {
            return "";
        }
        return text;
    }

    


    const [allrd, setallrd] = useState([10,12]);
    const [alltrash, setalltrash] = useState([]);
    const [allmoisture, setallmoisture] = useState([]);
    const [allcg, setallcg] = useState([]);
    const [alllengths, setalllengths] = useState([]);
    const [allmics, setallmics] = useState([]);
    const [allstrengths, setallstrengths] = useState([]);
    const [alllengths2, setalllengths2] = useState([]);
    const [allmics2, setallmics2] = useState([]);
    const [allstrengths2, setallstrengths2] = useState([]);
    const [allrd2, setallrd2] = useState([]);




    const [pinumber, setpinumber] = useState("");
    const [pidate, setpidate] = useState(null);
    const [cropyear, setcropyear] = useState("");
    const [lcmts, setlcmts] = useState("");
    const [bales, setbales] = useState("");
    const [rate, setrate] = useState("");
    const [pendingbales, setpendingbales] = useState("");
    const [pendingmts, setpendingmts] = useState("");
    const [lcnumber, setlcnumber] = useState("");
    const [lcpaymentterms, setlcpaymentterms] = useState("");
    const [lcbank, setlcbank] = useState("");
    const [blnumber, setblnumber] = useState("");
    const [advisingbank, setadvisingbank] = useState("");
    const [lcdate, setlcdate] = useState(null);
    const [expirydate, setexpirydate] = useState(null);
    const [shippingdate, setshippingdate] = useState(null);
    const [length, setlength] = useState("");
    const [mic, setmic] = useState("");
    const [strength, setstrength] = useState("");
    const [rd, setrd] = useState("");
    const [trash, settrash] = useState("");
    const [moisture, setmoisture] = useState("");
    const [cg, setcg] = useState("");
    const [trash2, settrash2] = useState("");
    const [moisture2, setmoisture2] = useState("");
    const [cg2, setcg2] = useState("");
    const [length2, setlength2] = useState("");
    const [mic2, setmic2] = useState("");
    const [strength2, setstrength2] = useState("");
    const [rd2, setrd2] = useState("");
    const [lotnumbers, setlotnumbers] = useState("");
    const [originallotnumbers, setoriginallotnumbers] = useState("");
    const [lotsampled, setlotsampled] = useState("");
    const [lotnotsampled, setlotnotsampled] = useState("");
    const [lottested, setlottested] = useState("");
    const [lotnottested, setlotnottested] = useState("");
    const [balesdone, setbalesdone] = useState("");
    const [balespending, setbalespending] = useState("");
    const [wisdomperson, setwisdomperson] = useState("");
    const [ipnumber, setipnumber] = useState("");
    const [ipstatus, setipstatus] = useState("");
    const [ipremarks, setipremarks] = useState("");
    const [qualityanalysis, setqualityanalysis] = useState("");
    const [remark, setremark] = useState("");

    const [allinvoices, setallinvoices] = useState([]);
    const [allinvoicesbalescount, setallinvoicesbalescount] = useState(0);
    const [allinvoicesmtscount, setallinvoicesmtscount] = useState(0);

    const [allbuyersname, setallbuyersname] = useState([]);
    const [allbuyersagent, setallbuyersagent] = useState([]);
    const [allsellersname, setallsellersname] = useState([]);
    const [allselleragent, setallselleragent] = useState([ ]);
    const [buyersname, setbuyersname] = useState("");
    const [buyeragent, setbuyeragent] = useState("");
    const [sellersname, setsellersname] = useState("");
    const [selleragent, setselleragent] = useState("");
    const [quality, setquality] = useState("");
    const [qualityclaim, setqualityclaim] = useState("Yes");
    const [item, setitem] = useState("");
    const [roadsea, setroadsea] = useState("");
    const [area, setarea] = useState("");
    const [commission, setcommission] = useState("");
    const [overseascommission, setoverseascommission] = useState("");
    const [contractedreate, setcontractedreate] = useState("");
    const [date, setdate] = useState(null);
    const [lcremarks, setlcremarks] = useState("");
 
    
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
 
    //  db.collection('generallengthlist').get().then(alldata => {
    //      var tmp = [];
    //      alldata.docs.map(eachdata => {
    //       tmp.push(eachdata.id);
    //      })
    //      setalllengths(tmp);
    //  })
 
    //  db.collection('generalmiclist').get().then(alldata => {
    //      var tmp = [];
    //      alldata.docs.map(eachdata => {
    //       tmp.push(eachdata.id);
    //      })
    //      setallmics(tmp);
    //  })
 
    //  db.collection('generalstrengthlist').get().then(alldata => {
    //      var tmp = [];
    //      alldata.docs.map(eachdata => {
    //       tmp.push(eachdata.id);
    //      })
    //      setallstrengths(tmp);
    //  })
 
 
     }, [])

const getmecurrentstatus = () => {
    var status = "";
    if(blankempty(lcnumber)) {
        status = "LC Pending";
    }
    else {
        status = "Shipment Pending";
    }
    return status;
    
}

const renderotherinitials = (data,a,b) => {
    console.log("Rendering others");

    var m = Number(data.lcmts) * 6;

    
    setbales(m);
    

    var n = m - Number(a);
    console.log("n is "+n);
    setpendingbales(n);
    
    console.log("allinvoicesbalescount is "+a);

   

    var o = (Number(data.lcmts)  - Number(b)).toFixed(2);
    setpendingmts(o);

    

    var bd = data.balesdone == "" || data.balesdone == undefined ? 0 : Number(data.balesdone);
    var s = m - bd;
    setbalespending(s);
    // balespendingref.value = s;



    
}

    const onselect = (mode,e) => {
        if(mode == "buyersname") {
            setbuyersname(e);
        }
        if(mode == "lcremarks") {
            setlcremarks(e);
        }
        if(mode == "buyeragent") {
            setbuyeragent(e);
        }
        if(mode == "sellername") {
            setsellersname(e);
        }
        if(mode == "selleragent") {
            setselleragent(e);
        }
        if(mode == "area") {
            setarea(e);
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
        if(mode == "pinumber") {
            setpinumber(e);
        }
        if(mode == "pidate") {
            setpidate(e.target.value);
        }
        if(mode == "lcmts") {
            setlcmts(e.target.value);
            var m = Number(e.target.value) * 6;

            balesref.value = m;
            setbales(m);

            var n = m - allinvoicesbalescount;
            setpendingbales(n);
            pendingbalesref.value = n;

            var o = (Number(e.target.value) - allinvoicesmtscount).toFixed(2);
            setpendingmts(o);
            pendingmtsref.value = o;

            var bd = balesdone == "" || balesdone == undefined ? 0 : Number(balesdone);
            var s = m - bd;
            setbalespending(s);
            balespendingref.value = s;


        }
        if(mode == "bales") {
            setbales(e.target.value);

        }
        if(mode == "rate") {
            setrate(e.target.value);
        }
        if(mode == "pendingbales") {
            // setpendingbales(e.target.value);
        }
        if(mode == "pendingmts") {
            // setpendingmts(e.target.value);
        }
        if(mode == "lcnumber") {
            setlcnumber(e);
        }
        if(mode == "lcpaymentterms") {
            setlcpaymentterms(e);
        }
        if(mode == "lcbank") {
            setlcbank(e);
        }
        if(mode == "blnumber") {
            setblnumber(e);
        }
        if(mode == "advisingbank") {
            setadvisingbank(e);
        }
        if(mode == "lcdate") {
            setlcdate(e.target.value);
        }
        if(mode == "expirydate") {
            setexpirydate(e.target.value);
        }
        if(mode == "shippingdate") {
            setshippingdate(e.target.value);
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
        if(mode == "trash2") {
            settrash2(e.target.value);
        }
        if(mode == "moisture2") {
            setmoisture2(e.target.value);
        }
        if(mode == "cg2") {
            setcg2(e.target.value);
        }
        if(mode == "length2") {
            setlength2(e.target.value);
        }
        if(mode == "mic2") {
            setmic2(e.target.value);
        }
        if(mode == "strength2") {
            setstrength2(e.target.value);
        }
        if(mode == "rd2") {
            setrd2(e.target.value);
        }
        if(mode == "lotnumbers") {
            setlotnumbers(e);
            var jk = e.split(",");
            setlotcounttotal(jk.length);
        }
        if(mode == "lotsampled") {
            setlotsampled(e);
            var jk = e.split(",");
            setsamplecount(jk.length);
        }
        if(mode == "lotnotsampled") {
            setlotnotsampled(e);
            var jk = e.split(",");
            setnotsamplecouunt(jk.length);
        }
        if(mode == "lottested") {
            setlottested(e);
            var jk = e.split(",");
            settestedcount(jk.length);
        }
        if(mode == "lotnottested") {
            setlotnottested(e);
            var jk = e.split(",");
            setnottestedcount(jk.length);
        }
        if(mode == "balesdone") {
            setbalesdone(e.target.value);

            var bd = e.target.value;
            var s = Number(bales) - Number(bd);
            setbalespending(s);
            balespendingref.value = s;
        }
        if(mode == "balespending") {
            // setbalespending(e.target.value);
        }
        if(mode == "wisdomperson") {
            setwisdomperson(e);
        }
        if(mode == "ipnumber") {
            setipnumber(e);
        }
        if(mode == "ipremarks") {
            setipremarks(e);
        }
        if(mode == "remark") {
            setremark(e);
        }

    }
    const onchange = (mode,e) => {
        if(mode == "buyersname") {
            setbuyersname(e);
        }
        if(mode == "lcremarks") {
            setlcremarks(e);
        }
        if(mode == "buyeragent") {
            setbuyeragent(e);
        }
        if(mode == "sellername") {
            setsellersname(e);
        }
        if(mode == "selleragent") {
            setselleragent(e);
        }
        if(mode == "area") {
            setarea(e);
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
        if(mode == "pinumber") {
            setpinumber(e);
        }
        if(mode == "pidate") {
            setpidate(e.target.value);
        }
        if(mode == "lcmts") {
            setlcmts(e.target.value);
            var m = Number(e.target.value) * 6;
            balesref.value = m;
            setbales(m);

            var n = m - allinvoicesbalescount;
            setpendingbales(n);
            pendingbalesref.value = n;

            var o = (Number(e.target.value) - allinvoicesmtscount).toFixed(2);
            setpendingmts(o);
            pendingmtsref.value = o;

            var bd = balesdone == "" || balesdone == undefined ? 0 : Number(balesdone);
            var s = m - bd;
            setbalespending(s);
            balespendingref.value = s;
        }
        if(mode == "bales") {
            setbales(e.target.value);
        }
        if(mode == "rate") {
            setrate(e.target.value);
        }
        if(mode == "pendingbales") {
            // setpendingbales(e.target.value);
        }
        if(mode == "pendingmts") {
            // setpendingmts(e.target.value);
        }
        if(mode == "lcnumber") {
            setlcnumber(e);
        }
        if(mode == "lcpaymentterms") {
            setlcpaymentterms(e);
        }
        if(mode == "lcbank") {
            setlcbank(e);
        }
        if(mode == "blnumber") {
            setblnumber(e);
        }
        if(mode == "advisingbank") {
            setadvisingbank(e);
        }
        if(mode == "lcdate") {
            setlcdate(e.target.value);
        }
        if(mode == "expirydate") {
            setexpirydate(e.target.value);
        }
        if(mode == "shippingdate") {
            setshippingdate(e.target.value);
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
        if(mode == "trash2") {
            settrash2(e.target.value);
        }
        if(mode == "moisture2") {
            setmoisture2(e.target.value);
        }
        if(mode == "cg2") {
            setcg2(e.target.value);
        }
        if(mode == "length2") {
            setlength2(e.target.value);
        }
        if(mode == "mic2") {
            setmic2(e.target.value);
        }
        if(mode == "strength2") {
            setstrength2(e.target.value);
        }
        if(mode == "rd2") {
            setrd2(e.target.value);
        }
        if(mode == "lotnumbers") {
            setlotnumbers(e);
            var jk = e.split(",");
            setlotcounttotal(jk.length);
        }
        if(mode == "lotsampled") {
            setlotsampled(e);
            var jk = e.split(",");
            setsamplecount(jk.length);
        }
        if(mode == "lotnotsampled") {
            setlotnotsampled(e);
            var jk = e.split(",");
            setnotsamplecouunt(jk.length);
        }
        if(mode == "lottested") {
            setlottested(e);
            var jk = e.split(",");
            settestedcount(jk.length);
        }
        if(mode == "lotnottested") {
            setlotnottested(e);
            var jk = e.split(",");
            setnottestedcount(jk.length);
        }
        if(mode == "balesdone") {
            setbalesdone(e.target.value);

            var bd = e.target.value;
            var s = Number(bales) - Number(bd);
            setbalespending(s);
            balespendingref.value = s;
        }
        if(mode == "balespending") {
            // setbalespending(e.target.value);
        }
        if(mode == "wisdomperson") {
            setwisdomperson(e);
        }
        if(mode == "ipnumber") {
            setipnumber(e);
        }
        if(mode == "ipremarks") {
            setipremarks(e);
        }
        if(mode == "remark") {
            setremark(e);
        }

    }
    const dropdownselected = (e) => {
        setipstatus(e.target.value);
    }
    const dropdownselected2 = (e) => {
        setqualityclaim(e.target.value);
    }

    const radiochecked = (e) => {
        setcropyear(e.target.value);
    }
    const blankempty = (text) => {
        if(text == "" || text == " " || text == null || text == undefined) {
            return true;
        }
        return false;
    }

    const updatetapped = () => {
        // if(blankempty(pinumber)) {
        //     alert("Please Enter PIN Number");
        // }
        // else if(blankempty(pidate)) {
        //     alert("Please Select PIN Date");
        // }
        // else if(blankempty(cropyear)) {
        //     alert("Please Select Cropyear");
        // }
        // else if(blankempty(lcmts)) {
        //     alert("Please Enter LC MTS");
        // }
        // else if(blankempty(bales)) {
        //     alert("Please Enter Bales");
        // }
        // else if(blankempty(rate)) {
        //     alert("Please Enter Rate");
        // }
        // else if(blankempty(pendingbales)) {
        //     alert("Please Enter Pending Bales");
        // }
        // else if(blankempty(pendingmts)) {
        //     alert("Please Enter Pending MTS");
        // }
        // else if(blankempty(lcnumber)) {
        //     alert("Please Enter LC Number");
        // }
        // else if(blankempty(lcpaymentterms)) {
        //     alert("Please Enter LC Payment Terms");
        // }
        // else if(blankempty(advisingbank)) {
        //     alert("Please Enter Advising Bank");
        // }
        // else if(blankempty(lcdate)) {
        //     alert("Please Select LC Date");
        // }
        // else if(blankempty(expirydate)) {
        //     alert("Please Select Expiry Date");
        // }
        // else if(blankempty(shippingdate)) {
        //     alert("Please Select Shipping Date");
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
        // else if(blankempty(rd)) {
        //     alert("Please Enter RD");
        // }
        // else if(blankempty(trash)) {
        //     alert("Please Enter Trash");
        // }
        // else if(blankempty(moisture)) {
        //     alert("Please Enter Moisture");
        // }
        // else if(blankempty(cg)) {
        //     alert("Please Enter CG");
        // }
        // else if(blankempty(length2)) {
        //     alert("Please Enter Length 2");
        // }
        // else if(blankempty(mic2)) {
        //     alert("Please Enter MIC 2");
        // }
        // else if(blankempty(strength2)) {
        //     alert("Please Enter Strength 2");
        // }
        // else if(blankempty(rd2)) {
        //     alert("Please Enter RD 2");
        // }
        // else if(blankempty(lotnumbers)) {
        //     alert("Please Enter LOT Numbers");
        // }
        // else if(blankempty(lotsampled)) {
        //     alert("Please Enter LOT Sampled");
        // }
        // else if(blankempty(lotnotsampled)) {
        //     alert("Please Enter LOT Not Sampled");
        // }
        // else if(blankempty(lottested)) {
        //     alert("Please Enter LOT Testes");
        // }
        // else if(blankempty(lotnottested)) {
        //     alert("Please Enter LOT Not Tested");
        // }
        // else if(blankempty(balesdone)) {
        //     alert("Please Enter Bales Done");
        // }
        // else if(blankempty(balespending)) {
        //     alert("Please Enter Bales Pending");
        // }
        // else if(blankempty(wisdomperson)) {
        //     alert("Please Enter Wisdom Person");
        // }
        // else if(blankempty(ipnumber)) {
        //     alert("Please Enter IP Number");
        // }
        // else if(blankempty(ipstatus)) {
        //     alert("Please Enter IP Status");
        // }
        // else if(blankempty(ipremarks)) {
        //     alert("Please Enter IP Remarks");
        // }
        // else if(blankempty(qualityanalysis)) {
        //     alert("Please Select Quality Analysis");
        // }
        // else if(blankempty(remark)) {
        //     alert("Please Enter Remark");
        // }
        // else {
            db.collection('contracts').doc(contractid).update({
                pinumber : pinumber,
                pidate : pidate,
                cropyear : cropyear,
                lcmts : lcmts,
                bales : bales,
                rate : rate,
                pendingbales : pendingbales,
                pendingmts : pendingmts,
                lcnumber : lcnumber,
                lcpaymentterms : lcpaymentterms,
                lcbank : lcbank,
                blnumber : blnumber,
                advisingbank : advisingbank,
                lcdate : lcdate,
                expirydate : expirydate,
                shippingdate : shippingdate,
                length : length,
                mic : mic,
                strength : strength,
                rd : rd,
                trash : trash,
                moisture : moisture,
                cg : cg,
                trash2 : trash2,
                moisture2 : moisture2,
                cg2 : cg2,
                length2 : length2,
                mic2 : mic2,
                strength2 : strength2,
                rd2 : rd2,
                lotnumbers : lotnumbers,
                lotsampled : lotsampled,
                lotnotsampled : lotnotsampled,
                lottested : lottested,
                lotnottested : lotnottested,
                balesdone : balesdone,
                balespending : balespending,
                wisdomperson : wisdomperson,
                ipnumber : ipnumber,
                ipstatus : ipstatus,
                ipremarks : ipremarks,
                qualityanalysis : qualityanalysis,
                remark : remark,
                contractstatus  : getmecurrentstatus(),
                lastupdatedby : currentuser.uid,
                lastupdatedon : Math.round((new Date()).getTime() / 1000),
                lcremarks : lcremarks,
                buyername : buyersname,
                    buyeragent : buyeragent,
                    sellername : sellersname,
                    selleragent : selleragent,
                    quality : quality,
                    item : item,
                    area : area,
                    contracteddate : date,
                    commission : commission,
                    overseascommission: overseascommission,
                    contractedrate : contractedreate,
                    roadsea : roadsea,
                    qualityclaim: qualityclaim
            }).then(updone => {
                alert("Contract Edited");
                if(blankempty(length) == false){
                    db.collection('contractedlengthlist').doc(length).set({found : true});
                }
                if(blankempty(mic) == false) {
                    db.collection('contractedmiclist').doc(mic).set({found : true});
                }
                if(blankempty(strength) == false) {
                     db.collection('contractedstrengthlist').doc(strength).set({found : true});
                }
                if(blankempty(rd) == false) {
                    db.collection('contractedrdlist').doc(rd).set({found : true});
                }
                if(blankempty(trash) == false) {
                    db.collection('contractedtrashlist').doc(trash).set({found : true});
                }
                if(blankempty(moisture == false)) {
                    db.collection('contractedmoisturelist').doc(moisture).set({found : true});
                }
                if(blankempty(cg) == false) {
                    db.collection('contractedcglist').doc(cg).set({found : true});
                }
                if(blankempty(length2) == false) {
                    db.collection('pioneerlengthlist').doc(length2).set({found : true});
                }
                if(blankempty(mic2) == false) {
                    db.collection('pioneermiclist').doc(mic2).set({found : true});
                }
                if(blankempty(strength2) == false) {
                    db.collection('pioneerstrengthlist').doc(strength2).set({found : true});
                }
                if(blankempty(rd2) == false) {
                    db.collection('pioneerrdlist').doc(rd2).set({found : true});
                }

                var nd = "" + Math.round((new Date()).getTime() / 1000);
                db.collection('contracts').doc(contractid).collection('updatehistory').doc(nd).set({
                    updatedby : currentuser.uid,
                    updatedon : nd
                }).then(efddd => {
                    navigate('/contracts');
                }).catch(ejfh => {
                    
                })

            })
        // }
    }
    const dropdownselected11 = (e) => {
        setquality(e.target.value);
    }
    const dropdownselected22 = (e) => {
        setitem(e.target.value);
    }
    const dropdownselected33 = (e) => {
        setroadsea(e.target.value);
    }

    const savelotnumbers = () => {
        setoriginallotnumbers(lotnumbers);
    }


    const checkboxsampled = (e) => {
        var dm = lotsampled.split(",");
        var mm = dm.filter(ek => ek == e.target.value).length;
        console.log(mm);
        if(mm > 0) {
            console.log("Sampled");
            var cm = dm.filter(ek => ek != e.target.value);
            var str = "";
            var cstr = "";
            lotnumbers.split(",").forEach((chko => {
                if(!cm.includes(chko)) {
                    if(cstr == "") {
                        cstr = chko;
                    }
                    else {
                        cstr = cstr + "," + chko;
                    }
                }
            }));
            setlotnotsampled(cstr);
            cm.map(jk => {
                if(str == "") {
                    str = jk;
                }
                else {
                    str = str + "," + jk;
                }
                setlotsampled(str);
            })
        }
        else {
            console.log("Sampled No");
            var fk = lotsampled;
            if(fk == "") {
                fk = e.target.value;
            }
            else {
            fk = fk + "," + e.target.value;
            }
            setlotsampled(fk);

            var cstr = "";
            var dm = lotsampled.split(",");
            lotnumbers.split(",").forEach((chko => {
                if(!dm.includes(chko) && chko !== e.target.value) {
                    if(cstr == "") {
                        cstr = chko;
                    }
                    else {
                        cstr = cstr + "," + chko;
                    }
                }
            }));

            setlotnotsampled(cstr);
        }
    }
    const checkboxnotsampled = (e) => {
        var dm = lotnotsampled.split(",");
        var mm = dm.filter(ek => ek == e.target.value).length;
        if(mm > 0) {
            var cm = dm.filter(ek => ek != e.target.value);
            var str = "";
            cm.map(jk => {
                if(str == "") {
                    str = jk;
                }
                else {
                    str = str + "," + jk;
                }
                setlotnotsampled(str);
            })
        }
        else {
            var fk = lotnotsampled;
            if(fk == "") {
                fk = e.target.value;
            }
            else {
            fk = fk + "," + e.target.value;
            }
            setlotnotsampled(fk);
        }
    }
    const checkboxtested = (e) => {
        var dm = lottested.split(",");
        var mm = dm.filter(ek => ek == e.target.value).length;
        if(mm > 0) {
            var cm = dm.filter(ek => ek != e.target.value);
            var str = "";
            var cstr = "";
            lotnumbers.split(",").forEach((chko => {
                if(!cm.includes(chko)) {
                    if(cstr == "") {
                        cstr = chko;
                    }
                    else {
                        cstr = cstr + "," + chko;
                    }
                }
            }));
            setlotnottested(cstr);
            cm.map(jk => {
                if(str == "") {
                    str = jk;
                }
                else {
                    str = str + "," + jk;
                }
                setlottested(str);
            })
        }
        else {
            var fk = lottested;
            if(fk == "") {
                fk = e.target.value;
            }
            else {
            fk = fk + "," + e.target.value;
            }
            setlottested(fk);
            var cstr = "";
            var dm = lottested.split(",");
            lotnumbers.split(",").forEach((chko => {
                if(!dm.includes(chko) && chko !== e.target.value) {
                    if(cstr == "") {
                        cstr = chko;
                    }
                    else {
                        cstr = cstr + "," + chko;
                    }
                }
            }));

            setlotnottested(cstr);
        }
    }
    const checkboxnottested = (e) => {
        var dm = lotnottested.split(",");
        var mm = dm.filter(ek => ek == e.target.value).length;
        if(mm > 0) {
            var cm = dm.filter(ek => ek != e.target.value);
            var str = "";
            cm.map(jk => {
                if(str == "") {
                    str = jk;
                }
                else {
                    str = str + "," + jk;
                }
                setlotnottested(str);
            })
        }
        else {
            var fk = lotnottested;
            if(fk == "") {
                fk = e.target.value;
            }
            else {
            fk = fk + "," + e.target.value;
            }
            setlotnottested(fk);
        }
    }
 
    const checkforpresence = (value,type) => {
        if(type == "sampled") {
            return lotsampled.split(",").filter(ejh => ejh == value).length > 0
        }
        else if(type == "notsampled") {
          
            return lotnotsampled.split(",").filter(ejh => ejh == value).length > 0

        }
        else if(type == "tested"){
            return lottested.split(",").filter(ejh => ejh == value).length > 0

        }
        else if(type == "nottested") {
            return lotnottested.split(",").filter(ejh => ejh == value).length > 0

        }
    }

    return (
        <div className='contract editcontract'>
             {currentuser && <div>
                <div className="onlymobile">
                <Mobilesidebar />

            </div>
            <div className="upperview">
                <h4>Edit Contract ({contractstatus})</h4>
                {!haslccancelled && additionaluserinfo !== null && additionaluserinfo !== undefined && additionaluserinfo.role !== undefined && ((additionaluserinfo.role.toLowerCase() == "dataentry" || additionaluserinfo.role.toLowerCase() == "data entry") || additionaluserinfo.role.toLowerCase() == "superadmin") && <button onClick={() => { navigate(`/editinvoice/new/${contractid}`)}}>Add New Invoice</button>}
            </div>
           
           
            {dataloaded && <div className="halves">
                
                <h6>WCCN : {contractid?.split("-").length > 0 ? contractid?.split("-")[0] : ""}</h6>
                <h6>Contract Details</h6>
                <div className="row1">
                    <div className="eachinputholder">
                        <h5>Buyer Name</h5>
                        <TextInput className="textinput" value ={buyersname}  options={allbuyersname} trigger={[""]} onSelect={(val) => onselect('buyersname',val)} onChange={(val) => onchange('buyersname',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Buyer Agent</h5>
                        <TextInput className="textinput" value ={buyeragent}  options={allbuyersagent} trigger={[""]} onSelect={(val) => onselect('buyeragent',val)} onChange={(val) => onchange('buyeragent',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Seller Name</h5>
                        <TextInput className="textinput" value ={sellersname}  options={allsellersname} trigger={[""]} onSelect={(val) => onselect('sellername',val)} onChange={(val) => onchange('sellername',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Seller Agent</h5>
                        <TextInput className="textinput" value ={selleragent}  options={allselleragent} trigger={[""]} onSelect={(val) => onselect('selleragent',val)} onChange={(val) => onchange('selleragent',val)}/>
                    </div>
                </div>
                <div className="row1">
                    <div className="eachinputholder">
                        <h5>Quality</h5>
                        <select onChange={dropdownselected11}>
                            <option></option>
                            <option selected={quality == "MCU-5"}>MCU-5</option>
                            <option selected={quality == "S-6"}>S-6</option>
                            <option selected={quality == "J-34"}>J-34</option>
                            <option selected={quality == "DCH-32"}>DCH-32</option>
                            <option selected={quality == "Others"}>Others</option>
                        </select>
                    </div>
                    <div className="eachinputholder">
                        <h5>Area</h5>
                        <TextInput className="textinput" value ={area}  options={[]} trigger={[""]} onSelect={(val) => onselect('area',val)} onChange={(val) => onchange('area',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Item</h5>
                        <select onChange={dropdownselected22}>
                            <option></option>
                            <option selected={item == "Organic"}>Organic</option>
                            <option selected={item == "Conventional"}>Conventional</option>
                            <option selected={item == "BCI"}>BCI</option>
                            <option selected={item == "IC2"}>IC2</option>
                            <option selected={item == "IC1"}>IC1</option>
                            <option selected={item == "Others"}>Others</option>
                        </select>
                    </div>
                    <div className="eachinputholder">
                        <h5>Crop Year</h5>
                        <select onChange={radiochecked}>
                            <option></option>
                            <option selected={cropyear == "19-20"}>19-20</option>
                            <option selected={cropyear == "20-21"}>20-21</option>
                            <option selected={cropyear == "21-22"}>21-22</option>
                            <option selected={cropyear == "22-23"}>22-23</option>
                            <option selected={cropyear == "23-24"}>23-24</option>
                        </select>
                    </div>
                    {/* <div className="eachinputholder eachinputholderspecial">
                    <h5>Crop Year</h5>
                    <div className="radios">
                        <div>
                            <input type="radio" id="html" name="fav_language" value="19-20" onChange={radiochecked} checked={cropyear == "19-20"} />
                            <label for="html">19-20</label><br />
                        </div>
                        <div>
                            <input type="radio" id="css" name="fav_language" value="20-21"  onChange={radiochecked} checked={cropyear == "20-21"}/>
                            <label for="css">20-21</label><br />
                        </div>
                        <div>
                            <input type="radio" id="javascript" name="fav_language" value="21-22"  onChange={radiochecked} checked={cropyear == "21-22"}/>
                            <label for="javascript">21-22</label>
                        </div>
                    </div>
                    </div> */}

                    </div>
                <div className="row1">
                    <div className="eachinputholder">
                        <h5>Road/Sea</h5>
                        <select onChange={dropdownselected33}>
                            <option></option>
                            <option selected={roadsea == "Road"}>Road</option>
                            <option selected={roadsea == "Sea"}>Sea</option>
                            <option selected={roadsea == "Bhomra"}>Bhomra</option>
                            <option selected={roadsea == "Benapole"}>Benapole</option>
                        </select>
                    </div>
                    <div className="eachinputholder">
                        <h5>Commission</h5>
                        <input className="textinput" type = "text" defaultValue ={commission} options={[]} trigger={[""]} onSelect={(val) => onselect('commission',val)} onChange={(val) => onchange('commission',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Contract Date</h5>
                        <input className="textinput" type = "date" defaultValue ={date} options={[]}  onChange={(val) => onchange('date',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Contract Rate</h5>
                        <input className="textinput" type = "text" defaultValue ={contractedreate} options={[]} trigger={[""]} onSelect={(val) => onselect('contractedreate',val)} onChange={(val) => onchange('contractedreate',val)}/>
                    </div>
                  
                </div>

                <div className="row1">

                    <div className="eachinputholder">
                        <h5>PI Number</h5>
                        <TextInput className="textinput" value ={pinumber}  options={[]} trigger={[""]} onSelect={(val) => onselect('pinumber',val)} onChange={(val) => onchange('pinumber',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>PI Date</h5>
                        <input className="textinput" type = "date" defaultValue ={pidate} options={[]}  onChange={(val) => onchange('pidate',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Overseas Commission</h5>
                        <input className="textinput" type = "text" defaultValue ={overseascommission} options={[]} trigger={[""]} onSelect={(val) => onselect('overseascommission',val)} onChange={(val) => onchange('overseascommission',val)}/>
                    </div>
     


                </div>
                <h6>LC Details</h6>
                <div className="row1">
                    <div className="eachinputholder">
                        <h5>LC MTS</h5>
                        <input className="textinput" type = "number" defaultValue ={lcmts} options={[]} trigger={[""]} onSelect={(val) => onselect('lcmts',val)} onChange={(val) => onchange('lcmts',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Bales</h5>
                        <input className="textinput" disabled={true} type = "number" value ={bales} options={[]} trigger={[""]} onSelect={(val) => onselect('bales',val)} onChange={(val) => onchange('bales',val)} ref={myinp => (balesref = myinp)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Rate</h5>
                        <input className="textinput" type = "number" defaultValue ={rate} options={[]} trigger={[""]} onSelect={(val) => onselect('rate',val)} onChange={(val) => onchange('rate',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>LC Number</h5>
                        <TextInput className="textinput" value ={lcnumber}  options={[]} trigger={[""]} onSelect={(val) => onselect('lcnumber',val)} onChange={(val) => onchange('lcnumber',val)}/>
                    </div>
               
                </div>
                <div className="row1">
             
             
                    <div className="eachinputholder">
                        <h5>LC Payment Terms</h5>
                        <TextInput className="textinput" value ={lcpaymentterms}  options={[]} trigger={[""]} onSelect={(val) => onselect('lcpaymentterms',val)} onChange={(val) => onchange('lcpaymentterms',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>LC Bank</h5>
                        <TextInput className="textinput" value ={lcbank}  options={[]} trigger={[""]} onSelect={(val) => onselect('lcbank',val)} onChange={(val) => onchange('lcbank',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Advising Bank</h5>
                        <TextInput className="textinput" value ={advisingbank}  options={[]} trigger={[""]} onSelect={(val) => onselect('advisingbank',val)} onChange={(val) => onchange('advisingbank',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>LC Date</h5>
                        <input className="textinput" type = "date" defaultValue ={lcdate} options={[]}  onChange={(val) => onchange('lcdate',val)}/>
                    </div>
 
                 
 
                </div>
                
                <div className="row1">
     
            
                    <div className="eachinputholder">
                        <h5>Expiry Date</h5>
                        <input className="textinput" type = "date" defaultValue ={expirydate} options={[]}  onChange={(val) => onchange('expirydate',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Latest Shipment Date</h5>
                        <input className="textinput" type = "date" defaultValue ={shippingdate} options={[]}  onChange={(val) => onchange('shippingdate',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Pending MTS</h5>
                        <input className="textinput" disabled={true} type = "number" value ={pendingmts} options={[]} trigger={[""]} onSelect={(val) => onselect('pendingmts',val)} onChange={(val) => onchange('pendingmts',val)} ref={gh => (pendingmtsref = gh)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Pending Bales</h5>
                        <input className="textinput" disabled={true} type = "number" value ={pendingbales} options={[]} trigger={[""]} onSelect={(val) => onselect('pendingbales',val)} onChange={(val) => onchange('pendingbales',val)} ref={ff => (pendingbalesref = ff)}/>
                    </div>
         
                </div>
                <div className="row1">
          
                    <div className="eachinputholder">
                        <h5>LC Remarks</h5>
                        <TextInput className="textinput" value ={lcremarks}  options={[]} trigger={[""]} onSelect={(val) => onselect('lcremarks',val)} onChange={(val) => onchange('lcremarks',val)}/>
                    </div>
                </div>
               {!haslccancelled && <button className="cancellcbutton" onClick={cancellc}>Cancel LC</button> }

                <h6>IP Details</h6>
                    <div className="row1">

                        <div className="eachinputholder">
                            <h5>IP Number</h5>
                            <TextInput className="textinput" value ={ipnumber}  options={[]} trigger={[""]} onSelect={(val) => onselect('ipnumber',val)} onChange={(val) => onchange('ipnumber',val)}/>
                        </div>
                        
                        <div className="eachinputholder">
                            <h5>IP Status</h5>
                            <select onChange={dropdownselected}>
                                <option value="" selected={ipstatus=="" || ipstatus == undefined}>-</option>
                                <option value="Received" selected={ipstatus=="Received"}>Received</option>
                                <option value="Not Received" selected={ipstatus=="Not Received"}>Not Received</option>
                            </select>
                        </div>
                        <div className="eachinputholder">
                            <h5>IP Remarks</h5>
                            <TextInput className="textinput" value ={ipremarks}  options={[]} trigger={[""]} onSelect={(val) => onselect('ipremarks',val)} onChange={(val) => onchange('ipremarks',val)}/>
                        </div>
                    </div>

                <h6>Contracted Parameters</h6>
                <div className="row1">
                    <div className="eachinputholder">
                        <h5>Length</h5>
                        <input className="textinput" type = "text" defaultValue ={length} options={alllengths} trigger={[""]} onSelect={(val) => onselect('length',val)} onChange={(val) => onchange('length',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>MIC</h5>
                        <input className="textinput" type = "text" defaultValue ={mic} options={allmics} trigger={[""]} onSelect={(val) => onselect('mic',val)} onChange={(val) => onchange('mic',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>Strength</h5>
                        <input className="textinput" type = "text" defaultValue ={strength} options={allstrengths} trigger={[""]} onSelect={(val) => onselect('strength',val)} onChange={(val) => onchange('strength',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>RD</h5>
                        <input className="textinput" type = "text" defaultValue ={rd} options={allrd} trigger={[""]} onSelect={(val) => onselect('rd',val)} onChange={(val) => onchange('rd',val)}/>
                    </div>
                </div>
                <div className="row1">

                    <div className="eachinputholder">
                        <h5>Trash</h5>
                        <input className="textinput" type = "text" defaultValue ={trash} options={alltrash} trigger={[""]} onSelect={(val) => onselect('trash',val)} onChange={(val) => onchange('trash',val)}/>
                    </div>
                   
                    <div className="eachinputholder">
                        <h5>Moisture</h5>
                        <input className="textinput" type = "text" defaultValue ={moisture} options={[]} trigger={[""]} onSelect={(val) => onselect('moisture',val)} onChange={(val) => onchange('moisture',val)}/>
                    </div>
                    <div className="eachinputholder">
                        <h5>CG</h5>
                        <input className="textinput" type = "text" defaultValue ={cg} options={[]} trigger={[""]} onSelect={(val) => onselect('cg',val)} onChange={(val) => onchange('cg',val)}/>
                    </div>
                </div>
                <h6>Pioneer Analysis</h6>
                <div className="row1">

                        <div className="eachinputholder">
                            <h5>Length</h5>
                            <input className="textinput" type = "text" defaultValue ={length2} options={alllengths2} trigger={[""]} onSelect={(val) => onselect('length2',val)} onChange={(val) => onchange('length2',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>MIC</h5>
                            <input className="textinput" type = "text" defaultValue ={mic2} options={allmics2} trigger={[""]} onSelect={(val) => onselect('mic2',val)} onChange={(val) => onchange('mic2',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Strength</h5>
                            <input className="textinput" type = "text" defaultValue ={strength2} options={allstrengths2} trigger={[""]} onSelect={(val) => onselect('strength2',val)} onChange={(val) => onchange('strength2',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>RD</h5>
                            <input className="textinput" type = "text" defaultValue ={rd2} options={allrd2} trigger={[""]} onSelect={(val) => onselect('rd2',val)} onChange={(val) => onchange('rd2',val)}/>
                        </div>
                    </div>
                    <div className="row1">

                        <div className="eachinputholder">
                            <h5>Trash</h5>
                            <input className="textinput" type = "text" defaultValue ={trash2} options={alltrash} trigger={[""]} onSelect={(val) => onselect('trash2',val)} onChange={(val) => onchange('trash2',val)}/>
                        </div>

                        <div className="eachinputholder">
                            <h5>Moisture</h5>
                            <input className="textinput" type = "text" defaultValue ={moisture2} options={[]} trigger={[""]} onSelect={(val) => onselect('moisture2',val)} onChange={(val) => onchange('moisture2',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>CG</h5>
                            <input className="textinput" type = "text" defaultValue ={cg2} options={[]} trigger={[""]} onSelect={(val) => onselect('cg2',val)} onChange={(val) => onchange('cg2',val)}/>
                        </div>
                    </div>
                    <h6>Lot Details</h6>
                    <div className="row1">

                        <div className="eachinputholder">
                            <h5>LOT Numbers ({lotcounttotal})</h5>
                            <TextInput className="textinput" value ={lotnumbers}  options={[]} trigger={[""]} onSelect={(val) => onselect('lotnumbers',val)} onChange={(val) => onchange('lotnumbers',val)}/>
                            <button onClick={savelotnumbers}>Save Lot Numbers</button>
                        </div>
                    </div>
                    <h6>Sample & Testing Details</h6>
                    <div className="row1">
                    <div className="eachinputholder">
                            <h5>LOT Sampled  ({samplecount})</h5>
                           {originallotnumbers != "" && originallotnumbers.split(",").map(each => {
                               return(<div style={{height : 30,display : 'flex',justifyContent : 'center'}}><input type="checkbox" value={each} style={{width : 50}} defaultChecked={checkforpresence(each,"sampled") == true ? true : false} onChange={checkboxsampled} /><h5>{each}</h5></div>)
                           })}
                        </div>

                        {/* <div className="eachinputholder">
                            <h5>LOT Sampled  ({samplecount})</h5>
                            <TextInput className="textinput" value ={lotsampled}  options={[]} trigger={[""]} onSelect={(val) => onselect('lotsampled',val)} onChange={(val) => onchange('lotsampled',val)}/>
                        </div> */}
                        <div className="eachinputholder">
                            <h5>LOT Not Sampled  ({notsamplecouunt})</h5>
                           {originallotnumbers != "" && originallotnumbers.split(",").map(each => {
                               return(<div style={{height : 30,display : 'flex',justifyContent : 'center'}}><input type="checkbox" value={each} style={{width : 50}} disabled checked={checkforpresence(each,"sampled") == false ? true : false} onChange={checkboxnotsampled} /><h5>{each}</h5></div>)
                           })}
                        </div>
                        {/* <div className="eachinputholder">
                            <h5>LOT Not Sampled  ({notsamplecouunt})</h5>
                            <TextInput className="textinput" value ={lotnotsampled}  options={[]} trigger={[""]} onSelect={(val) => onselect('lotnotsampled',val)} onChange={(val) => onchange('lotnotsampled',val)}/>
                        </div> */}
                        <div className="eachinputholder">
                            <h5>LOT Tested  ({testedcount})</h5>
                           {originallotnumbers != "" && originallotnumbers.split(",").map(each => {
                               return(<div style={{height : 30,display : 'flex',justifyContent : 'center'}}><input type="checkbox" value={each} style={{width : 50}} defaultChecked={checkforpresence(each,"tested") == true ? true : false} onChange={checkboxtested} /><h5>{each}</h5></div>)
                           })}
                        </div>
                        {/* <div className="eachinputholder">
                            <h5>LOT Tested  ({testedcount})</h5>
                            <TextInput className="textinput" value ={lottested}  options={[]} trigger={[""]} onSelect={(val) => onselect('lottested',val)} onChange={(val) => onchange('lottested',val)}/>
                        </div> */}
                        <div className="eachinputholder">
                            <h5>LOT Not Tested  ({nottestedcount})</h5>
                           {originallotnumbers != "" && originallotnumbers.split(",").map(each => {
                               return(<div style={{height : 30,display : 'flex',justifyContent : 'center'}}><input type="checkbox" value={each} style={{width : 50}} disabled checked={checkforpresence(each,"tested") == false ? true : false} onChange={checkboxnottested} /><h5>{each}</h5></div>)
                           })}
                        </div>
                        {/* <div className="eachinputholder">
                            <h5>LOT Not Tested  ({nottestedcount})</h5>
                            <TextInput className="textinput" value ={lotnottested}  options={[]} trigger={[""]} onSelect={(val) => onselect('lotnottested',val)} onChange={(val) => onchange('lotnottested',val)}/>
                        </div> */}
                    </div>
                    <h6>Passing Details</h6>
                    <div className="row1">

                        <div className="eachinputholder">
                            <h5>Bales Done</h5>
                            <input className="textinput" type = "number" defaultValue ={balesdone} options={[]} trigger={[""]} onSelect={(val) => onselect('balesdone',val)} onChange={(val) => onchange('balesdone',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Bales Pending</h5>
                            <input className="textinput" disabled={true} type = "number" defaultValue ={balespending} options={[]} trigger={[""]} onSelect={(val) => onselect('balespending',val)} onChange={(val) => onchange('balespending',val)} ref={kk => (balespendingref = kk)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Wisdom Person</h5>
                            <TextInput className="textinput" value ={wisdomperson}  options={[]} trigger={[""]} onSelect={(val) => onselect('wisdomperson',val)} onChange={(val) => onchange('wisdomperson',val)}/>
                        </div>
                    </div>

                    <h6>Quality Analysis</h6>
                    <div className="row1">

                        <div className="eachinputholder">
                            <h5>Qualtiy Claim</h5>
                            <select onChange={dropdownselected2}>
                                <option selected={qualityanalysis=="Yes"}>Yes</option>
                                <option selected={qualityanalysis=="No"}>No</option>
                            </select>
                        </div>
                        <div className="eachinputholder">
                            <h5>Qualtiy Remarks</h5>
                            <TextInput className="textinput" value ={remark}  options={[]} trigger={[""]} onSelect={(val) => onselect('remark',val)} onChange={(val) => onchange('remark',val)}/>
                        </div>
                    </div>

                    {additionaluserinfo !== null && additionaluserinfo !== undefined && additionaluserinfo.role !== undefined && ((additionaluserinfo.role.toLowerCase() == "dataentry" || additionaluserinfo.role.toLowerCase() == "data entry") || additionaluserinfo.role.toLowerCase() == "superadmin") &&
                    <div>
                    <div className="eachinputholder">
                        <button onClick={updatetapped}>Edit Contract</button>
                    </div>

                    <div className="eachinputholder">
                        <button onClick={deletetapped} className='delbtn'>Delete Contract</button>
                    </div>
                    </div> }
   
               

                </div>

            }

<div className='subline'><h4>Created on : {new Date(createdon * 1000).toLocaleString()}</h4></div>
<div className='subline'><h4>Created by : {createdby}</h4></div>



            </div>}
        </div>
    )
}

export default Editcontract
