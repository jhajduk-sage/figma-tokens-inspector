import * as React from 'react';
import * as ReactDom from 'react-dom';
import {useState} from "react";

function Inspector() {
  const [tokens, setTokens] = useState(null);

  onmessage = event => {
    setTokens(event.data.pluginMessage)
  }

  return (
    <div className="wrapper">
      <input type="text" id="cb" />
      {tokens
        ? Object.entries(tokens)
          .map(([property, tokenName]) => (
            <div key={property} className="token">
              <b>{property}</b>: <span>{tokenName}</span>
            </div>
          ))
        : ''}
    </div>
  );
}

ReactDom.render(<Inspector/>, document.getElementById('app'));
