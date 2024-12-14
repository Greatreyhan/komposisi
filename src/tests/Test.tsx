import React from "react";
import Badge from "../components/atoms/Badges";

const Test = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Badge Component Examples</h1>

      <div className="space-x-2">
        <Badge variant="primary" size="small" rounded="none">No Rounding</Badge>
        <Badge variant="secondary" size="medium" rounded="small">Small</Badge>
        <Badge variant="success" size="large" rounded="medium">
          Medium
        </Badge>
        <Badge variant="warning" rounded="large">Large</Badge>
        <Badge variant="error" rounded="full" icon={<span>✔</span>}>
          Full
        </Badge>
      </div>
    </div>
  );
};

export default Test;
