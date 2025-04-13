import React, { useState , useEffect } from 'react'
import Search from './components/Search'
import Loader from './components/Loader';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};


const App = () => {

  const [searchTerm , setSearchTerm] = useState("");
  const [movieList , setMovieList] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [errorMessage ,setErrorMessage] = useState('');
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('')

  useDebounce(() => {
    setDebounceSearchTerm(searchTerm);
  },700, [searchTerm]);

  useEffect(()=>{
    const fetchMoviesasync = async()=>{

      setIsLoading(true);

      try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc', options);

        if(!response.ok){
          throw new Error('Failed to fetch movies');
        }
        
        const data = await response.json();

        setMovieList(data.results)
        
      } catch (error) {
        console.log(error);
        setErrorMessage('Error fetching movies . Please try again later Or switch to another service provider if you are using JIO ');
      } finally{
        setIsLoading(false)
      }
    }
    fetchMoviesasync();
  },[])

  useEffect(() => {
    const searchmovie = async () => {
      if (!debounceSearchTerm.trim()) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${debounceSearchTerm}&include_adult=false&language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setMovieList(data.results);
        
      } catch (error) {
        console.log(error);
        setErrorMessage('Error fetching search results . Please switch to another service provider if you are using JIO ');
      } finally {
        setIsLoading(false);
      }
    };

    searchmovie();
  }, [debounceSearchTerm]);


  return (
    <main>
      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll Enjoy Without The Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className='mt-[20px]'>All Movies</h2>

          {isLoading ? (
            <Loader/>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>


        
      </div>
    </main>
  )
}

export default App
