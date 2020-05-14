import React, { Component } from 'react';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import 'react-popupbox/dist/react-popupbox.css';
import Axios from 'axios';
import MovieList from './MovieList';
import ScrollUpButton from "react-scroll-up-button";

export class Movies extends Component {
	constructor() {
		super();
		this.state = {
			movies: []
		};
		this.wrapper = React.createRef();
    }
    
	componentDidMount() {
		MovieList.split('\n').map((id, i) => {
			return Axios.get('https://www.omdbapi.com/?apikey=ef800026' + '&i=' + id)
			.then((response) => {
				let movies = this.state.movies;
				movies[i] = response.data
				this.setState({movies});
			});
		});
	}
	scrollLock = () => {
		document.body.style.overflow = 'hidden'
	}
	scrollUnlock = () => {
		document.body.style.overflow = 'inherit'
	}
	displayMovies = () => {
		return this.state.movies.map((movie, i) => (
			<img className="movie" src={movie.Poster}
				key={movie.Title} alt="new"
				onClick={this.displayLightbox.bind(this, movie, i)}/>
		));
	}
	displayLightbox = (movie, i) => {
		const content = (
			<div className="movie-lightbox">
				<img className="movie-lightbox-img" src={movie.Poster} alt="new"/>
				<div className="movie-lightbox-des">
					<h2>{movie.Title}</h2>
					<p><b>Description: </b>{movie.Plot}</p>
					<p><b>Director: </b>{movie.Director}</p>
					<p><b>IMDB Rating: </b>{movie.imdbRating}</p>
				</div>
			</div>
		)
		PopupboxManager.open({content,
			config: {
				onOpen: this.scrollLock,
				onClosed: this.scrollUnlock
			}
		});
	}

	render() {
		return (
			<div>
				<h1>Movies I Like</h1>
				<div className="movies">
					{this.displayMovies()}
					<PopupboxContainer/>
                    <ScrollUpButton/>
				</div>
			</div>

		);
	}
}

export default Movies;