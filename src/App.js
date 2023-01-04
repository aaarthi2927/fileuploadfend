import React,{useEffect, useState} from "react";
import './App.css';
import axios from 'axios';
import {Link, Route, Routes, useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Api } from "./Api";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { MdArrowBack} from "react-icons/md";
import {MdDriveFolderUpload} from "react-icons/md";
function App() {
  return(
    <div>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/FileUpload" element={<FileUpload/>}/>
      <Route path="/Filelist"element={<Viewfile/>}/>
      <Route path="/Filelist/:_id"element={<Viewidfile/>}/>
</Routes>
        </div>
  )
}
 export default App;
function FileUpload() {
  const [file, setFile] =useState("");
  const [heading, setheading] =useState("");
  const [subheading, setsubheading] =useState("");
  const [description, setdescription] =useState("");
  const Navigate = useNavigate();
      const onSubmit=(e)=>{
      e.preventDefault();
      const data=new FormData();
      data.append('file',file);
      data.append('heading',heading);
      data.append('subheading',subheading);
      data.append('description',description);
      axios.post(`${Api}/upload/single`,data)
      .then((e)=>{
        console.log('success');
        Navigate(`/Filelist`)
      })
      .catch((err)=>{
        console.log('error',err);
        <h1>{err}</h1>

      })
    }
  return (
    <div>
     <Menu/>
     <div className="upload-box">
       <form onSubmit={onSubmit} >
        <Card sx={{ minWidth: 545, minHeight: 345, m: 10 }} >
        <h3>{}</h3>
            <CardContent >
              <label><h3>File : *</h3></label>
              <br/>
                <input type="file" onChange={(event)=>
                        setFile(event.target.files[0])} className="upload-box-input" required/>
                        <br/>
                        <label><h3>Heading : *</h3></label>
                        <br/>
           <input value={heading} variant="outlined" type="text" onChange={(event)=>
                        setheading(event.target.value) } className="upload-box-input" required/>
                 <br/>
                 <label><h3>Sub Heading : *</h3></label>
                 <br/>
        <input name="subheading" value={subheading} variant="outlined" type="text" onChange={(event)=>
                        setsubheading(event.target.value)} className="upload-box-input" required/>  <br/>
                         <label><h3>Description :</h3></label>
                         <br/>
                 <textarea
                   value={description}
         onChange={(event)=>
            setdescription(event.target.value)} rows="10" cols="50" className="upload-box-desc"/>
        </CardContent>
        <CardActions >
        <button type="submit" className="upload-button" > <MdDriveFolderUpload/> Upload</button>
        </CardActions>
      </Card>
                </form>
            </div>
    </div>
   
  );
}
function Viewfile()
{
  const [filedata1, setFiledata1] =useState([]);
  const Navigate = useNavigate();
    const dataforfile=async()=>{
    try{
      const rep=await axios.get(`${Api}/upload/single`); 
        console.log(rep);
        const mydata=rep.data;
        setFiledata1(mydata);
    }
        catch(err){
          console.log('error',err)
        }
      }
useEffect(()=>{dataforfile()},[])
//console.log(filedata);
var i=1;
const viewdata=filedata1.map((info,index)=>
{
return(
  <tr key={info._id} onClick={()=>Navigate(`/Filelist/${info._id}`)}>
   <td>{i++}.</td>
  <td>{info.heading}</td>
  <td>{info.subheading}</td>
 <td>{info.description}</td>
 </tr>
   );
  })
  return(
    <div>
 <Menu/>
 <div className="view-table">
  
 <h1>FileList</h1>
 
<table>
  <thead>
      <tr>
      <th>S.No</th>
        <th>Heading</th>
  <th>Sub Heading</th>
  <th>Description</th>
 </tr></thead>
 <tbody>
 {viewdata}
 </tbody>
</table>
 
 </div>
    </div>
  )
}
function Viewidfile(){
  const Navigate = useNavigate();
  //const location = useLocation();
  //const path = location.pathname.split("/")[2];
  const PF = "https://karunanithi.onrender.com/uploads/";
  const{_id}=useParams();
  const [filedata1, setFiledata1] =useState([]);
 
useEffect(()=>{
  const dataviewid=async()=>{
    const config = {
      header: {
              "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Credentials":"true"
      },
    };
    try{
       const rep=await axios.get(`${Api}/upload/single/${_id}`,config); 
const mydata=rep.data.filedata;
  setFiledata1(mydata);
      }
  catch(err){
  console.log('error',err)
        }
      }
      dataviewid()
    },[_id])
const datalist=filedata1.mimetype;
const filepath=filedata1.filename;
const dataitem=PF+filepath;
console.log(datalist)
console.log(dataitem)

function SwitchCase(props) {
    switch(props.value) {
    case 'application/pdf':
      return(
        <div className="imagesize1">
       <iframe src={dataitem} width='100%' height='100%' title="ifram1"/>
       
        </div>
              );
              case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
               
              return(
                  <div className="imagesize1">
                 <iframe src={dataitem} width='100%' height='100%' title="ifram2"/>
                 
                  </div>
                        );
    case 'image/jpeg':
      return(
        <div>
          <img src={dataitem} className="imagesize" alt="not found"/>
        </div>
      );
      case 'image/png':
        return(
          <div>
            <img src={dataitem} className="imagesize" alt="not found"/>
          </div>
        );
      
    default:
      return(
        <div>
         
          <code>File cann't open</code>
        </div>
      );
  }
}

return(
    <div>
       <Menu/>
       <button onClick={()=>Navigate(`/Filelist`)} className="back-button"> <MdArrowBack/> Back</button>
     <div className="viewdata">
    <SwitchCase value={datalist}/>
     
      </div> 
       </div>
  )
}

/*
C:\Users\Arthi>C:\Users\Arthi>"C:/Program Files/Google/Chrome/Application/chrome.exe" --user-data-dir="C:/Chrome dev session" --disable-web-security
*/
   /*<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
          <Viewer fileUrl={dataitem} />
          </Worker>
*/
export function Menu() {
  return (
    <div className='header'>
      <div className='header_right'>
        <Link to="/"><h4>Home</h4></Link>
        <Link to="/FileUpload"><h4>FileUpload</h4></Link>
        <Link to="/Filelist"><h4>Filelist</h4></Link>
      </div>
    </div>
  );
}

export function Home() {
  return (
    <div>
      <Menu/>
     <h1>hi all</h1>
    </div>
  );
}