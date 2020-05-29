import React, {useState, useEffect} from 'react';
import ImageGrid from './ImageGrid';
import Popup from "reactjs-popup";
import config from '../config';
import ScrollUpButton from "react-scroll-up-button";
const axios = require('axios');
const firebase = require('firebase')

function Movies(props) {
    const [movies, setMovies] = useState([]);
    const [lists, setLists] = useState({});
    const [movieLists, setMovieLists] = useState({});
    const [currentList, setCurrentList] = useState("All");
    const [page, setPage] = useState(0);
    const [tempID, setTempID] = useState("");
    const [newList, setNewList] = useState("");
    const [search, setSearch] = useState("");
    const [count, setCount] = useState(0);

    const [shouldRender, setShowRender] = useState(true);

    useEffect(() => {
        setCurrentList("All")
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        let ref = firebase.database().ref('movie').orderByKey();

        ref.on('child_removed', (childSnapshot, prevChildKey) => {
            const deletedChild = childSnapshot.val();
            setMovies(curMovies => curMovies.filter(m => m.imdbID != deletedChild.imdbID));
        });

        ref.limitToFirst(8).once('value', (dataSnapshot) => {
            const val = dataSnapshot.val();
            if(val != null) {
                setMovies(Object.values(val));
            }
        });

        let listRef = firebase.database().ref('lists');
        listRef.on('value', (dataSnapshot) => {
            const val = dataSnapshot.val();
            setLists(val);
            if(val != null) {
                setCount(Object.keys(val["All"]).length - 1);
            }
        });

        let movieListsRef = firebase.database().ref('movieLists');

        movieListsRef.on('value', (dataSnapshot) => {
            const val = dataSnapshot.val();
            setMovieLists(val);
        });
    }, [shouldRender])

    const addMovie = (event) => {
        event.preventDefault();

        axios({
            method: 'get',
            url: "https://www.omdbapi.com/?apikey=ef800026&i=".concat(tempID),
        })
        .then(
            (response) => {
                firebase.database().ref('movie').child(response.data.imdbID).set({
                    imdbID: response.data.imdbID,
                    Title: response.data.Title,
                    Poster: response.data.Poster,
                    imdbRating: response.data.imdbRating,
                    Director: response.data.Director,
                    Plot: response.data.Plot
                }); 
                firebase.database().ref('lists').child("All").child(response.data.imdbID).set(true);
                firebase.database().ref('movieLists').child(response.data.imdbID).set({
                    All: true
                }).then(() => {
                    setTempID("");
                    setPage(0);
                    setShowRender(cur => !cur);
                });
            }
		)
		alert("Added Successfully");
	}
	const load = () => {
        let ref = firebase.database().ref('movie');
        let curLen = movies.length;
        for(var i = curLen + 1; i < Math.min(curLen + 9, Object.keys(lists[currentList]).length); i++) {
            ref.child(Object.keys(lists[currentList])[i]).once('value', (dataSnapshot) => {
                const val = dataSnapshot.val();
                setMovies(cur => [...cur, val]);
            });
        }
    }
	const setCurrentListHelper = (list) => {
        setCurrentList(list);
        let c = Object.keys(lists[list]).length - 1;
        setCount(c);
        setMovies([]);
        let ref = firebase.database().ref('movie');
        console.log(count);
        for(var i = 1; i < Math.min(9, c+1); i++) {
            ref.child(Object.keys(lists[list])[i]).once('value', (dataSnapshot) => {
                const val = dataSnapshot.val();
                setMovies(current => [...current, val]);
            });
        }
    }
    const deleteMovie = (id) => {
        firebase.database().ref('movie').child(id).remove();
        let ups = {};
        for (var list in movieLists[id]){
            ups["lists/" + list + "/" + id] = null;
        }
        ups["movieLists/" + id] = null;
		firebase.database().ref().update(ups);
		alert("Deleted Successfully");
    }

    const createList = (event) => {
        event.preventDefault();

        firebase.database().ref('lists').child(newList).set({
            title: newList
        });
        setNewList("");
        setPage(0);
		setShowRender(current => !current);
		alert("Created Successfully");
    }

    const addToList = (id, list, target) => {
        let ups = {
            ["lists/" + list + "/" + id]: true,
            ["movieLists/" + id + "/" + list]: true
        }
        target.value = "";
		firebase.database().ref().update(ups);
		alert("Added Successfully");
    }

    const getPage = () => {
        if (page === 0) {
            const movs = movies
                .filter(m => m != null && m.Title.toLowerCase().includes(search.toLowerCase()))
                .map(m =>
                <Popup className="popup" trigger={<img className="movie" alt={m.Title} src={m.Poster}/>} modal closeOnDocumentClick lockScroll postion="center center">
                    {close => (<div className="movie-lightbox">
                        <img className="movie-lightbox-img" alt={m.Title} src={m.Poster}/>                        
                        <div className="movie-lightbox-des">
                            <h2>{m.Title}</h2>
							<p><b>Description:</b>{m.Plot}</p>
							<p><b>Director:</b>{m.Director}</p>
							<p><b>IMDB Rating:</b>{m.imdbRating}</p>
                            <button className="btn-dl" onClick={() => {deleteMovie(m.imdbID); close();}}>
                                Delete
                            </button>
                            <select onChange={e => addToList(m.imdbID, e.target.value, e.target)}>
                                <option value="" disabled selected>Add to list:</option>
                                {Object.keys(lists)
                                    .filter(list => (
                                        lists[list][m.imdbID] != true
                                    ))
                                    .map(list => (
                                        <option value={list}>{list}</option>
                                    ))
                                }
                            </select>
                        </div>                        
                    </div>)}
                </Popup>
            )
            return (
                <div>
                    <h1>
                        Movies
                    </h1>
					<hr/>
                    <div className="movies-menu">
                        <select onChange={e => setCurrentListHelper(e.target.value)}>
                            <option value="All">All</option>
                            {lists != null && Object.keys(lists).map(list => (
                                list != "All" && <option value={list}>{list}</option>
                            ))}
                        </select>
                        <button onClick={() => setPage(1)}>
                            Add Movie
                        </button>
                        <button onClick={() => setPage(2)}>
                            Create List
                        </button>
                        <input className="movie-search" type="text" placeholder="Search Here" value={search} onChange={e => setSearch(e.target.value)}/>
                    </div>
					<hr/>
                    <ImageGrid items={movs}/>
                    {lists != null && lists[currentList] != null && count > movies.length && <button className="btn-load" onClick={() => load()}>
                        Load More
                    </button>}
					<ScrollUpButton/>
                </div>
            );
        }
        else if (page === 1) {
            return (
                <div>
                    <h1>
                        Movies
                    </h1>
                    <div>
                        <button className="btn-back" onClick={() => setPage(0)}>
                            Back
                        </button>
                    </div>
                    <form className="add-movie" onSubmit={addMovie}>
                        <h2>
                            Add A New Movie
                        </h2>
                        <label>
                            Please Enter the IMDb ID:
                            <input type="text" value={tempID} onChange={e => setTempID(e.target.value)}/>
                        </label>
                        <input type="submit" value="Add Movie" />
                    </form>
                </div>
            );
        }
        else if (page === 2) {
            return (
                <div>
                    <h1>
                        Movies
                    </h1>
                    <div>
                        <button className="btn-back" onClick={() => setPage(0)}>
                            Back
                        </button>
                    </div>
                    <form onSubmit={createList}>
                        <h2>
                            Create A New List
                        </h2>
                        <label>
                            Please Enter the Name:
                            <input value={newList} onChange={e => setNewList(e.target.value)}/>
                        </label>
                        <input type="submit" value="Create List" />
                    </form>
                </div>
            );
        }
    }
    return getPage();
}

export default Movies;