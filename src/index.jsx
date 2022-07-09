import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes, 
  Route
} from 'react-router-dom';
import {
  API, 
  API_EP_TRENDING, 
  API_EP_DISCOVER, 
} from './Api/API';
import './index.scss';
import App from './App';
import Carousel from './Components/Carousel';
import Movie from './Components/Movie';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Trending' element={
	  <Carousel 
	    API={API} 
	    endpoint={API_EP_TRENDING}
	    width={'poster'} 
	    section='Trending' 
	    displayGrid={true}
	  />
	}/>
        <Route path='/Discover' element={
	  <Carousel 
	    API={API} 
	    endpoint={API_EP_DISCOVER}
	    width={'poster'} 
	    section='Discover' 
	    displayGrid={true}
	  />
	}/>
        <Route 
          path='/Movie/:id'
          element={
	    <Movie API={API} />
	  }/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
