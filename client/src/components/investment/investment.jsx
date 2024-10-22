import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './investment.css'; // Ensure your CSS file is included

const InvestmentIndex = () => {
  const [features, setFeatures] = useState({
    Area: '',
    Bathrooms: '',
    Floor: '',
    BHK: '',
    Age: '',
    Amenities: [],
    Furnished: '',
    Facing: ''
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const amenitiesOptions = ['Garden/Park', 'Main Road', 'Pool'];
  const furnishedOptions = {
    'Furnished': 3,
    'Semi-Furnished': 2,
    'Unfurnished': 1
  };
  const facingOptions = {
    'East': 6,
    'North - East': 5,
    'North': 4,
    'West': 3,
    'South - West': 2,
    'South': 1
  };

  const predictFuturePrices = (currentPrice, aagr) => {
    const futurePrices = {};
    const intervals = [2, 4, 6, 8, 10];

    intervals.forEach(year => {
      const futurePrice = currentPrice * Math.pow(1 + aagr / 100, year);
      futurePrices[year] = futurePrice.toFixed(2);
    });

    return futurePrices;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedFeatures = {
        Area: Number(features.Area),
        Bathrooms: Number(features.Bathrooms),
        Floor: Number(features.Floor),
        BHK: Number(features.BHK),
        Age: Number(features.Age),
        Amenities: features.Amenities.length,
        Furnished: furnishedOptions[features.Furnished],
        Facing: facingOptions[features.Facing]
      };

      const response = await axios.post('http://127.0.0.1:9000/investment-calculator', formattedFeatures);
      
      const prediction = response.data.predicted_price;
      setPredictedPrice(prediction);
      setHistory([...history, { ...formattedFeatures, predictedPrice: prediction }]);

      const aagr = 10; // Example AAGR
      const futurePrices = predictFuturePrices(prediction, aagr);

      const updatedChartData = {
        labels: ['Current Price', '2 Years', '4 Years', '6 Years', '8 Years', '10 Years'],
        datasets: [
          {
            label: 'Future Price Predictions',
            data: [
              prediction,
              futurePrices[2],
              futurePrices[4],
              futurePrices[6],
              futurePrices[8],
              futurePrices[10]
            ],
            fill: false,
            backgroundColor: '#ffff00',
            borderColor: '#ffff00',
          },
        ],
      };

    
      setChartData(updatedChartData);
    } catch (error) {
      console.error('Error fetching prediction:', error.response ? error.response.data : error.message);
    }
  };


  // Format the price in Indian currency
  const formatPrice = (amount) => {
    if (amount === null || amount === undefined) return '';

    // Convert to a string and remove any leading/trailing spaces
    let amountStr = amount.toString().trim();

    // Split the amount into integer and decimal parts (if any)
    let parts = amountStr.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Format the integer part according to Indian numbering system
    const lastThreeDigits = integerPart.slice(-3);
    const otherDigits = integerPart.slice(0, -3);
    const formattedIntegerPart = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + (otherDigits.length > 0 ? ',' : '') + lastThreeDigits;

    return `₹ ${formattedIntegerPart}${decimalPart}`; // Changed Rs to ₹
  };

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      window.location.reload(); // Refresh the page when closing the modal
    }
  };

  return (
    <div className="App" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)', backgroundSize: 'cover' }}>
      <div className="content-container">
        <div className="text-section">
          <h1 style={{ color: '#ffff00', textAlign: 'left', fontSize:'40px' }}>Investment Index</h1>
          <p style={{ textAlign: 'left', fontSize:'20px' }}>This calculator predicts the future prices of your investment based on various features.Input the details of your property and see how its value can grow over time!</p>
         
        </div>
        <div className="form-section">
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label>Area:</label>
                <input type="text" name="Area" value={features.Area} onChange={(e) => setFeatures({ ...features, Area: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Bathrooms:</label>
                <input type="text" name="Bathrooms" value={features.Bathrooms} onChange={(e) => setFeatures({ ...features, Bathrooms: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Floor:</label>
                <input type="text" name="Floor" value={features.Floor} onChange={(e) => setFeatures({ ...features, Floor: e.target.value })} />
              </div>
              <div className="form-group">
                <label>BHK:</label>
                <input type="text" name="BHK" value={features.BHK} onChange={(e) => setFeatures({ ...features, BHK: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Age:</label>
                <input type="text" name="Age" value={features.Age} onChange={(e) => setFeatures({ ...features, Age: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Amenities:</label>
                {amenitiesOptions.map((amenity, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      name={amenity}
                      checked={features.Amenities.includes(amenity)}
                      onChange={(e) => {
                        const { name, checked } = e.target;
                        setFeatures((prevFeatures) => {
                          const amenities = [...prevFeatures.Amenities];
                          if (checked) {
                            amenities.push(name);
                          } else {
                            const index = amenities.indexOf(name);
                            if (index > -1) {
                              amenities.splice(index, 1);
                            }
                          }
                          return { ...prevFeatures, Amenities: amenities };
                        });
                      }}
                    />
                    <label>{amenity}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Furnished:</label>
                <select name="Furnished" value={features.Furnished} onChange={(e) => setFeatures({ ...features, Furnished: e.target.value })}>
                  <option value="">Select</option>
                  {Object.keys(furnishedOptions).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Facing:</label>
                <select name="Facing" value={features.Facing} onChange={(e) => setFeatures({ ...features, Facing: e.target.value })}>
                  <option value="">Select</option>
                  {Object.keys(facingOptions).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit">Calculate</button>
          </form>
          {predictedPrice !== null && (
            <div>
              <h2>Predicted Price: {formatPrice(predictedPrice)} per month</h2>
              <button onClick={toggleModal}>Generate Graph</button> {/* Button to open the modal */}
            </div>
          )}
         
        </div>
         {/* Modal for displaying the chart */}
         {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={toggleModal}>&times;</span>
                <h2>Future Price Predictions</h2>
                {chartData && <Line data={chartData} />}
              </div>
            </div>
          )}
      </div>
      <style>
        {`
          .content-container {
            display: flex;
            height: 100vh;
            justify-content: center;
            align-items: center;
            fontFamily: 'Arial, sans-serif',
          }
          .text-section {
            flex: 1;
            padding: 20px;
            max-width: 500px;
            color: white;
          }
          .form-section {
            flex: 1;
            padding: 20px;
            display: flex;
            height: 75vh;
            flex-direction: column;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 10px;
            margin: 20px; /* Adjust margin as necessary */
          }
          .modal {
            display: flex;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
          }
          .modal-content {
            background-color: rgba(0, 0, 0,1);
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 600px;
            border-radius: 10px;
          }
          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          .close:hover,
          .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
          .form-container {
           display: flex;
    flex-direction: column;
    gap: 15px;
    height: 75vh;
    flex-wrap: no-wrap;
    align-content: center;
    justify-content: center;
    align-items: stretch;
    font-size: 18px;
    margin: 10px;
          }
          .form-row {
            display: flex;
            justify-content: space-between;
            margin:10px;
            align-items: center;
          }
          .form-group {
            flex: 1;
            margin-right: 10px;
          }
          .form-group:last-child {
            margin-right: 0;
          }
            button{
            background-color: #ffff00;
    border-color: #ffff00;
    color: black;
    width: 154px;
    padding: 5px 20px;
    border-radius: 15px;
    position: relative;
    left: 33%;
    font-size: 16px;
    font-weight: 800;
            }
        `}
      </style>
    </div>
  );
};

export default InvestmentIndex;
