import "./index.scss";
import TodoCreator from "./components/TodoCreator";
import React, {useState} from 'react';

function App() {
  const [displayActive, setDisplayActive] = useState(true)

  return (
    <div className="App">
      <div className="todo">
        <div className="page-title">TODO LIST</div>
        <div className="menus">
            <div onClick={() => setDisplayActive(true)} className={displayActive ? "menu-element active" : "menu-element"}>
              <div>
                <i className="fas fa-clipboard-list icon"></i>Active
              </div>
            </div>
            <div onClick={() => setDisplayActive(false)} className={displayActive ? "menu-element" : "menu-element active"}>
              <i className="fas fa-clipboard-check icon"></i>Completed
            </div>
          </div>
          <TodoCreator displayActive={displayActive}/>
      </div>
    </div>
  );
}

export default App;
