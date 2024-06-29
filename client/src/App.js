import { Routes, Route } from "react-router-dom";
// components
import Layout from "./components/layout/Layout";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import EventAdd from "./components/events/EventAdd";
import EventEdit from "./components/events/EventEdit";
// scenes
import Home from "./scenes/homePage/HomePage";
import Login from "./scenes/loginPage/LoginPage";
import Register from "./scenes/registerPage/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* rutas publicas */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* rutas privadas */}
        <Route element={<RequireAuth allowedRoles={["admin", "user"]} />}>
          <Route path="" element={<Home />} />
          <Route path="events/add" element={<EventAdd />} />
          <Route path="events/edit/:id" element={<EventEdit />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
