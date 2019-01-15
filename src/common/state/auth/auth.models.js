import propTypes from 'prop-types';

const userModel = {
  email: propTypes.string.isRequired,
  full_name: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  is_staff: propTypes.string.isRequired,
  is_superuser: propTypes.string.isRequired,
  phone_number: propTypes.string.isRequired,
  user_type: propTypes.string.isRequired,
  username: propTypes.string.isRequired
};

export default userModel;
