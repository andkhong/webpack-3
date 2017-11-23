import React from 'react';
import Async from './Async';

const Page1 = () => (<Async load={import(/* webpackChunkName: "Page1"*/ './Page1')} />);
const Page2 = () => (<Async load={import('./inner/Page2')} />);

export default function App() {
    return [
        <Page1 key={0} />,
        <Page2 key={1} />
    ];
}