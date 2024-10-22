import React, { useState } from 'react';
import './house.css'; // Add your custom styles here
import 'bootstrap/dist/css/bootstrap.min.css';

function HousePrice() {
    const [formData, setFormData] = useState({
        location: '',
        area: '',
        bhk: '',
        toggle: false,
        gym: false,
        indoor: false,
        car: false,
        jog: false,
    });
    const [prediction, setPrediction] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPrediction('Wait Predicting Price...!');

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) =>
            formDataToSend.append(key, formData[key])
        );

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.text();
            setPrediction(`Estimated Price is : ₹ ${result}`);
        } catch (error) {
            setPrediction('Error predicting price.');
        }
    };

    return (
        <div className="app">
            <div className="background"></div>
            <a href="http://localhost:5173/" className="back-link">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Home
            </a>
            <div className="hero">
                <h1>Predicting House Prices in Mumbai</h1>
                <p>
                    Here at SmartEstate we use random forest regressor model to
                    predict house prices with an accuracy of 81%
                </p>
            </div>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>
                                    <b>Location</b>
                                </label>
                                <select
                                    className="form-control"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {/* Replace with dynamic locations */}
                                    <option value="">Select Location</option>
                                    <option value="Location1">Location1</option>
                                    <option value="Location2">Location2</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>
                                    <b>Area (Sq/Ft)</b>
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="area"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                    placeholder="Enter Area"
                                    min="100"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>
                                    <b>No of BHK</b>
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="bhk"
                                    name="bhk"
                                    value={formData.bhk}
                                    onChange={handleInputChange}
                                    placeholder="Enter no. of rooms"
                                    min="1"
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label className="toggle">
                                    <span className="toggle-label">
                                        <b>New</b>
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="toggle-checkbox"
                                        name="toggle"
                                        checked={formData.toggle}
                                        onChange={handleInputChange}
                                    />
                                    <div className="toggle-switch"></div>
                                    <span className="toggle-label">
                                        <b>Resale</b>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            {['gym', 'indoor', 'car', 'jog'].map((item) => (
                                <div className="col-md-3" key={item}>
                                    <label className={`${item}`}>
                                        <span className={`${item}-label`}>
                                            <b>{item.charAt(0).toUpperCase() + item.slice(1)}</b>
                                        </span>
                                        <input
                                            type="checkbox"
                                            className={`${item}-checkbox`}
                                            name={item}
                                            checked={formData[item]}
                                            onChange={handleInputChange}
                                        />
                                        <div className={`${item}-switch`}></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12 text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                >
                                    Predict Price
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <h3>
                            <span id="prediction">{prediction}</span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HousePrice;
