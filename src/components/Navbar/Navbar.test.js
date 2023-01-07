import { render, screen, fireEvent } from "utils/test-utils";

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("opens the auth modal when Log In button is clicked", () => {
    render(<Navbar />);
    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(screen.getByTestId("authTabs")).toBeInTheDocument();
  });

  it("opens the auth modal when Sign Up button is clicked", () => {
    render(<Navbar />);
    const signupButton = screen.getByText("Sign In");
    expect(signupButton).toBeInTheDocument();

    fireEvent.click(signupButton);
    expect(screen.getByTestId("authTabs")).toBeInTheDocument();
  });

  it("opens the auth modal with signup form displayed if Sign Up button is clicked", () => {
    render(<Navbar />);
    const signupButton = screen.getByText("Sign In");
    expect(signupButton).toBeInTheDocument();

    fireEvent.click(signupButton);
    expect(screen.getByTestId("signupForm")).toBeInTheDocument();
  });

  it("opens the auth modal with signin form displayed if Log In button is clicked", () => {
    render(<Navbar />);
    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(screen.getByTestId("signinForm")).toBeInTheDocument();
  });
});
