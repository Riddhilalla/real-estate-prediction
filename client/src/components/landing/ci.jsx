import React, { useState } from 'react';

const properties = [
  { id: 1, name: 'Seaside Apartment', location: '15th Road', area: 1000, price: 5000000, bhk: 2, gym: true, parking: true, joggingTrack: false, indoorGame: true, swimmingPool: true, supermarket: true, petFriendly: true, security: true, playground: false, cityView: true, balcony: true },
  { id: 2, name: 'City Center Condo', location: 'Bandra', area: 1200, price: 7000000, bhk: 3, gym: true, parking: true, joggingTrack: true, indoorGame: false, swimmingPool: false, supermarket: true, petFriendly: false, security: true, playground: true, cityView: true, balcony: true },
  { id: 3, name: 'Suburban House', location: 'Andheri', area: 800, price: 4000000, bhk: 2, gym: false, parking: true, joggingTrack: true, indoorGame: true, swimmingPool: false, supermarket: false, petFriendly: true, security: false, playground: true, cityView: false, balcony: false },
  { id: 4, name: 'Luxury Penthouse', location: 'Worli', area: 2000, price: 15000000, bhk: 4, gym: true, parking: true, joggingTrack: true, indoorGame: true, swimmingPool: true, supermarket: true, petFriendly: true, security: true, playground: false, cityView: true, balcony: true },
  { id: 5, name: 'Cozy Studio', location: 'Juhu', area: 500, price: 3000000, bhk: 1, gym: true, parking: false, joggingTrack: false, indoorGame: false, swimmingPool: false, supermarket: true, petFriendly: false, security: true, playground: false, cityView: false, balcony: true },
  { id: 6, name: 'Garden View Flat', location: 'Powai', area: 900, price: 5500000, bhk: 2, gym: true, parking: true, joggingTrack: true, indoorGame: false, swimmingPool: true, supermarket: true, petFriendly: true, security: true, playground: true, cityView: false, balcony: true },
  { id: 7, name: 'High-Rise Apartment', location: 'Lower Parel', area: 1500, price: 9000000, bhk: 3, gym: true, parking: true, joggingTrack: false, indoorGame: true, swimmingPool: true, supermarket: true, petFriendly: false, security: true, playground: false, cityView: true, balcony: true },
  { id: 8, name: 'Eco-Friendly Complex', location: 'Thane', area: 1100, price: 6000000, bhk: 2, gym: true, parking: true, joggingTrack: true, indoorGame: true, swimmingPool: false, supermarket: true, petFriendly: true, security: true, playground: true, cityView: false, balcony: true },
  { id: 9, name: 'Beachfront Villa', location: 'Alibaug', area: 2500, price: 20000000, bhk: 4, gym: true, parking: true, joggingTrack: true, indoorGame: true, swimmingPool: true, supermarket: false, petFriendly: true, security: true, playground: true, cityView: false, balcony: true },
  { id: 10, name: 'Budget Friendly Flat', location: 'Malad', area: 700, price: 3500000, bhk: 2, gym: false, parking: true, joggingTrack: false, indoorGame: false, swimmingPool: false, supermarket: true, petFriendly: false, security: true, playground: true, cityView: false, balcony: false },
];

