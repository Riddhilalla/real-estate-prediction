import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaClipboard, FaCalculator } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RealEstateDashboard = () => {
  const globalStyle = {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
  };

  const containerStyle = {
    background: 'linear-gradient(to right, #4a5568, #1a202c)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden',
  };

  const cardStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '24px',
    color: 'white',
    overflow: 'hidden',
    height: '100vh',
    width: '100vw',
    padding: '16px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
  };

  const mainContentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  };

  const titleStyle = {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#ffff00',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  };

  const descriptionStyle = {
    fontSize: '1.2rem',
    color: '#ffffff',
    textAlign: 'center',
    maxWidth: '800px',
    marginBottom: '32px',
    lineHeight: '1.6',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  };

  const propertyCardsContainerStyle = {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1200px',
  };

  const propertyCardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '24px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s, background-color 0.3s',
    maxWidth: '250px',
  };

  const propertyCardIconStyle = {
    fontSize: '48px',
    marginBottom: '16px',
  };

  const propertyCardTitleStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: '1.2rem',
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
  };

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
    visible: { y: 0, opacity: 1, transition: { duration: 0.3, staggerChildren: 0.1 } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* {`
  body, html {
    ${Object.entries(globalStyle)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ')}
  }
`} */}
      <motion.div
        style={containerStyle}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div style={cardStyle} variants={cardVariants}>
          <div style={overlayStyle}></div>
          <div style={contentStyle}>
            <motion.header
              style={headerStyle}
              initial="hidden"
              animate="visible"
              variants={headerVariants}
              transition={{ duration: 0.5 }}
            >
              <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
                <motion.span whileHover={{ scale: 1.1 }}>
                  ← SignUp
                </motion.span>
              </Link>

              <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                <motion.span whileHover={{ scale: 1.1 }}>
                  Login →
                </motion.span>
              </Link>
            </motion.header>

            <main style={mainContentStyle}>
              <h1 style={titleStyle}>Smart Estate</h1>
              <p style={descriptionStyle}>
                Your all-in-one real estate platform, where compatibility meets investment insights. Explore properties, calculate investments, and predict house prices effortlessly.
              </p>

              <motion.div 
                style={propertyCardsContainerStyle}
                variants={propertyCardVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { title: 'Compatibility Index', icon: <FaClipboard size={48} color="#ffff00" />, link: 'http://127.0.0.1:5000/' },
                  { title: 'Investment Calculator', icon: <FaCalculator size={48} color="#ffff00" />, link: '#' },
                  { title: 'House Price Prediction', icon: <FaHome size={48} color="#ffff00" />, link: 'http://127.0.0.1:5001/' },
                ].map((property, index) => (
                  <motion.a
                    key={index}
                    href={property.link}
                    style={{ textDecoration: 'none' }}
                    variants={propertyCardVariants}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <div style={propertyCardStyle}>
                      <div style={propertyCardIconStyle}>{property.icon}</div>
                      <p style={propertyCardTitleStyle}>{property.title}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </main>

            <footer style={footerStyle}>
              <div>© 2024 Smart Estate</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                    whileHover={{ scale: 1.2, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    
                    </motion.div>
                ))}
              </div>
            </footer>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};


export default RealEstateDashboard ;