import React, {useState, useEffect, Fragment } from 'react';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import CreateFundraiser from './pages/CreateFundraiser';
import Fundraisers from './pages/Fundraisers';
import Donate from './pages/Donate';
import Loader from './components/Loader';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);


  return isLoading 
    ? (<Loader /> )
    : (
      <Router>
        <Header />
        <div className="App">
          <Routes>
            <Fragment>
              <Route exact path="/" element={<Home />}/>
              <Route path="/browse" element={<Fundraisers/>} />
              <Route path="/donate/:fundraiserAddress" element={<Donate />} />
              <Route path="/create" element={<CreateFundraiser />}/>
            </Fragment>
          </Routes>
        </div>
      </Router>
    )
}

export default App;
