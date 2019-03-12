import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer>
      <div className="footer container">
        <div className="row">
          <div className="col text-muted">
            <p>Copyright &copy; 2019 <a href="https://github.com/nicholasarnold" target="_blank" rel="noopener noreferrer">Nicholas Arnold</a></p>
          </div>
          <div className="col">
            <p>License: <a href="/legal/">MIT</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}