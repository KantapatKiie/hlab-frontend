/* eslint-disable no-undef */
// src/__tests__/UserProfile.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserProfile from "../UserProfile";

// Mock fetch globally for the tests
global.fetch = jest.fn();

describe("UserProfile", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should render user information when fetched successfully", async () => {
    const user = { name: "John Doe", email: "john.doe@example.com" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => user,
    });

    render(<UserProfile userId="123" />);

    await waitFor(() => screen.getByText("Username: John Doe"));
    expect(screen.getByText("Email: john.doe@example.com")).toBeInTheDocument();
  });

  it("should display an error message when the fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to fetch user data"));

    render(<UserProfile userId="123" />);

    await waitFor(() => screen.getByText("Error: Failed to fetch user data"));
    expect(
      screen.getByText("Error: Failed to fetch user data")
    ).toBeInTheDocument();
  });

  it("should calculate total price correctly after applying discount", async () => {
    const user = { name: "John Doe", email: "john.doe@example.com" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => user,
    });

    render(<UserProfile userId="123" />);

    await waitFor(() => screen.getByText("Username: John Doe"));

    fireEvent.click(screen.getByText("Increase Discount"));

    await waitFor(() => screen.getByText("Total Price: $900"));

    expect(screen.getByText("Total Price: $900")).toBeInTheDocument();
  });

  it("should increment discount correctly when the button is clicked", async () => {
    const user = { name: "John Doe", email: "john.doe@example.com" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => user,
    });

    render(<UserProfile userId="123" />);

    await waitFor(() => screen.getByText("Username: John Doe"));

    const discountButton = screen.getByText("Increase Discount");

    fireEvent.click(discountButton);
    await waitFor(() =>
      expect(screen.getByText("Discount: 10%")).toBeInTheDocument()
    );

    fireEvent.click(discountButton);
    await waitFor(() =>
      expect(screen.getByText("Discount: 20%")).toBeInTheDocument()
    );
  });
});
