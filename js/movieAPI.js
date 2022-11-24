// api 호출: 영화 목록
export const getMovies = async (title, type, year, page = 1) => {
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${title}&type=${type}&y=${year}&page=${page}`)
  const json = await res.json()
  if (json.Response === 'True') {
    const { Search: movies } = json
    return movies
  } else {
    const Error = json
    return Error
  }
}

// api 호출: 영화 디테일
export const getMoviesDetail = async(id) => {
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`)
  const detail = await res.json()
  if (detail.Response === 'True') {
    return detail
  }
  return detail.Error
}