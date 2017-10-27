import React from 'react'
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from './config/musiclist'

import ReactDOM from 'react-dom'
import { Router, HashRouter, BrowserRouter, IndexRoute, Link, Route, hashHistory } from 'react-router-dom'

import './root.less'


class Root extends React.Component {

    constructor(props) {
        super(props);
        // 页面所需的数据放在root中维护
        this.state = {
            musicList: MUSIC_LIST,
            currentItem: MUSIC_LIST[0],
        };

        this.cycleType = 'one';

        this.playMusic = (musicItem)=>{
            $('#player').jPlayer('setMedia', {
                mp3: musicItem.file
            }).jPlayer('play');
    
            this.setState({ // 设置当前播放的音乐
                currentItem: musicItem
            });
        }

        this.playNext = (type, cycleType)=>{
            let index = this.findMusicIndex(this.state.currentItem);

            let newIndex = null; // 下一首的索引
            let musicListLen = this.state.musicList.length;

            if(cycleType == 'liner'){
                if(index == musicListLen - 1){
                    $('#player').jPlayer('pause');
                    return;
                }else{
                    newIndex = (index + 1 ) %  musicListLen;
                }
            }else if(cycleType == 'one'){
                newIndex = index;
            }else{ // 正常点击 上一首/下一首 ,也就是循环播放
                if(type == 'next'){
                    newIndex = (index + 1 ) %  musicListLen;
                }else{
                    newIndex = (index - 1 + musicListLen) %  musicListLen;
                }
            }

            console.log(cycleType, type, index, newIndex);

            this.playMusic(this.state.musicList[newIndex]); // 播放
        }

        this.findMusicIndex = (musicItem)=>{
            return this.state.musicList.indexOf(musicItem);
        }
    }

    render() {

        const Links = () => (
            <nav className="nav">
                <Link to={{
                    pathname: '/list',
                    state: this.state,
                }}>List</Link>

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                <Link to={{
                    pathname: '/player',
                    state: this.state,
                }}
                >Player</Link>

            </nav>
        )

        const player = (props) => {
            return (
                <Player 
                    currentItem = {
                        this.state.currentItem
                    }
                />
            )
        }

        const muscilist = (props) => {
            return (
                <MusicList 
                    currentItem={this.state.currentItem}
                    musicList={this.state.musicList}
                />
            )
        }

        return (
            <div>
                <Header />
                <BrowserRouter history={hashHistory}>
                    <div>
    
                        <Links />
    
                        <Route exact path="/list" render={muscilist} />
                        <Route path="/player" render={player} />
    
                    </div>
                </BrowserRouter>
                <audio id="player"></audio>
            </div>
        );
    }

    componentDidMount() {
        $('#player').jPlayer({ // 配置
            supplied: 'mp3',
            wmode: 'window'
        }).jPlayer('setMedia', {
            mp3: this.state.currentItem.file
        }).jPlayer('volume', 0.2).jPlayer('pause');

        $('#player').bind($.jPlayer.event.ended, (e)=>{ // 绑定播放结束时的动作
            this.playNext('next', this.cycleType); // 自动播放结束才传入第二个参数，否则不传
        });

        PubSub.subscribe('DELETE_MUSIC', (msg, musicItem)=>{
            this.setState({
                musicList: this.state.musicList.filter(item=>{
                    return item !== musicItem;
                })
            })
        });

        PubSub.subscribe('PLAY_MUSIC', (msg, musicItem)=>{
            this.playMusic(musicItem);
        });

        PubSub.subscribe('PLAY_PREV', (msg, musicItem)=>{
            this.playNext();
        });

        PubSub.subscribe('PLAY_NEXT', (msg, musicItem)=>{
            this.playNext('next');
        });

        PubSub.subscribe('CYCLETYPE', (msg, type)=>{
            this.cycleType = type;
            console.log(msg, this.cycleType);
        });

    }

    componentWillUnmount(){
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DELETE_MUSIC');
        PubSub.unsubscribe('PLAY_NEXT');
        PubSub.unsubscribe('PLAY_PREV');
        PubSub.unsubscribe('CYCLETYPE');
    }
}

// class Root extends React.Component {
//     constructor(props) {
//         super(props)
//     }

//     render() {
//         return (
//             <HashRouter history={hashHistory}>
//                 <App>
//                     {/* <IndexRoute component={Player}></IndexRoute> */}

//                     <Route exact path="/" component={Player}></Route>

//                     <Route path="/list" component={MusicList}></Route>
//                 </App>
//             </HashRouter>
//         );
//     }
// }


export default Root;