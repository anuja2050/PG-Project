// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HeaderAdmin from "../common/HeaderAdmin";
// import Footer from "../common/Footer";
// import GroundService from "../Services/Ground";
// import axios from "axios";

// export default function Ground() {
//   const history=useNavigate();
//   const URL ='http://localhost:6162';

//   const [file, setFile] = useState(null);
//   const [turfName, setTurfName] = useState("");
//   const [description, setDescription] = useState("");
//   const [width, setWidth] = useState("");
//   const [length, setLength] = useState("");
//   const [price, setPrice] = useState("");
//   const [managerId, setManagerId] = useState();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("turfName", turfName);
//       formData.append("description", description);
//       formData.append("width", width);
//       formData.append("length", length);
//       formData.append("price", price);

//       await axios.post(URL + `/turf-data/save/${managerId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       //console.log(formData);
//       alert("Data saved successfully!");
//     } catch (error) {
//       alert("Error saving data!");
//       console.error(error); 
//     }
//   };



//   const BookingPage = () => {
//     // const getusers = localStorage.getItem("managerId");
//     const getusers=sessionStorage.getItem("managerId");
//     if (getusers && getusers.length > 0) {
//         //const user = JSON.parse(getusers);
//         history("/ground");
//     } else {
//         history("/adminLogin");
//     }
//   }
//   useEffect(() => {
//    // const manId = localStorage.getItem("managerId");
//     const manId=sessionStorage.getItem("managerId");
//     setManagerId(manId);
//     BookingPage();
//   });
//   return (
//     <>
//       <HeaderAdmin></HeaderAdmin>
//       {/* Header start */}
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center" style={{ maxWidth: 900 }}>
//           <h3 className="text-white display-3">Ground</h3>
//         </div>
//       </div>
//       {/* Header End */}

//       <div className="container">
//         <div className="row">
//           <div className="col-3 pt-5"></div>

//           <div className="col-md-6 pt-5">
//             <h1 className="h1  text-center">
//               <u>Add Ground</u>
//             </h1>
//             <form encType="multipart/form-data" className="row g-3 pt-3 pb-5">
//               <div className="col-md-6">
//                 <label htmlFor="GroundName" className="form-label">
//                   Ground Name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter Ground Name"
//                   name="turfName"
//                   id="turfName"
//                   onChange={(e) => setTurfName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label htmlFor="GroundWidth" className="form-label">
//                   Ground Width
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="width" id="width"
//                   onChange={(e) => setWidth(e.target.value)} required
//                   placeholder="Enter Ground Width"
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label htmlFor="GroundLength" className="form-label">
//                   Ground Length
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="length" id="length"
//                   onChange={(e) => setLength(e.target.value)} required
//                   placeholder="Enter Ground Length"
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label htmlFor="Price" className="form-label">
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   name="price" id="price"
//                   onChange={(e) => setPrice(e.target.value)} required
//                   placeholder="Enter Price"
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label htmlFor="GroundHeight" className="form-label">
//                   Select Ground Image
//                 </label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   name="file"
//                   id="file"
//                   onChange={handleFileChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label htmlFor="GroundDescription" className="form-label">
//                   Ground Description
//                 </label>
//                 <textarea
//                   type="text"
//                   className="form-control"
//                   name="description" id="description"
//                   onChange={(e) => setDescription(e.target.value)} required
//                   placeholder="Enter Ground Description"
//                 />
//               </div>

//               <div className="col-12">
//                 <button
//                   type="submit"
//                   className="btn btn-primary rounded-pill " onClick={handleSubmit}
//                   style={{ width: "100%" }}
//                 >
//                   Add Ground
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div className="col-3 pt-5"></div>
//         </div>
//       </div>
//       <Footer></Footer>
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroundService from "../Services/Ground";
import HeaderAdmin from "../common/HeaderAdmin";
import Footer from "../common/Footer";
import axios from "axios";

export default function Ground() {
  const history = useNavigate();
  const URL = 'http://localhost:9898';

  const [file, setFile] = useState(null);
  const [turfName, setTurfName] = useState("");
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [price, setPrice] = useState("");
  const [managerId, setManagerId] = useState(null);
  const [grounds, setGrounds] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("turfName", turfName);
      formData.append("description", description);
      formData.append("width", width);
      formData.append("length", length);
      formData.append("price", price);

      await axios.post(URL + `/turf-data/save/${managerId}`, formData, {
           headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Data saved successfully!");
      fetchGrounds(); // Refresh the data table after saving
    } catch (error) {
      alert("Error saving data!");
      console.error(error);
    }
  };

  const checkAuthorization = () => {
    const storedManagerId = sessionStorage.getItem("managerId");
    if (storedManagerId) {
      setManagerId(storedManagerId);
    } else {
      history("/adminLogin");
    }
  };

  const fetchGrounds = async () => {
    try {
      const response = await axios.get(`${URL}/turf-data`);
      setGrounds(response.data);
    } catch (error) {
      console.error("Error fetching grounds data!", error);
    }
  };

  useEffect(() => {
    checkAuthorization();
    fetchGrounds(); // Fetch data when the component mounts
  }, [history]);

  return (
    <>
      <HeaderAdmin />

      {/* Header start */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center" style={{ maxWidth: 900 }}>
          <h3 className="text-white display-3">Ground</h3>
        </div>
      </div>
      {/* Header End */}

      <div className="container">
        <div className="row">
          <div className="col-3 pt-5"></div>

          <div className="col-md-6 pt-5">
            <h1 className="h1 text-center">
              <u>Add Ground</u>
            </h1>
            <form className="row g-3 pt-3 pb-5" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="turfName" className="form-label">
                  Ground Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Ground Name"
                  id="turfName"
                  onChange={(e) => setTurfName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="width" className="form-label">
                  Ground Width
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="width"
                  onChange={(e) => setWidth(e.target.value)}
                  required
                  placeholder="Enter Ground Width"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="length" className="form-label">
                  Ground Length
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="length"
                  onChange={(e) => setLength(e.target.value)}
                  required
                  placeholder="Enter Ground Length"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="Enter Price"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="file" className="form-label">
                  Select Ground Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="description" className="form-label">
                  Ground Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Enter Ground Description"
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill"
                  style={{ width: "100%" }}
                >
                  Add Ground
                </button>
              </div>
            </form>
          </div>

          <div className="col-3 pt-5"></div>
        </div>
      </div>

      {/* Display Grounds */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Grounds List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Width</th>
              <th>Length</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {grounds.map((ground, index) => (
              <tr key={index}>
                <td>{ground.turfName}</td>
                <td>{ground.description}</td>
                <td>{ground.width}</td>
                <td>{ground.length}</td>
                <td>{ground.price}</td>
                <td>
                  <img
                    src={`${URL}/images/${ground.fileName}`} // Adjust according to your backend
                    alt={ground.turfName}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
}

