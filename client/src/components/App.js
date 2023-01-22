import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import UserProfile from './UserProfile'
import SignUp from './SignUp'
import SearchResults from "./SearchResults"
import PersonProfile from './PersonProfile'
import PersonHome from './PersonHome'
import PersonAdd from './PersonAdd'
import SelectUser from './SelectUser'
// import { Context } from "../contexts/Context"



function App() {
  const [user, setUser] = useState({})
  const [myList, setMylist] = useState('')
  const [profileImg, setProfileImg] = useState('')
  const [avatars, setAvatars] = useState([])
  const [search, setSearch] = useState()
  const [searchResults, setSearchResults] = useState([])
  const [person, setPerson] = useState({})
  const [showProfile, setShowProfile] = useState(false)
  const [people, setPeople] = useState([])
  const [username, setUsername] = useState('')
  const [myFaves, setMyFaves] = useState([])

  // const { user, setUser, people, setPeople, fetchMe } = useContext(Context)

  // auto-login
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setMylist(user.my_lists)
          setProfileImg(user.profile_img)
          setPeople(user.people)
          setUsername(user.username)
        });
      }
    });
  }, []);



  useEffect(() => {
    fetch('/avatars')
      .then((res) => res.json())
      .then((avatars) => {
        console.log(avatars)
        setAvatars(avatars)

      })
  }, [])

  // useEffect(() => {
  //   fetch('/personfaves', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify()
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         res.json().then(faves => {
  //           console.log(faves)
  //           setMyFaves(faves)
  //         })
  //       }
  //     })
  // }, [])

  // function handlePerson() {
  //   console.log(user.person.id)
  //   fetch(`/person_profile/${user.person.id}`)
  //     .then((res) => res.json())
  //     .then((personObj) => {
  //       console.log(personObj)
  //       setPerson(personObj)
  //       setShowProfile(!showProfile)
  //     })
  // }


  return (
    <div>
      <Routes>
        <Route exact path='/' element={
          <SelectUser
            user={user}
            setUser={setUser}
            earch={search}
            setSearch={setSearch}
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            person={person}
            setPerson={setPerson}
            people={people} />}
        />
        {/* <Route exact path='/' element={
          <UserHome
            user={user}
            setUser={setUser}
            earch={search}
            setSearch={setSearch}
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            person={person}
            setPerson={setPerson}
            people={people} />}
        /> */}
        <Route exact path='/Home' element={
          <PersonHome
            user={user}
            setUser={setUser}
            earch={search}
            setSearch={setSearch}
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            person={person}
            setPerson={setPerson}
            people={people} />}
        />
        <Route exact path='/UserProfile' element={
          <UserProfile
            user={user}
            onLogin={setUser}
            setUser={setUser}
            people={people} />} />
        <Route exact path='/Signup' element={<SignUp avatars={avatars} setUser={setUser} />} />
        <Route exact path='/SearchResults' element={
          <SearchResults
            search={search}
            searchResults={searchResults} />}
        />
        <Route exact path='/PersonProfile' element={
          <PersonProfile
            search={search}
            searchResults={searchResults}
            user={user}
            person={person}
            setPerson={setPerson}  />}
        />
        <Route exact path='/PersonAdd' element={
          <PersonAdd
            user={user}
            person={person}
            avatars={avatars}
            setPerson={setPerson}
            setPeople={setPeople}
            people={people} />}
        />
      </Routes>
    </div>
  );
}

export default App;