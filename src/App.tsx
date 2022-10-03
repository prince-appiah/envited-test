import { Route, Routes } from "react-router-dom";
import CreateEventPage from "./pages/CreateEvent";
import EventPage from "./pages/Event";
import LandingPage from "./pages/Landing";

export const App = () => (
  <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create" element={<CreateEventPage />} />
      <Route path="/event" element={<EventPage />} />
    </Routes>
  </>
);
