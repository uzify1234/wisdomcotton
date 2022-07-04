import React,{useState} from 'react'
import './Contract.css';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

function Contract() {

    const [allbuyersname, setallbuyersname] = useState(["Priyesh","Test"]);
    const [allbuyersagent, setallbuyersagent] = useState(["Testing"]);
    const [allsellersname, setallsellersname] = useState(["Priyesh","Test"]);
    const [allselleragent, setallselleragent] = useState(["Testing"]);


    const [buyersname, setbuyersname] = useState("");
    const [buyeragent, setbuyeragent] = useState("");
    const [sellersname, setsellersname] = useState("");
    const [selleragent, setselleragent] = useState("");
    const [lcmts, setlcmts] = useState("0");




    const Textcustominput = ({text,value,options,mode}) => {
        return <div className="eachinputholder">
                    <h5>{text}</h5>
                    <TextInput className="textinput" value ={value}  options={options} trigger={[""]} onSelect={(val) => onselect(mode,val)} onChange={(val) => onchange(mode,val)}/>
                </div>;
      };


    const onselect = (mode,e) => {
        if(mode == "buyersname") {
            setbuyersname(e);
        }
        if(mode == "buyeragent") {
            setbuyersname(e);
        }
        if(mode == "sellername") {
            setsellersname(e);
        }
        if(mode == "selleragent") {
            setselleragent(e);
        }
        if(mode == "lcmts") {
            setlcmts(e);
        }

    }
    const onchange = (mode,e) => {
        if(mode == "buyersname") {
            setbuyersname(e);
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
        if(mode == "lcmts") {
            setlcmts(e);
        }
    }
    return (
        <div className='contract'>
            <h4>Add Contract</h4>
            <Textcustominput text="Buyer Name" value={buyersname} options={allbuyersname} mode="buyersname" />
            <Textcustominput text="Buyer Agent" value={buyeragent} options={allbuyersagent} mode="buyeragent" />
            <Textcustominput text="Seller Name" value={sellersname} options={allsellersname} mode="sellername" />
            <Textcustominput text="Seller Agent" value={selleragent} options={allselleragent} mode="selleragent" />
            <Textcustominput text="LC MTS" value={lcmts} options={[]} mode="lcmts" />


     
        </div>
    )
}

export default Contract
