import React, { useRef, useState } from 'react';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import AdminService from '../Services/AdminService';

export default function AdminLogin() { 

  const history = useNavigate();
  const username = useRef();
  const password = useRef();

  const [usernameError,setUsernameError]=useState('');
  const [passwordError,setPasswordError]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredUsername = username.current.value.trim();
    const enteredPassword = password.current.value.trim();

    
    // const admin = {
    //   username: username.current.value,
    //   password: password.current.value,
    // };

     // Validate username
     if (!enteredUsername) {
      setUsernameError('Username is required.');
      return;
    } else {
      setUsernameError('');
    }
     // Validate password
     if (!enteredPassword) {
      setPasswordError('Password is required.');
      return;
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(enteredPassword)) {
      setPasswordError('Password must have at least one letter, one number, one special character, and be at least 8 characters long.');
      return;
    } else {
      setPasswordError('');
    }

    // Form is valid, proceed with login
    const admin = {
      username: enteredUsername,
      password: enteredPassword
    };
    
    AdminService.loginCheck(admin)
      .then((res) => {
        const result = res.data;
        if (result.username === admin.username && result.password === admin.password) {
                 alert("success full login");
                 sessionStorage.setItem("managerId",result.managerId);
                // localStorage.setItem("managerId", JSON.stringify(result.managerId));
                // console.log(result.managerId);
                 history("/homeadmin")
              } else {
                alert("failed to login");
              }
            }).catch((err) => {
              alert("failed to login" + err.message);
            })
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   const Admin = {
  //     username: username.current.value,
  //     password: password.current.value,

  //   }
    
  //   AdminService.loginCheck(Admin).then((res) => {
  //     const result=res.data;
  //     if (result.username === Admin.username && result.password === Admin.password) {
  //        alert("success full login");
  //        sessionStorage.setItem("managerId",JSON.stringify(result.managerId))
  //       // localStorage.setItem("managerId", JSON.stringify(result.managerId));
  //       // console.log(result.managerId);
  //        history("/homeadmin",)
  //     } else {
  //       alert("failed to login");
  //     }
  //   }).catch((err) => {
  //     alert("failed to login" + err.message);
  //   })

  // };

  
  return (
    <>
      <Header></Header>
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center" style={{ maxWidth: 900 }}>
          <h3 className="text-white display-3">Admin Login</h3>
        </div>
      </div>


      {/*================login_part Area =================*/}
      <section className="login_part section_padding pt-5 pb-5" >
        <div className="container ">
          <div className="row align-items-center pt-4 pb-5" >
            <div className="col-lg-6 col-md-6 log"  >
              <img className="img-fluid w-100 rounded-top"
                src="img/login.jpg"
                alt="Image"
              />

            </div>
            <div className="col-lg-6 col-md-6" >
              <div className="login_part_form">
                <div className="login_part_form_iner">                  
                  <form
                    className='form-control py-3'
                  >
                    <div className="col-md-12 py-3" >
                      <input
                        type="text"
                        className={`form-control p-2 ${usernameError ? 'is-invalid' : ''}`}
                        name="username"
                        placeholder="Username"
                        ref={username}
                      />
                    </div>
                    <div className="col-md-12 py-3 ">
                      <input
                         type="password"
                         className={`form-control p-2 ${passwordError ? 'is-invalid' : ''}`}
                         name="password"
                         placeholder="Password"
                        ref={password}
                      />
                    </div>
                    <div className="col-md-12 py-3 text-center">
                      <button type="submit" className="btn btn-primary w-50" onClick={handleSubmit} >
                        Log In
                      </button><br/>
                      <a className="lost_pass " href="#">
                        Forgot password?
                      </a>
                      
                     
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*================login_part end =================*/}
      <Footer></Footer>
    </>
  );
}
