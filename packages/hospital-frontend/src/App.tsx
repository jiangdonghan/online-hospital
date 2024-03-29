import React, { Suspense } from "react";
import PagesRouter from "./views/router";

import { AppProviders } from "./context";
import { GlobalStyles } from "./globalStyles";
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
