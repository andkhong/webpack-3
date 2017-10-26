import React from 'react';
import Async from './Async';
const Page1 = () => (<Async load={import('./Page1')} />);

export default function App() {
    return <Page1 />;
}