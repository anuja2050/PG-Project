
import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';

export default function Book() {
    const [logindata, setLogindata] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateTime: '',
        numberOfPlayers: '',
        hours: '',
        slot: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        BookingPage();
    }, []);

    const BookingPage = () => {
        const getUsers = sessionStorage.getItem("userId");
        if (getUsers && getUsers.length > 0) {
            const user = JSON.parse(getUsers);
            setLogindata(user);
        } else {
            navigate("/login");
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const validate = () => {
        let formErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            isValid = false;
            formErrors.name = "Name is required";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            isValid = false;
            formErrors.email = "Valid email is required";
        }

        if (!formData.dateTime) {
            isValid = false;
            formErrors.dateTime = "Date and time are required";
        } else if (new Date(formData.dateTime) < new Date()) {
            isValid = false;
            formErrors.dateTime = "Date and time must be in the future";
        }

        if (!formData.numberOfPlayers || formData.numberOfPlayers < 1 || formData.numberOfPlayers > 10) {
            isValid = false;
            formErrors.numberOfPlayers = "Number of players should be between 1 and 10";
        }

        if (!formData.hours || formData.hours < 1 || formData.hours > 24) {
            isValid = false;
            formErrors.hours = "Hours should be between 1 and 24";
        }

        if (!formData.slot) {
            isValid = false;
            formErrors.slot = "Slot selection is required";
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log("Booking data:", formData);

            alert("Booking submitted successfully!");

            setFormData({
                name: '',
                email: '',
                dateTime: '',
                numberOfPlayers: '',
                hours: '',
                slot: ''
            });

            navigate('/turf');
        } else {
            alert("Please correct the errors in the form.");
        }
    };

    return (
        <>
            {logindata.length === 0 ? "error" :
                <>
                    <Header />
                    <div className="container-fluid bg-breadcrumb">
                        <div className="container text-center" style={{ maxWidth: 900 }}>
                            <h3 className="text-white display-3">Book</h3>
                        </div>
                    </div>

                    <div className="container py-2">
                        <div className="mx-auto text-center mb-5" style={{ maxWidth: 900 }}>
                        </div>
                    </div>

                    <div className="container-fluid booking py-5">
                        <div className="container py-5">
                            <div className="row g-5 align-items-center">
                                <div className="col-lg-6">
                                    <h5 className="section-booking-title pe-3">Booking</h5>
                                    <h1 className="text-white mb-4">Online Booking</h1>
                                    <p className="text-white mb-4">
                                        It seems like you're looking for information or assistance related to turf booking.
                                        However, your request is a bit vague.
                                        To provide you with more accurate and helpful information,
                                        could you please provide more details or clarify your request?
                                        Are you looking for contact information for a specific turf booking service or platform?
                                    </p>
                                    <p className="text-white mb-4">
                                        We are looking to [mention the date(s) and time(s) if known]
                                        for our activity, and any guidance you can provide would be immensely helpful.
                                        I can be reached at [your contact information],
                                        and I am available at your earliest convenience to discuss the details.
                                    </p>
                                    <p className="text-white mb-4">Thank you for your time, and I look forward to the opportunity
                                        to utilize your excellent turf facilities.</p>
                                    <a
                                        href="#"
                                        className="btn btn-light text-primary rounded-pill py-3 px-5 mt-2"
                                    >
                                        Read More
                                    </a>
                                </div>
                                <div className="col-lg-6">
                                    <h1 className="text-white mb-3">Book A Tour Deals</h1>
                                    <p className="text-white mb-4">
                                        I am available for a discussion at your convenience, and you can reach me at [your contact information]. Thank you for considering our request, and I look forward to the possibility of collaborating with your esteemed facility.
                                    </p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className={`form-control bg-white border-0 ${errors.name ? 'is-invalid' : ''}`}
                                                        id="name"
                                                        placeholder="Your Name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="name">Your Name</label>
                                                    <div className="invalid-feedback">{errors.name}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input
                                                        type="email"
                                                        className={`form-control bg-white border-0 ${errors.email ? 'is-invalid' : ''}`}
                                                        id="email"
                                                        placeholder="Your Email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="email">Your Email</label>
                                                    <div className="invalid-feedback">{errors.email}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating date" id="date3" data-target-input="nearest">
                                                    <input
                                                        type="datetime-local"
                                                        className={`form-control bg-white border-0 ${errors.dateTime ? 'is-invalid' : ''}`}
                                                        id="dateTime"
                                                        value={formData.dateTime}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="dateTime">Date &amp; Time</label>
                                                    <div className="invalid-feedback">{errors.dateTime}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input
                                                        type="number"
                                                        className={`form-control bg-white border-0 ${errors.numberOfPlayers ? 'is-invalid' : ''}`}
                                                        id="numberOfPlayers"
                                                        min="1"
                                                        max="10"
                                                        value={formData.numberOfPlayers}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="numberOfPlayers">Number of Players</label>
                                                    <div className="invalid-feedback">{errors.numberOfPlayers}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input
                                                        type="number"
                                                        className={`form-control bg-white border-0 ${errors.hours ? 'is-invalid' : ''}`}
                                                        id="hours"
                                                        min="1"
                                                        max="24"
                                                        placeholder="Hours"
                                                        value={formData.hours}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="hours">Hours</label>
                                                    <div className="invalid-feedback">{errors.hours}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <select
                                                        className={`form-select ${errors.slot ? 'is-invalid' : ''}`}
                                                        id="slot"
                                                        aria-label="Select slot"
                                                        value={formData.slot}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Slot</option>
                                                    <option value="9-11">9:00 - 11:00</option>
                                                       <option value="12-14">12:00 - 14:00</option>
                                                        <option value="16-18">16:00 - 18:00</option>
                                                         <option value="19-22">19:00 - 22:00</option>
                                                    </select>
                                                    <label htmlFor="slot">Slot</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button
                                                  className="btn btn-primary text-white w-100 py-3"
                                                     type="submit"
                                                >
                                                    Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container py-1">
                         <div className="mx-auto text-center mb-1" style={{ maxWidth: 900 }}>
                        </div>
                 </div>
                     <Footer />
                </>
            }
        </>
    );
}