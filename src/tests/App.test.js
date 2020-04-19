/* eslint-disable no-undef */
import React from "react";
import { createStore } from "redux";
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from "./test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "../components/App";

test("can render with redux with defaults", () => {
  render(<App />);
  //fireEvent.click(screen.getByText("+"));
  //expect(screen.getByTestId("count-value")).toHaveTextContent("1");
});
