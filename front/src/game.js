import React from "react";
import classNames from "classnames";
import { axios } from "./config";

export class GameBoard extends React.Component {
    state = {moves: [], highlightItem: {}};

    componentDidMount() {
        this.fetchGameStatus();
    }

    async fetchGameStatus() {
        let {data: response} = await axios.get('/api/game/');
        if (response.ok) {
            this.setState({game: response.result});
        }
    }

    nextGame = async () => {
        let {data: response} = await axios.get('/api/game/next');
        this.setState({game: response.result, moves: []});
    };

    reset = async () => {
        let {data: response} = await axios.post('/api/game/reset');
        this.setState({game: response.result, moves: []});
    };

    selectField = async val => {
        let {data: response} = await axios.post('/api/game/move', {index: val});
        this.fetchGameStatus();
        this.setState({
            moves: [...this.state.moves, {
                row: Math.floor((val - 1) / 3) + 1,
                col: Math.floor((val - 1) % 3) + 1
            }]
        })
    };

    render() {
        let {game, moves} = this.state;
        let handleHover = (row, col) => {
            this.setState({highlightItem: {row, col}});
        };
        let clearHover = () => {
            this.setState({highlightItem: {}})
        };
        if (!game) return <div>Loading...</div>;

        return <div className="game-screen">
            <table className="moves-count">
                <thead>
                <tr>
                    <th>AI</th>
                    <th>Player</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{game.ai}</td>
                    <td>{game.player}</td>
                </tr>
                </tbody>
            </table>
            {game.end && <div>
                <div className="result-msg">{game.winner == 'ai' ? 'Win!' : 'Lose'}</div>
                <button onClick={this.nextGame}>Next</button>
            </div>}
            <div className="game-board">
                {!game.end && game.board.map((row, j) => <div key={j} className="game-row">
                        {row.map((item, i) => <GameField
                            highlight={this.state.highlightItem.row == j + 1 && this.state.highlightItem.col == i + 1}
                            onClick={() => this.selectField(item)} text={item} key={i}>{item}</GameField>)}
                    </div>
                )}
            </div>
            {!game.end && <button className="reset-game" onClick={this.reset}>Reset</button>}
            {!game.end && (moves.length || '') && <div className="game-log">My moves: {moves.map(({row, col}, i) => <span key={i}
                onMouseOver={() => handleHover(row, col)} onMouseOut={clearHover}>{`(${row}, ${col})`}</span>)}</div>}
        </div>
    }

}

class GameField extends React.Component {
    render() {
        return (
            <div>
                {Number.isInteger(this.props.text) ? <div onClick={this.props.onClick} className="field"></div> :
                    <div onClick={this.props.onClick}
                         className={classNames('field', `${this.props.text}-field`, {'field-highlight': this.props.highlight})}>
                        <span>{this.props.text}</span></div>}
            </div>
        );
    }
}