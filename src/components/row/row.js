import React from 'react';

const Row = ({left, right}) => {
  return (
    <div className="row mb2">
        {left}
      <div className="col-md-6">
        {right}
      </div>
    </div>
  )
}

export default Row
