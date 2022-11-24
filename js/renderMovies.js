import {
  moviesEl,
  inputEl,
  btnEl,
  resultEl,
  typeEl,
  yearsEl,
  btnMoreEl,
  store
} from "./variable.js"
import { getMovies, getMoviesDetail } from "./movieAPI.js";

// 영화 렌더링
export function renderMovies(movies) {
  for (let movie of movies) {
    moviesEl.innerHTML += /* html */ `
    <a href="#/detail/${movie.imdbID}">
      <div class="movie">
        <img src="${movie.Poster === 'N/A' ? '../image/clapperboard.png' : movie.Poster}" alt="Poster" />
        <div>${movie.Title}</div>
      </div>
    </a>
    `
  }
  resultEl.append(btnMoreEl)
}

// 디테일 렌더링
export function renderDetail (detail) {
  resultEl.innerHTML = /* html */ `
  <div class="detail">
    <img class="poster" src="${detail.Poster === 'N/A' ? '../image/clapperboard.png' : detail.Poster}" alt="Poster" />
    <div class="description">
      <div class="title--name">TITLE</div>
      <div class='title'>${detail.Title}</div>
      <div class="released--name">RELEASED</div>
      <div class="released">${detail.Released}</div>
      <div class="genre--name">GENRE</div>
      <div class="genre">${detail.genre}</div>
      <div class="runtime--name">RUN TIME</div>
      <div class="runtime">${detail.Runtime}</div>
      <div class="plot--name">PLOT</div>
      <div class="plot">${detail.Plot}</div>
    </div>
  </div>
  `
  moviesEl.classList.add('hidden')
}

// more 버튼 누르면 페이지 추가
export const morePage = btnMoreEl.addEventListener('click', async () => {
  store.page += 1
  const movies = await getMovies(inputEl.value, typeEl.value, yearsEl.value, store.page)
  if (movies.Error) {
    alert('더 이상 정보가 없습니다')
  } else {
    renderMovies(movies)
  }
})