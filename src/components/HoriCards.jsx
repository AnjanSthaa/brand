import PropTypes from 'prop-types';

const HoriCard = ({ image, label }) => {
  return (
    <div className="flex flex-col items-center w-32 h-40 p-3 text-center rounded-md bg-gray-300 shadow-lg">
      <div
        className="w-24 h-24 rounded-full bg-cover bg-center mb-2 bg-gray-500"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <p className="text-sm text-gray-900 font-medium">{label}</p>
    </div>
  );
};

HoriCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default HoriCard;
