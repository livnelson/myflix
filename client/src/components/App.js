// client/src/components/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from './Login'
import UserHome from './UserHome'
import UserProfile from './UserProfile'
import SignUp from './SignUp'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [errors, setErrors] = useState()

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />;

  return (
    <div>
      <Routes>
        {/* <Route exact path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} navigate={navigate} />} /> */}
        <Route exact path='/' element={<UserHome user={user} />} />
        <Route exact path='/UserProfile' element={<UserProfile user={user} setUser={setUser} />} isLoggedIn={isLoggedIn} />
        <Route exact path='/SignUp' element={<SignUp setUser={setUser} />} isLoggedIn={isLoggedIn} />
      </Routes>
      {errors? <div>{errors}</div>:null}
    </div>
  );
}

export default App;