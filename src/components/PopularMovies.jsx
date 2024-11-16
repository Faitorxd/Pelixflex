import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "./Carousel";
export const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(500);
  const [filter , setFilter] = useState('')
  const getMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=88be519fcf0049f2e283161e2ae751eb&with_genres=${filter}&page=${page}`
      );
      const data = await response.json();
      console.log(data);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      console.log(movies);
    } catch (error) {
      console.error("Algo fallo revisa " + error);
    }
  };
  useEffect(() => {
    getMovies();
  }, [page , filter]);
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="bg-white">
      <header>
        <nav>
          <button onClick={() => setFilter('28')}>Accion</button>
          <button onClick={() => setFilter('12')}>Aventura</button>
        </nav>
      </header>
      <Carousel movies={movies}/>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movies.map((movie) => (
            <div key={movie.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={movie.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {movie.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{movie.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {movie.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            className={`${page > 1 ? "cursor-pointer" : "cursor-not-allowed" }`}
            onClick={() => handlePreviousPage()}
          >
            Anterior
          </button>
          <span>
            Pagina {page} de {totalPages}
          </span>
          <button className="bg-blue-800" onClick={() => handleNextPage()}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
