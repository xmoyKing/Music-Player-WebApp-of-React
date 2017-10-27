import React from 'react';
import Header from '../components/header'
import Progress from '../components/progress'
import Pubsub from 'pubsub-js'

let duration = null; // 音频信息，总时长

class Player extends React.Component {
    constructor(props){
        super(props);

        this.cycleType = [
            {
                zh: '循环播放',
                en: 'cycle',
            },
            {
                zh: '单曲循环',
                en: 'one',
            },
            {
                zh: '线性播放',
                en: 'liner',
            },
        ];

        this.state = {
            progress: 0, // 播放进度.百分比
            volume: 20,　// 音量.百分比
            isPlay: false,　// 是否播放
            leftTime: '', // 剩余时间
            currentType: this.cycleType[1] // 当前播放类型
        };

        this.formatTime = (time)=>{
            time = Math.floor(time);
            let min = Math.floor(time / 60);
            let sec = Math.floor(time % 60);

            sec = sec < 10 ? `0${sec}` : sec ;
            return `${min}:${sec}`;
        }
        // play在constructor外触发时this值为button，那时无法访问this.state.isPlay
        this.play = ()=> {
            if (this.state.isPlay) {
                $('#player').jPlayer('pause');
            } else {
                $('#player').jPlayer('play');
            }

            this.setState({
                isPlay: !this.state.isPlay,
            })
        }

        this.playNext = ()=>{
            Pubsub.publish('PLAY_NEXT');
        }
        this.playPrev = ()=>{
            Pubsub.publish('PLAY_PREV');
        }

        this.changeCycle = ()=>{
            let idx = this.cycleType.indexOf( this.state.currentType );
            let type = this.cycleType[(idx + 1) % this.cycleType.length];
            this.setState({
                currentType: type
            });

            Pubsub.publish('CYCLETYPE', type.en );
        }

    };

    progressChangeHandler(progress){
        $('#player').jPlayer('play', duration * progress); // 设置播放器进度
    }

    volumeChangeHandler(progress){
        $('#player').jPlayer('volume', progress); // 设置音量
    }


    render(){
        return (
            <div className="player-page">

                <div>音乐名：{this.props.currentItem.name}
                </div>
                
                <div>歌手：{this.props.currentItem.artist}
                </div>
                
                <div>封面：<img src={this.props.currentItem.cover} alt={this.props.currentItem.title} width="30"/> 
                </div>

                <div>剩余时间：{this.state.leftTime}
                </div>

                <div className="volume-bar">音量：
                <Progress 
                    progress={ this.state.volume }
                    onProgressChange = { this.volumeChangeHandler }
                    barColor = "blue"
                ></Progress>
                </div>


                <div>进度条：
                <Progress 
                    progress={ this.state.progress }
                    onProgressChange = { this.progressChangeHandler }
                    barColor = "red"
                ></Progress>
                </div>

                <div className="btns-wrapper">
                    <button onClick={this.playPrev}>上一首</button>
                    <button onClick={this.play}> {  `${ this.state.isPlay ? '暂停' : '播放' }`  } </button>
                    <button onClick={this.playNext}>下一首</button>
                    <button onClick={this.changeCycle}>{this.state.currentType.zh}</button>
                </div>

            </div>
        );
    }

    componentDidMount(){

        $('#player').bind($.jPlayer.event.timeupdate, (e)=>{
            duration = e.jPlayer.status.duration; // 将音频总时长赋值到全局变量duration

            this.setState({
                volume: e.jPlayer.options.volume * 100, 
                progress: e.jPlayer.status.currentPercentAbsolute, // 当前播放的百分比
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            });
        }).jPlayer('volume', this.state.volume/100);

    }

    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

}

export default Player;