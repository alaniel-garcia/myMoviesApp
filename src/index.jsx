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
import Similar from './Components/Similar';
import Search from './Components/Search';
import Nav from './Components/Nav';
import {Fragment} from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Trending' element={
	  <Fragment>
	    <Nav />
	    <Carousel 
	      API={API} 
	      endpoint={API_EP_TRENDING}
	      width={'poster'} 
	      section='Trending' 
	      displayGrid={true}
	    />
	  </Fragment>
	}/>
        <Route path='/Discover' element={
	  <Fragment>
	    <Nav />
	    <Carousel 
	      API={API} 
	      endpoint={API_EP_DISCOVER}
	      width={'poster'} 
	      section='Discover' 
	      displayGrid={true}
	    />
	  </Fragment>
	}/>
        <Route 
          path='/Movie/:id'
          element={
	    <Movie API={API}/>
	  }/>
	<Route 
          path='/Movie/:id/Similar'
          element={<Similar/>}/>
        <Route path='/Search/:search'
          element={
	    <Fragment>
	      <Nav />
	      <Search/>
	    </Fragment>
	  }/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
