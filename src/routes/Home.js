import React from 'react';
import axios from 'axios';
import Movie from '../component/Movie';
import './Home.css';
//import PropTypes from 'prop-types';

class Home extends React.Component {
  state = { //state 가 home 에 갇혀있어서 홈으로 돌아갈때 마다 로딩이 된다 이것을 개선하려면 redex 를 사용한다.
    isLoading: true,
    movie: []
  }
  getMovie = async () => {

    const { data: { data: { movies } } } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating"); //render에 있는 es6 좀더 응용한거 object.data.data.movies
    console.log(movies);
    this.setState({ movies, isLoading: false });       //setState인자에 있는 movies 는 movies(state) : movies(axios) 를 더 줄인것이다
  }
  componentDidMount() {
    this.getMovie();
  }


  render() {
    const { isLoading, movies } = this.state; //ES6 자바스크립트 문법 알아두기
    return (
      <section className="container">
        {isLoading
          ? <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          : (
            <div className="movies">
              {movies.map(movie => ( //map은 배열을 반환하니까...
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              ))}
            </div>
          )}
      </section>
    );
  }
}

export default Home;
