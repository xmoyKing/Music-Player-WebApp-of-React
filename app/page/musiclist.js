import React from 'react'
import MusicListItem from '../components/musiclistitem'


class MusicList extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        let listEle = null;
        listEle = this.props.musicList.map((item)=>{
            return (
            <MusicListItem
                focus= {item == this.props.currentItem}
                key={item.id}
                musicItem = {item}
            >
                { item.name }
            </MusicListItem>  // key用于对比更新
            )
        });

        return(
            <ul>
               { listEle } 
            </ul>
        )
    }
}

export default MusicList;