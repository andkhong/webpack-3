import React from 'react';
// import Page1 from './Page1';

import Async from 'react-code-splitting'; // Lib not saved into package.json
const Page1 = () => (<Async load={import('./Page1')} />);

export default function App() {
    return <Page1 />;
}