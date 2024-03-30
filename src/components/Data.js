import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from './Chart';
import Topic from './Topic';
import Region from './Region';
import Line from './Line'
import './index.css'

const Data = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/');
      const mainData = response.data.map(eachItem => ({
        id: eachItem._id,
        endYear: eachItem.end_year,
        intensity: eachItem.intensity,
        sector: eachItem.sector,
        topic: eachItem.topic,
        insight: eachItem.insight,
        url: eachItem.url,
        region: eachItem.region,
        startYear: eachItem.start_year,
        impact: eachItem.impact,
        added: eachItem.added,
        published: eachItem.published,
        country: eachItem.country,
        relevance: eachItem.relevance,
        pestle: eachItem.pestle,
        source: eachItem.source,
        title: eachItem.title,
        likelihood: eachItem.likelihood
      }));

      console.log('mainData:', mainData); // Log mainData to inspect its structure

      const chartData = mainData.map(item => ({
        topic: item.topic,
        intensity: item.intensity,
        relevance: item.relevance,
        sector: item.sector,
        region: item.region,
        startYear: item.startYear


      }));

      console.log('chartData:', chartData); // Log chartData to inspect its structure

      setData(mainData);
      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className='mainPage'>
      <nav className='NavBar'>
        <h1>Username</h1>
        <button type='button'>Logout</button>

      </nav>
      <div className='secondDiv'>
        <aside className='side-Bar'>
          <h1>Profile</h1>
          <h1>Dashboard</h1>
          <h1>Transactions</h1>
        </aside>
        <div>
          <div className='displayData'>
            <div className='restrict'>
              <PieChart chartData={chartData} />
            </div>
            <div className='restrictTwo'>
              <Topic chartData={chartData} />
            </div>
            <div className='restrictTwo'>
              <Region chartData={chartData} />
            </div>
            <div className='restrictTwo'>
              <Line chartData={chartData} />
            </div>
          </div>
          <h1>Browse the Info</h1>
          <ul className='listDisplay'>
            {data.map((item, index) => (
              <li key={item.id} className='listItem'>
                <p>Title: {item.title}</p>
                <p>Topic: {item.topic}</p>
                <p>Intensity: {item.intensity}</p>
                <p>Insight: {item.insight}</p>
                <p>Published: {item.published}</p>
                <p>Source: {item.source}</p>
                <p>URL: <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></p>
              </li>
            ))}
          </ul>
        </div>
      </div>


    </div>
  );
};

export default Data;
