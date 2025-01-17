




// import React, { useEffect, useState } from 'react';
// import HeaderAdmin from '../common/HeaderAdmin';
// import Footer from '../common/Footer';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function GroundTable() {
//     const history = useNavigate();
//     const URL = 'http://localhost:9898';
//     const [Ground, setTurfDetails] = useState([]);

//     const BookingPage = () => {
//         const getusers = sessionStorage.getItem("managerId");
//         if (getusers && getusers.length > 0) {
//             history("/groundTable");
//         } else {
//             history("/adminLogin");
//         }
//     }

//     useEffect(() => {
//         BookingPage();
//         const fetchAllTurfDetails = async () => {
//             try {
//                 const response = await axios.get(URL + '/get-allTurf');
//                 console.log(response);
//                 setTurfDetails(response.data);
//             } catch (error) {
//                 console.error('Error fetching all turf details:', error);
//             }
//         };

//         fetchAllTurfDetails();
//     }, []);

//     const deleteTurf = async (turfId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this turf?");
//         if (confirmDelete) {
//             try {

                
//                 await axios.delete(`${URL}/delete-turf/${turfId}`);
//                 setTurfDetails(Ground.filter(turf => turf.turfId !== turfId));
//                 alert("Turf deleted successfully");
//             } catch (error) {
//                 console.error('Error deleting turf:', error);
//                 alert("An error occurred while deleting the turf.");
//             }
//         }
//     }

//     return (
//         <>
//             <HeaderAdmin />
//             <div className="container-fluid bg-breadcrumb">
//                 <div className="container text-center" style={{ maxWidth: 900 }}>
//                     <h3 className="text-white display-3">GroundTable</h3>
//                 </div>
//             </div>
//             <div className='container'>
//                 <div className='row pt-5 pb-5'>
//                     <div className='table-responsive'>
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th scope="col">Image</th>
//                                     <th scope="col">Name</th>
//                                     <th scope="col">Ground Width</th>
//                                     <th scope="col">Ground Length</th>
//                                     <th scope="col">Price</th>
//                                     <th scope="col">Description</th>
//                                     <th scope="col">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Ground.map((ground) => (
//                                     <tr key={ground.turfId}>
//                                         <td scope="row">
//                                             <img src={`TurfImage/TurfImage/${ground.image}`} style={{ width: "7rem" }} alt="Turf" />
//                                         </td>
//                                         <td scope="row">{ground.name}</td>
//                                         <td scope="row">{ground.width}</td>
//                                         <td scope="row">{ground.length}</td>
//                                         <td scope="row">{ground.price}</td>
//                                         <td scope="row">{ground.description}</td>
//                                         <td>
//                                             <button type='button' className='btn btn-danger' onClick={() => deleteTurf(ground.turfId)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }
// import React, { useEffect, useState } from 'react';
// import HeaderAdmin from '../common/HeaderAdmin';
// import Footer from '../common/Footer';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Ground from '../Services/Ground'; // Import the Ground service

// export default function GroundTable() {
//     const history = useNavigate();
//     const [grounds, setGrounds] = useState([]);

//     const checkAuthentication = () => {
//         const managerId = sessionStorage.getItem("managerId");
//         if (!managerId) {
//             history("/adminLogin");
//         }
//     }

//     useEffect(() => {
//         checkAuthentication();
//         fetchAllGrounds();
//     }, []);

//     const fetchAllGrounds = async () => {
//         try {
//             const response = await Ground.getGround();
//             setGrounds(response.data);
//         } catch (error) {
//             console.error('Error fetching all turf details:', error);
//         }
//     };

//     const deleteTurf = async (turfId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this turf?");
//         if (confirmDelete) {
//             try {
//                 await axios.delete(`${Ground.URL}/delete-turf/${turfId}`);
//                 setGrounds(grounds.filter(turf => turf.turfId !== turfId));
//                 alert("Turf deleted successfully");
//             } catch (error) {
//                 console.error('Error deleting turf:', error);
//                 alert("An error occurred while deleting the turf.");
//             }
//         }
//     }

//     return (
//         <>
//             <HeaderAdmin />
//             <div className="container-fluid bg-breadcrumb">
//                 <div className="container text-center" style={{ maxWidth: 900 }}>
//                     <h3 className="text-white display-3">Ground Table</h3>
//                 </div>
//             </div>
//             <div className='container'>
//                 <div className='row pt-5 pb-5'>
//                     <div className='table-responsive'>
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th scope="col">Image</th>
//                                     <th scope="col">Name</th>
//                                     <th scope="col">Ground Width</th>
//                                     <th scope="col">Ground Length</th>
//                                     <th scope="col">Price</th>
//                                     <th scope="col">Description</th>
//                                     <th scope="col">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {grounds.map((ground) => (
//                                     <tr key={ground.turfId}>
//                                         <td>
//                                             <img src={`TurfImage/TurfImage/${ground.image}`} style={{ width: "7rem" }} alt="Turf" />
//                                         </td>
//                                         <td>{ground.name}</td>
//                                         <td>{ground.width}</td>
//                                         <td>{ground.length}</td>
//                                         <td>{ground.price}</td>
//                                         <td>{ground.description}</td>
//                                         <td>
//                                             <button type='button' className='btn btn-danger' onClick={() => deleteTurf(ground.turfId)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
//}


