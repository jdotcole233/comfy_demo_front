import React from 'react';

export default () => (
  <div className="page-content">
    <div
      style={{
        height: 600,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div className="spinner-chase">
        <div className="chase-dot"></div>
        <div className="chase-dot"></div>
        <div className="chase-dot"></div>
        <div className="chase-dot"></div>
        <div className="chase-dot"></div>
        <div className="chase-dot"></div>
      </div>
    </div>
  </div>
);
