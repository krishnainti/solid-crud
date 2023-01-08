import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";

const List = lazy(() => import("./components/List"));
const Add = lazy(() => import("./components/Add"));
const View = lazy(() => import("./components/View"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));

function App() {
  return (
    <div class="p-14 h-screen">
      <Routes>
        <Route path="/" component={List} />
        <Route path="/add" component={Add} />
        <Route path="/view/:id" component={View} />
        <Route path="/edit/:id" component={Add} />
        <Route path="*" component={PageNotFound} />
      </Routes>
    </div>
  );
}

export default App;
