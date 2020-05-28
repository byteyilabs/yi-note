import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HTML5Video from './components/HTML5Video';
import YoutubIframeVideo from './components/YoutubeIframe';
import EmbedlyVideo from './components/Embedly';
import YiNote from '../src/ui';

const yiNote = new YiNote();

const App = () => {
  const toggleYiNote = () => {
    const store = yiNote.store;
    const { open } = store.getState().app;
    const { setOpen } = store.getActions().app;
    setOpen(!open);
  };

  const renderYiNote = () => {
    yiNote.destroy();
    yiNote.render();
  };

  return (
    <>
      <button onClick={toggleYiNote}>Toggle YiNote</button>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">HTML5 Video</Link>
            </li>
            <li>
              <Link to="/youtube-iframe">Youtube Iframe Video</Link>
            </li>
            <li>
              <Link to="/embedly">Embedly Video</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HTML5Video onRender={renderYiNote} />}
          />
          <Route
            exact
            path="/youtube-iframe"
            render={() => <YoutubIframeVideo onRender={renderYiNote} />}
          />
          <Route
            exact
            path="/embedly"
            render={() => <EmbedlyVideo onRender={renderYiNote} />}
          />
        </Switch>
      </Router>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