// import React, { useEffect, useState } from 'react';
// import HeaderAdmin from '../common/HeaderAdmin';
// import Footer from '../common/Footer';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Ground from '../Services/Ground'; // Import the Ground service

// export default function GroundTable() {
//     const history = useNavigate();
//     const [grounds, setGrounds] = useState([]);

//     const checkAuthentication = () => {
//         const managerId = sessionStorage.getItem("managerId");
//         if (!managerId) {
//             history("/adminLogin");
//         }
//     }

//     useEffect(() => {
//         checkAuthentication();
//         fetchAllGrounds();
//     }, []);

//     const fetchAllGrounds = async () => {
//         try {
//             const response = await Ground.getGround();
//             setGrounds(response.data);
//         } catch (error) {
//             console.error('Error fetching all turf details:', error);
//         }
//     };

//     const deleteTurf = async (turfId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this turf?");
//         if (confirmDelete) {
//             try {
//                 await axios.delete(`${Ground.URL}/delete-turf/${turfId}`);
//                 setGrounds(grounds.filter(turf => turf.turfId !== turfId));
//                 alert("Turf deleted successfully");
//             } catch (error) {
//                 console.error('Error deleting turf:', error);
//                 alert("An error occurred while deleting the turf.");
//             }
//         }
//     }

//     return (
//         <>
//             <HeaderAdmin />
//             <div className="container-fluid bg-breadcrumb">
//                 <div className="container text-center" style={{ maxWidth: 900 }}>
//                     <h3 className="text-white display-3">Ground Table</h3>
//                 </div>
//             </div>
//             <div className='container'>
//                 <div className='row pt-5 pb-5'>
//                     <div className='table-responsive'>
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th scope="col">Image</th>
//                                     <th scope="col">Name</th>
//                                     <th scope="col">Ground Width</th>
//                                     <th scope="col">Ground Length</th>
//                                     <th scope="col">Price</th>
//                                     <th scope="col">Description</th>
//                                     <th scope="col">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {grounds.map((ground) => (
//                                     <tr key={ground.turfId}>
//                                         <td>
//                                             <img src={`TurfImage/TurfImage/${ground.image}`} style={{ width: "7rem" }} alt="Turf" />
//                                         </td>
//                                         <td>{ground.name}</td>
//                                         <td>{ground.width}</td>
//                                         <td>{ground.length}</td>
//                                         <td>{ground.price}</td>
//                                         <td>{ground.description}</td>
//                                         <td>
//                                             <button type='button' className='btn btn-danger' onClick={() => deleteTurf(ground.turfId)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }


import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../common/HeaderAdmin';
import Footer from '../common/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Ground from '../Services/Ground';

export default function GroundTable() {
    const history = useNavigate();
    const [grounds, setGrounds] = useState([]);

    const checkAuthentication = () => {
        const managerId = sessionStorage.getItem("managerId");
        if (!managerId) {
            history("/adminLogin");
        }
    }

    useEffect(() => {
        checkAuthentication();
        fetchAllGrounds();
    }, []);

    const fetchAllGrounds = async () => {
        try {
            const response = await Ground.getGround();
            setGrounds(response.data);
        } catch (error) {
            console.error('Error fetching all turf details:', error);
        }
    };

    const deleteTurf = async (turfId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this turf?");
        if (confirmDelete) {
            try {
                // Use the URL from the Ground service
                await axios.delete(`${Ground.URL}/delete-turf/${turfId}`);
                setGrounds(grounds.filter(turf => turf.turfId !== turfId));
                alert("Turf deleted successfully");
            } catch (error) {
                console.error('Error deleting turf:', error);
                alert("An error occurred while deleting the turf.");
            }
        }
    }

    return (
        <>
            <HeaderAdmin />
            <div className="container-fluid bg-breadcrumb">
                <div className="container text-center" style={{ maxWidth: 900 }}>
                    <h3 className="text-white display-3">Ground Table</h3>
                </div>
            </div>
            <div className='container'>
                <div className='row pt-5 pb-5'>
                    <div className='table-responsive'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Ground Width</th>
                                    <th>Ground Length</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grounds.map((ground) => (
                                    <tr key={ground.turfId}>
                                        <td>
                                            <img src={`TurfImage/TurfImage/${ground.image}`} style={{ width: "7rem" }} alt="Turf" />
                                        </td>
                                        <td>{ground.name}</td>
                                        <td>{ground.width}</td>
                                        <td>{ground.length}</td>
                                        <td>{ground.price}</td>
                                        <td>{ground.description}</td>
                                        <td>
                                            <button type='button' className='btn btn-danger' onClick={() => deleteTurf(ground.turfId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}