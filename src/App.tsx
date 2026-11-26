import type { JSX } from "react";
import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./app/router";
import styles from "./App.module.css";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <main className={styles.app}>
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;
