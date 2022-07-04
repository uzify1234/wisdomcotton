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


function Editinvoice() {
    const navigate = useNavigate();
    var {invoiceid,contractid} = useParams();
    const [contractdata, setcontractdata] = useState({});

    const [dataloaded, setdataloaded] = useState(false);
    var invoiceamountref = useRef(null);
    var invoiceweightref = useRef(null);
    var netref = useRef(null);
    var netshortweightref = useRef(null);
    var netshortweightlbsref = useRef(null);
    var shortweightamountref = useRef(null);
    var shortweightpercentageref = useRef(null);
    var shortweightbalanceref = useRef(null);
    var lbsref = useRef(null);
    var invoicemtsref = useRef(null);
    var differenceref = useRef(null);
    var paymentdelayref = useRef(null);

    const [createdby, setcreatedby] = useState("");
    const [createdon, setcreatedon] = useState("");

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

    const deletetapped = () => {
        confirmAlert({
            title: 'Delete Invoice ?',
            message: 'Are you sure to delete this invoice ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    db.collection('contracts').doc(contractid).collection('invoices').doc(invoiceid).delete().then(df => {
                        var combinedid = invoiceid+"__"+contractid;

                        db.collection('invoices').doc(combinedid).delete().then(dfgg => {
                            alert("Invoice Deleted");
                            navigate('/allinvoices');
                        })
 
                        
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

    const noshortweighttapped = () => {
        db.collection('contracts').doc(contractid).collection('invoices').doc(invoiceid).update({
            invoicestatus : "Payment Done"
        }).then(eed => {
            alert("Invoice Status Updated to PAYMENT DONE");
        })
    }

    const getmecurrentstatus = () => {
        var status = "Shipment Pending";
        
        var date1 = new Date(etd);
        var date2 = new Date();
        var date3 = new Date(docdeliverydate);

        if(contractdata.lcnumber == "" || contractdata.lcnumber == null || contractdata.lcnumber == undefined) {
            status = "LC Pending";
        }
        else if(etd == "" || date1 == undefined) {
            status = "Shipment Pending";
        }
        else if(date1.getTime() > date2.getTime()) {
            status = "Shipment Pending";
        }
        else if(date1.getTime() < date2.getTime()) {
            status = "Courier Pending";
        }
        else {

        }

        if(docdeliverydate == "" || date3 == undefined) {

        }
        else {
            if(date3.getTime() < date2.getTime()) {
                status = "Payment Pending";
            }
        }

        if(paymentadvise == "" || paymentadvise == undefined || paymentadvise == null) {

        }
        else {
            status = "Weighment Report Pending";
        }

        if(gross == "" || gross == undefined || gross == null) {

        }
        else {
            status = "Short Weight Pending";
        }

        if(shortweightpaid == "" || shortweightpaid == undefined || shortweightpaid == null) {

        }
        else {
            status = "Payment Done";
        }

     
        return status;
    }


    useEffect(() => {
        db.collection('contracts').doc(contractid).get().then(wholecont => {
            setcontractdata(wholecont.data());
            console.log(wholecont.data());
        })
        if(invoiceid !== "new") {
 
        db.collection('contracts').doc(contractid).collection('invoices').doc(invoiceid).get().then(invoicedata => {
            setcreatedon(checkandset(invoicedata.data().lastupdatedon));
            db.collection('users').doc(invoicedata.data().lastupdatedby).get().then(uds => {
                setcreatedby(checkandset(uds.data().name));

            })
            setbuyercha(invoicedata.data().buyercha);
            setshippingremarks(invoicedata.data.shippingremarks);
            setinvoicenumber(invoicedata.data().invoicenumber);
            setinvoiceamount(invoicedata.data().invoiceamount);
            setinvoicebales(invoicedata.data().invoicebales);
            setlbs(invoicedata.data().lbs);
            setinvoicemts(invoicedata.data().invoicemts);
            setinvoiceweight(invoicedata.data().invoiceweight);
            setcourierline(invoicedata.data().courierline);
            setdocpodnumber(invoicedata.data().docpodnumber);
            setdocdispatchdate(invoicedata.data().docdispatchdate);
            setdocdeliverydate(invoicedata.data().docdeliverydate);
            setshippingline(invoicedata.data().shippingline);
            setplno(invoicedata.data().plno);
            setetd(invoicedata.data().etd);
            seteta(invoicedata.data().eta);
            setcha(invoicedata.data().cha);
            setsellercontroller(invoicedata.data().sellercontroller);
            setotherlocation(invoicedata.data().otherlocation);
            setdocumentremark(invoicedata.data().documentremark);
            setinvoiceweight(invoicedata.data().invoiceweight);
            setgross(invoicedata.data().gross);
            settare(invoicedata.data().tare);
            setnet(invoicedata.data().net);
            setnetshortweight(invoicedata.data().netshortweight);
            setshortweightlbs(invoicedata.data().shortweightlbs);
            setshortweightamount(invoicedata.data().shortweightamount);
            setshortweightdebitnotedate(invoicedata.data().shortweightdebitnotedate);
            setshortweightpercentage(invoicedata.data().shortweightpercentage);
            setshortweightpaid(invoicedata.data().shortweightpaid);
            setshortweightbalance(invoicedata.data().shortweightbalance);
            setshortweightremark(invoicedata.data().shortweightremark);
            setpaymentadvise(invoicedata.data().paymentadvise);
            setvaluedate(invoicedata.data().valuedate);
            setdifference(invoicedata.data().difference);
            setpaymentdelay(invoicedata.data().paymentdelay);
            setinterestwisdomcotton(invoicedata.data().interestwisdomcotton);
            setinterestginner(invoicedata.data().interestginner);
            setpaymentremark(invoicedata.data().paymentremark);
            settcreceiveddate(invoicedata.data().tcreceiveddate);
            settcqty(invoicedata.data().tcqty);
            setreport(invoicedata.data().report);
            setbcireport(invoicedata.data().bcireport);
            setlocation(invoicedata.data().location);
            settcstatus(invoicedata.data().tcstatus);
            setgmo(invoicedata.data().gmo);
            setbcistatus(invoicedata.data().bcistatus);
            setdataloaded(true);
            renderotherinitials(invoicedata.data());
        
        })
        }
        else {
            setdataloaded(true);
        }
    }, [])

    const checkandset = (text) => {
        if(text == null || text == undefined) {
            return "";
        }
        return text;
    }


  







    const [invoicenumber, setinvoicenumber] = useState("");
    const [invoiceamount, setinvoiceamount] = useState(0);
    const [invoicebales, setinvoicebales] = useState(0);
    const [lbs, setlbs] = useState(0);
    const [invoicemts, setinvoicemts] = useState(0);
    const [invoiceweight, setinvoiceweight] = useState(0);
    const [courierline, setcourierline] = useState("");
    const [docpodnumber, setdocpodnumber] = useState("");
    const [docdispatchdate, setdocdispatchdate] = useState("");
    const [docdeliverydate, setdocdeliverydate] = useState("");
    const [shippingline, setshippingline] = useState("");
    const [plno, setplno] = useState("");
    const [etd, setetd] = useState("");
    const [eta, seteta] = useState("");
    const [cha, setcha] = useState("");
    const [buyercha, setbuyercha] = useState("");
    const [shippingremarks, setshippingremarks] = useState("");
    const [sellercontroller, setsellercontroller] = useState("");
    const [location, setlocation] = useState("");
    const [otherlocation, setotherlocation] = useState("");
    const [documentremark, setdocumentremark] = useState("");
    const [gross, setgross] = useState("");
    const [tare, settare] = useState("");
    const [net, setnet] = useState("");
    const [netshortweight, setnetshortweight] = useState("");
    const [shortweightlbs, setshortweightlbs] = useState("");
    const [shortweightamount, setshortweightamount] = useState("");
    const [shortweightdebitnotedate, setshortweightdebitnotedate] = useState("");
    const [shortweightpercentage, setshortweightpercentage] = useState("");
    const [shortweightpaid, setshortweightpaid] = useState(0);
    const [shortweightbalance, setshortweightbalance] = useState("");
    const [shortweightremark, setshortweightremark] = useState("");
    const [paymentadvise, setpaymentadvise] = useState("");
    const [valuedate, setvaluedate] = useState("");
    const [difference, setdifference] = useState("");
    const [paymentdelay, setpaymentdelay] = useState("");
    const [interestwisdomcotton, setinterestwisdomcotton] = useState("");
    const [interestginner, setinterestginner] = useState("");
    const [paymentremark, setpaymentremark] = useState("");
    const [tcreceiveddate, settcreceiveddate] = useState("");
    const [tcqty, settcqty] = useState("");
    const [report, setreport] = useState("");
    const [tcstatus, settcstatus] = useState("");
    const [gmo, setgmo] = useState("");
    const [bcireport, setbcireport] = useState("");
    const [bcistatus, setbcistatus] = useState("");
    const [invoiceweightnet, setinvoiceweightnet] = useState("");



    const renderotherinitials = (data) => {
        var fg = ((Number(data.invoiceamount)/Number(contractdata.rate)) * 100).toFixed(2);
        var ffg = (fg/2204.6).toFixed(2);
        setlbs(fg);
        setinvoicemts(ffg);


        var dc = (Number(data.invoiceamount) - Number(paymentadvise)).toFixed(2);
        setdifference(dc);

        var mg = (Number(data.invoiceamount)/2.2046).toFixed(2);
        setinvoiceweight(mg);
        setinvoiceweightnet((Number(mg)/2.2046).toFixed(2));

        var ww = (Number(mg) - net).toFixed(2);
        setnetshortweight(ww);


        var ss = (Number(ww) * 2.2046).toFixed(2);
        setshortweightlbs(ss);

        var wq = ((ss * Number(contractdata.rate))/100).toFixed(2);
        setshortweightamount(wq);

        var re = (wq - shortweightpaid).toFixed(2);
        setshortweightbalance(re);

        var bf = ((wq/invoiceamount) * 100).toFixed(2);
        setshortweightpercentage(bf);

        var vv = (Number(data.gross) - Number(tare)).toFixed(2);
            setnet(vv);

            var ww = (Number(invoiceweight) - vv).toFixed(2);
            setnetshortweight(ww);

            var ss = (Number(ww) * 2.2046).toFixed(2);
            setshortweightlbs(ss);

            var wq = ((ss * Number(contractdata.rate))/100).toFixed(2);
            setshortweightamount(wq);

            var re = wq - shortweightpaid.toFixed(2);
            setshortweightbalance(re);


           var bf = ((wq/invoiceamount) * 100).toFixed(2);
           setshortweightpercentage(bf);

        
    }
 


    const onselect = (mode,e) => {
       if(mode == "invoicenumber") {
           setinvoicenumber(e);
       }
       if(mode == "buyercha") {
        setbuyercha(e);
    }
    if(mode == "shippingremarks") {
        setshippingremarks(e);
    }
       if(mode == "invoiceamount") {
        setinvoiceamount(e.target.value);
        var fg = ((Number(e.target.value)/Number(contractdata.rate)) * 100).toFixed(2);
        var ffg = (fg/2204.6).toFixed(2);
        setlbs(fg);
        setinvoicemts(ffg);
        lbsref.value = fg;
        invoicemtsref.value = ffg;

        var dc = (Number(e.target.value) - Number(paymentadvise)).toFixed(2);
        setdifference(dc);
        differenceref.value = dc;

        var mg = (Number(e.target.value)/2.2046).toFixed(2);
        setinvoiceweight(mg);
        invoiceweightref.value =mg ;

        var ww = (Number(mg) - net).toFixed(2);
        setnetshortweight(ww);
        netshortweightref.value = ww;


        var ss = (Number(ww) * 2.2046).toFixed(2);
        setshortweightlbs(ss);
        netshortweightlbsref.value = ss;

        var wq = ((ss * Number(contractdata.rate))/100).toFixed(2);
        setshortweightamount(wq);
        shortweightamountref.value = wq;

        var re = (wq - shortweightpaid).toFixed(2);
        setshortweightbalance(re);
        shortweightbalanceref.value = re;

        var bf = ((wq/invoiceamount) * 100).toFixed(2);
        setshortweightpercentage(bf);
        shortweightpercentageref.value = bf;

        }
        if(mode == "invoicebales") {
            setinvoicebales(e.target.value);
        }
        if(mode == "lbs") {
            setlbs(e.target.value);
            // setinvoiceamount(Number(e.target.value) * Number(contractdata.rate));
            console.log((Number(e.target.value) * Number(contractdata.rate)));
            // invoiceamountref.value = (Number(e.target.value) * Number(contractdata.rate));

            var dc =(Number(e.target.value) * Number(contractdata.rate)) - Number(paymentadvise);
            


            // var bf = ((shortweightamount/(Number(e.target.value) * Number(contractdata.rate))) * 100).toFixed(2);
            // setshortweightpercentage(bf);
            // shortweightpercentageref.value = bf;

           

        }
        if(mode == "invoicemts") {
            setinvoicemts(e.target.value);
        }
        if(mode == "invoiceweight") {
            setinvoiceweight(e.target.value);
            setinvoiceweightnet((Number(e.target.value)/2.2046).toFixed(2));
            invoiceweightref.value = (Number(e.target.value)/2.2046).toFixed(2);
    
        }
        if(mode == "courierline") {
            setcourierline(e);
        }
        if(mode == "docpodnumber") {
            setdocpodnumber(e);
        }
        if(mode == "docdispatchdate") {
            setdocdispatchdate(e.target.value);
        }
        if(mode == "docdeliverydate") {
            setdocdeliverydate(e.target.value);
        }
        if(mode == "shippingline") {
            setshippingline(e);
        }
        if(mode == "plno") {
            setplno(e);
        }
        if(mode == "etd") {
            setetd(e.target.value);
            getmecurrentstatus(e.target.value);
        }
        if(mode == "eta") {
            seteta(e.target.value);
        }
        if(mode == "cha") {
            setcha(e);
        }
        if(mode == "sellercontroller") {
            setsellercontroller(e);
        }
        if(mode == "otherlocation") {
            setotherlocation(e);
        }
        if(mode == "documentremark") {
            setdocumentremark(e);
        }
        if(mode == "invoiceweight") {
            setinvoiceweight(e.target.value);
        }
        if(mode == "gross") {
            setgross(e.target.value);
            var vv = (Number(e.target.value) - Number(tare)).toFixed(2);
            netref.value = vv;
            setnet(vv);

            var ww = (Number(invoiceweight) - vv).toFixed(2);
            setnetshortweight(ww);
            netshortweightref.value = ww;

            var ss = (Number(ww) * 2.2046).toFixed(2);
            setshortweightlbs(ss);
            netshortweightlbsref.value = ss;

            var wq = ((ss * Number(contractdata.rate))/100).toFixed(2);
            setshortweightamount(wq);
            shortweightamountref.value = wq;

            var re = wq - shortweightpaid.toFixed(2);
            setshortweightbalance(re);
            shortweightbalanceref.value = re;


           var bf = ((wq/invoiceamount) * 100).toFixed(2);
           setshortweightpercentage(bf);
           shortweightpercentageref.value = bf;
        }
        if(mode == "tare") {
            settare(e.target.value);
            var vv = (Number(gross) - Number(e.target.value)).toFixed(2);
            netref.value = vv;
            setnet(vv);
            var ww = (Number(invoiceweight) - vv).toFixed(2);
            setnetshortweight(ww);
            netshortweightref.value = ww;

            var ss = (Number(ww) * 2.2046).toFixed(2);
            setshortweightlbs(ss);
            netshortweightlbsref.value = ss;

            var wq = ((ss * Number(contractdata.rate))/100).toFixed(2);
            setshortweightamount(wq);
            shortweightamountref.value = wq;

            var re = (wq - shortweightpaid).toFixed(2);
            setshortweightbalance(re);
            shortweightbalanceref.value = re;

           var bf = ((wq/invoiceamount) * 100).toFixed(2);
           setshortweightpercentage(bf);
           shortweightpercentageref.value = bf;
        }
        if(mode == "net") {
            setnet(e.target.value);
        }
        if(mode == "netshortweight") {
            setnetshortweight(e.target.value);
        }
        if(mode == "shortweightlbs") {
            setshortweightlbs(e.target.value);
        }
        if(mode == "shortweightamount") {
            setshortweightamount(e.target.value);
        }
        if(mode == "shortweightdebitnotedate") {
            setshortweightdebitnotedate(e.target.value);
        }
        if(mode == "shortweightpercentage") {
            setshortweightpercentage(e.target.value);
        }
        if(mode == "shortweightpaid") {
            setshortweightpaid(e.target.value);

            var re = (shortweightamount - Number(e.target.value)).toFixed(2);
            setshortweightbalance(re);
            shortweightbalanceref.value = re;
        }
        if(mode == "shortweightbalance") {
            setshortweightbalance(e.target.value);
        }
        if(mode == "shortweightremark") {
            setshortweightremark(e);
        }
        if(mode == "paymentadvise") {
            setpaymentadvise(e.target.value);

            var dc =((invoiceamount) - Number(e.target.value)).toFixed(2);
            setdifference(dc);
            differenceref.value = dc;
        }
        if(mode == "valuedate") {
            setvaluedate(e.target.value);
        }
        if(mode == "difference") {
            setdifference(e.target.value);
        }
        if(mode == "paymentdelay") {
            setpaymentdelay(e.target.value);
        }
        if(mode == "interestwisdomcotton") {
            setinterestwisdomcotton(e.target.value);
        }
        if(mode == "interestginner") {
            setinterestginner(e.target.value);
        }
        if(mode == "paymentremark") {
            setpaymentremark(e);
        }
        if(mode == "tcreceiveddate") {
            settcreceiveddate(e.target.value);
        }
        if(mode == "tcqty") {
            settcqty(e.target.value);
        }
        if(mode == "report") {
            setreport(e);
        }
        if(mode == "bcireport") {
            setbcireport(e);
        }
  
    

    }



    const onchange = (mode,e) => {
        if(mode == "invoicenumber") {
            setinvoicenumber(e);
        }
        if(mode == "buyercha") {
            setbuyercha(e);
        }
        if(mode == "shippingremarks") {
            setshippingremarks(e);
        }
        if(mode == "invoiceamount") {
            setinvoiceamount(e.target.value);
            var fg = ((Number(e.target.value)/Number(contractdata.rate)) * 100).toFixed(2);
            var ffg = (fg/2204.6).toFixed(2);
            setlbs(fg);
            setinvoicemts(ffg);
            lbsref.value = fg;
            invoicemtsref.value = ffg;
    
            var dc = (Number(e.target.value) - Number(paymentadvise)).toFixed(2);
            setdifference(dc);
            differenceref.value = dc;
    
            var mg = (Number(e.target.value)/2.2046).toFixed(2);
            setinvoiceweight(mg);
            invoiceweightref.value =mg ;
    
            var ww = (Number(mg) - net).toFixed(2);
            setnetshortweight(ww);
            netshortweightref.value = ww;
    
    
            var ss = (Number(ww) * 2.2046).toFixed(2);
            setshortweightlbs(ss);
            netshortweightlbsref.value = ss;
    
            var wq = ((ss * Number(contractdata.rate))/100).toFixed(2);
            setshortweightamount(wq);
            shortweightamountref.value = wq;
    
            var re = (wq - shortweightpaid).toFixed(2);
            setshortweightbalance(re);
            shortweightbalanceref.value = re;
    
            var bf = ((wq/invoiceamount) * 100).toFixed(2);
            setshortweightpercentage(bf);
            shortweightpercentageref.value = bf;
    
            }
         if(mode == "invoicebales") {
             setinvoicebales(e.target.value);
         }
         if(mode == "lbs") {
             setlbs(e.target.value);
        
         }
         if(mode == "invoicemts") {
             setinvoicemts(e.target.value);
         }
         if(mode == "invoiceweight") {
             setinvoiceweight(e.target.value);
             setinvoiceweightnet((Number(e.target.value)/2.2046).toFixed(2));
             invoiceweightref.value = (Number(e.target.value)/2.2046).toFixed(2);
             var ww = Number((Number(e.target.value)/2.2046).toFixed(2)) - net;
             setnetshortweight(ww);
             netshortweightref.value = ww;


             var ss = (Number(ww) * 2.2046).toFixed(2);
             setshortweightlbs(ss);
             netshortweightlbsref.value = ss;

             var wq = ((ss * Number(contractdata.rate))/100).toFixed(2);
             setshortweightamount(wq);
             shortweightamountref.value = wq;

             var re = wq - shortweightpaid;
             setshortweightbalance(re);
             shortweightbalanceref.value = re;

            var bf = ((wq/invoiceamount) * 100).toFixed(2);
            setshortweightpercentage(bf);
            shortweightpercentageref.value = bf;

         }
         if(mode == "courierline") {
             setcourierline(e);
         }
         if(mode == "docpodnumber") {
             setdocpodnumber(e);
         }
         if(mode == "docdispatchdate") {
             setdocdispatchdate(e.target.value);

         }
         if(mode == "docdeliverydate") {
             setdocdeliverydate(e.target.value);

             var date = new Date(e.target.value);
             date.setDate(date.getDate() + 9);



            
             var monthnum = ((date.getMonth()) + 1);
             var yearnum = (date.getFullYear());
             var daynum = (date.getDate());

             monthnum = monthnum < 10 ? "0"+monthnum : monthnum;
             daynum = daynum < 10 ? "0"+daynum : daynum;



  
             var futurestring = yearnum+"-"+monthnum+"-"+daynum;
             paymentdelayref.valueAsDate = date;
             setpaymentdelay(futurestring);
         }
         if(mode == "shippingline") {
             setshippingline(e);
         }
         if(mode == "plno") {
             setplno(e);
         }
         if(mode == "etd") {
             setetd(e.target.value);
             getmecurrentstatus(e.target.value);
         }
         if(mode == "eta") {
             seteta(e.target.value);
         }
         if(mode == "cha") {
             setcha(e);
         }
         if(mode == "sellercontroller") {
             setsellercontroller(e);
         }
         if(mode == "otherlocation") {
             setotherlocation(e);
         }
         if(mode == "documentremark") {
             setdocumentremark(e);
         }
         if(mode == "invoiceweight") {
             setinvoiceweight(e.target.value);
         }
         if(mode == "gross") {
             setgross(e.target.value);
             var vv = (Number(e.target.value) - Number(tare)).toFixed(2);
             netref.value = vv;
             setnet(vv);

             var ww = (Number(invoiceweight) - vv).toFixed(2);
             setnetshortweight(ww);
             netshortweightref.value = ww;

             var ss = (Number(ww) * 2.2046).toFixed(2);
             setshortweightlbs(ss);
             netshortweightlbsref.value = ss;

             var wq = ((ss * Number(contractdata.rate))/100).toFixed(2);
             setshortweightamount(wq);
             shortweightamountref.value = wq;

             var re = wq - shortweightpaid.toFixed(2);
             setshortweightbalance(re);
             shortweightbalanceref.value = re;


            var bf = ((wq/invoiceamount) * 100).toFixed(2);
            setshortweightpercentage(bf);
            shortweightpercentageref.value = bf;
         }
         if(mode == "tare") {
             settare(e.target.value);
             var vv = (Number(gross) - Number(e.target.value)).toFixed(2);
             netref.value = vv;
             setnet(vv);
             var ww = (Number(invoiceweight) - vv).toFixed(2);
             setnetshortweight(ww);
             netshortweightref.value = ww;

             var ss = (Number(ww) * 2.2046).toFixed(2);
             setshortweightlbs(ss);
             netshortweightlbsref.value = ss;

             var wq = ((ss * Number(contractdata.rate))/100).toFixed(2);
             setshortweightamount(wq);
             shortweightamountref.value = wq;

             var re = (wq - shortweightpaid).toFixed(2);
             setshortweightbalance(re);
             shortweightbalanceref.value = re;

            var bf = ((wq/invoiceamount) * 100).toFixed(2);
            setshortweightpercentage(bf);
            shortweightpercentageref.value = bf;
         }
         if(mode == "net") {
             setnet(e.target.value);
         }
         if(mode == "netshortweight") {
             setnetshortweight(e.target.value);
         }
         if(mode == "shortweightlbs") {
             setshortweightlbs(e.target.value);
         }
         if(mode == "shortweightamount") {
             setshortweightamount(e.target.value);
         }
         if(mode == "shortweightdebitnotedate") {
             setshortweightdebitnotedate(e.target.value);
         }
         if(mode == "shortweightpercentage") {
             setshortweightpercentage(e.target.value);
         }
         if(mode == "shortweightpaid") {
             setshortweightpaid(e.target.value);

             var re = (shortweightamount - Number(e.target.value)).toFixed(2);
             setshortweightbalance(re);
             shortweightbalanceref.value = re;
         }
         if(mode == "shortweightbalance") {
             setshortweightbalance(e.target.value);
         }
         if(mode == "shortweightremark") {
             setshortweightremark(e);
         }
         if(mode == "paymentadvise") {
             setpaymentadvise(e.target.value);


            var dc = ((invoiceamount) - Number(e.target.value)).toFixed(2);
            setdifference(dc);
            differenceref.value = dc;
         }
         if(mode == "valuedate") {
             setvaluedate(e.target.value);
         }
         if(mode == "difference") {
             setdifference(e.target.value);
         }
         if(mode == "paymentdelay") {
             setpaymentdelay(e.target.value);
         }
         if(mode == "interestwisdomcotton") {
             setinterestwisdomcotton(e.target.value);
         }
         if(mode == "interestginner") {
             setinterestginner(e.target.value);
         }
         if(mode == "paymentremark") {
             setpaymentremark(e);
         }
         if(mode == "tcreceiveddate") {
             settcreceiveddate(e.target.value);
         }
         if(mode == "tcqty") {
             settcqty(e.target.value);
         }
         if(mode == "report") {
             setreport(e);
         }
         if(mode == "bcireport") {
             setbcireport(e);
         }

    }
    const dropdownselected = (e) => {
        setlocation(e.target.value);
    }
    const dropdownselected2 = (e) => {
        settcstatus(e.target.value);
    }
    const dropdownselected3 = (e) => {
        setgmo(e.target.value);
    }
    const dropdownselected4 = (e) => {
        setbcistatus(e.target.value);
    }


    const blankempty = (text) => {
        if(text == "" || text == " " || text == null || text == undefined) {
            return true;
        }
        return false;
    }

    const updatetapped = () => {
       
   
    //  if(blankempty(invoiceamount)){
    //     alert("Please Enter Invoice Amount");

    // }
    // else if(blankempty(invoicebales)){
    //     alert("Please Enter Invoice Bales");

    // }
    // else if(blankempty(lbs)){
    //     alert("Please Enter LBS");

    // }
    // else if(blankempty(invoicemts)){
    //     alert("Please Enter Invoice MTS");

    // }
    // else if(blankempty(invoiceweight)){
    //     alert("Please Enter Invoice Weight");

    // }
    // else if(blankempty(courierline)){
    //     alert("Please Enter Courier Line");

    // }
    // else if(blankempty(docpodnumber)){
    //     alert("Please Enter DOC Pod Number");

    // }
    // else if(blankempty(docdispatchdate)){
    //     alert("Please Enter DOC Dispatch Date");

    // }
    // else if(blankempty(docdeliverydate)){
    //     alert("Please Enter DOC Delivery Date");

    // }
    // else if(blankempty(shippingline)){
    //     alert("Please Enter Shipping Line");

    // }
    // else if(blankempty(plno)){
    //     alert("Please Enter PL No");

    // }
    // else if(blankempty(etd)){
    //     alert("Please Enter ETD");

    // }
    // else if(blankempty(eta)){
    //     alert("Please Enter ETA");

    // }
    // else if(blankempty(cha)){
    //     alert("Please Enter CHA");

    // }
    // else if(blankempty(sellercontroller)){
    //     alert("Please Enter Seller Controller");

    // }
    // else if(blankempty(location)){
    //     alert("Please Enter Location");

    // }
    // else if(location == "Others" && blankempty(otherlocation)){
    //     alert("Please Enter Other Location");

    // }
    // else if(blankempty(documentremark)){
    //     alert("Please Enter Document Remark");

    // }
    // else if(blankempty(invoiceweight)){
    //     alert("Please Enter Invoice Weight");

    // }
    // else if(blankempty(gross)){
    //     alert("Please Enter Gross");

    // }
    // else if(blankempty(tare)){
    //     alert("Please Enter Tare");

    // }
    // else if(blankempty(net)){
    //     alert("Please Enter NET");

    // }
    // else if(blankempty(netshortweight)){
    //     alert("Please Enter Net Short Weight");

    // }
    // else if(blankempty(shortweightlbs)){
    //     alert("Please Enter Short Weight LBS");

    // }
    // else if(blankempty(shortweightamount)){
    //     alert("Please Enter Short Weight Amount");

    // }
    // else if(blankempty(shortweightdebitnotedate)){
    //     alert("Please Enter Short Weight Debit Note Date");

    // }
    // else if(blankempty(shortweightpercentage)){
    //     alert("Please Enter Short Weight Percentage");

    // }
    // else if(blankempty(shortweightpaid)){
    //     alert("Please Enter Short Weight Paid");

    // }
    // else if(blankempty(shortweightbalance)){
    //     alert("Please Enter Short Weight Balance");

    // }
    // else if(blankempty(shortweightremark)){
    //     alert("Please Enter Short Weight Remark");

    // }
    // else if(blankempty(paymentadvise)){
    //     alert("Please Enter Payment Advise");

    // }
    // else if(blankempty(valuedate)){
    //     alert("Please Enter Value Date");

    // }
    // else if(blankempty(difference)){
    //     alert("Please Enter Difference");

    // }
    // else if(blankempty(paymentdelay)){
    //     alert("Please Enter Payement Delay");

    // }
    // else if(blankempty(interestwisdomcotton)){
    //     alert("Please Enter Interest Wisdom Cotton");

    // }
    // else if(blankempty(interestginner)){
    //     alert("Please Enter Interest Ginner");

    // }
    // else if(blankempty(paymentremark)){
    //     alert("Please Enter Payment Remark");

    // }
    // else if(blankempty(tcreceiveddate)){
    //     alert("Please Enter TC Received Date");

    // }
    // else if(blankempty(tcqty)){
    //     alert("Please Enter TC Qty");

    // }
    // else if(blankempty(report)){
    //     alert("Please Enter Report");

    // }
    // else if(blankempty(tcstatus)){
    //     alert("Please Enter TC Status");

    // }
    // else if(blankempty(bcireport)) {
    //     alert("Please Enter BCI Report");

    // }
    // else if(blankempty(gmo)) {
    //     alert("Please Enter GMO");

    // }
    // else if(blankempty(bcistatus)) {
    //     alert("Please Enter BCI Status");
    // }
    // else {
        var randomid = invoicenumber;
        
        if(invoiceid == "new") {
            var month = new Date().getMonth() + 1;
            var year = "" + new Date().getFullYear();
            db.collection('contracts').doc(contractid).collection('invoicescount').doc(""+year).get().then(ccval => {
                if(invoicenumber == "") {
                    randomid = ccval.data().countvalue + "-"+year;
                }

                var node = {
                    invoicenumber : randomid,
                    invoiceamount : Number(invoiceamount),
                    invoicebales : Number(invoicebales),
                    lbs : Number(lbs),
                    invoicemts : Number(invoicemts),
                    invoiceweight : Number(invoiceweight),
                    courierline : courierline,
                    docpodnumber : docpodnumber,
                    docdispatchdate : docdispatchdate,
                    docdeliverydate : docdeliverydate,
                    shippingline : shippingline,
                    plno : plno,
                    etd : etd,
                    eta : eta,
                    cha : cha,
                    buyercha : buyercha,
                    shippingremarks : shippingremarks ?? "",
                    sellercontroller : sellercontroller,
                    otherlocation : otherlocation,
                    documentremark : documentremark,
                    invoiceweight : Number(invoiceweight),
                    gross : Number(gross),
                    tare : Number(tare),
                    net : Number(net),
                    netshortweight : Number(netshortweight),
                    shortweightlbs : Number(shortweightlbs),
                    shortweightamount : Number(shortweightamount),
                    shortweightdebitnotedate : shortweightdebitnotedate,
                    shortweightpercentage : Number(shortweightpercentage),
                    shortweightpaid : Number(shortweightpaid),
                    shortweightbalance : Number(shortweightbalance),
                    shortweightremark : shortweightremark,
                    paymentadvise : Number(paymentadvise),
                    valuedate : valuedate,
                    difference : Number(difference),
                    paymentdelay : paymentdelay,
                    interestwisdomcotton : Number(interestwisdomcotton),
                    interestginner : Number(interestginner),
                    paymentremark : paymentremark,
                    tcreceiveddate : tcreceiveddate,
                    tcqty : Number(tcqty),
                    report : report,
                    bcireport : bcireport,
                    location : location,
                    tcstatus : tcstatus,
                    gmo : gmo,
                    bcistatus : bcistatus,
                    creaetedon : Math.round((new Date()).getTime() / 1000),
                    contractid : contractid,
                    invoicestatus : getmecurrentstatus(),
                    lastupdatedby : currentuser.uid,
                    lastupdatedon : Math.round((new Date()).getTime() / 1000)
                }
        
                if(invoiceid !== "new") {
                    db.collection('contracts').doc(contractid).collection('invoices').doc(invoiceid).update(node).then(eed => {
                        alert("Invoice Updated");
                        var nd = "" + Math.round((new Date()).getTime() / 1000);
                        db.collection('contracts').doc(contractid).collection('invoices').doc(invoiceid).collection('updatehistory').doc(nd).set({
                            updatedby : currentuser.uid,
                            updatedon : nd
                        }).then(efddd => {
                            navigate('/allinvoices');
                        }).catch(ejfh => {
                            
                        })
                    })
                }
                else {
                    console.log(node);
                    db.collection('contracts').doc(contractid).collection('invoices').doc(randomid).set(node).then(dfg => {
                        var combinedid = randomid+"__"+contractid;

                        db.collection('invoices').doc(combinedid).set({
                            contractid : contractid
                        }).then(fdone => {
                            alert("Invoice Added");
                            db.collection('contracts').doc(contractid).collection('invoicescount').doc(""+year).get().then(latcount => {
                                db.collection('contracts').doc(contractid).collection('invoicescount').doc(""+year).update({
                                    countvalue : latcount.data().countvalue + 1
                                }).then(efd => {
                                    navigate('/allinvoices');
                                }).catch(jhg => {
                                    
                                })
                            }).catch(efd => {
        
                            })
                        })
                        
                    })
                }


            }).catch(efdd => {
                if(month == 1 || month == 2 || month == 3) {
                    year = year - 1;
                }
                randomid = "1-"+year;

                var node = {
                    invoicenumber : randomid,
                    invoiceamount : Number(invoiceamount),
                    invoicebales : Number(invoicebales),
                    lbs : Number(lbs),
                    invoicemts : Number(invoicemts),
                    invoiceweight : Number(invoiceweight),
                    courierline : courierline,
                    docpodnumber : docpodnumber,
                    docdispatchdate : docdispatchdate,
                    docdeliverydate : docdeliverydate,
                    shippingline : shippingline,
                    plno : plno,
                    etd : etd,
                    eta : eta,
                    cha : cha,
                    buyercha : buyercha,
                    shippingremarks : shippingremarks,
                    sellercontroller : sellercontroller,
                    otherlocation : otherlocation,
                    documentremark : documentremark,
                    invoiceweight : Number(invoiceweight),
                    gross : Number(gross),
                    tare : Number(tare),
                    net : Number(net),
                    netshortweight : Number(netshortweight),
                    shortweightlbs : Number(shortweightlbs),
                    shortweightamount : Number(shortweightamount),
                    shortweightdebitnotedate : shortweightdebitnotedate,
                    shortweightpercentage : Number(shortweightpercentage),
                    shortweightpaid : Number(shortweightpaid),
                    shortweightbalance : Number(shortweightbalance),
                    shortweightremark : shortweightremark,
                    paymentadvise : Number(paymentadvise),
                    valuedate : valuedate,
                    difference : Number(difference),
                    paymentdelay : paymentdelay,
                    interestwisdomcotton : Number(interestwisdomcotton),
                    interestginner : Number(interestginner),
                    paymentremark : paymentremark,
                    tcreceiveddate : tcreceiveddate,
                    tcqty : Number(tcqty),
                    report : report,
                    bcireport : bcireport,
                    location : location,
                    tcstatus : tcstatus,
                    gmo : gmo,
                    bcistatus : bcistatus,
                    creaetedon : Math.round((new Date()).getTime() / 1000),
                    contractid : contractid,
                    invoicestatus : getmecurrentstatus(),
                    lastupdatedby : currentuser.uid,
                    lastupdatedon : Math.round((new Date()).getTime() / 1000)
                }
        
                if(invoiceid !== "new") {
                    db.collection('contracts').doc(contractid).collection('invoices').doc(invoiceid).update(node).then(eed => {
                        alert("Invoice Updated");
                        var nd = "" + Math.round((new Date()).getTime() / 1000);
                        db.collection('contracts').doc(contractid).collection('invoices').doc(invoiceid).collection('updatehistory').doc(nd).set({
                            updatedby : currentuser.uid,
                            updatedon : nd
                        }).then(efddd => {
                            navigate('/allinvoices');
                        }).catch(ejfh => {

                        })
                    })
                }
                else {
                    db.collection('contracts').doc(contractid).collection('invoices').doc(randomid).set(node).then(dfg => {
                        var combinedid = randomid+"__"+contractid;
                        db.collection('invoices').doc(combinedid).set({
                            contractid : contractid
                        }).then(fdone => {
                            alert("Invoice Added");
                            db.collection('contracts').doc(contractid).collection('invoicescount').doc(""+year).set({
                                countvalue : 2
                            }).then(efd => {
                                navigate('/allinvoices');
                            }).catch(jhg => {
        
                            })
                        })
                        
                    })
                }


            })
            setinvoicenumber(randomid);
        }
        else {
        var node = {
            invoicenumber : randomid,
            invoiceamount : Number(invoiceamount),
            invoicebales : Number(invoicebales),
            lbs : Number(lbs),
            invoicemts : Number(invoicemts),
            invoiceweight : Number(invoiceweight),
            courierline : courierline,
            docpodnumber : docpodnumber,
            docdispatchdate : docdispatchdate,
            docdeliverydate : docdeliverydate,
            shippingline : shippingline,
            plno : plno,
            etd : etd,
            eta : eta,
            cha : cha,
            buyercha : buyercha,
            shippingremarks : shippingremarks,
            sellercontroller : sellercontroller,
            otherlocation : otherlocation,
            documentremark : documentremark,
            invoiceweight : Number(invoiceweight),
            gross : Number(gross),
            tare : Number(tare),
            net : Number(net),
            netshortweight : Number(netshortweight),
            shortweightlbs : Number(shortweightlbs),
            shortweightamount : Number(shortweightamount),
            shortweightdebitnotedate : shortweightdebitnotedate,
            shortweightpercentage : Number(shortweightpercentage),
            shortweightpaid : Number(shortweightpaid),
            shortweightbalance : Number(shortweightbalance),
            shortweightremark : shortweightremark,
            paymentadvise : Number(paymentadvise),
            valuedate : valuedate,
            difference : Number(difference),
            paymentdelay : paymentdelay,
            interestwisdomcotton : Number(interestwisdomcotton),
            interestginner : Number(interestginner),
            paymentremark : paymentremark,
            tcreceiveddate : tcreceiveddate,
            tcqty : Number(tcqty),
            report : report,
            bcireport : bcireport,
            location : location,
            tcstatus : tcstatus,
            gmo : gmo,
            bcistatus : bcistatus,
            creaetedon : Math.round((new Date()).getTime() / 1000),
            contractid : contractid,
            invoicestatus : getmecurrentstatus(),
            lastupdatedby : currentuser.uid,
            lastupdatedon : Math.round((new Date()).getTime() / 1000)
        }

        if(invoiceid !== "new") {
            db.collection('contracts').doc(contractid).collection('invoices').doc(invoiceid).update(node).then(eed => {
                alert("Invoice Updated");
                var nd = "" + Math.round((new Date()).getTime() / 1000);
                db.collection('contracts').doc(contractid).collection('invoices').doc(invoiceid).collection('updatehistory').doc(nd).set({
                    updatedby : currentuser.uid,
                    updatedon : nd
                }).then(efddd => {
                    navigate('/allinvoices');
                }).catch(ejfh => {
                    
                })
            })
        }
        else {
            db.collection('contracts').doc(contractid).collection('invoices').doc(randomid).set(node).then(dfg => {
                var combinedid = randomid+"__"+contractid;

                db.collection('invoices').doc(combinedid).set({
                    contractid : contractid
                }).then(fdone => {
                    alert("Invoice Added");
                    navigate('/allinvoices');
                })
                
            })
        }
        }

        console.log(node);
    // }
    }


    return (
        <div className='contract editcontract'>
             {currentuser && <div>
                <div className="onlymobile">
                <Mobilesidebar />

            </div>
            <div className="upperview">
                {invoiceid == "new" ? <h4>Add Invoice</h4> : <h4>Edit Invoice</h4>}
            </div>
           
           
            {dataloaded && <div className="halves">
                <div className="row1">
                        {invoiceid != "new" && <div className="eachinputholder">
                            <h5>Buyer Name</h5>
                            <TextInput className="textinput" value ={contractdata.buyername} disabled options={[]} trigger={[""]}/>
                        </div>}
                        {invoiceid != "new" && <div className="eachinputholder">
                            <h5>Seller Name</h5>
                            <TextInput className="textinput" value ={contractdata.sellername} disabled options={[]} trigger={[""]}/>
                        </div>}
                        {invoiceid != "new" && <div className="eachinputholder">
                            <h5>Lot No</h5>
                            <TextInput className="textinput" value ={contractdata.lotnumbers} disabled options={[]} trigger={[""]}/>
                        </div>}
                    </div>
                    <h6>Invoice Details</h6>
                    <div className="row1">
                        {invoiceid != "new" && <div className="eachinputholder">
                            <h5>Invoice Number</h5>
                            <TextInput className="textinput" value ={invoicenumber} disabled options={[]} trigger={[""]} onSelect={(val) => onselect('invoicenumber',val)} onChange={(val) => onchange('invoicenumber',val)}/>
                        </div>}
                        {invoiceid == "new" && <div className="eachinputholder">
                            <h5>Invoice Number</h5>
                            <TextInput className="textinput" value ={invoicenumber} options={[]} trigger={[""]} onSelect={(val) => onselect('invoicenumber',val)} onChange={(val) => onchange('invoicenumber',val)}/>
                        </div>}
                        <div className="eachinputholder">
                            <h5>Invoice Amount</h5>
                            <input className="textinput" type = "number" defaultValue ={invoiceamount} options={[]} trigger={[""]} onSelect={(val) => onselect('invoiceamount',val)} onChange={(val) => onchange('invoiceamount',val)} ref={myinp => (invoiceamountref = myinp)} />
                        </div>
                        <div className="eachinputholder">
                            <h5>Invoice Bales</h5>
                            <input className="textinput" type = "number" defaultValue ={invoicebales} options={[]} trigger={[""]} onSelect={(val) => onselect('invoicebales',val)} onChange={(val) => onchange('invoicebales',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Invoice LBS</h5>
                            <input className="textinput" type = "number" disabled defaultValue ={lbs} options={[]} trigger={[""]} onSelect={(val) => onselect('lbs',val)} onChange={(val) => onchange('lbs',val)}  ref={myinp => (lbsref = myinp)}/>
                        </div>
                    </div>
                    <div className="row1">
                        <div className="eachinputholder">
                            <h5>Invoice MTS</h5>
                            <input className="textinput" type = "number" disabled defaultValue ={invoicemts} options={[]} trigger={[""]} onSelect={(val) => onselect('invoicemts',val)} onChange={(val) => onchange('invoicemts',val)} ref={myinp => (invoicemtsref = myinp)}/>
                        </div>
                        {/* <div className="eachinputholder">
                            <h5>Invoice Weight</h5>
                            <h5>Weight : {(Number(invoiceweight)/2.2046).toFixed(2)}</h5>

                            <input className="textinput" type = "number" defaultValue ={invoiceweight} options={[]} trigger={[""]} onSelect={(val) => onselect('invoiceweight',val)} onChange={(val) => onchange('invoiceweight',val)}/>
                            

                        </div> */}
                    </div>
                    <h6>Shipment Details</h6>
                    <div className="row1">  
                    <div className="eachinputholder">
                            <h5>Shipping/Transport Line</h5>
                            <TextInput className="textinput" value ={shippingline}  options={[]} trigger={[""]} onSelect={(val) => onselect('shippingline',val)} onChange={(val) => onchange('shippingline',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>BL No/TR No</h5>
                            <TextInput className="textinput" value ={plno}  options={[]} trigger={[""]} onSelect={(val) => onselect('plno',val)} onChange={(val) => onchange('plno',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>ETD</h5>
                            <input className="textinput" type = "date" defaultValue ={etd} options={[]}  onChange={(val) => onchange('etd',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>ETA</h5>
                            <input className="textinput" type = "date" defaultValue ={eta} options={[]}  onChange={(val) => onchange('eta',val)}/>
                        </div>

                        </div>
                    <div className="row1">
                         <div className="eachinputholder">
                            <h5>Present Location</h5>
                            <select onChange={dropdownselected}>
                                <option>-</option>
                                <option selected={location=="Factory"}>Factory</option>
                                <option selected={location=="In-Transit"}>In-Transit</option>
                                <option selected={location=="Others"}>Others</option>

                            </select>
                        </div>
                        {location == "Others" && <div className="eachinputholder">
                            <h5>Other Location</h5>
                            <TextInput className="textinput" value ={otherlocation}  options={[]} trigger={[""]} onSelect={(val) => onselect('otherlocation',val)} onChange={(val) => onchange('otherlocation',val)}/>
                        </div>}
                        <div className="eachinputholder">
                            <h5>Seller CHA</h5>
                            <TextInput className="textinput" value ={cha}  options={[]} trigger={[""]} onSelect={(val) => onselect('cha',val)} onChange={(val) => onchange('cha',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Seller Controller</h5>
                            <TextInput className="textinput" value ={sellercontroller}  options={[]} trigger={[""]} onSelect={(val) => onselect('sellercontroller',val)} onChange={(val) => onchange('sellercontroller',val)}/>
                        </div>
             
                    </div>
               
                    <div className="row1">
                        <div className="eachinputholder">
                            <h5>Buyer CHA</h5>
                            <TextInput className="textinput" value ={buyercha}  options={[]} trigger={[""]} onSelect={(val) => onselect('buyercha',val)} onChange={(val) => onchange('buyercha',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Shipping Remarks</h5>
                            <TextInput className="textinput" value ={shippingremarks}  options={[]} trigger={[""]} onSelect={(val) => onselect('shippingremarks',val)} onChange={(val) => onchange('shippingremarks',val)}/>
                        </div>
                    </div>

                    <h6>Document Details</h6>

                    <div className="row1">
                    <div className="eachinputholder">
                            <h5>Courier Line</h5>
                            <TextInput className="textinput" value ={courierline}  options={[]} trigger={[""]} onSelect={(val) => onselect('courierline',val)} onChange={(val) => onchange('courierline',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>DOC Pod Number</h5>
                            <TextInput className="textinput" value ={docpodnumber}  options={[]} trigger={[""]} onSelect={(val) => onselect('docpodnumber',val)} onChange={(val) => onchange('docpodnumber',val)}/>
                        </div>
                        <div className="eachinputholder">
                        <h5>Doc Dispatch Date</h5>
                        <input className="textinput" type = "date" defaultValue ={docdispatchdate} options={[]}  onChange={(val) => onchange('docdispatchdate',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Doc Delivery Date</h5>
                            <input className="textinput" type = "date" defaultValue ={docdeliverydate} options={[]}  onChange={(val) => onchange('docdeliverydate',val)}/>
                        </div>

                    </div>
                    <div className="row1">
                        <div className="eachinputholder">
                            <h5>Document Remark</h5>
                            <TextInput className="textinput" value ={documentremark}  options={[]} trigger={[""]} onSelect={(val) => onselect('documentremark',val)} onChange={(val) => onchange('documentremark',val)}/>
                        </div>
                    </div>

                    <h6>Payment Details</h6>

<div className="row1">

    <div className="eachinputholder">
        <h5>Payment Advise</h5>
        <input className="textinput" type = "number" defaultValue ={paymentadvise} options={[]} trigger={[""]} onSelect={(val) => onselect('paymentadvise',val)} onChange={(val) => onchange('paymentadvise',val)} />
    </div>
    <div className="eachinputholder">
        <h5>Value Date</h5>
        <input className="textinput" type = "date" defaultValue ={valuedate} options={[]}  onChange={(val) => onchange('valuedate',val)}/>
    </div>
    <div className="eachinputholder">
        <h5>Difference</h5>
        <input className="textinput" type = "number" disabled defaultValue ={difference} options={[]} trigger={[""]} onSelect={(val) => onselect('difference',val)} onChange={(val) => onchange('difference',val)} ref={pp => (differenceref = pp)}/>
    </div>
    <div className="eachinputholder">
        <h5>Payment Delay</h5>
        <input className="textinput" type = "date" disabled defaultValue ={paymentdelay} options={[]}  onChange={(val) => onchange('paymentdelay',val)} ref={jj => (paymentdelayref = jj)}/>
    </div>
</div>
<div className="row1">
    <div className="eachinputholder">
        <h5>Interest Wisdom Cotton</h5>
        <input className="textinput" type = "number" defaultValue ={interestwisdomcotton} options={[]} trigger={[""]} onSelect={(val) => onselect('interestwisdomcotton',val)} onChange={(val) => onchange('interestwisdomcotton',val)}/>
    </div>
    <div className="eachinputholder">
        <h5>Interest Ginner</h5>
        <input className="textinput" type = "number" defaultValue ={interestginner} options={[]} trigger={[""]} onSelect={(val) => onselect('interestginner',val)} onChange={(val) => onchange('interestginner',val)}/>
    </div>
    <div className="eachinputholder">
        <h5>Payment Remark</h5>
        <TextInput className="textinput" value ={paymentremark}  options={[]} trigger={[""]} onSelect={(val) => onselect('paymentremark',val)} onChange={(val) => onchange('paymentremark',val)}/>
    </div>
</div>

                    <h6>Short Weight Details</h6>

                    <div className="row1">

                        <div className="eachinputholder">
                            <h5>Invoice Weight</h5>
                            <input className="textinput" type = "number" disabled defaultValue ={invoiceweightnet} options={[]} trigger={[""]} onSelect={(val) => onselect('invoiceweightnet',val)} onChange={(val) => onchange('invoiceweightnet',val)} ref={myinp => (invoiceweightref = myinp)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Gross</h5>
                            <input className="textinput" type = "number" defaultValue ={gross} options={[]} trigger={[""]} onSelect={(val) => onselect('gross',val)} onChange={(val) => onchange('gross',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Tare</h5>
                            <input className="textinput" type = "number" defaultValue ={tare} options={[]} trigger={[""]} onSelect={(val) => onselect('tare',val)} onChange={(val) => onchange('tare',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Net</h5>
                            <input className="textinput" type = "number" disabled defaultValue ={net} options={[]} trigger={[""]} onSelect={(val) => onselect('net',val)} onChange={(val) => onchange('net',val)} ref={myinp => (netref = myinp)}/>
                        </div>
                    </div>
                    <div className="row1">
                        <div className="eachinputholder">
                            <h5>Net Short Weight</h5>
                            <input className="textinput" type = "number" disabled defaultValue ={netshortweight} options={[]} trigger={[""]} onSelect={(val) => onselect('netshortweight',val)} onChange={(val) => onchange('netshortweight',val)} ref={mm => (netshortweightref = mm)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Short Weight (LBS)</h5>
                            <input className="textinput" type = "number" disabled defaultValue ={shortweightlbs} options={[]} trigger={[""]} onSelect={(val) => onselect('shortweightlbs',val)} onChange={(val) => onchange('shortweightlbs',val)} ref={mm => (netshortweightlbsref = mm)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Short Weight Amount</h5>
                            <input className="textinput" type = "number" disabled defaultValue ={shortweightamount} options={[]} trigger={[""]} onSelect={(val) => onselect('shortweightamount',val)} onChange={(val) => onchange('shortweightamount',val)} ref={mm => (shortweightamountref = mm)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Short Weight Debit Note Date</h5>
                            <input className="textinput" type = "date" defaultValue ={shortweightdebitnotedate} options={[]}  onChange={(val) => onchange('shortweightdebitnotedate',val)}/>
                        </div>
                    </div>
                    <div className="row1">
                        <div className="eachinputholder">
                            <h5>Short Weight Percentage</h5>
                            <input className="textinput" type = "number" disabled defaultValue ={shortweightpercentage} options={[]} trigger={[""]} onSelect={(val) => onselect('shortweightpercentage',val)} onChange={(val) => onchange('shortweightpercentage',val)} ref={mm => (shortweightpercentageref = mm)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Short Weight Paid</h5>
                            <input className="textinput" type = "number" defaultValue ={shortweightpaid} options={[]} trigger={[""]} onSelect={(val) => onselect('shortweightpaid',val)} onChange={(val) => onchange('shortweightpaid',val)} />
                        </div>
                        <div className="eachinputholder">
                            <h5>Short Weight Balance</h5>
                            <input className="textinput" type = "number" disabled defaultValue ={shortweightbalance} options={[]} trigger={[""]} onSelect={(val) => onselect('shortweightbalance',val)} onChange={(val) => onchange('shortweightbalance',val)} ref={pp => (shortweightbalanceref = pp)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5>Short Weight Remark</h5>
                            <TextInput className="textinput" value ={shortweightremark}  options={[]} trigger={[""]} onSelect={(val) => onselect('shortweightremark',val)} onChange={(val) => onchange('shortweightremark',val)}/>
                        </div>
                    </div>
                    <div className="row1">
                        <div className="eachinputholder">
                            <button onClick={noshortweighttapped}>No Short Weight</button>
                        </div>
                    </div>
 
                    <h6 style={{color : !(contractdata.item == "Organic" || contractdata.item == "IC2" || contractdata.item == "IC1") ? 'grey' : 'black'}}>TC Details</h6>

                    {!(contractdata.item == "Organic" || contractdata.item == "IC2"  || contractdata.item == "IC1") ? <h6 style={{color : !(contractdata.item == "Organic" || contractdata.item == "IC2") ? 'grey' : 'black'}}>Only Applicable if Item is Organic or IC2</h6> : ""}
                    <div className="row1">

                        <div className="eachinputholder">
                            <h5 style={{color : !(contractdata.item == "Organic" || contractdata.item == "IC2"  || contractdata.item == "IC1") ? 'grey' : 'black'}}>TC Received Date</h5>
                            <input className="textinput" disabled={!(contractdata.item == "Organic" || contractdata.item == "IC2")} type = "date" defaultValue ={tcreceiveddate} options={[]}  onChange={(val) => onchange('tcreceiveddate',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5 style={{color : !(contractdata.item == "Organic" || contractdata.item == "IC2"  || contractdata.item == "IC1") ? 'grey' : 'black'}}>TC Qty</h5>
                            <input className="textinput" type = "number"  disabled={!(contractdata.item == "Organic" || contractdata.item == "IC2")}  defaultValue ={tcqty} options={[]} trigger={[""]} onSelect={(val) => onselect('tcqty',val)} onChange={(val) => onchange('tcqty',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5 style={{color : !(contractdata.item == "Organic" || contractdata.item == "IC2"  || contractdata.item == "IC1") ? 'grey' : 'black'}}>Report</h5>
                            <TextInput className="textinput" value ={report} disabled={!(contractdata.item == "Organic" || contractdata.item == "IC2")}  options={[]} trigger={[""]} onSelect={(val) => onselect('report',val)} onChange={(val) => onchange('report',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5 style={{color : !(contractdata.item == "Organic" || contractdata.item == "IC2"  || contractdata.item == "IC1") ? 'grey' : 'black'}}>TC Status</h5>
                            <select onChange={dropdownselected2} disabled={!(contractdata.item == "Organic" || contractdata.item == "IC2")} >
                                <option>-</option>
                                <option selected={tcstatus=="Draft Pending"}>Draft Pending</option>
                                <option selected={tcstatus=="Draft Received"}>Draft Received</option>
                                <option selected={tcstatus=="TC Received"}>TC Received</option>

                            </select>
                        </div>
                    </div>
                    <div className="row1">
                        <div className="eachinputholder">
                            <h5 style={{color : !(contractdata.item == "Organic" || contractdata.item == "IC2"  || contractdata.item == "IC1") ? 'grey' : 'black'}}>GMO</h5>
                            <select onChange={dropdownselected3} disabled={!(contractdata.item == "Organic" || contractdata.item == "IC2"  || contractdata.item == "IC1")} >
                                <option>-</option>
                                <option selected={gmo=="Received"}>Received</option>
                                <option selected={gmo=="Not Received"}>Not Received</option>

                            </select>
                        </div>
                    </div>
                    <h6 style={{color : !(contractdata.item == "BCI") ? 'grey' : 'black'}}>BCI Details</h6>

                    {!(contractdata.item == "BCI") ? <h6 style={{color : !(contractdata.item == "BCI") ? 'grey' : 'black'}}>Only Applicable if Item is BCI</h6> : ""}

                    <div className="row1">

                        <div className="eachinputholder">
                            <h5 style={{color : !(contractdata.item == "BCI") ? 'grey' : 'black'}}>Report</h5>
                            <TextInput className="textinput" value ={bcireport} disabled={!(contractdata.item == "BCI")} options={[]} trigger={[""]} onSelect={(val) => onselect('bcireport',val)} onChange={(val) => onchange('bcireport',val)}/>
                        </div>
                        <div className="eachinputholder">
                            <h5 style={{color : !(contractdata.item == "BCI") ? 'grey' : 'black'}}>Status</h5>
                            <select onChange={dropdownselected4} disabled={!(contractdata.item == "BCI")}>
                                <option>-</option>
                                <option selected={bcistatus=="Received"}>Received</option>
                                <option selected={bcistatus=="Not Received"}>Not Received</option>

                            </select>
                        </div>
                    </div>

                    {additionaluserinfo !== null && additionaluserinfo !== undefined && additionaluserinfo.role !== undefined && ((additionaluserinfo.role.toLowerCase() == "dataentry" || additionaluserinfo.role.toLowerCase() == "data entry") || additionaluserinfo.role.toLowerCase() == "superadmin") && <div>
                    <div className="eachinputholder">
                        <button onClick={updatetapped}>{invoiceid == "new" ? "Add Invoice" : "Edit Invoice"}</button>
                    </div>
                    {invoiceid !== "new" && <div className="eachinputholder">
                        <button onClick={deletetapped} className='delbtn'>Delete Invoice</button>
                    </div>}
                    </div>}
   
                    <div className='subline'><h4>Last Updated on : {new Date(createdon * 1000).toLocaleString()}</h4></div>
<div className='subline'><h4>Last Updated by : {createdby}</h4></div>

                

            </div> }
            </div>}
        </div>
    )
}

export default Editinvoice
