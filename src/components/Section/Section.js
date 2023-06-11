// import PropTypes from 'prop-types';

const Section = ({ children, title }) => {
  return (
    <>
      <h2>{title}</h2>
      {children}
    </>
  );
};

export default Section;
