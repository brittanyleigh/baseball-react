/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent, screen, waitFor } from "./test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "../components/App";
import mockAxios from "axios";

test("can render with redux with defaults", async () => {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

  render(<App />);
  await waitFor(() => {
    expect(screen.getByText("scoreboard")).toBeInTheDocument();
  });
  //fireEvent.click(screen.getByText("+"));
  //expect(screen.getByTestId("count-value")).toHaveTextContent("1");
});
