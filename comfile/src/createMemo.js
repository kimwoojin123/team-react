import React from "react";

function Memo({title, content, timestamp}) {
  return (
    <div className="memo-item">
      <h2>{title}</h2>
      <p>{content}</p>
      <p>{timestamp}</p>
    </div>
  );
}

export default function createMemo(title, content, timestamp) {
  return <Memo title={title} content={content} timestamp={timestamp} />;
}
