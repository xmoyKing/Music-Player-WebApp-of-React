import React from 'react';
import './progress.less'

class Progress extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                // 改变进度
            changeProgress: (e)=> {
                let progressBar = this.refs.progressBar; //获取原生dom节点
                let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth; // 当前鼠标所点击的位置百分比

                // 采用回调函数的方式通知父组件内的事件。
                this.props.onProgressChange && this.props.onProgressChange(progress);
            },

            // 获取默认属性值
            getDefaultProps: ()=> {
                return {
                    barColor: '#26f454', // 默认进度条颜色
                }
            }
        }
    }




    componentDidMount(){}

    componentWillUnmount(){}

    render(){
        return (
            <div className="components-progress"
                ref="progressBar"
                onClick={this.state.changeProgress} // 此处事件名大小写敏感
            >
                <div className="progress" 
                    style={{ 
                        width: `${ this.props.progress }%`,
                        backgroundColor: this.props.barColor,
                    }} 
                >
                </div>
            </div>
        );
    }
}

export default Progress;