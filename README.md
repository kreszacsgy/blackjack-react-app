# Blackjack React App

A polished **Blackjack game** built with **React**, designed as a portfolio project to demonstrate modern front-end development skills including component-based architecture, state management with hooks, CSS animations, and API integration.

## Demo

https://kreszacsgy.github.io/blackjack-react-app/

## Implemented functions and technologies

### Features

    -  **Fully playable Blackjack** experience (excluding split and double down)
    -  **Dealer AI** follows standard Blackjack rules (stands at 17+)
    -  **Betting system** with balance management
    -  **Card animations** including realistic flip effects
    -  **Responsive design** for mobile and desktop
    -  Uses the [Deck of Cards API](https://deckofcardsapi.com/) for real card draws (single deck)

### Technologies Used

| Technology       | Purpose                               |
|------------------|----------------------------------------|
| **React**        | UI library with functional components  |
| **React Hooks**  | State and effect management (`useState`, `useEffect`) |
| **CSS Modules**  | Scoped, modular, and maintainable CSS  |
| **Fetch API**    | Communicating with external APIs       |
| **Deck of Cards API** | Real-time card drawing          |

### Project Structure

src/
├── components/
│   ├── Controls/       # Betting and game control buttons
│   │   ├── Controls.jsx
│   │   └── Controls.module.css
│   ├── Hand/           # Card rendering and flip animation
│   │   ├── Hand.jsx
│   │   └── Hand.module.css
│   └── Status/         # Player balance and game messages
│       ├── Status.jsx
│       └── Status.module.css
├── App.css             # Global styles
├── App.js              # Main game logic and layout
├── index.js            # Entry point of the app
└── index.css           # Basic styling

### Purpose

This project was created to:

- Showcase a **modular component-based UI**
- Demonstrate **interactive game logic** in React
- Apply **clean, scalable styling** with CSS Modules
- Integrate with external APIs and manage data
- Build a **responsive, animated user interface**

## External Libraries

- **Fonts**: [Google Fonts](https://fonts.google.com/)
- **Images**: Created with [Leonardo.AI](https://app.leonardo.ai/image-generation)
  
## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://kreszacsgy.github.io/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gy%C3%B6ngyi-kresz%C3%A1cs-a144ba258/)
