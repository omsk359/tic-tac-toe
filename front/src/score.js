import React from "react";
import { axios } from "./config";
import moment from "moment";

export class GameScore extends React.Component {
    state = {player: 0, ai: 0, list: []};

    componentDidMount() {
        this.fetchScore();
    }

    fetchScore = async () => {
        let {data: response} = await axios.get('/api/score/');
        console.log('score', response);
        if (response.ok) {
            this.setState(response.result);
        }
    };

    render() {
        return (
            <div className="score-screen">
                <table className="games-count">
                    <thead>
                    <tr>
                        <th>AI</th>
                        <th>Player</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.ai}</td>
                        <td>{this.state.player}</td>
                    </tr>
                    </tbody>
                </table>

                <table className="games-results">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Winner</th>
                        <th>Team</th>
                    </tr>
                    </thead>
                    <tbody>{this.state.list.map((game, i) => <tr key={i}>
                        <td>{moment(game.ts).format('HH:mm DD.MM.YY')}</td>
                        <td>{game.winner}</td>
                        <td>{game.team}</td>
                    </tr>)}</tbody>
                </table>
            </div>
        );
    }
}