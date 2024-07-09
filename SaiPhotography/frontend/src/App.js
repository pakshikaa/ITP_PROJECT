import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admindash from './Admindash';
import About from './Components/AboutUs';
import AlbumPhotos from './Components/AlbumPhotos';
import ContactUs from './Components/ContactUs';
import AllCustomers from './Components/Customers_details';
import Gallery from './Components/Gallery';
import Home from './Components/Home';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import Cusdash from './Cusdash';
import Profile from './Components/profile';
import AdminDashboard from './newAdmindash';


// Package
import EditAlbum from './Components/Package/EditAlbum';
import EditPromoPackage from './Components/Package/EditPromoPackage';
import Package from './Components/Packages';
import PackageBook from './Components/PackageBook';


// Supplier
import Supplier_home from './Components/Supplier/Supplier_home';
import Sup_details from './Components/Supplier/Sup_details';
import Insert from './Components/Supplier/Insert';
import Edit_supplier from './Components/Supplier/View';
import Edit_sup_form from './Components/Supplier/Edit';


//Feedback
import ServiceFeedbackform from './Components/Feedback/ServiceFeedbackform';
import ServiceFeedbackApproval from './Components/Feedback/ServiceFeedbackApproval';
import FeedbackOptions from './Components/Feedback/FeedbackOptions';

//Employee
// import  {Adminleave}  from './Components/Employee/Adminleave';
// import  {EmpoyeePage}  from './Components/Employee/Employee';
// import  {HomePage}  from './Components/Employee/Home';
// import {EmployeeHomePage} from './Components/Employee/employeehome';
// import { Sopi } from './Components/Employee/sopi';

//Photographer

import Phtographer_Home from './Components/Photographer/home';
import Pho_details from './Components/Photographer/Pho_details';
import Insert_pho from './Components/Photographer/Insert';
import Edit_Photographer from './Components/Photographer/View';
import Edit_pho_form from './Components/Photographer/Edit';
import PhotographerScreen from './Components/Photographer/photographerscreen';
import Pgscreen from './Components/Photographer/Pgscreen';
import Pgrating from './Components/Photographer/Pgrating';
import PhoRating from './Components/Photographer/PhoRating';

//schedule
import Bookingdetails from './Components/Schedule/bookingdetails';
import Booking from './Components/Schedule/Booking';
import Viewdetails from './Components/Schedule/Viewdetails';

//Inventory
import AddProduct from './Components/Inventory/AddProduct';
import InventoryMnagement from './Components/Inventory/InventoryMnagement';
import UpdateProduct from './Components/Inventory/UpdateProduct';


//Revenue
import AddTransaction from './Components/Revenue/AddTransaction';
import FinanceManagement from './Components/Revenue/FinanceManagement';
import UpdateTransactions from './Components/Revenue/UpdateTransactions';

//Payment
import Payment from './Components/Payment/paymentgateway';
import ViewPayment from './Components/Payment/ViewPayment';

function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/about' element={<About />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/connect' element={<LogIn />} />
          <Route path='/Admindash' element={<Admindash />} />
          <Route path='/Cusdash' element={<Cusdash />} />
          <Route path='/allcus' element={<AllCustomers />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/AdminDashboard' element={<AdminDashboard />} />
          
         
           {/* Employee Mangement pages routing */}
          {/* <Route path='/emp' element={<HomePage/>}/>
          <Route path='/department' element={<Adminleave/>}/>
          <Route path='/employee' element={<EmpoyeePage/>}/>
          <Route path='/employeehome' element={<EmployeeHomePage/>}/>
          <Route path='/pir' element={<Sopi/>}/> */}
          

          {/* Package pages routing */}
          <Route path='/editalbum' element={<EditAlbum />} />
          <Route path='/editPromo' element={<EditPromoPackage />} />
          <Route path="/album/:albumId" element={<AlbumPhotos/>} />
          <Route path="/booking/:albumId" element={<PackageBook/>} />
          <Route path='/package'  element={<Package/>}/>
         
 
           {/* Supplier pages routing */}
          <Route path='/supplierHome' element={<Supplier_home />} />
          <Route path='/edit' element={<Edit_supplier />} />
          <Route path='/view' element={<Sup_details />} />
          <Route path='/add' element={<Insert />} />
          <Route path='/edit_sup_form/:id' element={<Edit_sup_form/>} />
         
         
           {/* Customer Affairs pages routing */}
          <Route path="/ServiceFeedbackform" element={<ServiceFeedbackform />} />
          <Route path="/ServiceFeedbackApproval" element={<ServiceFeedbackApproval />} />
          <Route path="/FeedbackOptions" element={<FeedbackOptions />} />
          
      
           {/* Phtographer pages routing */}
          <Route path='/PhotographerHome' element={<Phtographer_Home />} />
          <Route path='/editPho' element={<Edit_Photographer />} />
          <Route path='/viewPho' element={<Pho_details />} />
          <Route path='/addPho' element={<Insert_pho />} />
          <Route path='/edit_pho_form/:id' element={<Edit_pho_form/>} />

          <Route path='/photographer/:id' element={<PhotographerScreen />} />
          <Route path='/PhoRating' element={<PhoRating/>}/>

          <Route path='/photographerCus/:id/:userEmail' element={<Pgscreen />} />
          <Route path='/pgrating' element={<Pgrating/>}/>
          


           {/* Schedule pages routing */}
          <Route path='/bookingdetail' element={<Bookingdetails />} />
          <Route path="/book/:albumId" element={<Booking/>}/>
          <Route path="/viewbookingdetail" element={<Viewdetails/>}/>

          {/* Inventory pages routing */}
          <Route path="/AddProduct" element={<AddProduct/>}/>
          <Route path="/UpdateProduct/:id" element={<UpdateProduct/>}/>
          <Route path="/InventoryMnagement" element={<InventoryMnagement/>}/>

           
           {/* Reveneue pages routing */}
           <Route path='/AddTransaction' element={<AddTransaction />} />
          <Route path="/FinanceManagement" element={<FinanceManagement/>}/>
          <Route path="/UpdateTransactions/:id" element={<UpdateTransactions/>}/>
           
            {/* Payment pages routing */}
            <Route path='/Payment' element={<Payment />} />
          <Route path="/ViewPayment" element={<ViewPayment/>}/>


        </Routes>
      </div>
    </Router>
  );
}

export default App; 
