import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";
import "./VentureDetails.css"; // Custom styles

export default function VentureDetails() {
  const { id } = useParams();
  const { data, loading } = useFetch("https://venture-backend-98iovy5o4-rishikeshs-projects-f92f7a7f.vercel.app/venture");
  const details = data?.find((d) => d._id === id);

  return (
    <div className="venture-details-page bg-dark text-light overflow-hidden">
      <div className="container py-4">
        {/* Navbar */}
        <nav className="navbar mb-4">
          <Link to="/" className="navbar-brand text-warning fs-3 fw-bold">
            ← Venture Home
          </Link>
        </nav>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status"></div>
          </div>
        ) : (
          details && (
            <div className="row g-5">
              {/* Left Section */}
              <div className="col-lg-8">
                <h1 className="display-5 fw-bold text-uppercase mb-3">
                  {details.name}
                </h1>
                <img
                  src={details.secondaryImg}
                  alt={details.name}
                  className="img-fluid rounded shadow mb-4 venture-image"
                />

                <div className="bg-glass p-4 rounded-4 mb-4">
                  <h3 className="text-warning mb-3">Overview</h3>
                  <p className="fs-4 fw-semibold">{details.h1}</p>
                  <p className="fs-5">{details.h2}</p>
                  <p className="text-light" style={{ textAlign: "justify" }}>
                    {details.description}
                  </p>
                </div>

                <div className="bg-glass p-4 rounded-4">
                  <h3 className="text-warning mb-3">Additional Information</h3>
                  <p>
                    <strong>Founded Year:</strong> {details.foundedYear}
                  </p>
                  <p>
                    <strong>Service:</strong> {details.service[0]}
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <div className="col-lg-4">
                <div className="bg-glass p-4 rounded-4 shadow-sm mb-4 text-center">
                  <h4 className="mb-3 text-warning">Quick Links</h4>
                  <a
                    href={details.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-light w-100 mb-3"
                  >
                    🌐 Visit Website
                  </a>
                  <a
                    href={details.contact}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-light w-100"
                  >
                    📞 Contact Info
                  </a>
                </div>

                <div className="bg-glass p-4 rounded-4 shadow-sm">
                  <h4 className="mb-3 text-warning">
                    Social Links ({details.Social?.length})
                  </h4>
                  <div className="social-links">
                    {details.Social?.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`social-btn ${s.name.toLowerCase()}`}
                      >
                        <i
                          className={`fab fa-${s.name.toLowerCase()} fa-lg`}
                        ></i>{" "}
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}


