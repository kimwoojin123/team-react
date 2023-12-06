import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';


const headstateData = [
  { hash: "home", text: "Home", component: Home },
  { hash: "team", text: "Team", component: Team },
  { hash: "member", text: "Member", component: Member },
  { hash: "purpose", text: "Purpose", component: Purpose },
];



function Home() {
  return <p>Home</p>;
}

function Team() {
  return <p>Team</p>;
}

function Member() {
  return <p>Member</p>;
}

function Purpose() {
  return <p>Purpose</p>;
}

function Head() {
  return (
    <div className="head">
      <ul>
      {headstateData.map((item) => (
          <li key={item.hash}>
            <NavLink to={item.hash}>{item.text}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}


function Board() {
  return (
    <div className="board">
      <Routes>
        {headstateData.map((item) => (
          <Route key={item.hash} path={`/${item.hash}`} element={<item.component />} />
        ))}
      </Routes>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="app">
        <Head />
        <Board />
      </div>
    </Router>
  );
}

export default App;
