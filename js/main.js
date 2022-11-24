import {
  moviesEl,
  inputEl,
  btnEl,
  resultEl,
  yearsEl,
  btnMoreEl,
  store
} from "./variable.js"
import { getMovies, getMoviesDetail } from "./movieAPI.js";
import { renderMovies, renderDetail, morePage } from "./renderMovies.js";
import { searchBtnClick, searchEnterKey } from "./searchEvent.js";
import year from "./year.js"

initMain();
year();
yearOptions();

// 연도 option 추가해 주는 함수
function yearOptions () {
  const date = new Date();
  for (let i = date.getFullYear(); i >= 1980; i -= 1) {
    const createOption = document.createElement('option')
    createOption.value = i
    createOption.textContent = i
    yearsEl.appendChild(createOption)
  }
}

// 메인 화면
function initMain() {
  const containerEl = document.querySelector('.container')
  const searchEl = document.querySelector('.search')
  
  // 만약 about page로 가면 사라지기 때문에 다시 켜 주기
  containerEl.style.visibility = 'visible'
  searchEl.style.visibility = 'visible'

  // 다시 메인으로 왔을 때 내용 렌더링
  resultEl.innerHTML = '';
  resultEl.append(moviesEl)
  moviesEl.classList.remove('hidden')
  moviesEl.classList.add('movies')
  moviesEl.innerText = `WHAT IS YOUR FAVORITE MOVIE?`
}

// about 페이지
function renderAbout () {
  // 새로 내용 넣기 전 비워 주기
  resultEl.innerHTML = '';

  // 검색 컨테이너 안 보이게 하기
  const containerEl = document.querySelector('.container')
  const searchEl = document.querySelector('.search')
  containerEl.style.visibility = 'hidden'
  searchEl.style.visibility = 'hidden'

  // about 내용 렌더링
  const el = document.createElement('div')
  el.classList.add('about')
  el.innerHTML = `
  <div>About Me!</div>
  <div>ovzip7@gmail.com</div>
  <div>https://velog.io/@ovzip</div>
  <div>어디로 튈지 모르는 개발자👽</div>
  `

  resultEl.append(el);
}


//라우팅
window.addEventListener('hashchange', async () => {
  const routePath = location.hash;

  if (routePath.includes('#/detail/')) {
    const id = location.hash.slice(9);
    const detail = await getMoviesDetail(id);
    renderDetail(detail);
  } else if (routePath === '#about') {
    renderAbout();
  } else if (routePath === '') {
    initMain();
  }
})