import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader'; // 使浏览器自动更新（其实不是刷新，而是自动更改DOM中的局部修改部分）
import Root from './root';

// console.log(React.version);

render(
    <AppContainer>
        <Root/>
    </AppContainer>,
    document.getElementById('root')
);

if(module.hot){
    module.hot.accept('./root', ()=>{
        const NewRoot = require('./root').default;
        render(
            <AppContainer>
                <NewRoot/>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}