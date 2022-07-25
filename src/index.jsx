import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes, 
  Route,
  Navigate
} from 'react-router-dom';
import {
  API, 
} from './Api/API';
import './index.scss';
import App from './App';
import Movie from './Components/Movie';
import Search from './Components/Search';
import Nav from './Components/Nav';
import PageCategories from './Pages/PageCategories';
import PageTrending from './Pages/PageTrending';
import PageDiscover from './Pages/PageDiscover';
import PageSimilar from './Pages/PageSimilar';
import PageSearch from './Pages/PageSearch';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Trending' element={
	  <PageTrending />
	}/>
        <Route path='/Discover' element={
	  <PageDiscover />
	}/>
        <Route 
          path='/Movie/:id'
          element={
	    <Movie API={API}/>
	  }/>
	<Route 
          path='/Movie/:id/Similar'
          element={
	    <PageSimilar/>
	  }/>
        <Route 
          path='/Search'
          element={
	    <PageSearch/>
	  }/>
        <Route path='/Search/:search'
          element={
	    <div style={{paddingInline: '2.4rem'}}>
	      <Nav />
	      <Search/>
	    </div>
	  }/>
        <Route path='/Categories' 
          element={
	    <Navigate to='/Categories/:gnres' />
	  }/>
        <Route path='/Categories/:gnres' 
          element={
	    <PageCategories />
	  }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
