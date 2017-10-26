import React from 'react';
import Header from '../components/header'
import Progress from '../components/progress'

let duration = null; // 音频信息，总时长

class Player extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            progress: 0, // 播放进度
            volume: 10,　// 音量
            isPlay: true,　// 初始播放
        };

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
                    <button>上一首</button>
                    <button　onClick={this.play}> {  `${ this.state.isPlay ? '暂停' : '播放' }`  } </button>
                    <button>下一首</button>
                </div>

            </div>
        );
    }

    componentDidMount(){
        $('#player').bind($.jPlayer.event.timeupdate, (e)=>{
            duration = e.jPlayer.status.duration; // 将音频总时长赋值到全局变量duration

            this.setState({
                volume: e.jPlayer.options.volume * 100, 
                progress: e.jPlayer.status.currentPercentAbsolute // 当前播放的百分比
            });
        });
    }

    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

}

export default Player;