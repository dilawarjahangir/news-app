import React from "react";

const Card = ({ data }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:shadow-xl">
      <img
        src={`${data.urlToImage ? data.urlToImage : "https://st2.depositphotos.com/6789684/12262/v/450/depositphotos_122620866-stock-illustration-illustration-of-flat-icon.jpg"}`}
        alt=""
        className="h-80 w-72 object-cover rounded-t-xl"
      />
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">{data.source.name}</span>
        <p className="text-lg font-bold text-black block capitalize">
          {data.title}
        </p>
        <div className="flex items-center p-2">
          <h1>{formatDate(data.publishedAt)}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
