import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("App Component", () => {

  it("renders Home route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const homeElement = screen.getByText(/Welcome to E-Waste Management Platform/i); // use actual text in Home
    expect(homeElement).toBeInTheDocument();
  });

  it("renders ReportEwaste route", () => {
    render(
      <MemoryRouter initialEntries={["/report"]}>
        <App />
      </MemoryRouter>
    );
    const reportElement = screen.getByText(/Report E-Waste/i); // actual text from component
    expect(reportElement).toBeInTheDocument();
  });

  it("renders Register route", () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>
    );
    const registerElement = screen.getByText(/Create Your Profile/i); // actual text in Register
    expect(registerElement).toBeInTheDocument();
  });

  it("renders Login route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    const loginElement = screen.getByText(/May I know who you are/i); // actual text in Login
    expect(loginElement).toBeInTheDocument();
  });

  it("renders Rewards route", () => {
    render(
      <MemoryRouter initialEntries={["/rewards"]}>
        <App />
      </MemoryRouter>
    );
    const rewardElement = screen.getByText(/Your Rewards/i); // actual text in Rewards
    expect(rewardElement).toBeInTheDocument();
  });

  it("renders Profile route", () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>
    );
    const profileElement = screen.getByText(/Reports Submitted:/i); // actual text in Profile
    expect(profileElement).toBeInTheDocument();
  });

});
