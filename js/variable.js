export const moviesEl = document.createElement('div')
export const inputEl = document.querySelector('#searchName')
export const btnEl = document.querySelector('.btn-search')
export const resultEl = document.querySelector('.search-result')
export const typeEl = document.querySelector('#type')
export const yearsEl = document.querySelector('#years')
export const btnMoreEl = document.createElement('div')
btnMoreEl.innerText = 'more!'
btnMoreEl.classList.add('btn-more')

export let store = {
  page: 1
}