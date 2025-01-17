// import React, { useEffect, useState } from 'react';
// import UserService from '../Services/UserService';
// import HeaderAdmin from '../common/HeaderAdmin';
// import Footer from '../common/Footer';

// export default function Displayallusers() {

//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = () => {
//     UserService.getUser().then((res) => {
//       setUsers(res.data);
//       console.log(res.data);
//     }).catch(error => {
//       console.log(error);
//     });
//   };

//   const deleteUser = (userId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (confirmDelete) {
//       UserService.deleteUser(userId).then((res) => {
//         setUsers(users.filter(user => user.userId !== userId));
//         alert("User deleted successfully");
//       }).catch(error => {
//         console.log(error);
//         alert("An error occurred while deleting the user.");
//       });
//     }
//   };

//   return (
//     <>
//       <HeaderAdmin />
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center" style={{ maxWidth: 900 }}>
//           <h3 className="text-white display-3">User Detail</h3>
//         </div>
//       </div>
//       <div className='container'>
//         <div className='row pt-5 pb-5'>
//           <div className='table-responsive'>
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th scope='col'>User Id</th>
//                   <th scope='col'>User Name</th>
//                   <th scope='col'>User Age</th>
//                   <th scope='col'>User Mobile No</th>
//                   <th scope='col'>User User Name</th>
//                   <th scope='col'>User Password</th>
//                   <th scope='col'>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users && users.map((usr) => (
//                   <tr key={usr.userId}>
//                     <td>{usr.userId}</td>
//                     <td>{usr.name}</td>
//                     <td>{usr.age}</td>
//                     <td>{usr.mobileNo}</td>
//                     <td>{usr.username}</td>
//                     <td>{usr.password}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => deleteUser(usr.userId)}
//                       > 
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }








// import React, { useEffect, useState } from 'react';
// import UserService from '../Services/UserService';
// import HeaderAdmin from '../common/HeaderAdmin';
// import Footer from '../common/Footer';

// export default function Displayallusers() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await UserService.getUser();
//       setUsers(res.data);
//       console.log(res.data);
//     } catch (error) {
//       console.log('Error fetching users:', error);
//     }
//   };

//   const deleteUser = async (userId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (confirmDelete) {
//       try {
//         await UserService.deleteUser(userId);
//         setUsers(users.filter(user => user.userId !== userId));
//         alert("User deleted successfully");
//       } catch (error) {
//         console.log('Error deleting user:', error);
//         alert("An error occurred while deleting the user.");
//       }
//     }
//   };

//   return (
//     <>
//       <HeaderAdmin />
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center" style={{ maxWidth: 900 }}>
//           <h3 className="text-white display-3">User Detail</h3>
//         </div>
//       </div>
//       <div className='container'>
//         <div className='row pt-5 pb-5'>
//           <div className='table-responsive'>
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th scope='col'>User Id</th>
//                   <th scope='col'>User Name</th>
//                   <th scope='col'>User Age</th>
//                   <th scope='col'>User Mobile No</th>
//                   <th scope='col'>User User Name</th>
//                   <th scope='col'>User Password</th>
//                   <th scope='col'>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.length > 0 ? (
//                   users.map((usr) => (
//                     <tr key={usr.userId}>
//                       <td scope="row">{usr.userId}</td>
//                       <td>{usr.name}</td>
//                       <td>{usr.age}</td>
//                       <td>{usr.mobileNo}</td>
//                       <td>{usr.username}</td>
//                       <td>{usr.password}</td>
//                       <td>
//                         <button
//                           className="btn btn-danger"
//                           onClick={() => deleteUser(usr.userId)}
//                           aria-label={`Delete user ${usr.name}`}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center">No users available</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }


import React, { useEffect, useState } from 'react';
import UserService from '../Services/UserService';
import HeaderAdmin from '../common/HeaderAdmin';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';

export default function Displayallusers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
    fetchUsers();
  }, []);

  const checkAuthentication = () => {
    const managerId = sessionStorage.getItem("managerId");
    if (!managerId) {
      navigate("/adminLogin");
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await UserService.getUser();
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert("Failed to fetch users. Please try again later.");
    }
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await UserService.deleteUserById(userId);
        setUsers(users.filter(user => user.userId !== userId));
        alert("User deleted successfully");
      } catch (error) {
        console.error('Error deleting user:', error);
        alert("An error occurred while deleting the user. Please try again.");
      }
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center" style={{ maxWidth: 900 }}>
          <h3 className="text-white display-3">User Detail</h3>
        </div>
      </div>
      <div className='container'>
        <div className='row pt-5 pb-5'>
          <div className='table-responsive'>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>User Name</th>
                  <th>User Age</th>
                  <th>User Mobile No</th>
                  <th>User Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((usr) => (
                    <tr key={usr.userId}>
                      <td>{usr.userId}</td>
                      <td>{usr.name}</td>
                      <td>{usr.age}</td>
                      <td>{usr.mobileNo}</td>
                      <td>{usr.username}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(usr.userId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No users available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}