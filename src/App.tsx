import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import PreHeader from './components/PreHeader/PreHeader';

function App() {
  return (
    <div className="App">
      <PreHeader />
      <Header />
      <div>
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
