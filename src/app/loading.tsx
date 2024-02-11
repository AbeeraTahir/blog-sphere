"use client";

import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <ClipLoader color="#000" />
    </div>
  );
};

export default Loading;
