import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StoryManagement from "../../../pages/Admin/StoryManagement";
import * as storyService from "../../../services/storyService";

jest.mock("../../../services/storyService");

describe("StoryManagement Component", () => {
  const mockStories = [
    {
      id: 1,
      title: "Story 1",
      writer: "Writer 1",
      category: "Health",
      tags: '["tag1", "tag2"]',
      status: "Draft",
    },
    {
      id: 2,
      title: "Story 2",
      writer: "Writer 2",
      category: "Technology",
      tags: '["tag3", "tag4"]',
      status: "Publish",
    },
  ];

  beforeEach(() => {
    storyService.getStories.mockResolvedValue({ data: mockStories });
  });

  test("menampilkan judul Stories", async () => {
    render(<StoryManagement />);
    const headingElement = await screen.findByRole("heading", {
      name: /Stories/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  test("menampilkan list stories", async () => {
    render(<StoryManagement />);
    const storyTitle1 = await screen.findByText("Story 1");
    const storyTitle2 = await screen.findByText("Story 2");
    expect(storyTitle1).toBeInTheDocument();
    expect(storyTitle2).toBeInTheDocument();
  });

  test("hapus story ketika delete button diklik", async () => {
    // ⬇️ Mock window.confirm supaya return true
    window.confirm = jest.fn(() => true);

    storyService.deleteStory.mockResolvedValue({});

    render(<StoryManagement />);

    // Tunggu data muncul
    const storyTitle1 = await screen.findByText("Story 1");
    expect(storyTitle1).toBeInTheDocument();

    // 🔥 Cari tombol delete via data-testid (misal kamu udah tambahkan di StoryManagement.jsx)
    const deleteButton = screen.getByTestId("delete-button-1");
    fireEvent.click(deleteButton);

    // 🔥 Pastikan deleteStory terpanggil
    await waitFor(() => {
      expect(storyService.deleteStory).toHaveBeenCalledWith(1);
    });
  });
});
