import PropTypes from "prop-types";

export default function PetCard(props) {
  return (
    <p>
      {props.petname} is a {props.age}-year-old {props.breed} {props.species}{" "}
      who belongs to {props.ownername}
    </p>
  );
}

PetCard.propTypes = {
  petname: PropTypes.string,
  age: PropTypes.string,
  breed: PropTypes.string,
  species: PropTypes.string,
  ownername: PropTypes.string,
};
