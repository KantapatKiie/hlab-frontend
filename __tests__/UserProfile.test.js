/* eslint-disable no-undef */
// src/__tests__/UserProfile.test.js
import { render, screen, waitFor } from "@testing-library/react";
import UserProfile from "../UserProfile";

// Mock fetch globally
global.fetch = jest.fn();

describe("UserProfile Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state initially", () => {
    render(<UserProfile userId="1" />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders user data on successful fetch", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: "John Doe", email: "john.doe@example.com" }),
    });

    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Email: john.doe@example.com/i)
      ).toBeInTheDocument();
    });
  });

  it("shows error message on fetch failure", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(
        screen.getByText(/Error: Failed to fetch user data/i)
      ).toBeInTheDocument();
    });
  });

  it("handles network errors gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument();
    });
  });
});
