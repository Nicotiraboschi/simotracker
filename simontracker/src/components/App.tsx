// import { useState } from 'react';
// import reactLogo from '../assets/react.svg';
// import viteLogo from '/electron-vite.animate.svg';
import '../App.css';
import Line from './Line';
import axios from 'axios';
import { useEffect, useState } from 'react';
// @ts-ignore
import { useGlobalProvider } from '../hooks/AppContext';

function App() {
  const [data, setData] = useState([]);
  const { isClicked, setIsClicked } = useGlobalProvider();
  const port = 3001;

  const getNewData = async () => {
    const response = await axios.get(`http://localhost:${port}`);
    setData(response.data);
  };

  useEffect(() => {
    getNewData();
  }, []);

  useEffect(() => {
    getNewData();
    setIsClicked(false);
  }, [isClicked]);

  return (
    <>
      {data.map((item, index) => (
        <Line key={index} numberItem={index} item={item} port={port} />
      ))}
    </>
  );
}

export default App;
