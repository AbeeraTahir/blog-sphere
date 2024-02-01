import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="px-2 md:px-6 lg:px-28 flex flex-col gap-8 pt-36 pb-20">
      {children}
    </div>
  );
};

export default Wrapper;
