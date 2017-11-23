import React from 'react';
import Async from './Async';

// const Page1 = () => (<Async load={import(/* webpackChunkName: "Page1"*/ './Page1')} />);
// const Page2 = () => (<Async load={import(/* webpackChunkName: "Page2"*/ './inner/Page2')} />);

const Page1 = () => (<Async load={import('./Page1')} />);
// const Page2 = () => (<Async load={import('./inner/Page2')} />);

export default function App() {
    return <Page1 />
    // return [<Page1 />, <Page2 />];
}