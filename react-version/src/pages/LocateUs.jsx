import React, { useState, useMemo } from 'react';
import './LocateUs.css';

const baseCities = [
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Delhi", state: "Delhi" },
  { city: "Bangalore", state: "Karnataka" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Jaipur", state: "Rajasthan" },
  { city: "Surat", state: "Gujarat" },
  { city: "Lucknow", state: "Uttar Pradesh" },
  { city: "Kanpur", state: "Uttar Pradesh" },
  { city: "Nagpur", state: "Maharashtra" },
  { city: "Indore", state: "Madhya Pradesh" },
  { city: "Thane", state: "Maharashtra" },
  { city: "Bhopal", state: "Madhya Pradesh" },
  { city: "Visakhapatnam", state: "Andhra Pradesh" },
  { city: "Patna", state: "Bihar" },
  { city: "Vadodara", state: "Gujarat" },
  { city: "Ludhiana", state: "Punjab" }
];

const areas = ["Main Road", "MG Road", "Station Road", "Civil Lines", "Industrial Area"];

const generateBranches = () => {
  const branches = [];
  let idCounter = 1;
  for (let i = 0; i < 5; i++) {
    baseCities.forEach(location => {
      const area = areas[i % areas.length];
      branches.push({
        id: idCounter++,
        name: `HDFC Bank - ${location.city} ${area} Branch`,
        address: `Shop No. ${idCounter + 10}, Ground Floor, ${area}, ${location.city}, ${location.state} - ${400000 + idCounter}`,
        city: location.city,
        state: location.state,
        phone: `1800-202-${6100 + idCounter}`,
        timings: "09:30 AM - 03:30 PM",
      });
    });
  }
  return branches; // Returns exactly 100 branches
};

export default function LocateUs() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const branches = useMemo(() => generateBranches(), []);

  const filteredBranches = branches.filter(branch => 
    branch.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
    branch.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="locate-us-page">
      <div className="locate-hero">
        <div className="container">
          <h1>Locate HDFC Bank</h1>
          <p>Find the nearest HDFC branch from our network of branches across India.</p>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search by City, State, or Area..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </div>
      
      <div className="container locate-content">
        <div className="results-header">
          <h2>Showing {filteredBranches.length} Branches</h2>
        </div>
        
        <div className="branches-grid">
          {filteredBranches.map(branch => (
            <div className="branch-card" key={branch.id}>
              <div className="branch-card-top"></div>
              <h3>{branch.name}</h3>
              <p className="branch-address">📍 {branch.address}</p>
              <div className="branch-meta">
                <span>📞 {branch.phone}</span>
                <span>⏱️ {branch.timings}</span>
              </div>
              <button className="get-directions-btn">Get Directions ›</button>
            </div>
          ))}
        </div>
        
        {filteredBranches.length === 0 && (
          <div className="no-results">
            <p>No branches found matching "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
