import React from "react";
import { Children } from "react";
import { useNavigate } from "react-router-dom";

function Link({ to }) {
  const navigate = useNavigate();

  return (
    <div className="link" onClick={navigate(to)}>
      {Children}
    </div>
  );
}

export default Link;
