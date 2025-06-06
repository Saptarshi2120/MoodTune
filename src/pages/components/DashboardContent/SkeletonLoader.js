import React from 'react';
import './SkeletonLoader.css';

function SkeletonLoader({ height = '200px', width = '100%' }) {
  return (
    <div
      className="skeleton-loader"
      style={{ height: height, width: width }}
    ></div>
  );
}

export default SkeletonLoader;
