import React, { useEffect } from 'react'
import './App.sass'
import Repository from './components/repo'
import { useInfiniteScroll } from './useInfiniteScroll.js'

const initialState = {
  repos: [],
  page: 1,
  isFetching: false
}

function App() {
  const [state, setState] = useInfiniteScroll(initialState)
  const {repos, page, isFetching} = state
  const {setRepos, setPage, setFetchingStatus} = setState

  // fetch the data when App is at the first render
  useEffect(()=>{
    setFetchingStatus(true)
    fetch(`https://api.github.com/users/tahsdj/repos?page=${page}&per_page=10`)
      .then( res => res.json())
      .then( data => {
        setRepos(prev=>[...prev, ...data])
        setPage(page=>page+1)
        setFetchingStatus(false)
      })
      .catch( err => {
        console.log(err)
        setFetchingStatus(false)
      })
  },[])
  return (
    <div className="App">
      { repos.map( (repo,index) => (
        <Repository 
          key={`repo-${index}`}
          title={repo.name} 
          description={repo.description}
          url={repo.svn_url}
          />
      ))}
      { isFetching && <div className="msg">fetching...</div>}
    </div>
  );
}

export default App
