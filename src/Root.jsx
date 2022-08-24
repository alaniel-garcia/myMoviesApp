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
import PageNotFound from './Pages/PageNotFound';
import { useTranslation } from 'react-i18next';

export default function Root(){

  const [t] = useTranslation('global')

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
	  <Navigate to={'/myMoviesApp'} />
	}/>
	<Route path='/myMoviesApp' element={<App />} />
	<Route path={
	 `/myMoviesApp/${t('lang.trending')}` 
	} element={
	  <PageTrending />
	}/>
	<Route path={
	  `/myMoviesApp/${t('lang.discover')}` 
	} element={
	  <PageDiscover />
	}/>
	<Route 
	  path={`/myMoviesApp/${t('lang.movie')}/:id-:title`}
	  element={
	    <Movie API={API}/>
	  }/>
	<Route 
	  path={
	    `/myMoviesApp/${t('lang.movie')}/:id/${t('lang.similar')}` 
	  }
	  element={
	    <PageSimilar/>
	  }/>
	<Route 
	  path={`/myMoviesApp/${t('lang.searchPath')}`}
	  element={
	    <PageSearch/>
	  }/>
	<Route path={
	  `/myMoviesApp/${t('lang.searchPath')}/:search`
	}
	  element={
	    <div style={{paddingInline: '2.4rem'}}>
	      <Nav />
	      <Search/>
	    </div>
	  }/>
	<Route exact path={
	 `/myMoviesApp/${t('lang.categoriesPath')}`
	}
	  element={
	    <Navigate 
	      to={
		`/myMoviesApp/${t('lang.categoriesPath')}/:gnres` 
	      } 
	    />
	  }/>
	<Route exact path={
	  `/myMoviesApp/${t('lang.categoriesPath')}/:gnres`
	  }
	  element={
	    <PageCategories />
	  }
	/>
        <Route path='*' 
         element={
	   <PageNotFound />
	 }/>
      </Routes>
    </BrowserRouter>
  )
}
