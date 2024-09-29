import PropTypes from "prop-types";
import "./PetCard.css";

export default function PetCard(props) {
  return (
    <div className="pet-card">
      <h4>{props.petname}</h4>
      <p>
        a {props.age}-year-old {props.breed} {props.species} who belongs to{" "}
        {props.ownername}
      </p>
    </div>
  );
}

PetCard.propTypes = {
  petname: PropTypes.string,
  age: PropTypes.string,
  breed: PropTypes.string,
  species: PropTypes.string,
  ownername: PropTypes.string,
};
