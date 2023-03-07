import React, { useState } from "react";
import IndexCinemaHall from "./IndexCinemaHall";
import IndexCinemaMap from "./IndexRoomMap";

const IndexRouteHall = () => {
  const [tab, setTab] = useState(0);
  return (
    <React.Fragment>
      {tab === 0 ? (
        <IndexCinemaHall setTab={setTab} />
      ) : (
        <IndexCinemaMap setTab={setTab} />
      )}
    </React.Fragment>
  );
};

export default IndexRouteHall;
