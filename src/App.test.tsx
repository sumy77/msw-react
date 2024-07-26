import { HttpResponse, http } from "msw";
import App from "./App";
import { server } from "./test/mocks/server";
import { render, screen, userEvent } from "./utils/test-utils";

describe("App", () => {
  it("check whether vite and react text is available", () => {
    render(<App />);
    const text = screen.getByText("Vite + React");
    expect(text).toBeInTheDocument();
  });

  it("should increment count on click", async () => {
    render(<App />);
    userEvent.click(screen.getByRole("button", { name: /count is/i }));
    expect(await screen.findByText(/count is 1/i)).toBeInTheDocument();
  });

  it("api success scenario on load", async () => {
    render(<App />);
    expect(await screen.findByText("Todo List: 1")).toBeInTheDocument();
  });

  it("api error scenario on load", async () => {
    render(<App />);
    server.use(
      http.get("https://dummyjson.com/todos", () => {
        return new HttpResponse(null, { status: 401 });
      })
    );
    expect(screen.queryByText("Todo List")).not.toBeInTheDocument();
  });

  it("should load the first todo when clicked on load todo button", async () => {
    render(<App />);
    const todoBtn = screen.getByRole("button", { name: "Load First Todo" });
    userEvent.click(todoBtn);
    expect(await screen.findByText("Test todo")).toBeInTheDocument();
  });
});
