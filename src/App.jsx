import './App.scss';
import {
  API, 
  API_EP_TRENDING, 
  API_EP_DISCOVER, 
  API_EP_GENRES
} from './Api/API';
import Carousel from './Components/Carousel';
import Categories from './Components/Categories';
import Nav from './Components/Nav';

function App() {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Carousel 
          API={API} 
          endpoint={API_EP_TRENDING}
          width={'large'} 
          section='Trending' 
        />
        <Carousel
          API ={API}
          endpoint={API_EP_DISCOVER}
          width={'poster'} 
          section='Discover' 
        />
        <Categories 
          API ={API}
          endpoint={API_EP_GENRES}
          section='Categories'
        />
    {/*<Carousel
          API ={API}
          endpoint={API_EP_DISCOVER}
          extraParams={'&page=1'}
          width={'poster'} 
          section='General' 
          language={lang}
        />*/}
      </main>
    </div>
  );
}

export default App;
