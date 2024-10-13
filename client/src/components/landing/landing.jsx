import React from 'react';
import { color, motion } from 'framer-motion';
import { FaHome, FaClipboard, FaCalculator } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RealEstateDashboard = () => {
  const globalStyle = {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    height: '100%', // Ensure it takes full height
    width: '100%',  // Ensure it takes full width
  };

  const containerStyle = {
    background: 'linear-gradient(to right, #4a5568, #1a202c)', // Gradient background for the container
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    width: '100vw',  // Full viewport width
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden',
    padding: 0, // Remove padding
    margin: 0, // Remove margin
  };

  const cardStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Your background image here
    backgroundSize: 'cover', // Ensure the image covers the entire card
    backgroundPosition: 'center', // Center the image
    borderRadius: '24px',
    color: 'white',
    overflow: 'hidden',
    height: '100vh',  // Full window height
    width: '100vw',   // Full window width
    padding: '16px',  // Adjusted padding to keep space inside the card
    position: 'relative', // Enable positioning within card
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
  };

  const mainContentStyle = {
    position: 'relative',
    padding: '16px',
   
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: 'white',
  };

  const addressStyle = {
    fontSize: '14px',
    opacity: '0.8',
  };

  

  const imageContainerStyle = {
    position: 'relative',
    marginTop: '16px',
  };

  

  const propertyCardsContainerStyle = {
    position: 'relative',
      // Adjusted to reduce space below image
    display: 'flex',
    gap: '15px',
    top:'120px',
    left: '22%',
  };

  const propertyCardStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    padding: '8px',
    flex: '1',
    fontSize: '10px',
    color: '#1a202c',
    maxWidth: 'calc(16% - 8px)', // Make cards smaller
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: '16px',
   
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  const propertyCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };

  const blurBoxStyle = {
    // Blur effect
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    textAlign: 'center',
    width: '700px',
    position: 'relative',
    left: '23%',
  };
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <style>
        {`
          body, html {
            ${Object.entries(globalStyle)
              .map(([key, value]) => `${key}: ${value};`)
              .join(' ')}
          }
        `}
      </style>
      <motion.div 
        style={containerStyle} 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
      >
        <motion.div style={cardStyle} variants={cardVariants}>
        <motion.header
      style={headerStyle}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      transition={{ duration: 0.5 }} // Adjust the duration for speed of animation
    >
     
  <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
    <motion.span whileHover={{ scale: 1.1, color: '#fffff' }}>
      ← SignUp
    </motion.span>
  </Link>

  <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
    <motion.span whileHover={{ scale: 1.1, color: '#fffff' }}>
      Login →
    </motion.span>
  </Link>
</motion.header>
  

          <main style={mainContentStyle}>
          <div style={blurBoxStyle}>
              <h1 style={{ ...titleStyle, color: '#ffff00'}}>Smart Estate</h1>
              <p style={{ ...addressStyle, color: '#fffff' }}>
              Your all-in-one real estate platform, where compatibility meets investment insights. Explore properties, calculate investments, and predict house prices effortlessly
              </p>
            </div>

            

            <div style={imageContainerStyle}>
  <motion.div style={propertyCardsContainerStyle}>
    {[
      { title: 'Compatibility Index', icon: <FaClipboard size={24} color="#ffff00" /> },
      { title: 'Investment Calculator', icon: <FaCalculator size={24} color="#ffff00" /> },
      { title: 'House Price Prediction', icon: <FaHome size={24} color="#ffff00" /> },
    ].map((property, index) => (
      <motion.div 
        key={index} 
        style={{
          ...propertyCardStyle,
          display: 'flex',               
          flexDirection: 'column',      
          alignItems: 'center',         
          justifyContent: 'center',      
          padding: '20px',               
          borderRadius: '10px',          
          backgroundColor: 'rgba(0, 0, 0, 0.2)',    
          transition: 'transform 0.3s',  
          cursor: 'pointer',             
        }} 
        variants={propertyCardVariants} 
        initial="hidden" 
        animate="visible"
        whileHover={{ scale: 1.05 }} 
      >
        <div style={{ marginBottom: '8px' }}>{property.icon}</div> {/* Render the icon */}
        <p style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize: '18px' }}>{property.title}</p> {/* Render the title */}
      </motion.div>
    ))}
  </motion.div>
</div>
          </main>

          <footer style={{ ...footerStyle, position: 'sticky', top: '100%' }}>
            <div>Copyright to</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                ></div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Smart Estate @ 2024</span>
              
            </div>
          </footer>
        </motion.div>
      </motion.div>
    </>
  );
};

export default RealEstateDashboard;
