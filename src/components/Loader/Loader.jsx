// components/Loader/Loader.jsx
import React from 'react';
import RingLoader from 'react-spinners/RingLoader';
import './Loader.scss';

const Loader = ({ loading }) => {
  return (
    <div className={`loader-container ${loading ? 'show' : 'hide'}`}>
      <RingLoader color="#007bff" loading={loading} size={80} />
    </div>
  );
};

export default Loader;
