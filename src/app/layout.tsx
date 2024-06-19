import { Link, Outlet } from "react-router-dom";
import { EventContextProvider } from "./context/EventContext";
import { EventFilterContextProvider } from "./context/EventFilterContext";

const RootLayout = () => {
  return (
    <EventContextProvider>
      <EventFilterContextProvider>
        <nav className="p-4 flex items-center">
          <ul className="flex items-center gap-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </EventFilterContextProvider>
    </EventContextProvider>
  );
};

export default RootLayout;
