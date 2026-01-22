import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PageFrame = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={`pageFrame ${className ?? ""}`.trim()}>
        <div className="pageContent">{children}</div>
      </div>
    );
  }
);

PageFrame.displayName = "PageFrame";
export default PageFrame;
