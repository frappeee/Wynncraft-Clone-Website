### WIP


Wynncraft Player Stats Inspector (React)

A dynamic player statistics viewer for the Wynncraft MMORPG, built with **React** and **vanilla CSS**. This project interfaces directly with the **Wynncraft v3 API** to fetch and visualize live user data, including 3D skin renders, total levels, and individual class progress.

## Features
- **Real-Time API Fetching:** Connects to `api.wynncraft.com/v3` to get the latest player data.
- **Dynamic Search:** Handles errors gracefully (e.g., player not found) with loading states.
- **Data Parsing:** Converts complex JSON objects (character data) into sortable, mapped arrays.
- **Visual Polish:** Features 3D bust rendering and custom CSS animations.
- **Responsive Design:** Fully styled with standard CSS (no frameworks) to look good on mobile and desktop.

## Tech Stack
- **Frontend:** React.js (Vite)
- **Styling:** Standard CSS (Scoped & Modular)
- **Icons:** Lucide React
- **Data:** Wynncraft Public API v3

## Project Roadmap (The "Clone" Plan)
This project serves as the foundational module for a larger goal: **A complete Wynncraft Website Clone.**
- [x] **Phase 1:** Player Stats Inspector (Completed)
- [ ] **Phase 2:** Item Database (Search items by rarity/tier)
- [ ] **Phase 3:** Guild Leaderboards & Territory Tracking
- [ ] **Phase 4:** Full UI overhaul to match the official game aesthetic
