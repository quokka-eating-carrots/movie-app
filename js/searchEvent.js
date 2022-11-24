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
import { getMovies } from "./movieAPI.js"
import { renderMovies } from "./renderMovies.js"

// 서치 이벤트 핸들러
export const searchEventHandler = async (e) => {
  store.page = 1
  const movies = await getMovies(inputEl.value, typeEl.value, yearsEl.value)
  if (inputEl.value.toString().length < 4) {
    alert('검색어가 너무 짧습니다')
  } else if (!movies) {
    alert('검색어를 다시 확인해 주세요')
  } else {
    moviesEl.innerHTML = '';
    moviesEl.style.height = '100%';
    renderMovies(movies)
  }
}

// 검색 버튼 눌러서 영화 목록 출력
export const searchBtnClick = btnEl.addEventListener('click', searchEventHandler)

// enter 눌러서 영화 목록 출력
export const searchEnterKey = inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchEventHandler()
  }
})
