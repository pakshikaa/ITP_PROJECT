import React,{useState,useEffect} from 'react'//useEffect used to side effect directly in our component body
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from './Navbar';
import { Link, Navigate} from "react-router-dom";

function View() {
    
       const [photographer,setPhotographers]=useState([]);
       const[value,setValue]=useState("")

       
useEffect(()=>{
       const getAllData=async()=>{
             const res=await axios.get("http://localhost:8070/api/pho/sup");
             setPhotographers(res.data);
             console.log("supplier :",setPhotographers)
       };
       getAllData();
              },[])

   const handleDelete=async(id)=>{
    const result = await Swal.fire({
      title: 'ARE YOU SURE ?',
      text: "DO YOU WANT TO DELETE THIS!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32dd32',
      cancelButtonColor: '#da2424',
      confirmButtonText: 'YES'
    });

    if(result.isConfirmed){await axios.delete(`http://localhost:8070/api/pho/sup/${id}`);
    const newPhotographer=photographer.filter((item)=>{
        return item._id!==id;
        
    });
    setPhotographers(newPhotographer);
}else{
    Navigate('/edit');
}
    
   };      
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
  
  return (
    
    <div >
    
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
    <h2 class="text-center"> <b>ALL PHOTOGRAPHER DETAILS </b></h2>
    <br></br>
    <br></br>
    <table className="table">
    
    <thead >
      <tr style={{ backgroundColor:'#053F5C' , color:'white'  }}>
              <th scope="col">ID</th>
              <th scope="col">FIRSTNAME</th>
              <th scope="col">LASTNAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE</th>
              <th scope="col">ADDRESS</th>
              
              
      <th scope="col" className="edit-button">EDIT</th>
      <th scope="col"className="delete-button">DELETE</th>
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
                           
                            
                            <td> <Link to={`/edit_pho_form/${photographer._id}`}>
                            <button className='btn btn-primary'>EDIT</button>
                          </Link></td>
                           
                            <td> <button onClick={()=>handleDelete(photographer._id)} className='btn  btn-danger'>DELETE</button></td>
                        </tr>

                        )
                       })}
            </tbody>
        </table>      
    </div>

</div>

  )
}

export default View