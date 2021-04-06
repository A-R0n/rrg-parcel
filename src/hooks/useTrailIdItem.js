// import React, { useEffect } from "react";
// import { get, CancelToken, isCancel } from "axios";

// const useTrailIdItem = (id) => {
//   console.log("id: ,", id);
//   let [trailData, setTrailData] = React.useState();
//   const [isResponse200, setIsResponse200] = React.useState(false);

//   useEffect(() => {
//     if (typeof id === "number") {
//       const source = CancelToken.source();
//       const fetchTrailId = async () => {
//         try {
//           await get(`http://localhost:8888/api/trail/` + `${id}`, {
//             cancelToken: source.token,
//           }).then((res) => {
//             // console.log("res: ", res);
//             setTrailData(res.data);
//             setIsResponse200(true);
//           });
//         } catch (error) {
//           console.log("error", error);
//           if (isCancel(error)) {
//           } else {
//             throw error;
//           }
//         }
//       };
//       fetchTrailId();

//       return () => {
//         source.cancel();
//       };
//     }
//   }, [id]);

//   return [trailData, isResponse200];
// };

// export default useTrailIdItem;
