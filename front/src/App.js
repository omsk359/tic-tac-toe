import React from 'react';
import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { GameBoard } from "./game";
import { GameScore } from "./score";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Game</Link>
                        </li>
                        <li>
                            <Link to="/score">Score</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/score">
                        <GameScore />
                    </Route>
                    <Route path="/">
                        <GameBoard />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
