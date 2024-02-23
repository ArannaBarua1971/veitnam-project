import React from "react";

function ErrorMessage({ children }) {
  return (
    <div class="alert alert-danger" role="alert">
      {children}
    </div>
  );
}

export default ErrorMessage;
