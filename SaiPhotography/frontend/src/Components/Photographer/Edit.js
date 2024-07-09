import React,{useEffect,useState}from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useParams,useNavigate} from 'react-router-dom';
import Navbar from './Navbar';


function Edit() {
    const navigate=useNavigate();
    const {id}=useParams();
 
    const [input, setInput] = useState({
        F_name: "",
        L_name: "",
        Email: "",
        Phone: "",
        Address: "",
        Products: "",
        

        
    });

    useEffect(() => {
        const getAllData = async () => {
            const res=await axios.get(`http://localhost:8070/api/pho/sup/single/${id}`);
          const data = res.data;
          data.isValidPhone = true;
          data.isValidNic=true; // Set isValidContact_No to true
          setInput(data);
          console.log("dis:", setInput);
        };
        getAllData();
               },[id]);
    
    const handleUpdate=async (e) =>{
    e.preventDefault();
   
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do You Want To Update This",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#32dd32',
        cancelButtonColor: '#da2424',
        confirmButtonText: 'YES'
      });
     if(result.isConfirmed){await axios.put(`http://localhost:8070/api/pho/sup/${id}`, input);
     navigate('/edit');
     }else{
        navigate('/edit');
     }
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        let isValidPhone = input.isValidPhone
       

        if (name === 'phone') {
            // Check if the input field being updated is the contactNo field 
             isValidPhone = false;
             if (value.length === 10) {
                 isValidPhone = true;
             } 
           }

        setInput({ ...input, [name]: value,
            isValidPhone: isValidPhone,
            // isValidNic:isValidNic
     });
           
      };
    
  return (
    <div style={{ backgroundImage: `url(/Images/back2.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <Navbar />
    <div className='container' style={{ backgroundColor: "#E5E5E5" ,maxWidth: '600px', margin: '50px auto' }}>
        
    <form onSubmit={handleUpdate}>
    <div className='row'>
                    <h4 className="mb-4" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '20px' }}>PHOTOGRAPHER DETAILS</h4><br></br>
                    <div>
                    <div class="mb-3 ">
                        <label for="exampleInputEmail1" class="form-label">PHOTOGRAPHER FULL NAME</label>
                        <input
                            name="Firstname"
                            value={input.F_name}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div class="mb-3 ">
                        <label for="exampleInputPassword1" class="form-label">PHOTOGRAPHER LAST NAME</label>
                        <input
                            name="Lastname"
                            value={input.L_name}
                            onChange={handleInputChange}
                            type="salary_amount"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div class="mb-3 ">
                        <label for="exampleInputPassword1" class="form-label">EMAIL</label>
                        <input
                            name="Email"
                            value={input.Email}
                            onChange={handleInputChange}
                            type="email"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                          
                    </div>
                    <div class="mb-3 ">
                        <label for="exampleInputPassword1" class="form-label">PHONE</label>
                        <input
                            name="Phone"
                            value={input.Phone}
                            onChange={handleInputChange}
                            type="phone"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div class="mb-3 ">
                        <label for="exampleInputPassword1" class="form-label">ADDRESS</label>
                        <input
                            name="Address"
                            value={input.Address}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    
                    </div>
                </div>
        <div class="my-3">
            <button type="submit" class="btn btn-primary me-5">UPDATE</button>
        </div>
    </form>
    </div>
    </div>
    )
}

export default Edit