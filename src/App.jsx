import { Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import CareersPage from "./pages/Careers";
import Home from "./pages/Home";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust preloader timeout as needed
    return () => clearTimeout(timer);
  }, []);

  return (
<>
      {isLoading && <Preloader />}
      {!isLoading && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
      )}
      </>
  );
};

export default App;
