import React from 'react'
import Pubsub from 'pubsub-js' // 事件订阅库
import './musiclistitem.less'

class MusicListItem extends React.Component{
    constructor(props){
        super(props)
    }

    playMusic(musicItem){
        Pubsub.publish('PLAY_MUSIC', musicItem)
    }

    deleteMusic(musicItem, event){
        Pubsub.publish('DELETE_MUSIC', musicItem);
        event.stopPropagation();
    }

    render(){
        let musicItem = this.props.musicItem;
        return (
            <li 
                className="component-musiclistitem row"
                onClick={this.playMusic.bind(this, musicItem)}
            >
                <p>{musicItem.name}  -  {musicItem.artist}  {`${ this.props.focus ? '✔' : '' }`} </p>
                <button 
                        onClick={this.deleteMusic.bind(this, musicItem)}
                >删除</button>
            </li>
        )
    }
}

export default MusicListItem