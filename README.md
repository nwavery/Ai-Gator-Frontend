# AI-Gator (Agregator)

Tame the AI jungle — find the perfect tools to work smarter, live better, and create more.

## Project Goal

This project aims to create a modern web application inspired by [FutureTools.io](https://www.futuretools.io/), serving as a curated directory for AI tools.

## Tech Stack

*   **Frontend:** Angular (~19.2) with TypeScript, styled using Tailwind CSS.
*   **Backend:** Java / Spring Boot (separate repository: `agregator-backend`)
*   **Database:** GCP Cloud SQL (MySQL) - *Planned*
*   **Storage:** GCP Cloud Storage (for images/files) - *Planned*

## Current Features (Frontend)

*   Displays a list of AI tools fetched from the backend.
*   Tools are displayed in responsive cards.
*   Filtering tools by:
    *   Multiple Categories (checkboxes)
    *   Multiple Pricing Models (checkboxes)
    *   Search Term (name/description)
*   Sorting tools by various criteria (Newest, Upvoted, Name, Oldest).
*   Clickable tool cards navigate to a dedicated Tool Detail page.
*   Tool Detail page displays tool information (image, description, category, link).
*   Basic layout matching the target site (Header with logo/nav, Filter bar, Tool grid).
*   Placeholder "Submit A Tool" page route.

## Getting Started (Frontend)

1.  **Prerequisites:**
    *   Node.js and npm installed.
    *   Angular CLI installed (`npm install -g @angular/cli`).
    *   The backend service (`agregator-backend`) must be running (typically on `http://localhost:8080`).
2.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Agregator
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    ng serve
    ```
5.  Navigate to `http://localhost:4200/` in your browser.

## Backend Setup

Please refer to the README in the `agregator-backend` repository for instructions on setting up and running the backend service.

## Next Steps / TODO

*   Implement "Submit A Tool" form and functionality.
*   Implement image uploading (to GCP Cloud Storage) for submitted tools.
*   Integrate backend with GCP Cloud SQL database.
*   Add user authentication/accounts (optional).
*   Implement upvoting functionality.
*   Refine UI/UX, add animations/transitions.
*   Implement remaining filters (Open Source, Matt's Picks etc.).
*   Add pagination or infinite scroll for the tool list.
*   Improve SEO.
*   Write unit and end-to-end tests.
