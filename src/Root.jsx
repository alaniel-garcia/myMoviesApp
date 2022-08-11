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
import { useTranslation } from 'react-i18next';

export default function Root(){

  const [t] = useTranslation('global')

  return(
    <BrowserRouter>
      <Routes>
	<Route path='/' element={<App />} />
	<Route path={`/${t('lang.trending')}`} element={
	  <PageTrending />
	}/>
	<Route path={`/${t('lang.discover')}`} element={
	  <PageDiscover />
	}/>
	<Route 
	  path={`/${t('lang.movie')}/:id`}
	  element={
	    <Movie API={API}/>
	  }/>
	<Route 
	  path={`/${t('lang.movie')}/:id/${t('lang.similar')}`}
	  element={
	    <PageSimilar/>
	  }/>
	<Route 
	  path={`/${t('lang.searchPath')}`}
	  element={
	    <PageSearch/>
	  }/>
	<Route path={`/${t('lang.searchPath')}/:search`}
	  element={
	    <div style={{paddingInline: '2.4rem'}}>
	      <Nav />
	      <Search/>
	    </div>
	  }/>
	<Route exact path={`/${t('lang.categoriesPath')}`}
	  element={
	    <Navigate 
	      to={`/${t('lang.categoriesPath')}/:gnres`} />
	  }/>
	<Route exact path={`/${t('lang.categoriesPath')}/:gnres`}
	  element={
	    <PageCategories />
	  }
	/>
      </Routes>
    </BrowserRouter>
  )
}
