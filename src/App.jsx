import API_KEY from './KEY';
import './App.scss';
import HamburguerMenu from './Components/Miscellaneous/HamburguerMenu';

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <div className='searchbar'>
            <input type="text" className='searchbar_text-field'/>
            <span className="material-symbols-outlined">
              search
	    </span>
          </div>
          <HamburguerMenu />
        </nav>
      </header>
    </div>
  );
}

export default App;
