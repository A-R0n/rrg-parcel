import React, { useEffect } from "react";
import {get, CancelToken, isCancel} from "axios";

const useParkingLotIdItem = (id) => {
  console.log("id: ,", id);
  let [parkingLotData, setParkingLotData] = React.useState();
  const [isResponse200, setIsResponse200] = React.useState(false);

  useEffect(() => {
    if (typeof id === "number") {
      const source = CancelToken.source();
      const fetchParkingLot = async () => {
        try {
          await get(`${process.env.REACT_APP_GET_PARKINGLOTID}` + `${id}`, {
              cancelToken: source.token,
            })
            .then((res) => {
              // console.log("res: ", res);
              setParkingLotData(res.data);
              setIsResponse200(true);
            });
        } catch (error) {
          console.log("error", error)
          if (isCancel(error)) {
          } else {
            throw error;
          }
        }
      };
      fetchParkingLot();

      return () => {
        source.cancel();
      };
    }
  }, [id]);

  return [parkingLotData, isResponse200];
};

export default useParkingLotIdItem;
