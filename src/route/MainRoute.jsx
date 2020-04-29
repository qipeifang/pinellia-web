
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Index from '../component/common/Index';


const MainRoute = () => (
    <BrowserRouter basename='/'>
        <Route exact path="/" component={Index} />
    </BrowserRouter>
)
export default MainRoute;