import React,{useState,useEffect,useRef} from 'react'
import axios from "axios";
import {useReactToPrint} from "react-to-print"; //useReactToPrint used to print out the contents
import Navbar from './Navbar';


function Pho_details() {
  const[render]=useState(false);
  const [photographer,setPhotographers]=useState([]);
  const [value, setValue] = useState("");


useEffect(()=>{
     const getAllData=async()=>{
           const res=await axios.get("http://localhost:8070/api/pho/sup");
           setPhotographers(res.data);
     };
     getAllData();
            },[render]);

        const handleSearch = async (e) => {
              e.preventDefault();
              try {
                const res = await axios.get(`http://localhost:8070/api/pho/sup/search?F_name=${value}`);
                setPhotographers(res.data);
                setValue("");
              } catch (error) {
                console.log(error);
              }
            };

            const componentPDF=useRef();
            const generatePDF=useReactToPrint({
                content: ()=>componentPDF.current,
                documentTitle:"photographer Data",
                //onAfterPrint:()=>alert("Data saved in PDF")
            });
            
            const CompanyLogo = () => {
              return (

                <div className='header'>
                  <img src =  './Icon.jpeg' alt="icon" style={{ maxWidth: '00%', height: 'auto' }} />
                   <p>SAI PHOTOGRAPHY<br></br>
                   Malabe,<br></br>
                   Colombo
                  </p>
                </div>
              );
            };
           
  return (
    
          <div  >
            <Navbar/>
            <div className="container" style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
    <form class="d-flex" role="search"   onSubmit={handleSearch}>
      <input class="form-control me-2"
       type="search"
        placeholder="Phtographer Name" 
        aria-label="Search"
        value={value}
        onChange={(e)=>setValue(e.target.value)}/>
      <button class="btn btn-outline-success" type="submit">SEARCH</button>
    </form>
    
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <button class="btn btn-primary" style={{ backgroundColor: '#130518', color: 'white' }}onClick={generatePDF}>PRINT REPORT</button>
    </div>
    
<div ref={componentPDF} style={{width:'100%'}}>
  <CompanyLogo/>
  
<br></br>
            
<h2 class="text-center"><b>ALL PHOTOGRAPHER DETAILS</b></h2>
<br></br>
<br></br>
              <table class="table">
                  <thead>
                      <tr style={{ backgroundColor:'#053F5C' , color:'white'  }}>
                          <th scope="col">ID</th>
                            <th scope="col">FIRSTNAME</th>
                            <th scope="col">LASTNAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">ADDRESS</th>
                            
                            
                            
                      </tr>
                  </thead>
                  <tbody>
                     {photographer && photographer.map((photographer,index)=>{
                      const rowStyle = index % 2 === 0 ? { backgroundColor: '#F0EDE5' } : { backgroundColor: '#FFFFFF' };
                      return (
                        <tr key={photographer._id} style={rowStyle}>
                        <td>{index + 1}</td>
                          <td>{photographer.F_name}</td>
                          <td>{photographer.L_name}</td>
                          <td>{photographer.Email}</td>
                          <td>{photographer.Phone}</td>
                          <td>{photographer.Address}</td>
                          
                      </tr>
                      )
                     })}
                      
                  </tbody>
              </table>
          </div>
          </div> 
          </div>      
  )
}

export default Pho_details