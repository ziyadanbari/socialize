import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur">
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
