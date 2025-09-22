import { render } from "@testing-library/react";
import app from "./app.js";
import { Home } from "lucide-react";
import { MemoryRouter } from "react-router-dom";
import ReportEwaste from "../components/ReportEwaste.jsx";
import Register from "../components/Register.jsx";
import Login from "../components/Login.jsx";
import Rewards from "../components/Rewards.jsx";
import Profile from "../components/Profile.jsx";

test('test rendering of APP.js', () =>
    {
       it('render home component', () => {
        render(
        <MemoryRouter initialEntries={['/']}>
        <Home />
        </MemoryRouter>)

            const HomeElement = screen.getByTestId(/Welcome to E-Waste Management Platform/i);
            expect(HomeElement).toBeInTheDocument();
     });

        it('render Report component', () => {
            render(
            <MemoryRouter initialEntries={['/report']}>
            <ReportEwaste />
            </MemoryRouter>)
            const ReportEwasteElement = screen.getByTestId(/Report E-Waste/i);
            expect(ReportEwasteElement).toBeInTheDocument();
     });

        it('render Register component', () => {
            render(
            <MemoryRouter initialEntries={['/register']}>
            <Register />
            </MemoryRouter>)
                const RegisterElement = screen.getByTestId(/Create Your Profile/i);
                expect(RegisterElement).toBeInTheDocument();
     });

        it('render Login component', () => {
            render(
            <MemoryRouter initialEntries={['/login']}>
            <Login />
            </MemoryRouter>)
                const Loginlement = screen.getByTestId(/May I know who you are?/i);
                expect(Loginlement).toBeInTheDocument();
     });

        it('render Reward component', () => {
            render(
            <MemoryRouter initialEntries={['/rewards']}>
            <Rewards />
            </MemoryRouter>)
                const RewardElement = screen.getByTestId(/Your Rewards/i);
                expect(RewardElement).toBeInTheDocument();
     });

        it('render Profile component', () => {
            render(
            <MemoryRouter initialEntries={['/profile']}>
            <Profile />
            </MemoryRouter>)
            const ProfileElement = screen.getByTestId(/Reports Submitted:/i);
            expect(ProfileElement).toBeInTheDocument();
     });
    }
);