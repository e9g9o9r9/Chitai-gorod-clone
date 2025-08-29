import './App.scss';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import PreHeader from './components/PreHeader/PreHeader';
import Products from './components/Products/Products/Products';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <PreHeader />
      <Header />
      <Products />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
