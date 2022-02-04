import { Route, Routes } from "react-router-dom";
import modules from './pages'

function App() {
  return (
    <>
    <Routes>
      {modules.map(module => {
        return(
        <Route path={module.routeProps.path} element={module.routeProps.element}/>)
      })}
      {/* <Route path=''/> */}
    </Routes>
    </>
  );
}

export default App;
