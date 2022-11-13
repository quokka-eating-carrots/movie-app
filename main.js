import year from "./year.js"

const moviesEl = document.querySelector('.movies')
const inputEl = document.querySelector('#searchName')
const btnEl = document.querySelector('.btn-search')
const btnMoreEl = document.querySelector('.btn-more')
const resultEl = document.querySelector('.search-result')

let store = {
  page: 1
}

// footer year 출력
year();

// api 호출: 영화 목록
async function getMovies(title, page = 1) {
  const s = `&s=${title}`
  const p = `&page=${page}`
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c${s}${p}`)
  const json = await res.json()
  if (json.Response === 'True') {
    const { Search: movies, totalResults } = json
    return {
      movies,
      totalResults
    }
  } else {
    const { Error } = json
    return Error
  }
}

// api 호출: 영화 디테일
async function getMoviesDetail(id) {
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`)
  const detail = await res.json()
  if (detail.Response === 'True') {
    return detail
  }
  return detail.Error
}

// 영화 렌더링
function renderMovies(movies) {
  for (let movie of movies) {
    const el = document.createElement('div');
    el.classList += 'movie';

    const aEl = document.createElement('a');
    aEl.href = `#/detail/${movie.imdbID}`

    const titleEl = document.createElement('div');
    titleEl.textContent = movie.Title;

    const imgEl = document.createElement('img');
    imgEl.src = movie.Poster === 'N/A'
    ? './image/clapperboard.png' : movie.Poster;

    el.append(imgEl, titleEl)
    moviesEl.append(aEl)
    aEl.append(el)
  }
}

// 디테일 렌더링
function renderDetail (detail) {
  moviesEl.innerHTML = ''
  btnMoreEl.classList += ' hidden'

  const el = document.createElement('div');
  el.classList += 'detail';

  // 포스터
  const imgEl = document.createElement('img');
  imgEl.classList += 'poster';
  imgEl.src = detail.Poster === 'N/A'
  ? './image/clapperboard.png' : detail.Poster;

  // 설명 묶는 div
  const desEl = document.createElement('div');
  desEl.classList += 'description'

  // title
  const titleNameEl = document.createElement('div');
  titleNameEl.classList += 'title--name'
  titleNameEl.textContent = 'TITLE';
  const titleEl = document.createElement('div');
  titleEl.classList += 'title';
  titleEl.textContent = detail.Title;

  // released
  const releasedNameEl = document.createElement('div');
  releasedNameEl.classList += 'released--name';
  releasedNameEl.textContent = 'RELEASED'
  const releasedEl = document.createElement('div')
  releasedEl.classList += 'released'
  releasedEl.textContent = detail.Released;
  
  //genre
  const genreNameEl = document.createElement('div');
  genreNameEl.classList += 'genre--name';
  genreNameEl.textContent = 'GENRE'
  const genreEl = document.createElement('div');
  genreEl.classList = 'genre';
  genreEl.textContent = detail.Genre;
  
  // runtime
  const runtimeNameEl = document.createElement('div');
  runtimeNameEl.classList += 'runtime--name';
  runtimeNameEl.textContent = 'RUNTIME'
  const runtimeEl = document.createElement('div')
  runtimeEl.classList = 'runtime'
  runtimeEl.textContent = detail.Runtime;
  
  // plot
  const plotNameEl = document.createElement('div');
  plotNameEl.classList += 'plot--name'
  plotNameEl.textContent = 'PLOT'
  const plotEl = document.createElement('div');
  plotEl.classList += 'plot';
  plotEl.textContent = detail.Plot;

  desEl.append(titleNameEl, titleEl, releasedNameEl, releasedEl, genreNameEl, genreEl, runtimeNameEl, runtimeEl, plotNameEl, plotEl)
  el.append(imgEl, desEl)
  resultEl.append(el)
  moviesEl.classList += ' hidden'
}

// 검색 버튼 눌러서 영화 목록 출력
btnEl.addEventListener('click', async (e) => {
  const { movies, totalResults } = await getMovies(inputEl.value)
  if (inputEl.value === ''|| inputEl.value.toString().length < 4) {
    alert('검색어가 너무 짧습니다')
  } else if (!movies) {
    alert('검색어를 다시 확인해 주세요')
  } else {
    moviesEl.innerText = '';
    moviesEl.style.height = '100%';
    btnMoreEl.className = 'btn-more';
    renderMovies(movies)
  }
})

// enter 눌러서 영화 목록 출력
inputEl.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const { movies, totalResults } = await getMovies(inputEl.value)
    if (inputEl.value === ''|| inputEl.value.toString().length < 4) {
      alert('검색어가 너무 짧습니다')
    } else if (!movies) {
      alert('검색어를 다시 확인해 주세요')
    } else {
      moviesEl.innerText = '';
      moviesEl.style.height = '100%';
      btnMoreEl.className = 'btn-more';
      renderMovies(movies)
    }
  }
})

// more 버튼 누르면 페이지 추가
btnMoreEl.addEventListener('click', async () => {
  store.page += 1
  const { movies, totalResults } = await getMovies(inputEl.value, store.page)
  if (!movies) {
    alert('더 이상 정보가 없습니다')
  } else {
    renderMovies(movies)
  }
})

window.addEventListener('hashchange', async () => {
  const routePath = location.hash;

  if (routePath.includes('#/detail/')) {
    const id = location.hash.slice(9)
    const detail = await getMoviesDetail(id)
    renderDetail(detail)
  }
})