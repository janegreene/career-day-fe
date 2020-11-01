import React, { useState, useEffect } from 'react'
import './HomePage.css'
import Header from '../Components/Header'
import Search from '../Components/Search'
import JobContainer from '../Components/JobContainer'
import { fetchAllJobs } from '../Components/APICalls'

const HomePage = () => {
  const [allJobs, setAllJobs] = useState([])
  const [displayedData, setDisplayedData] = useState([])
  const [searching, setSearching] = useState(false)
  const [values, setValues] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [error, setError] = useState('')
  const [favoriteIds, setFavoriteIds] = useState([])

  const sliderResults = (values) => {
    setValues(values)
    setSearching(true)
    if(searchInput.length > 0) {
      let results = allJobs.filter(job => ((job.avg_salary >= values[0] && 
        job.avg_salary <= values[1]) && (job.title.toLowerCase().includes(searchInput) || 
      job.short_description.toLowerCase().includes(searchInput))))
      setDisplayedData(results)
    } else {
      let results = allJobs.filter(job => (job.avg_salary >= values[0] && job.avg_salary <= values[1]))
      console.log(results)
      setDisplayedData(results)
    }
  }

  const gatherFavorites = async() => {
    let allEntries = []
    let keys = Object.keys(localStorage)
    keys.forEach(key => {
      let entry = localStorage.getItem(key)
      allEntries.push(JSON.parse(entry))
    })
    await setFavoriteIds([...favoriteIds, ...allEntries])
  }

  const displayFavorites = (e) => {
    let displayfavs = [];
    if(!e.target.classList.contains('active')) {
      e.target.classList.add('active')
      allJobs.filter(job => {
      favoriteIds.forEach(fav => {
        if(fav == job.id && !displayfavs.includes(job)) {
          displayfavs.push(job)
          }
       })
      })
      setDisplayedData(displayfavs)
    } else {
      e.target.classList.remove('active')
      setDisplayedData(allJobs)
    }
    
  }

  useEffect(() => {
    gatherFavorites()
    async function getJobs() {
      let data = await fetchAllJobs()
      const newData = changeDataSetToNums(data.jobs)
      setAllJobs(newData)
      setDisplayedData(newData)
    }
    getJobs()
  }, [])
  
  const changeDataSetToNums = (data) => {
    let numberResults =  data.map(job => {
      let noCommaNum = job.avg_salary.split(',').join('')
      let num = parseInt(noCommaNum)
      job.avg_salary = num
      return job
    })
    return numberResults
  }

  const searchJobsByInput = (search) => {
    setSearching(true)
    let lowerCaseInput = search.toLowerCase()
    setSearchInput(lowerCaseInput)
    if(values.length > 0) {
      searchBothSalaryAndInput()
    } else {
      let results = allJobs.filter(job => 
        job.title.toLowerCase().includes(lowerCaseInput) 
        || job.short_description.toLowerCase().includes(lowerCaseInput)
      )
      setDisplayedData(results)
    }
  }

  const searchJobsBySalaryRange = (values) => {
    setSearching(true)
    setValues(values)
    if(searchInput.length > 0) {
      searchBothSalaryAndInput()
    } else {
      let results = allJobs.filter(job => 
        job.avg_salary >= values[0] && job.avg_salary <= values[1]
      )
      setDisplayedData(results)
    }
  }

  const searchBothSalaryAndInput = () => {
    let results = allJobs.filter(job => 
      (job.title.toLowerCase().includes(searchInput) 
        || job.short_description.toLowerCase().includes(searchInput)) 
        && (job.avg_salary >= values[0] && job.avg_salary <= values[1])
    )
    setDisplayedData(results)
  }

  return (
    <div className="jobs-page">
      <Header />
      <Search
        searchJobsBySalaryRange={searchJobsBySalaryRange}
        searchJobsByInput={searchJobsByInput}
        allJobs={allJobs}
        displayFavorites={displayFavorites}
      />
      <JobContainer displayedJobs={displayedData} searching={searching} />
    </div>
  );
}

export default HomePage
