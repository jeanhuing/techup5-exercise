import React from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h2>About This WebApp</h2>
      <div className="about-content">
        <p>Welcome to our T-Shirt Shop! This web application is a modern, React-based 
        e-commerce platform that offers a variety of colorful t-shirts.</p>
        
        <h3>Features</h3>
        <ul>
          <li>Browse our collection of uniquely colored t-shirts</li>
          <li>Real-time weather updates</li>
          <li>User authentication system</li>
          <li>Shopping cart functionality</li>
          <li>Interactive t-shirt previews</li>
        </ul>

        <h3>Technology Stack</h3>
        <ul>
          <li>Frontend: React with TypeScript</li>
          <li>Styling: CSS with modern features</li>
          <li>Authentication: Express.js backend</li>
          <li>Database: PostgreSQL</li>
        </ul>
      </div>
    </div>
  );
};

export default About;