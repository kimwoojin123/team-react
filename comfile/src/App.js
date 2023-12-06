import "./App.css";

const headstateData = [
  {hash: "#home", text: "Home", name: "Home"},
  {hash: "#team", text: "Team", name: "Team"},
  {hash: "#member", text: "Member", name: "Member"},
  {hash: "#purpose", text: "Purpose", name: "Purpose"},
];

function Head() {
  return (
    <div className="head">
      <ul>
        <li>
          <a href={headstateData[0].hash}>home</a>
        </li>
        <li>
          <a href={headstateData[1].hash}>team</a>
        </li>
        <li>
          <a href={headstateData[2].hash}>member</a>
        </li>
        <li>
          <a href={headstateData[3].hash}>purpose</a>
        </li>
      </ul>
    </div>
  );
}

function Board() {
  return (
    <div className="board">
      <p>작성예정</p>
    </div>
  );
}

export {Head, Board};
