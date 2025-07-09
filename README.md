# Blackjack React App

A polished **Blackjack game** built with **React**, designed as a portfolio project to demonstrate modern front-end development skills including component-based architecture, state management with hooks, CSS animations, and API integration.

## Demo

https://kreszacsgy.github.io/blackjack-react-app/

## Blackjack Game Rules

This game implements a simplified version of Blackjack, also known as "21". The objective of the game is to have a hand value closer to 21 than the dealer's hand, without exceeding 21.

### Gameplay Flow:

1.  **Start a New Game**: Begin by clicking the "Play" button.

2.  **Place Your Bet**: Enter your desired bet amount. Your balance will decrease by this amount.

3.  **Initial Deal**: Both the player and the dealer receive two cards.

    * The player's cards are both face-up.

    * The dealer has one card face-up and one card face-down.

4.  **Player's Turn**: You decide whether to "Hit" or "Stand".

    * **Hit**: Draw an additional card. You can hit as many times as you wish, as long as your hand total does not exceed 21.

    * **Stand**: End your turn and keep your current hand.

5.  **Dealer's Turn**: Once the player stands, it's the dealer's turn.

    * The dealer's hidden card is revealed.

    * The dealer must hit until their hand total is 17 or higher.

    * The dealer must stand on 17 or higher.

6.  **Game Over**: The game concludes when the player busts or the dealer completes their turn.

### Card Values:

* **Numbered Cards (2-10)**: Face value (e.g., 5 of hearts is 5 points).

* **Face Cards (Jack, Queen, King)**: 10 points each.

* **Ace**: Can be counted as 1 or 11 points. The game automatically assigns the value that is most beneficial to the hand without exceeding 21. For example, if your hand is 10 and you draw an Ace, it counts as 11 (total 21). If your hand is 15 and you draw an Ace, it counts as 1 (total 16) to prevent busting.

### Winning Conditions:

* **Player Wins**:

    * If the player gets 21 and the dealer does not also have Blackjack. (Pays 2x your bet)

    * Player's hand is closer to 21 than the dealer's, without busting. (Pays 2x your bet)

    * Dealer's hand exceeds 21 (dealer busts), and the player has not busted. (Pays 2x your bet)

* **Dealer Wins**:

    * Dealer's hand is closer to 21 than the player's, without busting.

    * Player's hand exceeds 21 (player busts).

    * Dealer gets 21 and the player does not.

* **Push (Tie)**: If both the player and the dealer have the same hand total (and neither busted), it's a tie. Your bet is returned to your balance. (Pays 1x your bet back)

### Balance and Betting:

* You start with a balance of 100.

* Winning a hand doubles your bet and adds it to your balance.

* Losing a hand means you lose your bet.

* A tie returns your bet.

* If your balance drops to 0, you can start a new game to reset your balance to 100.

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
