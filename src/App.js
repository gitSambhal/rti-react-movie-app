import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  NewReleasePage,
  PopularPage,
  MovieDetailsPage,
} from './pages';
import {
  Header,
} from './components';


function App() {
  return (
    <div className="App">
      <div className='container'>

        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/popular" element={<PopularPage />}></Route>
          <Route exact path="/new-release" element={<NewReleasePage />}></Route>
          <Route path="/details/:id" element={<MovieDetailsPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
