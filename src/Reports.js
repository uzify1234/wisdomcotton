import React , {useState,useEffect,useRef} from 'react'
import './Reports.css';
import db from './Firebase';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import firebase from 'firebase';
import Mobilesidebar from './Mobilesidebar';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Reports() {


    const [dataloaded, setdataloaded] = useState(false);
    const tableRef = useRef(null);

    const [currentuser, setcurrentuser] = useState(null);
    const [additionaluserinfo, setadditionaluserinfo] = useState(null);

    const [financialyear, setfinancialyear] = useState(null);

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
        rerenderdata();
    },[financialyear]);




    const rerenderdata = () => {
        if(financialyear === null) {
            return;
        }
        setallinvoicedata([]);
        setfilteredallinvoicedata([]);
        setallcontractdata([]);
        setfilteredallcontractdata([]);
 
        var tm = ""+Number(financialyear);
        setdataloaded(false);
        console.log("Contract Data",tm);
      db.collection('contracts').orderBy('createdon','desc').where('financialyear','==',tm).get().then(alldocs => {
          var trp2 = [];
          var invv2 = [];
          var allproms2 = [];
          

          alldocs.docs.map(eachdoc => {
              console.log(eachdoc);
              var ystr = eachdoc.data().financialyear;
                console.log("Evaluing "+ystr+" and "+tm);
              if(ystr == tm) {
                
              var df = {
                "WCCN" : eachdoc.id,
                "Contract Date" : eachdoc.data().contracteddate,
                "Buyer Name" : eachdoc.data().buyername,
                "Seller Name" : eachdoc.data().sellername,
                "Buyer Agent" : eachdoc.data().buyeragent,
                "Seller Agent": eachdoc.data().selleragent,
                "P.I No." : eachdoc.data().pinumber,
                "P.I Date" : eachdoc.data().pidate,
                "Quality" : eachdoc.data().quality,
                "Item" : eachdoc.data().item,
                "LC MTS" : eachdoc.data().lcmts,
                "Rate" : eachdoc.data().rate,
                "Road/Sea" : eachdoc.data().roadsea,
                "LC Remarks" : eachdoc.data().lcremarks,
                "LC No" : eachdoc.data().lcnumber,
                "I.P No." : eachdoc.data().ipnumber,
                "I.P Status" : eachdoc.data().ipstatus,
                "I.P remarks" : eachdoc.data().ipremarks,
                "Commission" : eachdoc.data().commission,
                "Overseascommission" : eachdoc.data().overseascommission,
                "Contracted Rate" : eachdoc.data().contractedrate,
                "Area" : eachdoc.data().area,
                "Length" : eachdoc.data().length,
                "MIC" : eachdoc.data().mic,
                "Strength": eachdoc.data().strength,
                "RD" : eachdoc.data().rd,
                "Trash" : eachdoc.data().trash,
                "Moisture" : eachdoc.data().moisture,
                "CG" : eachdoc.data().cg,
                "LC Payment Terms": eachdoc.data().lcpaymentterms,
                "LC Bank": eachdoc.data().lcbank ?? "",
                "Advising Bank": eachdoc.data().advisingbank,
                "LC Dt": eachdoc.data().lcdate,
                "Exp Dt": eachdoc.data().expirydate,
                "Shipment Date": eachdoc.data().shippingdate,
                "Bales" : eachdoc.data().bales,
                "Pending Bales" : eachdoc.data().pendingbales,
                "Bales Pending": eachdoc.data().pendingbales,
                "Bales Done": eachdoc.data().bales - eachdoc.data().pendingbales,
                "Pending MTS" : eachdoc.data().pendingmts,
                "Pioneer AnalysisLen": eachdoc.data().length2,
                "Pioneer AnalysisMic": eachdoc.data().mic2,
                "Pioneer Analysis Str": eachdoc.data().strength2,
                "Pioneer Analysis Rd": eachdoc.data().rd2,
                "Pioneer AnalysisTrash": eachdoc.data().trash2,
                "Pioneer AnalysisMoisture": eachdoc.data().moisture2,
                "Pioneer Analysis CG": eachdoc.data().cg2,
                "Crop Yr": eachdoc.data().cropyear,
                "Lot Numbers": eachdoc.data().lotnumbers == "" ? 0 : eachdoc.data().lotnumbers?.split(",").length,
                "Sample Lots Received": eachdoc.data().lotsampled == "" ? 0 : eachdoc.data().lotsampled?.split(",").length,
                "Sample Lots Pending": eachdoc.data().lotnotsampled == "" ? 0 : eachdoc.data().lotnotsampled?.split(",").length,
                "Lab testing Lots Done": eachdoc.data().lottested == "" ? 0 : eachdoc.data().lottested?.split(",").length,
                "Lab testing Lots Pending": eachdoc.data().lotnottested == "" ? 0 : eachdoc.data().lotnottested?.split(",").length,
                "Wisdom Person": eachdoc.data().wisdomperson,
                "Quality Claim": eachdoc.data().qualityclaim ?? "Yes",
                "Quality Remarks": eachdoc.data().remark,
                "Contracted Parameter Len": eachdoc.data().length,
                "Contracted Parameter Mic": eachdoc.data().mic,
                "Contracted Parameter Str": eachdoc.data().strength,
                "Contracted Parameter Rd": eachdoc.data().rd,
                "contractstatus" : eachdoc.data().contractstatus,
                "iscontract" : true
              }
              trp2.push(df);
              console.log("Pushing");
              console.log(df);
              var newprom2 = new Promise((resolve,reject) => {
                db.collection('contracts').doc(eachdoc.id).collection('invoices').get().then(allinvv => {
                    var invbbb2 = [];
     
                    allinvv.docs.map(eachinvv => {

                        var x = {
                            "WCCN" : eachdoc.id,
                            "Contract Date" : eachdoc.data().contracteddate,
                            "Buyer Name" : eachdoc.data().buyername,
                            "Buyer Agent" : eachdoc.data().buyeragent,
                            "Seller Name" : eachdoc.data().sellername,
                            "Seller Agent": eachdoc.data().selleragent,
                            "P.I No.": eachdoc.data().pinumber,
                            "P.I Date": eachdoc.data().pidate,
                            "Quality": eachdoc.data().quality,
                            "Item": eachdoc.data().item,
                            "Crop Yr": eachdoc.data().cropyear,
                            "Area": eachdoc.data().area,
                            "LC MTS": eachdoc.data().lcmts,
                            "Bales": eachdoc.data().bales,
                            "Rate": eachdoc.data().rate,
                            "I.P No.": eachdoc.data().ipnumber,
                            "I.P Status": eachdoc.data().ipstatus,
                            "I.P remarks": eachdoc.data().ipremarks,
                            "LC No": eachdoc.data().lcnumber,
                            "LC Payment Terms": eachdoc.data().lcpaymentterms,
                            "LC Bank": eachdoc.data().lcbank ?? "",
                            "Advising Bank": eachdoc.data().advisingbank,
                            "LC Dt": eachdoc.data().lcdate,
                            "Exp Dt": eachdoc.data().expirydate,
                            "LC Remarks": eachdoc.data().lcremarks ?? "",
                            "Shipment Date": eachdoc.data().shippingdate,
                            "Planned MTS": eachdoc.data().pendingmts,
                            "Invoice Number": eachinvv.id,
                            "Invoice Amount": eachinvv.data().invoiceamount,
                            "Invoice Bales": eachinvv.data().invoicebales,
                            "Pending Bales": eachdoc.data().pendingbales ?? "",
                            "Bales Pending": eachdoc.data().pendingbales,
                            "Bales Done": eachdoc.data().bales - eachdoc.data().pendingbales,
                            "Invoice LBS": eachinvv.data().lbs,
                            "Invoice MTS": eachinvv.data().invoicemts,
                            "Pending MTS": eachdoc.data().pendingmts ?? "",
                            "CHA": eachinvv.data().cha,
                            "Seller Controller": eachinvv.data().sellercontroller,
                            "Document POD": eachinvv.data().docpodnumber,
                            "Document Dipatch Date": eachinvv.data().docdispatchdate,
                            "Doc Delivery Dt": eachinvv.data().docdeliverydate,
                            "Document Remarks": eachinvv.data().documentremark,
                            "Payment Remarks": eachinvv.data().paymentremark,
                            "Road/Sea": eachdoc.data().roadsea,
                            "Shipping Line / Vessel detail": eachinvv.data().shippingline,
                            "BL NUMBER": eachdoc.data().plno,
                            "ETD": eachinvv.data().etd,
                            "ETA": eachinvv.data().eta,
                            "Present location": eachinvv.data().location == "Others" ? eachinvv.data().otherlocation : eachinvv.data().location ,
                            "Shipping Remarks": eachinvv.data().documentremark,
                            "TC Qty": eachinvv.data().tcqty,
                            "TC Status": eachinvv.data().tcstatus,
                            "TC Report": eachinvv.data().report,
                            "GMO Status": eachinvv.data().gmo,
                            "BCI Points": eachinvv.data().bcipoints ?? "",
                            "BCI Status": eachinvv.data().bcistatus,
                            "BCI Report": eachinvv.data().bcireport,
                            "Current Status": eachinvv.data().invoicestatus,
                            "Invoice Weight": eachinvv.data().invoiceweight,
                            "Landed Weight Gross": eachinvv.data().landedweightgross ?? "",
                            "Landed Weight Net": eachinvv.data().landedweightnet ?? "",
                            "Landed Weight Tare": eachinvv.data().landedweighttare ?? "",
                            "Net Short Weight": eachinvv.data().netshortweight,
                            "Short Weight (LBS)": eachinvv.data().shortweightlbs,
                            "Short Weight Amount": eachinvv.data().shortweightamount,
                            "Short Weight Debit Note Date": eachinvv.data().shortweightdebitnotedate,
                            "Short Weight Percentage": eachinvv.data().shortweightpercentage,
                            "Short Weight Paid": eachinvv.data().shortweightpaid,
                            "Short Weight Balance": eachinvv.data().shortweightbalance,
                            "Short Weight Remarks": eachinvv.data().shortweightremark,
                            "Payment Advise": eachinvv.data().paymentadvise,
                            "Value Date": eachinvv.data().valuedate,
                            "Difference": eachinvv.data().difference,
                            "Payment delay (9 days allowed)": eachinvv.data().paymentdelay,
                            "Interest (WC)": eachinvv.data().interestwisdomcotton,
                            "Interest (Ginner)": eachinvv.data().interestginner,
                            "Contracted Parameter Len": eachdoc.data().length,
                            "Contracted Parameter Mic": eachdoc.data().mic,
                            "Contracted Parameter Str": eachdoc.data().strength,
                            "Contracted Parameter Rd": eachdoc.data().rd,
                            "Trash": eachdoc.data().trash,
                            "Moisture": eachdoc.data().moisture,
                            "CG": eachdoc.data().cg,
                            "Pioneer AnalysisLen": eachdoc.data().length2,
                            "Pioneer AnalysisMic": eachdoc.data().mic2,
                            "Pioneer Analysis Str": eachdoc.data().strength2,
                            "Pioneer Analysis Rd": eachdoc.data().rd2,
                            "Wisdom Person": eachdoc.data().wisdomperson,
                            "Passing Bales Done": eachdoc.data().balesdone,
                            "Passing Bales Pending": eachdoc.data().pendingbales,
                            "Lot Numbers": eachdoc.data().lotnumbers == "" ? 0 : eachdoc.data().lotnumbers.split(",").length,
                            "Sample Lots Received": eachdoc.data().lotsampled == "" ? 0 : eachdoc.data().lotsampled.split(",").length,
                            "Sample Lots Pending": eachdoc.data().lotnotsampled == "" ? 0 : eachdoc.data().lotnotsampled.split(",").length,
                            "Lab testing Lots Done": eachdoc.data().lottested == "" ? 0 : eachdoc.data().lottested.split(",").length,
                            "Lab testing Lots Pending": eachdoc.data().lotnottested == "" ? 0 : eachdoc.data().lotnottested.split(",").length,
                            "Quality Claim": eachdoc.data().qualityclaim ?? "Yes",
                            "Quality Remarks": eachdoc.data().remark,
                            "Commission": eachdoc.data().commission,
                            "Overseascommission" : eachdoc.data().overseascommission,
                            "Contracted Rate" : eachdoc.data().contractedrate,
                            "invoicestatus" : eachinvv.data().invoicestatus,
                            "iscontract" : false
                        };
                        invbbb2.push(x);
                    

                        
                    })
                    resolve(invbbb2);
                }).catch(eer=>{
                    reject(eer);
                })
            })
            allproms2.push(newprom2);
            }
         
          })
        

          Promise.all(allproms2).then(finalres2 => {
            var copy2 = [];
            console.log(allinvoicedata);
            console.log("Returned form promise");
            console.log(finalres2);
            finalres2.map(eachres => {
               eachres.map(innerres => {
                   copy2.push(innerres);
               })
            })
            console.log("Copy 2");
            console.log(copy2);
            setallinvoicedata(copy2);
            setfilteredallinvoicedata(copy2);
            setdataloaded(true);

        })
          setallcontractdata(trp2);
          setfilteredallcontractdata(trp2);
          console.log("Trp 2");
          console.log(trp2);
        //   setdataloaded(true);
      })
    }

    useEffect(() => {
        setallinvoicedata([]);
        setfilteredallinvoicedata([]);
        setallcontractdata([]);
        setfilteredallcontractdata([]);
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
  
    //   db.collection('contracts').orderBy('createdon','desc').get().then(alldocs => {
    //       var trp = [];
    //       var invv = [];
    //       var allproms = [];
    //       alldocs.docs.map(eachdoc => {
    //           if(eachdoc.data().financialyear == Number(financialyear)) {
    //           var df = {
    //             "WCCN" : eachdoc.id,
    //             "Contract Date" : eachdoc.data().contracteddate,
    //             "Buyer Name" : eachdoc.data().buyername,
    //             "Seller Name" : eachdoc.data().sellername,
    //             "Buyer Agent" : eachdoc.data().buyeragent,
    //             "Seller Agent": eachdoc.data().selleragent,
    //             "P.I No." : eachdoc.data().pinumber,
    //             "P.I Date" : eachdoc.data().pidate,
    //             "Quality" : eachdoc.data().quality,
    //             "Item" : eachdoc.data().item,
    //             "LC MTS" : eachdoc.data().lcmts,
    //             "Rate" : eachdoc.data().rate,
    //             "Road/Sea" : eachdoc.data().roadsea,
    //             "LC Remarks" : eachdoc.data().lcremarks,
    //             "LC No" : eachdoc.data().lcnumber,
    //             "I.P No." : eachdoc.data().ipnumber,
    //             "I.P Status" : eachdoc.data().ipstatus,
    //             "I.P remarks" : eachdoc.data().ipremarks,
    //             "Commission" : eachdoc.data().commission,
    //             "Overseascommission" : eachdoc.data().overseascommission,
    //             "Contracted Rate" : eachdoc.data().contractedrate,
    //             "Area" : eachdoc.data().area,
    //             "Length" : eachdoc.data().length,
    //             "MIC" : eachdoc.data().mic,
    //             "Strength": eachdoc.data().strength,
    //             "RD" : eachdoc.data().rd,
    //             "Trash" : eachdoc.data().trash,
    //             "Moisture" : eachdoc.data().moisture,
    //             "CG" : eachdoc.data().cg,
    //             "LC Payment Terms": eachdoc.data().lcpaymentterms,
    //             "LC Bank": eachdoc.data().lcbank ?? "",
    //             "Advising Bank": eachdoc.data().advisingbank,
    //             "LC Dt": eachdoc.data().lcdate,
    //             "Exp Dt": eachdoc.data().expirydate,
    //             "Shipment Date": eachdoc.data().shippingdate,
    //             "Bales" : eachdoc.data().bales,
    //             "Pending Bales" : eachdoc.data().pendingbales,
    //             "Bales Pending": eachdoc.data().pendingbales,
    //             "Bales Done": eachdoc.data().bales - eachdoc.data().pendingbales,
    //             "Pending MTS" : eachdoc.data().pendingmts,
    //             "Pioneer AnalysisLen": eachdoc.data().length2,
    //             "Pioneer AnalysisMic": eachdoc.data().mic2,
    //             "Pioneer Analysis Str": eachdoc.data().strength2,
    //             "Pioneer Analysis Rd": eachdoc.data().rd2,
    //             "Pioneer AnalysisTrash": eachdoc.data().trash2,
    //             "Pioneer AnalysisMoisture": eachdoc.data().moisture2,
    //             "Pioneer Analysis CG": eachdoc.data().cg2,
    //             "Crop Yr": eachdoc.data().cropyear,
    //             "Lot Numbers": eachdoc.data().lotnumbers == "" ? 0 : eachdoc.data().lotnumbers.split(",").length,
    //             "Sample Lots Received": eachdoc.data().lotsampled == "" ? 0 : eachdoc.data().lotsampled.split(",").length,
    //             "Sample Lots Pending": eachdoc.data().lotnotsampled == "" ? 0 : eachdoc.data().lotnotsampled.split(",").length,
    //             "Lab testing Lots Done": eachdoc.data().lottested == "" ? 0 : eachdoc.data().lottested.split(",").length,
    //             "Lab testing Lots Pending": eachdoc.data().lotnottested == "" ? 0 : eachdoc.data().lotnottested.split(",").length,
    //             "Wisdom Person": eachdoc.data().wisdomperson,
    //             "Quality Claim": eachdoc.data().qualityclaim ?? "Yes",
    //             "Quality Remarks": eachdoc.data().remark,
    //             "Contracted Parameter Len": eachdoc.data().length,
    //             "Contracted Parameter Mic": eachdoc.data().mic,
    //             "Contracted Parameter Str": eachdoc.data().strength,
    //             "Contracted Parameter Rd": eachdoc.data().rd,
    //             "contractstatus" : eachdoc.data().contractstatus,
    //             "iscontract" : true
    //           }
    //           trp.push(df);
    //           var newprom = new Promise((resolve,reject) => {
    //             db.collection('contracts').doc(eachdoc.id).collection('invoices').get().then(allinvv => {
    //                 var invbbb = [];
    //                 allinvv.docs.map(eachinvv => {

          
    //                     var x = {
    //                         "WCCN" : eachdoc.id,
    //                         "Contract Date" : eachdoc.data().contracteddate,
    //                         "Buyer Name" : eachdoc.data().buyername,
    //                         "Buyer Agent" : eachdoc.data().buyeragent,
    //                         "Seller Name" : eachdoc.data().sellername,
    //                         "Seller Agent": eachdoc.data().selleragent,
    //                         "P.I No.": eachdoc.data().pinumber,
    //                         "P.I Date": eachdoc.data().pidate,
    //                         "Quality": eachdoc.data().quality,
    //                         "Item": eachdoc.data().item,
    //                         "Crop Yr": eachdoc.data().cropyear,
    //                         "Area": eachdoc.data().area,
    //                         "LC MTS": eachdoc.data().lcmts,
    //                         "Bales": eachdoc.data().bales,
    //                         "Rate": eachdoc.data().rate,
    //                         "I.P No.": eachdoc.data().ipnumber,
    //                         "I.P Status": eachdoc.data().ipstatus,
    //                         "I.P remarks": eachdoc.data().ipremarks,
    //                         "LC No": eachdoc.data().lcnumber,
    //                         "LC Payment Terms": eachdoc.data().lcpaymentterms,
    //                         "LC Bank": eachdoc.data().lcbank ?? "",
    //                         "Advising Bank": eachdoc.data().advisingbank,
    //                         "LC Dt": eachdoc.data().lcdate,
    //                         "Exp Dt": eachdoc.data().expirydate,
    //                         "LC Remarks": eachdoc.data().lcremarks ?? "",
    //                         "Shipment Date": eachdoc.data().shippingdate,
    //                         "Planned MTS": eachdoc.data().pendingmts,
    //                         "Invoice Number": eachinvv.id,
    //                         "Invoice Amount": eachinvv.data().invoiceamount,
    //                         "Invoice Bales": eachinvv.data().invoicebales,
    //                         "Pending Bales": eachdoc.data().pendingbales ?? "",
    //                         "Bales Pending": eachdoc.data().pendingbales,
    //                         "Bales Done": eachdoc.data().bales - eachdoc.data().pendingbales,
    //                         "Invoice LBS": eachinvv.data().lbs,
    //                         "Invoice MTS": eachinvv.data().invoicemts,
    //                         "Pending MTS": eachdoc.data().pendingmts ?? "",
    //                         "CHA": eachinvv.data().cha,
    //                         "Seller Controller": eachinvv.data().sellercontroller,
    //                         "Document POD": eachinvv.data().docpodnumber,
    //                         "Document Dipatch Date": eachinvv.data().docdispatchdate,
    //                         "Doc Delivery Dt": eachinvv.data().docdeliverydate,
    //                         "Document Remarks": eachinvv.data().documentremark,
    //                         "Payment Remarks": eachinvv.data().paymentremark,
    //                         "Road/Sea": eachdoc.data().roadsea,
    //                         "Shipping Line / Vessel detail": eachinvv.data().shippingline,
    //                         "BL NUMBER": eachdoc.data().plno,
    //                         "ETD": eachinvv.data().etd,
    //                         "ETA": eachinvv.data().eta,
    //                         "Present location": eachinvv.data().location == "Others" ? eachinvv.data().otherlocation : eachinvv.data().location ,
    //                         "Shipping Remarks": eachinvv.data().documentremark,
    //                         "TC Qty": eachinvv.data().tcqty,
    //                         "TC Status": eachinvv.data().tcstatus,
    //                         "TC Report": eachinvv.data().report,
    //                         "GMO Status": eachinvv.data().gmo,
    //                         "BCI Points": eachinvv.data().bcipoints ?? "",
    //                         "BCI Status": eachinvv.data().bcistatus,
    //                         "BCI Report": eachinvv.data().bcireport,
    //                         "Current Status": eachinvv.data().invoicestatus,
    //                         "Invoice Weight": eachinvv.data().invoiceweight,
    //                         "Landed Weight Gross": eachinvv.data().landedweightgross ?? "",
    //                         "Landed Weight Net": eachinvv.data().landedweightnet ?? "",
    //                         "Landed Weight Tare": eachinvv.data().landedweighttare ?? "",
    //                         "Net Short Weight": eachinvv.data().netshortweight,
    //                         "Short Weight (LBS)": eachinvv.data().shortweightlbs,
    //                         "Short Weight Amount": eachinvv.data().shortweightamount,
    //                         "Short Weight Debit Note Date": eachinvv.data().shortweightdebitnotedate,
    //                         "Short Weight Percentage": eachinvv.data().shortweightpercentage,
    //                         "Short Weight Paid": eachinvv.data().shortweightpaid,
    //                         "Short Weight Balance": eachinvv.data().shortweightbalance,
    //                         "Short Weight Remarks": eachinvv.data().shortweightremark,
    //                         "Payment Advise": eachinvv.data().paymentadvise,
    //                         "Value Date": eachinvv.data().valuedate,
    //                         "Difference": eachinvv.data().difference,
    //                         "Payment delay (9 days allowed)": eachinvv.data().paymentdelay,
    //                         "Interest (WC)": eachinvv.data().interestwisdomcotton,
    //                         "Interest (Ginner)": eachinvv.data().interestginner,
    //                         "Contracted Parameter Len": eachdoc.data().length,
    //                         "Contracted Parameter Mic": eachdoc.data().mic,
    //                         "Contracted Parameter Str": eachdoc.data().strength,
    //                         "Contracted Parameter Rd": eachdoc.data().rd,
    //                         "Trash": eachdoc.data().trash,
    //                         "Moisture": eachdoc.data().moisture,
    //                         "CG": eachdoc.data().cg,
    //                         "Pioneer AnalysisLen": eachdoc.data().length2,
    //                         "Pioneer AnalysisMic": eachdoc.data().mic2,
    //                         "Pioneer Analysis Str": eachdoc.data().strength2,
    //                         "Pioneer Analysis Rd": eachdoc.data().rd2,
    //                         "Wisdom Person": eachdoc.data().wisdomperson,
    //                         "Passing Bales Done": eachdoc.data().balesdone,
    //                         "Passing Bales Pending": eachdoc.data().pendingbales,
    //                         "Lot Numbers": eachdoc.data().lotnumbers == "" ? 0 : eachdoc.data().lotnumbers.split(",").length,
    //                         "Sample Lots Received": eachdoc.data().lotsampled == "" ? 0 : eachdoc.data().lotsampled.split(",").length,
    //                         "Sample Lots Pending": eachdoc.data().lotnotsampled == "" ? 0 : eachdoc.data().lotnotsampled.split(",").length,
    //                         "Lab testing Lots Done": eachdoc.data().lottested == "" ? 0 : eachdoc.data().lottested.split(",").length,
    //                         "Lab testing Lots Pending": eachdoc.data().lotnottested == "" ? 0 : eachdoc.data().lotnottested.split(",").length,
    //                         "Lots Rcvd (Sampling)":eachdoc.data().lotsampled.split(",").length,
    //                         "Quality Claim": eachdoc.data().qualityclaim ?? "Yes",
    //                         "Quality Remarks": eachdoc.data().remark,
    //                         "Commission": eachdoc.data().commission,
    //                         "Overseascommission" : eachdoc.data().overseascommission,
    //                         "Contracted Rate" : eachdoc.data().contractedrate,
    //                         "invoicestatus" : eachinvv.data().invoicestatus,
    //                         "iscontract" : false
    //                     };
    //                     invbbb.push(x);
    //                 })
    //                 resolve(invbbb);
    //             }).catch(eer=>{
    //                 reject(eer);
    //             })
    //         })
    //         allproms.push(newprom);
    //         }
    //       })
        

    //       Promise.all(allproms).then(finalres => {
    //         var copy = allinvoicedata;
    //         finalres.map(eachres => {
    //            eachres.map(innerres => {
    //                copy.push(innerres);
    //            })
    //         })
    //         console.log("Invoice Data");
    //         console.log(copy);
           
    //         setallinvoicedata(copy);
    //         setfilteredallinvoicedata(copy);
    //         setdataloaded(true);

    //     })
    //       setallcontractdata(trp);
    //       setfilteredallcontractdata(trp);
    //       console.log("Contract Data");
    //       console.log(trp);

    //     //   setdataloaded(true);
    //   })
    }, [])

    const [dropdownselected, setdropdownselected] = useState("All Data");


    const [fieldsname, setfieldsname] = useState([
        "WCCN",
        "Contract Date",
        "Buyer Name",
        "Buyer Agent",
        "Seller Name",
        "Seller Agent",
        "P.I No.",
        "P.I Date",
        "Quality",
        "Item",
        "Crop Yr",
        "Area",
        "LC MTS",
        "Bales",
        "Rate",
        "I.P No.",
        "I.P Status",
        "I.P remarks",
        "LC No",
        "LC Payment Terms",
        "LC Bank",
        "Advising Bank",
        "LC Dt",
        "Exp Dt",
        "LC Remarks",
        "Shipment Date",
        "Planned MTS",
        "Invoice Number",
        "Invoice Amount",
        "Invoice Bales",
        "Pending Bales",
        "Invoice LBS",
        "Invoice MTS",
        "Pending MTS",
        "CHA",
        "Seller Controller",
        "Document POD",
        "Document Dipatch Date",
        "Doc Delivery Dt",
        "Document Remarks",
        "Payment Remarks",
        "Road/Sea",
        "Shipping Line / Vessel detail",
        "BL NUMBER",
        "ETD",
        "ETA",
        "Present location",
        "Shipping Remarks",
        "TC Qty",
        "TC Status",
        "TC Report",
        "GMO Status",
        "BCI Points",
        "BCI Status",
        "BCI Report",
        "Current Status",
        "Invoice Weight",
        "Landed Weight Gross",
        "Landed Weight Net",
        "Landed Weight Tare",
        "Net Short Weight",
        "Short Weight (LBS)",
        "Short Weight Amount",
        "Short Weight Debit Note Date",
        "Short Weight Percentage",
        "Short Weight Paid",
        "Short Weight Balance",
        "Short Weight Remarks",
        "Payment Advise",
        "Value Date",
        "Difference",
        "Payment delay (9 days allowed)",
        "Interest (WC)",
        "Interest (Ginner)",
        "Contracted Parameter Len",
        "Contracted Parameter Mic",
        "Contracted Parameter Str",
        "Contracted Parameter Rd",
        "Trash",
        "Moisture",
        "CG",
        "Pioneer AnalysisLen",
        "Pioneer AnalysisMic",
        "Pioneer Analysis Str",
        "Pioneer Analysis Rd",
        "Pioneer AnalysisTrash",
        "Pioneer AnalysisMoisture",
        "Pioneer Analysis CG",
        "Lot Numbers",
        "Wisdom Person",
        "Passing Bales Done",
        "Passing Bales Pending",
        "Sample Lots Received",
        "Sample Lots Pending",
        "Lab testing Lots Done",
        "Lab testing Lots Pending",
        "Quality Claim",
        "Quality Remarks",
        "Commission",
        "Overseascommission",
        "Contracted Rate"
    ]);


    const [lcpendingfieldsname, setlcpendingfieldsname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "P.I Date",
        "Quality",
        "Item",
        "LC MTS",
        "Rate",
        "Road/Sea",
        "LC Remarks"
    ]);

    const [ipstatusfieldname, setipstatusfieldname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "LC No",
        "I.P No.",
        "I.P Status",
        "I.P remarks"
    ]);

    const [shipmentpendingfieldsname, setshipmentpendingfieldsname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "Item",
        "LC MTS",
        "Rate",
        "LC No",
        "Shipment Date",
        "Invoice Number",
        "Invoice Amount",
        "Invoice Bales",
        "Invoice MTS",
        "Pending MTS",
        "CHA",
        "Road/Sea",
        "ETD",
        "ETA",
        "Shipping Remarks"
    ]);


    const [shipmentstatusfieldsname, setshipmentstatusfieldsname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "Item",
        "LC MTS",
        "Rate",
        "LC No",
        "Shipment Date",
        "Invoice Number",
        "Invoice Amount",
        "Invoice Bales",
        "CHA",
        "Seller Controller",
        "Road/Sea",
        "Shipping Line / Vessel detail",
        "BL NUMBER",
        "ETD",
        "ETA",
        "Present location",
        "Shipping Remarks",
        "Current Status",
        "TC Status",
        "BCI Status",
        "Shipping Remarks"
    ]);


    const [courierpendingfieldsname, setcourierpendingfieldsname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "Item",
        "LC MTS",
        "Rate",
        "LC No",
        "Invoice Number",
        "Invoice Bales",
        "ETD",
        "Document POD",
        "Document Dipatch Date",
        "Doc Delivery Dt",
        "Road/Sea",
        "Document Remarks"
    ]);

    const [paymentpendingfieldname, setpaymentpendingfieldname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "Item",
        "LC MTS",
        "Rate",
        "LC No",
        "Invoice Number",
        "Invoice Amount",
        "Invoice Bales",
        "Invoice MTS",
        "Doc Delivery Dt",
        "Current Status",
        "Payment Remarks"
    ]);
    const [tcdetailsfieldname, settcdetailsfieldname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "Item",
        "LC MTS",
        "Rate",
        "LC No",
        "Invoice Number",
        "Invoice Bales",
        "Invoice MTS",
        "TC Status",
        "GMO Status",
        "TC Report",
        "TC Qty"
    ]);

    const [tcstatusfieldname, settcstatusfieldname] = useState([
        "TC Received",
        "Draft Received",
        "Draft Pending"
    ]);

    const [bcidetailsfieldname, setbcidetailsfieldname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "LC MTS",
        "Rate",
        "LC No",
        "Invoice Number",
        "Invoice Bales",
        "Invoice MTS",
        "BCI Status",
        "BCI Report",
        "BCI Points"
    ]);

    const [bcistatusfieldname, setbcistatusfieldname] = useState([
        "BCI Received",
        "BCI Pending"
    ]);

    const [shortweightstatusfieldname, setshortweightstatusfieldname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "Item",
        "LC MTS",
        "Rate",
        "LC No",
        "Invoice Number",
        "Invoice Amount",
        "Invoice Bales",
        "Road/Sea",
        "Short Weight (LBS)",
        "Short Weight Amount",
        "Short Weight Debit Note Date",
        "Short Weight Percentage",
        "Short Weight Paid",
        "Short Weight Balance",
        "Short Weight Remarks"
    ]);

    const [lccancelledfieldname, setlccancelledfieldname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "Item",
        "Rate",
        "LC MTS"
    ]);

    const [commisiondetailsfieldname, setcommisiondetailsfieldname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "Item",
        "Rate",
        "LC No",
        "Road/Sea",
        "Commission",
        "Overseascommission",
        "Contracted Rate"
    ]);

    const [pioneeranalysisfieldname, setpioneeranalysisfieldname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "P.I Date",
        "Quality",
        "Item",
        "LC MTS",
        "Rate",
        "LC No",
        "Invoice Number",
        "Invoice Bales",
        "Road/Sea",
        "Contracted Parameter Len",
        "Contracted Parameter Mic",
        "Contracted Parameter Str",
        "Contracted Parameter Rd",
        "Pioneer AnalysisLen",
        "Pioneer AnalysisMic",
        "Pioneer Analysis Str",
        "Pioneer Analysis Rd",
        "Wisdom Person",
        "Quality Remarks",
        "Quality Claim"
    ]);

    const [passingdetailsfieldname, setpassingdetailsfieldname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "Item",
        "Rate",
        "LC MTS",
        "LC No",
        "Bales Done",
        "Bales Pending",
        "Wisdom Person"
    ]);

    const [samplingdetailsfieldname, setsamplingdetailsfieldname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "Item",
        "Rate",
        "LC MTS",
        "LC No",
        "Sample Lots Received",
        "Sample Lots Pending"
    ]);
    const [testingdetailsfieldname, settestingdetailsfieldname] = useState([
        "WCCN",
        "Buyer Name",
        "Seller Name",
        "Buyer Agent",
        "Seller Agent",
        "P.I No.",
        "Item",
        "Rate",
        "LC MTS",
        "LC No",
        "Lab testing Lots Done",
        "Lab testing Lots Pending",
    ]);




    const [allcontractdata, setallcontractdata] = useState([]);
    const [allinvoicedata, setallinvoicedata] = useState([]);



    const [filteredallcontractdata, setfilteredallcontractdata] = useState([]);
    const [filteredallinvoicedata, setfilteredallinvoicedata] = useState([]);



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

        const applyfiltertapped = (e) => {
            var workingdata = [];
            if(dropdownselected == "All Data") {
                workingdata = [...allcontractdata ,...allinvoicedata];
            }
            else if(dropdownselected == "LC Pending" || dropdownselected == "I.P Status" || dropdownselected == "LC Cancelled" || dropdownselected == "Commision Details" || dropdownselected == "Pioneer Analysis" || dropdownselected == "Passing Details" || dropdownselected == "Sampling Details" || dropdownselected == "Testing Details") {
                workingdata = allcontractdata;
            }
            else if(dropdownselected == "Shipment Pending" || dropdownselected == "Shipment Status" || dropdownselected == "Courier Pending" || dropdownselected == "Payment Pending" || dropdownselected == "TC Details" || dropdownselected == "TC Status" || dropdownselected == "BCI Details" || dropdownselected == "BCI Status" || dropdownselected == "Short Weight Status" || dropdownselected == "") {
                workingdata = allinvoicedata;
            }
            var wholeandsole = [];
            workingdata.map(eachcontract => {
                var bc1 = selectedbuyersname.filter(eachk => eachk.toLowerCase().trim() == eachcontract["Buyer Name"]?.toLowerCase().trim());  
                var bc2 = selectedsellername.filter(eachk => eachk.toLowerCase().trim()  == eachcontract["Seller Name"]?.toLowerCase().trim());  
                var bc3 = selecteditem.filter(eachk => eachk.toLowerCase().trim()  == eachcontract["Item"]?.toLowerCase().trim() );  
                var bc4 = selectedroadsea.filter(eachk => eachk.toLowerCase().trim()  == eachcontract["Road/Sea"]?.toLowerCase().trim()); 
                var bc5 = selectedbuyersagent.filter(eachk => eachk.toLowerCase().trim() == eachcontract["Buyer Agent"]?.toLowerCase().trim());  
                var bc6 = selectedselleragent.filter(eachk => eachk.toLowerCase().trim()  == eachcontract["Seller Agent"]?.toLowerCase().trim() );  
                console.log(bc1);
                console.log(bc2);
                console.log(bc3);
                console.log(bc4);
                if(bc1.length > 0 || bc2.length > 0 || bc3.length > 0 || bc4.length > 0 || bc5.length > 0 || bc6.length > 0) {
                    wholeandsole.push(eachcontract);
                }
            })
            setfilteredallcontractdata(wholeandsole);
            setfilteredallinvoicedata(wholeandsole);
            setIsOpen(false);
        }
        const clearfiltertapped = () => {
            setselectedbuyersname([]);
            setselectedsellername([]);
            setselecteditem([]);
            setselectedroadsea([]);
            setselectedbuyersagent([]);
            setselectedselleragent([]);
            var workingdata = [];
            if(dropdownselected == "All Data") {
                workingdata = [...allcontractdata ,...allinvoicedata];
            }
            else if(dropdownselected == "LC Pending" || dropdownselected == "I.P Status" || dropdownselected == "LC Cancelled" || dropdownselected == "Commision Details" || dropdownselected == "Pioneer Analysis" || dropdownselected == "Passing Details" || dropdownselected == "Sampling Details" || dropdownselected == "Testing Details") {
                workingdata = allcontractdata;
            }
            else if(dropdownselected == "Shipment Pending" || dropdownselected == "Shipment Status" || dropdownselected == "Courier Pending" || dropdownselected == "Payment Pending" || dropdownselected == "TC Details" || dropdownselected == "TC Status" || dropdownselected == "BCI Details" || dropdownselected == "BCI Status" || dropdownselected == "Short Weight Status" || dropdownselected == "") {
                workingdata = allinvoicedata;
            }
            setfilteredallinvoicedata(workingdata);
            setIsOpen(false);
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
        const getTotalQuantity = (arr) => {
            var sum = 0;
            arr.map(each => {
                if(each.quality !== undefined) {
                    sum = sum + each.quality;
                }
            })
            return sum;
        }


        const setfinancialyearandproceed = (e) => {
            setfinancialyear(e);
            db.collection('users').doc(currentuser.uid).update({
                'financialyear' : e
            });
        }

        const checkandremoveduplication = () => {
            var tp = [];
            filteredallcontractdata.map(cd => {
                var cpy = filteredallinvoicedata.filter(id => id.WCCN === cd.WCCN);
                if(cpy.length === 0) {
                    tp.push(cd);
                }
                else {
                    cpy.forEach(efg => {
                        tp.push(efg);
                    })
                }
            })
            return tp;
        }

    return (
        <div className='reportssection'>
            {currentuser && <div>


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
                    style={Object.assign({zIndex : '1020'},customStylesmobile)}
                    contentLabel="Filter Reports"
                    
                >
                    <div style={{display : 'flex',flexDirection : 'row',justifyContent : 'space-between',alignItems :'center'}}>
                    <h2 style={{color : 'black'}}>Filter Reports</h2>
                        <div>
                        <button onClick={applyfiltertapped} style={{border : 'none',padding : '20px',fontWeight : 'bolder',marginLeft : '10px'}}>Apply Filter</button>

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


                <div className="onlymobile">
                <Mobilesidebar />

            </div>
            <div className="upperview">
                <div>
                    <h4>Reports</h4>
                    <select onChange={e => setdropdownselected(e.target.value)}>
                        <option>All Data</option>
                        <option>LC Pending</option>
                        <option>I.P Status</option>
                        <option>Shipment Pending</option>
                        <option>Shipment Status</option>
                        <option>Courier Pending</option>
                        <option>Payment Pending</option>
                        <option>TC Details</option>
                        <option>TC Status</option>
                        <option>BCI Details</option>
                        <option>BCI Status</option>
                        <option>Short Weight Status</option>
                        <option>LC Cancelled</option>
                        <option>Commision Details</option>
                        <option>Pioneer Analysis</option>
                        <option>Passing Details</option>
                        <option>Sampling Details</option>
                        <option>Testing Details</option>
                    </select>
                    <button className = "onlydesktop" onClick={() => { setIsOpen(true)}}>Filter Reports</button>
                    <button className = "onlymobile" onClick={() => { setIsOpenmobile(true)}}>Filter Reports</button>
                    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename={dropdownselected+'_reports'}
                    sheet="report"
                    buttonText="Download as Excel File"/>
                    <div className="extra">
                             <h4>Financial Year</h4>
                    <select onChange={e =>{setfinancialyearandproceed(e.target.value);}}>
                            <option selected={financialyear === "2021"} value="2021">2021-2022</option>
                            <option selected={financialyear === "2022"} value="2022">2022-2023</option>
                            <option selected={financialyear === "2023"} value="2023">2023-2024</option>
                    </select>
                    </div>
                </div>
            </div>
            <div className='lowerview'>
                <div>
                {
                       dataloaded && dropdownselected == "All Data" && <div>
                            <table ref={tableRef} id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        fieldsname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        checkandremoveduplication().map(contract => {
                                            return  (<tr>
                                                {
                                                    fieldsname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }
                                </tbody>
                                
                            </table>

                        </div>
                    }
                    {
                       dataloaded && dropdownselected == "LC Pending" && <div>
                            {/* <h3>Total Quantity : {getTotalQuantity(filteredallcontractdata)}</h3> */}
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        lcpendingfieldsname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallcontractdata.filter(ek => ek.contractstatus == "LC Pending").map(contract => {
                                            return  (<tr>
                                                {
                                                    lcpendingfieldsname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }
                                      {
                       dataloaded && dropdownselected == "I.P Status" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        ipstatusfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallcontractdata.map(contract => {
                                            return  (<tr>
                                                {
                                                    ipstatusfieldname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }
                                      {
                       dataloaded && dropdownselected == "Shipment Pending" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        shipmentpendingfieldsname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallinvoicedata.filter(ek => ek["invoicestatus"] == "Shipment Pending" || ek["invoicestatus"] == "LC Received").map(contract => {
                                            return  (<tr>
                                                {
                                                    shipmentpendingfieldsname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }
                                      {
                       dataloaded && dropdownselected == "Shipment Status" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        shipmentstatusfieldsname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallinvoicedata.map(contract => {
                                            return  (<tr>
                                                {
                                                    shipmentstatusfieldsname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }
                                      {
                       dataloaded && dropdownselected == "Courier Pending" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        courierpendingfieldsname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallinvoicedata.filter(ek => ek.invoicestatus == "Courier Pending").map(contract => {
                                            return  (<tr>
                                                {
                                                    courierpendingfieldsname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }
                                      {
                       dataloaded && dropdownselected == "Payment Pending" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        paymentpendingfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallinvoicedata.filter(ek => ek.invoicestatus == "Payment Pending").map(contract => {
                                            return  (<tr>
                                                {
                                                    paymentpendingfieldname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }
                                      {
                       dataloaded && dropdownselected == "TC Details" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        tcdetailsfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallinvoicedata.filter(ek => ek["Item"] == "Organic" || ek["Item"] == "IC1" || ek["Item"] == "IC2").map(contract => {
                                            return  (<tr>
                                                {
                                                    tcdetailsfieldname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }
                                      {
                       dataloaded && dropdownselected == "TC Status" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        tcstatusfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallinvoicedata.map(contract => {
                                            return  (<tr>
                                                {
                                                    tcstatusfieldname.map(eachhead => {
                                                        return (<td>{filteredallinvoicedata.filter(ef => ef['TC Status'].toLowerCase() == eachhead.toLowerCase()).length}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }
                                      {
                       dataloaded && dropdownselected == "BCI Details" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        bcidetailsfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallinvoicedata.filter(ek => ek["Item"] == "BCI").map(contract => {
                                            return  (<tr>
                                                {
                                                    bcidetailsfieldname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }
                    
                                      {
                       dataloaded && dropdownselected == "BCI Status" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        bcistatusfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallinvoicedata.map(contract => {
                                            return  (<tr>
                                                {
                                                    bcistatusfieldname.map(eachhead => {
                                                        return (<td>{filteredallinvoicedata.filter(ef => ef['BCI Status'].toLowerCase() == eachhead.toLowerCase()).length}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }
                                               {
                       dataloaded && dropdownselected == "Short Weight Status" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        shortweightstatusfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallinvoicedata.map(contract => {
                                            return  (<tr>
                                                {
                                                    shortweightstatusfieldname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }

{
                       dataloaded && dropdownselected == "LC Cancelled" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        lccancelledfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallcontractdata.filter(ek => ek.contractstatus == "lccancelled").map(contract => {
                                            return  (<tr>
                                                {
                                                    lccancelledfieldname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }

{
                       dataloaded && dropdownselected == "Commision Details" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        commisiondetailsfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallcontractdata.map(contract => {
                                            return  (<tr>
                                                {
                                                    commisiondetailsfieldname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }

{
                       dataloaded && dropdownselected == "Pioneer Analysis" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        pioneeranalysisfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallcontractdata.map(contract => {
                                            return  (<tr>
                                                {
                                                    pioneeranalysisfieldname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }

{
                       dataloaded && dropdownselected == "Passing Details" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        passingdetailsfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallcontractdata.map(contract => {
                                            return  (<tr>
                                                {
                                                    passingdetailsfieldname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }

{
                       dataloaded && dropdownselected == "Sampling Details" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        samplingdetailsfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallcontractdata.map(contract => {
                                            return  (<tr>
                                                {
                                                    samplingdetailsfieldname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }

{
                       dataloaded && dropdownselected == "Testing Details" && <div>
                            <table id="table-to-xls">
                                <thead>
                                <tr>
                                    {
                                        testingdetailsfieldname.map(eachhead => {
                                            return (<th>{eachhead}</th>)
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredallcontractdata.map(contract => {
                                            return  (<tr>
                                                {
                                                    testingdetailsfieldname.map(eachhead => {
                                                        return (<td>{eachhead=== "WCCN" ? contract[eachhead].split("-")[0] : contract[eachhead]}</td>)
                                                    })
                                                }
                                            </tr>)
                                        })
                                }</tbody>
                                
                            </table>

                        </div>
                    }


                </div>
            </div>
            </div> }
        </div>
    )
}

export default Reports
