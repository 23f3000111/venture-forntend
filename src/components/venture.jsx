import { useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import TypingText from "./TypingText";
import "./Venture.css"; // Import custom styles

function Venture() {
  const [search, setSearch] = useState("");
  const { data, loading } = useFetch("https://venture-backend-3m7drudk4-rishikeshs-projects-f92f7a7f.vercel.app/venture");

  const filterVenture =
    search === ""
      ? data
      : data?.filter((d) =>
          d.name?.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="venture-page">
      {/* Hero Section */}
      <div className="hero-section text-center text-white pt-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">🚀 Mr. Lavish Choudhary's Ventures</h1>
          <p className="lead">Explore innovative ventures built with vision and passion.</p>

          <div className="search-box mx-auto mt-4">
            <input
              type="text"
              placeholder="Search ventures..."
              className="form-control form-control-lg rounded-pill px-4"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="typing-text mt-5 fs-4 text-warning">
            {data && (
              <TypingText
                words={filterVenture?.map((venture) => venture.name)}
                speed={100}
                pause={1200}
              />
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container py-5">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {filterVenture?.map((venture) => (
              <div className="col-sm-12 col-md-6 col-lg-4" key={venture._id}>
                <div className="venture-card card h-100 shadow-lg border-0">
                  <img
                    src={venture.image}
                    alt={venture.name}
                    className="card-img-top"
                  />
                  <div className="card-body text-white">
                    <h5 className="card-title fw-bold">{venture.name}</h5>
                    <p className="card-text text-light">
                      Founded in {venture.foundedYear}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <Link to={`/venture/${venture._id}`} className="btn btn-outline-light w-100">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Venture;





