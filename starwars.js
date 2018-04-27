// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para carregar:
//  - A lista de filmes
//  - A introdução de cada filme, quando ele for clicado

function getMoviesList(){
	return $.ajax({
		url: 'https://swapi.co/api/films',
		method: 'GET',
		success: getMoviesListSuccess
	});
}

var moviesResponse = [];

function getMoviesListSuccess(response){
	moviesResponse = response.results.sort(sortComparer);
	let moviesList = document.getElementById('movies').querySelector('ul');
	moviesList.innerHTML = '';
	for (var i = moviesResponse.length - 1; i >= 0; i--) {
		let item = document.createElement('li');
		let movie = moviesResponse[i];
		item.setAttribute('data-episode-index', i);
		item.innerHTML = movie.title;
		item.addEventListener('click', getMovieDescription);
		moviesList.appendChild(item);
	}
}

function getMovieDescription(e) {
	let id = e.srcElement.attributes['data-episode-index'].value;
	let movie = moviesResponse[id];
	let movieDescription = document.getElementsByClassName('reading-animation')[0];
	movieDescription.innerHTML = 'Episode ' + movie.episode_id + '\n' + movie.opening_crawl;
	window.localStorage.setItem('last_movie', JSON.stringify(movie));
}

function sortComparer(a, b){
	if (a.episode_id < b.episode_id) {
		return 1;
	}

	if (a.episode_id > b.episode_id) {
		return -1;
	}

	return 0;
}

function loadLastMovie(){
	let movie = JSON.parse(window.localStorage.getItem('last_movie'));
	if (movie) {
		let movieDescription = document.getElementsByClassName('reading-animation')[0];
		movieDescription.innerHTML = 'Episode ' + movie.episode_id + '\n' + movie.opening_crawl;
	}
}

getMoviesList();
loadLastMovie();