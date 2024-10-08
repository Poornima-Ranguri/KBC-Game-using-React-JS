# Getting Started with Create React App

# Indroyd Assignment

### Step-by-Step Approach Using React

1. **Initial Setup (Single Page Application using React)**
   - Set up a basic React project.
   - Use React's `useState` and `useEffect` hooks to manage the game state and updates.
   - Create a simple UI to display questions, player names, and answers on both the computer screen and mobile device views.
2. **Game Flow (Questions and Answers)**
   - Prepare a list of questions and answers within your app. This can be hardcoded initially for simplicity.
   - Each question should have multiple options (A, B, C, D) with one correct answer.
3. **Display QR Code**
   - Generate a QR code using a library (e.g., `qrcode.react`) in the main screen component (the computer screen).
   - The QR code will contain the link to the same React application that players can scan on their mobile devices to join the game.
4. **Handling Player Join**
   - When a player scans the QR code, they are redirected to the same app but from a mobile screen.
   - Allow players to enter their names once they join the game through the mobile interface.
   - Store the player’s name in the state once they join, and display it on the main screen.
5. **Question Display on Both Screens**
   - Once players join the game, display the current question and answer options on both the computer and mobile screens.
   - Use React’s conditional rendering to update both screens with the current question and options.
6. **Answer Submission by Players**
   - On the mobile screen, provide an interface where players can select their answer (A, B, C, D).
   - Capture the player’s answer and send it to the main screen (or handle it within the same app if no server is involved).
7. **Answer Validation**
   - When a player submits their answer from the mobile screen, check if the answer matches the correct one.
   - If the answer is correct:
     - Display a congratulatory message on the computer screen along with the player's name.
     - Move to the next question after a short delay.
   - If the answer is incorrect:
     - Send feedback to the player’s mobile screen indicating that the answer is wrong.
8. **Question Progression**
   - Once a player answers correctly, advance to the next question in the list.
   - Update both the computer and mobile screens to reflect the new question.
9. **Ending the Game**
   - When all questions are answered, display a completion message on the main screen.
   - Optionally, show the player who answered the most questions correctly or just a summary of participation.
10. **Final Testing and Polish**
    - Test the flow by running the app on both a computer and a mobile device (using the QR code to join).
    - Ensure the question display, answer submission, and validation work correctly.
    - Refine the UI/UX to ensure smooth transitions between questions and provide clear feedback for both correct and incorrect answers.

---

### Key Considerations

- **State Management**: All game logic, including question handling, player management, and answer validation, will be managed using React’s `useState` or `useReducer` hooks.
- **Single Application for Both Views**: Both the computer and mobile screens will be different views of the same application. React’s component-based structure makes it easy to conditionally render different UIs based on whether the user is on the computer or mobile.
- **QR Code**: The QR code is a simple mechanism to allow mobile players to quickly join the game, making the app more interactive and closer to the real KBC experi
