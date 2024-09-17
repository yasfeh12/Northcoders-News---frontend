import Header from "./assets/components/Header";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListOfRoutes from "./assets/components/ListOfRoutes";
import ErrorBoundary from "./assets/components/Errorboundaries";

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <div className="App">
        <ListOfRoutes />
      </div>
    </ErrorBoundary>
  );
}

export default App;
