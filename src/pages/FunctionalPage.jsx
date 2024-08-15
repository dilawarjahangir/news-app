import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header.jsx";
import { isoToCountry } from "../data.js";
import URL from "../config";
import Card from "../components/Card.jsx";
import Footer from "../components/layout/Footer.jsx";

const FunctionalPage = () => {
  const [articles, setArticles] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handlePrevClick = () => {
    setPage(page - 1);
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const [filters, setFilters] = useState({
    country: "",
    category: "",
    sort: "",
    from: "",
    to: "",
    language: "",
    endpoint: "everything", // Default endpoint
  });

  useEffect(() => {
    const reloadArticles = async () => {
      try {
        let apiURL = "";

        // Check if all filter options are empty
        const areFiltersEmpty =
          !filters.country &&
          !filters.category &&
          !searchValue &&
          !filters.from &&
          !filters.to &&
          !filters.language;

        if (areFiltersEmpty) {
          // Fetch default news (e.g., about Pakistan)
          apiURL = `https://newsapi.org/v2/everything?q=pakistan&apiKey=${URL.apiKey}&page=${page}&pageSize=${pageSize}`;
        } else {
          if (filters.endpoint === "top-headlines") {
            const countryQuery = filters.country
              ? `${URL.countryID}${filters.country}&`
              : "";
            const categoryQuery = filters.category
              ? `${URL.category}${filters.category}&`
              : "";
            const searchQuery = searchValue
              ? `${URL.search}${encodeURIComponent(searchValue)}&`
              : "";

            apiURL = `${URL.topHeadlinesURL}${countryQuery}${categoryQuery}${searchQuery}apiKey=${URL.apiKey}&page=${page}&pageSize=${pageSize}`;
          } else if (filters.endpoint === "everything") {
            const searchQuery = searchValue
              ? `${URL.search}${encodeURIComponent(searchValue)}&`
              : "";
            const fromQuery = filters.from ? `from=${filters.from}&` : "";
            const toQuery = filters.to ? `to=${filters.to}&` : "";
            const languageQuery = filters.language
              ? `language=${filters.language}&`
              : "";
            const sortQuery = filters.sort ? `sortBy=${filters.sort}&` : "";

            apiURL = `${URL.everythingURL}${searchQuery}${fromQuery}${toQuery}${languageQuery}${sortQuery}apiKey=${URL.apiKey}&page=${page}&pageSize=${pageSize}`;
          }
        }

        const response = await fetch(apiURL);
        const data = await response.json();

        if (data && data.articles) {
          console.log("API Response:", data);
          console.log("Articles Array:", data.articles);

          setArticles(data.articles);
          setTotalResults(data.totalResults);
        } else {
          console.warn("No articles returned from the API");
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching the news:", error);
        setArticles([]);
      }
    };

    if (
      filters.endpoint === "everything" ||
      filters.endpoint === "top-headlines"
    ) {
      reloadArticles();
    }
  }, [filters, searchValue, page, pageSize]);

  const handleChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleChangeEndpoint = (event) => {
    setFilters({ ...filters, endpoint: event.target.value });
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1); // Reset to the first page when pageSize changes
  };

  return (
    <div className="">
      <Header />
      <div className="min-h-screen">
        <div className=" bg-white border p-2  shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Endpoint Selection */}
            <select
              className="form-select w-full lg:w-auto rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.endpoint}
              onChange={handleChangeEndpoint}
            >
              <option value="top-headlines">Top Headlines</option>
              <option value="everything">Everything</option>
            </select>

            {/* Filters Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:gap-2 gap-2 flex-grow">
              {/* Country Filter */}
              <select
                className={`form-select w-full lg:w-auto rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  filters.endpoint === "everything" ? "hidden" : ""
                }`}
                value={filters.country}
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
              >
                <option value="">Select Country</option>
                {Object.entries(isoToCountry).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                className={`form-select w-full lg:w-auto rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  filters.endpoint === "everything" ? "hidden" : ""
                }`}
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="general">General</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
              </select>

              {/* Date Range Filters */}
              <input
                type="date"
                className={`form-input w-full lg:w-auto rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  filters.endpoint !== "everything" ? "hidden" : ""
                }`}
                value={filters.from}
                onChange={(e) =>
                  setFilters({ ...filters, from: e.target.value })
                }
                placeholder="From"
              />
              <input
                type="date"
                className={`form-input w-full lg:w-auto rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  filters.endpoint !== "everything" ? "hidden" : ""
                }`}
                value={filters.to}
                onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                placeholder="To"
              />

              {/* Language Filter */}
              <select
                className={`form-select w-full lg:w-auto rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  filters.endpoint !== "everything" ? "hidden" : ""
                }`}
                value={filters.language}
                onChange={(e) =>
                  setFilters({ ...filters, language: e.target.value })
                }
              >
                <option value="">Select Language</option>
                <option value="en">English</option>
                <option value="de">German</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="ru">Russian</option>
              </select>

              {/* Sort Filter */}
              <select
                className="form-select w-full lg:w-auto rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.sort}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value })
                }
              >
                <option value="">Sort By</option>
                <option value="publishedAt">Published At</option>
                {filters.endpoint === "everything" && (
                  <>
                    <option value="relevancy">Relevancy</option>
                    <option value="popularity">Popularity</option>
                  </>
                )}
              </select>
            </div>

            {/* Search Section */}
            <div className="w-full lg:w-auto flex items-center">
              <select
                className="form-select w-auto rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
              <input
                value={searchValue}
                onChange={handleChangeSearch}
                placeholder="Search articles"
                className="w-full lg:w-64 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="p-4 flex-col flex justify-center items-center mt-3">
          <h1 className="text-2xl">Articles</h1>
          {articles.length > 0 ? (
            <>
              <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-3">
                {articles.map((article, index) => (
                  <Card key={index} data={article} />
                ))}
              </div>
              <div className="w-[400px]">
                <div className="flex justify-between">
                  <button
                    disabled={page <= 1}
                    type="button"
                    className="text-white flex justify-center items-center bg-black text-2xl p-3 hover:bg-slate-700 rounded"
                    onClick={handlePrevClick}
                  >
                    <MdNavigateBefore />
                  </button>
                  <button
                    disabled={page + 1 > Math.ceil(totalResults / pageSize)}
                    type="button"
                    className="text-white flex justify-center items-center hover:bg-slate-700 bg-black text-2xl rounded p-3"
                    onClick={handleNextClick}
                  >
                    <MdNavigateNext />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-full items-center justify-center">
              <img
                src="../3804918.jpg"
                className=" w-[350px]  sm:w-[500px]"
                alt="No articles available"
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FunctionalPage;
