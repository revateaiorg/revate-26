// components/Preloader.jsx
import React from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        <div style={{ position: 'relative', width: '140px', height: '140px' }}>
          <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="65" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <circle cx="70" cy="70" r="65" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeDasharray="408" strokeDashoffset="408" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 300, fontSize: '40px', color: '#fff', letterSpacing: '-2px' }}>0</span>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 300, fontSize: '18px', color: 'rgba(255,255,255,0.4)', marginLeft: '2px' }}>%</span>
          </div>
        </div>
        <div style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '13px', letterSpacing: '6px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
          Revate AI
        </div>
        <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '0%', borderRadius: '2px', background: 'linear-gradient(90deg, #3B82F6, #60A5FA)' }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
