import React from 'react'

class MusicListItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let musicItem = this.props.musicItem;
        return (
            <li className="component-musiclistitem row">
                <p>{musicItem.name}  -  {musicItem.artist}  {`${ this.props.focus ? '✔' : '' }`} </p>
                {/* <button >删除</button> */}
            </li>
        )
    }
}

export default MusicListItem