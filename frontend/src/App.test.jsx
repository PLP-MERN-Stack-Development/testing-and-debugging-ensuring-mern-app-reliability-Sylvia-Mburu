import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import App from "./App";
import * as api from "./lib/api";
import { expect } from "vitest";

vi.mock("./lib/api");


test("renders title", async ()=>{
    api.BuggysAPI.list.mockResolvedValue([]);
    render(<App />);
    expect(await screen.findByText(/Buggy App/i)).toBeInTheDocument();
});

test("loads and display todos", async ()=> {
    api.BuggysAPI.list.mockResolvedValue([
        { _id: "1", title: "A", completed: false }
    ]);
    render(<App />);
    expect(await screen.findByText("A")).toBeInTheDocument();
});

test("adds a new buggy", async ()=> {
    api.BuggysAPI.list.mockResolvedValue([]);
    api.BuggysAPI.create.mockResolvedValue(
        { _id: "2", title: "New Task", completed: false}
    );

    render(<App />);
    fireEvent.change(screen.getByLabelText("new-buggy-input"), { target: { value: "New Task"} });
    fireEvent.click(screen.getByText("Add"));

    await waitFor(() =>{
        expect(screen.getByText("New Task")).toBeInTheDocument();
    })
});


test("toggles a buggy", async ()=>{
    api.BuggysAPI.list.mockResolvedValue([
        { _id: "1", title: "A", completed: false }
    ]);
    api.BuggysAPI.update.mockResolvedValue(
        { _id: "1", title: "A", completed: true }
    );

    render(<App />);
    const checkbox = await screen.findByLabelText("toggle-A");
    fireEvent.click(checkbox);

    await waitFor(() =>{
        expect(screen.getByText("A")).toBeInTheDocument();
    })
})