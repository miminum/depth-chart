import React from 'react';
import './App.css';
import { DepthCharts } from './components/depthCharts/DepthCharts';
import { title } from './utils/const';
import { sportsData } from './utils/data';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
      </header>
      <DepthCharts sportsData={sportsData} />
    </div>
  );
}

export default App;
