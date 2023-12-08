import "./App.css";
import React, {useState, useEffect, useRef} from "react";
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import {saveMemo} from "./saveMemo.js";
import {loadMemo} from "./loadMemo.js";

const headstateData = [
  {hash: "home", text: "Home", component: Home},
  {hash: "team", text: "Team", component: Team},
  {hash: "member", text: "Member", component: Member},
  {hash: "purpose", text: "Purpose", component: Purpose},
];

const memberData = {
  kim: {
    url: "https://github.com/kimwoojin123/",
    hobby: ["음악감상", "자전거 타기"],
    resolution: "팀원들의 스트레스를 줄이겠습니다!",
  },
  bang: {
    url: "https://github.com/seunghee1108/",
    hobby: ["음악감상", "산책"],
    resolution: "빡세게 열심히 하겠습니다!",
  },
  jung: {
    url: "https://github.com/JungYoungSick",
    hobby: ["독서", "영화감상", "클래식감상", "자전거타기"],
    resolution: "맡은 바 최선을 다 하겠습니다!",
  },
  choi: {
    url: "https://github.com/csm009177",
    hobby: ["컴퓨터 하드웨어 조립"],
    resolution: "재밌게 같이 하겠습니다!",
  },
};

function Home() {
  //useState훅을 이용해 상태를 변경할수 있는 함수를 선언하고 초기값 지정
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memos, setMemos] = useState([]);
  const memoListRef = useRef(null);

  // useEffect훅을 이용해 컴포넌트가 렌더링 될 때마다 실행할 콜백을 등록
  useEffect(() => {
    const loadedMemos = loadMemo(); // loadMemo 함수를 사용하여 메모 데이터 로드
    setMemos(loadedMemos); // 불러온 메모 데이터를 상태로 설정
  }, []); // 의존성 배열을 빈 배열을 설정해 처음 마운트될때만 실행되게 함

  useEffect(() => {
    const listScroll = memoListRef.current;
    if (listScroll) {
      listScroll.scrollTop = listScroll.scrollHeight;
    }
  }, [memos]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      // 입력창이 빈 문자열일시 경고창
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
    setMemos((prevMemos) => [...prevMemos, newMemo]); // 함수형 업데이트를 통해 memos에 newMemo를 추가한 새 배열 반환

    setContent(""); // 입력창 초기화
  };

  const handleClear = () => {
    localStorage.removeItem("memos");
    setMemos([]); // 메모 목록 비우기
  };

  return (
    <div className="prompt">
      <div>DYABYA</div>
      <section className="memo-list" ref={memoListRef}>
        {memos.map((memo, index) => (
          // react는 반복되는 요소를 생성할때 식별값을 줘야함
          <div key={index}>
            <h2>{memo.title}</h2>
            <p>{memo.content}</p>
            <p>{memo.timestamp}</p>
          </div>
        ))}
      </section>
      <section className="container">
        <form className="memo-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="title"
            placeholder="이름"
            value={title}
            // onchange를 통해 입력창 값이 변경될때마다 title 상태를 업데이트
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
  const [members, setMembers] = useState(null);

  const clickMember = (member) => {
    setMembers(memberData[member]);
  };

  return (
    <div className="memberContainer">
      <div className="side">
        {Object.keys(memberData).map((member) => (
          <li key={member} className={member} onClick={() => clickMember(member)}>
            {member}
          </li>
        ))}
      </div>
      <div className="memberBoard">
        {members && (
          <div>
            <p>{members.url}</p>
            <p>Hobbies: {members.hobby.join(", ")}</p>
            <p>Resolution: {members.resolution}</p>
          </div>
        )}
      </div>
    </div>
  );
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
