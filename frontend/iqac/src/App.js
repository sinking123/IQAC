import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import LoginForm from './components/login';
import FeedBackForm from './components/feedback';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="/user" element={<FeedBackForm />}></Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
