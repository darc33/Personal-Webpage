import React from "react";
import PropTypes from "prop-types";
import "./CredlyBadgeCard.css";

const CredlyBadgeCard = ({ url, title, issuer, dateIssued, imageUrl }) => {
  const handleRedirect = () => {
    window.open(url, "_blank");
  };

  return (
    <div
      className="credly-badge-card"
      onClick={handleRedirect}
      onMouseEnter={(e) =>
        e.currentTarget.classList.add("credly-badge-card-hover")
      }
      onMouseLeave={(e) =>
        e.currentTarget.classList.remove("credly-badge-card-hover")
      }
    >
      <img src={imageUrl} alt={`${title} Badge`} className="badge-image" />
      <h3 className="badge-title">{title}</h3>
      <p className="badge-issuer">{issuer}</p>
      <p className="badge-date">Issued {dateIssued}</p>
    </div>
  );
};

CredlyBadgeCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  issuer: PropTypes.string.isRequired,
  dateIssued: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CredlyBadgeCard;
