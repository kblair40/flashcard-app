import { render, screen, fireEvent } from "utils/test-utils";

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("opens the auth modal when Log In button is clicked", () => {
    render(<Navbar />);
    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();

    // Should mount/open auth modal, which will render el with authTabs data-testid
    fireEvent.click(loginButton);
    expect(screen.getByTestId("authTabs")).toBeInTheDocument();
  });
});
