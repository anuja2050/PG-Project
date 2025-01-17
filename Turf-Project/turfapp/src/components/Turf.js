
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import HeaderUser from '../common/HeaderUser';
// import Footer from '../common/Footer';

// export default function Booking() {
//   const URL = 'http://localhost:6162';
//   const [turfs, setTurfs] = useState([]);
//   const [selectedTurf, setSelectedTurf] = useState('');
//   const [bookingDate, setBookingDate] = useState('');
//   const [timeSlot, setTimeSlot] = useState('');
//   const [userId, setUserId] = useState('');

//   useEffect(() => {
//     // Fetch available turfs
//     axios.get(`${URL}/get-turfs`)
//       .then((res) => {
//         setTurfs(res.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });

//     // Get user ID from session storage
//     const storedUserId = sessionStorage.getItem("userId");
//     setUserId(storedUserId);
//   }, []);

//   const handleBooking = (e) => {
//     e.preventDefault();
//     const bookingData = {
//       turfId: selectedTurf,
//       userId: userId,
//       bookingDate: bookingDate,
//       timeSlot: timeSlot
//     };

//     axios.post(`${URL}/create-booking`, bookingData)
//       .then((res) => {
//         alert('Booking successful!');
//         // Reset form or redirect to booking confirmation page
//       })
//       .catch(error => {
//         console.log(error);
//         alert('Booking failed. Please try again.');
//       });
//   };

//   return (
//     <>
//       <HeaderUser />
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center" style={{ maxWidth: 900 }}>
//           <h3 className="text-white display-3">Book a Turf</h3>
//         </div>
//       </div>
//       <div className='container'>
//         <div className='row pt-5 pb-5'>
//           <div className='col-md-6 offset-md-3'>
//             <form onSubmit={handleBooking}>
//               <div className="mb-3">
//                 <label htmlFor="turfSelect" className="form-label">Select Turf</label>
//                 <select
//                   className="form-select"
//                   id="turfSelect"
//                   value={selectedTurf}
//                   onChange={(e) => setSelectedTurf(e.target.value)}
//                   required
//                 >
//                   <option value="">Choose a turf</option>
//                   {/* <option value="CRICKET">CRICKET</option>
//                   <option value="FOOTBALL">FOOTBALL</option> */}
//                   {turfs.map((turf) => (
//                     <option key={turf.id} value={turf.id}>{turf.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="bookingDate" className="form-label">Booking Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   id="bookingDate"
//                   value={bookingDate}
//                   onChange={(e) => setBookingDate(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="timeSlot" className="form-label">Time Slot</label>
//                 <select
//                   className="form-select"
//                   id="timeSlot"
//                   value={timeSlot}
//                   onChange={(e) => setTimeSlot(e.target.value)}
//                   required
//                 >
//                   <option value="">Choose a time slot</option>
//                   <option value="09:00-10:00">09:00 - 10:00</option>
//                   <option value="10:00-11:00">10:00 - 11:00</option>
//                   <option value="11:00-12:00">11:00 - 12:00</option>
//                   {/* Add more time slots as needed */}
//                 </select>
//               </div>
//               <button type="submit" className="btn btn-primary">Book Now</button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

//<------------------------------------------------------old code------------>

import React, { useEffect, useState } from 'react'
import Footer from '../common/Footer'
import { Link, useNavigate } from 'react-router-dom'
import HeaderUser from '../common/HeaderUser'
import GroundService from '../Services/Ground';
import axios from 'axios';

export default function About() {
    const history=useNavigate();

    const URL = 'http://localhost:9898';
    const [Ground, setTurfDetails] = useState([]);
    const [turfId,setturfId]=useState();
 
    const BookingPage = () => {
       // const getusers = localStorage.getItem("userId");
        const getusers=sessionStorage.getItem("userId")
        if (getusers && getusers.length > 0) {
            //const user = JSON.parse(getusers);
            history("/turf");
        } else {
            history("/");
        }
      }
    

    useEffect(() => {
        BookingPage();
        const fetchAllTurfDetails = async () => {
            try {
                const response = await axios.get(URL + '/get-allTurf');
                setTurfDetails(response.data);
                //console.log(response.turfId);
            } catch (error) {
                console.error('Error fetching all turf details:', error);
            }
        };

        fetchAllTurfDetails();
    }, []);

    const SetTurfID = (id) => {
        setturfId(id);
        console.log(turfId);
        //localStorage.setItem('turfId', id);
        sessionStorage.setItem("turfId", id);
    }

    return (
        <>
            <HeaderUser></HeaderUser>
            {/* Header start */}
            <div className="container-fluid bg-breadcrumb">
                <div className="container text-center" style={{ maxWidth: 900 }}>
                    <h3 className="text-white display-3">My Turf</h3>
                </div>
            </div>
            {/* Header End */}

            {/* Blog Start */}
            <div className="container-fluid blog mt-5 ">
                <div className="container pb-5">
                    <div className="mx-auto text-center mb-5" style={{ maxWidth: 900 }}>
                        <h5 className="section-title px-3">All Turf</h5>
                        <h1 className="mb-4">Top Level Turf</h1>
                        <p className="mb-0">
                            We have a wide variety of turfs available for rent. Our top level turfs are perfect for beginners and experienced players alike.
                        </p>
                    </div>


                    <div className="row g-4">
                        {Ground.map((groumd) => (
                            <div className="col-lg-4 col-md-6">
                                <div className="blog-item" >
                                    <div className="blog-img" >

                                        <div className="blog-img-inner">
                                            <img src={'TurfImage/TurfImage/' + groumd.image}
                                                className="img-fluid w-100 rounded-top"
                                                style={{height:"25rem"}}
                                                alt="Image"

                                            />
                                            <div className="blog-icon">
                                                <Link to="/turfBooking" className="my-auto">
                                                    <i className="fas fa-link fa-2x text-white" />
                                                </Link>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="blog-content border border-top-0 rounded-bottom p-4">
                                        <Link to="/turfBooking" className="h3">
                                            {groumd.name}
                                        </Link>
                                        <p className="my-3">
                                            {groumd.description}
                                        </p>

                                        <p className="my-1">
                                            Width: {groumd.width}
                                        </p>
                                        <p className="my-1">
                                            Length: {groumd.length}
                                        </p>
                                        
                                        <Link to="/turfBooking" className="h5">
                                            Price: {groumd.price}/hr
                                        </Link>
                                        <hr></hr>
                                        <Link to="/turfBooking" className="btn btn-primary rounded-pill py-2 px-4" onClick={() => SetTurfID(groumd.turfId)} >
                                            Book
                                        </Link>

                                    </div>

                                </div>
                            </div>
                        ))
                        }
                    </div>


                </div>
            </div>
            {/* Blog End */}
            <Footer></Footer>

        </>

    )
}