const CompatibilityIndex = () => {
  const [userPreferences, setUserPreferences] = useState({
    location: '',
    minArea: '',
    maxPrice: '',
    bhk: '',
    gym: false,
    parking: false,
    joggingTrack: false,
    indoorGame: false,
    swimmingPool: false,
    supermarket: false,
    petFriendly: false,
    security: false,
    playground: false,
    cityView: false,
    balcony: false,
  });

  const [compatibleProperties, setCompatibleProperties] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateCompatibility = (property) => {
    let score = 0;
    let totalFeatures = 0;

    if (userPreferences.location && property.location === userPreferences.location) {
      score++; totalFeatures++;
    }
    if (userPreferences.minArea && property.area >= parseInt(userPreferences.minArea)) {
      score++; totalFeatures++;
    }
    if (userPreferences.maxPrice && property.price <= parseInt(userPreferences.maxPrice)) {
      score++; totalFeatures++;
    }
    if (userPreferences.bhk && property.bhk === parseInt(userPreferences.bhk)) {
      score++; totalFeatures++;
    }

    const amenities = ['gym', 'parking', 'joggingTrack', 'indoorGame', 'swimmingPool', 'supermarket', 'petFriendly', 'security', 'playground', 'cityView', 'balcony'];
    amenities.forEach(amenity => {
      if (userPreferences[amenity]) {
        totalFeatures++;
        if (property[amenity]) score++;
      }
    });

    return totalFeatures > 0 ? Math.round((score / totalFeatures) * 100) : 0;
  };

  const findCompatibleProperties = (e) => {
    e.preventDefault();
    const compatible = properties.map(property => ({
      ...property,
      compatibilityScore: calculateCompatibility(property)
    })).filter(property => property.compatibilityScore > 0)
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    setCompatibleProperties(compatible);
  };
 
  return (
    
    <div style={styles.container}>
      <header style={styles.header}>
        <a href="http://localhost:5173/"><button style={styles.backButton}>← Back to Home</button></a>
      </header>
      <main style={styles.main}>
        <h1 style={styles.title}>Real Estate Compatibility Index</h1>
        <p style={styles.subtitle}>Find your perfect match in the real estate market</p>
        
        <div style={styles.formContainer}>
          <form onSubmit={findCompatibleProperties} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Location</label>
              <select name="location" value={userPreferences.location} onChange={handleInputChange} style={styles.select}>
                <option value="">Select location</option>
                {[...new Set(properties.map(p => p.location))].map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Area (Sq/Ft)</label>
              <input type="number" name="minArea" value={userPreferences.minArea} onChange={handleInputChange} style={styles.input} placeholder="Enter minimum area" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Max Price (₹)</label>
              <input type="number" name="maxPrice" value={userPreferences.maxPrice} onChange={handleInputChange} style={styles.input} placeholder="Enter maximum price" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>BHK</label>
              <input type="number" name="bhk" value={userPreferences.bhk} onChange={handleInputChange} style={styles.input} placeholder="Enter number of BHK" />
            </div>
            <div style={styles.amenities}>
              {Object.keys(userPreferences).filter(key => typeof userPreferences[key] === 'boolean').map(amenity => (
                <label key={amenity} style={styles.amenityLabel}>
                  <input
                    type="checkbox"
                    name={amenity}
                    checked={userPreferences[amenity]}
                    onChange={handleInputChange}
                    style={styles.checkbox}
                  />
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
              ))}
            </div>
            <button type="submit" style={styles.button}>Find Compatible Properties</button>
          </form>
        </div>

        {compatibleProperties.length > 0 && (
          <div style={styles.results}>
            <h2 style={styles.resultsTitle}>Compatible Properties</h2>
            <div style={styles.propertyGrid}>
              {compatibleProperties.map(property => (
                <div key={property.id} style={styles.propertyCard}>
                  <h3 style={styles.propertyName}>{property.name}</h3>
                  <p style={styles.propertyLocation}>{property.location}</p>
                  <p style={styles.propertyDetails}>{property.area} sq ft • {property.bhk} BHK</p>
                  <p style={styles.propertyPrice}>₹{property.price.toLocaleString()}</p>
                  <div style={styles.amenitiesList}>
                    {Object.entries(property)
                      .filter(([key, value]) => typeof value === 'boolean' && value)
                      .map(([key]) => (
                        <span key={key} style={styles.amenityTag}>
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </span>
                      ))
                    }
                  </div>
                  <p style={styles.compatibilityScore}>Compatibility Score: {property.compatibilityScore}%</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    minHeight: '100vh',
    width: '100vw',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '0px',
  },
  header: {
    width: '100%',
    padding: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  main: {
    maxWidth: '800px',
    width: '100%',
    padding: '20px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#ffff00',
  },
  subtitle: {
    fontSize: '18px',
    color: '#ffffff',
    marginBottom: '30px',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '30px',
    backdropFilter: 'blur(10px)',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  select: {
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#000000',
  },
  input: {
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
  },
  amenities: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    gridColumn: '1 / -1',
  },
  amenityLabel: {
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
  },
  checkbox: {
    marginRight: '8px',
  },
  button: {
    backgroundColor: '#ffff00',
    color: '#1a1a1a',
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    gridColumn: '1 / -1',
  },
  results: {
    marginTop: '40px',
  },
  resultsTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#ffff00',
  },
  propertyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  propertyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    backdropFilter: 'blur(10px)',
  },
  propertyName: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#ffff00',
  },
  propertyLocation: {
    color: '#ffffff',
    marginBottom: '5px',
  },
  propertyDetails: {
    fontSize: '14px',
    color: '#ffffff',
    marginBottom: '5px',
  },
  propertyPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ffff00',
    marginBottom: '10px',
  },
  amenitiesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    marginBottom: '10px',
  },
  amenityTag: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    borderRadius: '15px',
    padding: '5px 10px',
    fontSize: '12px',
  },
  compatibilityScore: {
    fontWeight: 'bold',
    color: '#ffff00',
  },
};

export default CompatibilityIndex;


