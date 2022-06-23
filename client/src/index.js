import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'


// const overrides = extendTheme({
//     styles: {
//       global: (props) => ({
//         body: {
//           fontFamily: 'body',
//           color: mode('gray.800', 'whiteAlpha.900')(props),
//           bg: mode('../public/image/Slide1.PNG')(props),
//           lineHeight: 'base',
//         },
//       }),
//     },
//   })


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
