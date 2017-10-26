import React from 'react'
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from './config/musiclist'

import ReactDOM from 'react-dom'
import { HashRouter, IndexRoute, Link, Route, hashHistory } from 'react-router-dom'

class App extends React.Component {

    constructor(props) {
        super(props);
        // 页面所需的数据放在root中维护
        this.state = {
            musicList: MUSIC_LIST,
            currentItem: MUSIC_LIST[0],
        };
    }


    render() {
        return (
            <div>
                <Header />

            	React.cloneElement(this.props.children, this.state)
                // react-router-dom 4.x 如何获取路由信息？

                <audio id="player"></audio>
            </div>
        );
    }

    componentDidMount() {
        $('#player').jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    mp3: '/static/music/1.mp3'
                })
                    .jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
    }

    componentWillUnmount() {

    }

}

class Root extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <HashRouter history={hashHistory}>
                <App>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={MusicList}></Route>
                </App>
            </HashRouter>
        );
    }
}


export default Root;