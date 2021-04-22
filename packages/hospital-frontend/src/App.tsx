import React, { Suspense } from "react";
import PagesRouter from "./views/router";
import GlobalStyles from "./globalStyles";
import { AppProviders } from "./context";
const App: React.FC = () => {
  return (
    <AppProviders>
      <Suspense fallback="Loading...">
        <GlobalStyles />
        <PagesRouter />
      </Suspense>
    </AppProviders>
  );
};

export default App;
