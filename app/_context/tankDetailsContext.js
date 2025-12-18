// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { getTankDetails } from "../_services/supabaseActions";

// const TanksDetailsContext = createContext(null);

// function TanksDetailsProvider({ children }) {
//   const [tanksDetails, setTanksDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       const data = await getTankDetails();
//       setTanksDetails(data);
//       setLoading(false);
//     }

//     fetchData();
//   }, []);

//   return (
//     <TanksDetailsContext.Provider value={{ tanksDetails, loading }}>
//       {children}
//     </TanksDetailsContext.Provider>
//   );
// }

// function useTankDetails() {
//   const context = useContext(TanksDetailsContext);
//   if (!context) {
//     throw new Error("useTankDetails must be used inside TanksDetailsProvider");
//   }
//   return context;
// }

// export { TanksDetailsProvider, useTankDetails };
