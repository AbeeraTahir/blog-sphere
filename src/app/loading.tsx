"use client";

import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <BeatLoader color="#000" />
    </div>
  );
};

export default Loading;
