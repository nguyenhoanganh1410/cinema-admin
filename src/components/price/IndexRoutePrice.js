import React, { useState } from "react";
import IndexCustomer from "./index";
import IndexLinePrice from "./IndexLinePrice";
import IndexLinePromotion from "./IndexLinePrice";

const IndexRoutePrice = () => {
  const [tab, setTab] = useState(0);
  return (
    <React.Fragment>
      {tab === 0 ? (
        <IndexCustomer setTab={setTab} />
      ) : (
        <IndexLinePrice setTab={setTab} />
      )}
    </React.Fragment>
  );
};

export default IndexRoutePrice;
