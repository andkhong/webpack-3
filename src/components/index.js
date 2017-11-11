import React from 'react';
import Async from './Async';

const Page1 = () => (<Async load={import('./Page1')} />);
const Page2 = () => (<Async load={import('./inner/Page2')} />);
// import Page2 from './Page2';

export default function App() {
    return [<Page1 />, <Page2 />];
}