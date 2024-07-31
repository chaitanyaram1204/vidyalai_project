import React from 'react';
import { WindowWidthProvider } from '../Context/WindowWidthProvider';

const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

export default App;
