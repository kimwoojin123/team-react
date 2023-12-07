import "./App.css";
import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import createMemo from "./createMemo.js";
import {saveMemo} from "./saveMemo.js";
import {loadMemo} from "./loadMemo.js";

const headstateData = [
  {hash: "home", text: "Home", component: Home},
  {hash: "team", text: "Team", component: Team},
  {hash: "member", text: "Member", component: Member},
  {hash: "purpose", text: "Purpose", component: Purpose},
];

function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const loadedMemos = loadMemo(); // loadMemo 함수를 사용하여 메모 데이터 로드
    setMemos(loadedMemos); // 불러온 메모 데이터를 상태로 설정
  }, []);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("이름과 내용을 입력하세요.");
      return;
    }

    const timestamp = new Date().toLocaleString();
    const newMemo = {
      title: title,
      content: content,
      timestamp: timestamp,
    };

    saveMemo(newMemo); // 메모 저장
    setMemos((prevMemos) => [...prevMemos, newMemo]);

    setTitle("");
    setContent("");
  };

  const handleClear = () => {
    localStorage.removeItem("memos");
    setMemos([]); // 메모 목록 비우기
  };

  return (
    <div className="prompt">
      <div>DYABYA</div>
      <section className="memo-list">
        {memos.map((memo, index) => (
          <div key={index}>
            <h2>{memo.title}</h2>
            <p>{memo.content}</p>
            <p>{memo.timestamp}</p>
          </div>
        ))}
      </section>
      <section className="container">
        <form className="memo-Form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="title"
            placeholder="이름"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="content"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button type="button" className="saveBtn" onClick={handleSave}>
            저장
          </button>
          <button type="button" className="clear" onClick={handleClear}>
            초기화
          </button>
        </form>
      </section>
    </div>
  );
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
          <li key={item.hash} className={item.hash}>
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
