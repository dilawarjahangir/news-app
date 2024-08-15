import React, { useEffect, useState } from 'react';
import Card from "./Card.jsx";
import { data } from "../data.js";  // Ensure this path is correct
const getNews = async () => {
  const API_KEY = "554";
  
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2024-07-14&sortBy=publishedAt&apiKey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Fetch error: ", error);
    return [];
  }
};

const AllNews = () => {
  console.log(Card)
  const [newsData, setNewsData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// console.log(data)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        let articles = await getNews();
        if (!articles || articles.length === 0) {
            setNewsData(data)
        }
        else{

            
            setNewsData(articles);
        }

      } catch (error) {
        setError("Failed to fetch news data.");
        setNewsData([]); // Ensure that newsData is always an array
      } finally {
        setLoading(false);
      }
    };


    
    fetchNews();
}, []);

// console.log(newsData)
  if (loading) {
    return <div className='text-center mt-10'>Loading...</div>;
  }

  if (error) {
    return <div className='text-center mt-10 text-red-500'>{error}</div>;
  }

  // Safeguard to ensure newsData is always an array before accessing its length
  if (!Array.isArray(newsData)) {
    return <div className='text-center mt-10 text-red-500'>Unexpected error: newsData is not an array.</div>;
  }

  return (
    <div className='p-4 flex-col flex justify-center items-center mt-3'>
      <h1 className='text-2xl'>
        All News
      </h1>

      <div className='w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-3'>
        {newsData.length > 0 ? (
          newsData.map((article, index) => (
            <Card key={index} data={article} />
          ))
        ) : (
          <div>No articles available</div>
        )}
      </div>
    </div>
  );
};

export default AllNews;
