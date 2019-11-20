import { useState, useEffect } from 'react'

export const useInfiniteScroll = (initState) => {
    const [repos, setRepos] = useState(initState.repos)
    const [page, setPage] = useState(initState.page)
    const [isFetching, setFetchingStatus] = useState(initState.isFetching)
    const [stop, setStop] = useState(false)
  
    function scrollEventHandler() {
      const contentHeight = document.body.scrollHeight
      const visibleHeight = document.body.clientHeight
      const overFlowHeight = window.scrollY
      const isOverCertainHeight = overFlowHeight + visibleHeight >= contentHeight - 50
      if ( isOverCertainHeight && !isFetching ) {
        setFetchingStatus(true)
        fetch(`https://api.github.com/users/tahsdj/repos?page=${page}&per_page=10`)
            .then( res => res.json())
            .then( data => {
                // if the response data is empty, stop to request
                if ( data.length === 0 ) setStop(true)
                else {
                setPage(page=>page+1)
                setRepos(prev=>[...prev, ...data])
                }
                setFetchingStatus(false)
            })
            .catch(err=>{
                console.log(err)
                setFetchingStatus(false)
            })
      }
  }
  
    useEffect(()=>{
        // if there is no new repository, do not trigger the scroll event
        if (!stop) window.addEventListener("scroll", scrollEventHandler)
        return () => window.removeEventListener("scroll",scrollEventHandler)
    },[repos, page, isFetching, stop])
  
    const state = {repos, page, isFetching}
    const setState = {setRepos, setPage, setFetchingStatus}

    return [state, setState]
  }