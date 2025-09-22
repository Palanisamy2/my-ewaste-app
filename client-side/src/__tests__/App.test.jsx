import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Home from "../components/Home";
import ReportEwaste from "../components/ReportEwaste";
import Register from "../components/Register";
import Login from "../components/Login";
import Rewards from "../components/Rewards";
import Profile from "../components/Profile";

// vitest.setup.js or at the top of App.test.jsx
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};


describe("Route Components", () => {

  it("renders Home component", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to E-Waste Management Platform/i)).toBeInTheDocument();
  });

  it("renders ReportEwaste component", () => {
    render(
      <MemoryRouter>
        <ReportEwaste />
      </MemoryRouter>
    );
    expect(screen.getByText(/Report E-Waste/i)).toBeInTheDocument();
  });

  it("renders Register component", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByText(/Create Your Profile/i)).toBeInTheDocument();
  });

  it("renders Login component", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText(/May I know who you are/i)).toBeInTheDocument();
  });

});
