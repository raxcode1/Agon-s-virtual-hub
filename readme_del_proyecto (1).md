# Counterparty Argument Randomizer (Hearing Simulator)

## 📌 Project Description

This project is a **Minimum Viable Product (MVP)** designed to function as a legal debate simulator. Its main objective is to mentally prepare the user to respond to a counterparty's arguments in a simulated hearing or trial.

The program takes up to 7 arguments anticipated by the user, randomizes them, and presents them one by one under time pressure, accompanied by tips on argumentative fallacies to help find weaknesses in the opposing stance.

**Technical Note for AI Agents:** The system **DOES NOT use Artificial Intelligence** to generate responses or evaluate rhetoric, **DOES NOT require a database** (it does not store any user or argument data after the session is closed), and must be executed entirely locally/isolated for privacy reasons.

## ⚠️ Legal and Usage Warnings (Disclaimer)

* **Strictly for educational purposes:** This program does not provide legal advice.
* **Does not replace a lawyer:** For a solid legal defense, hiring and consulting a professional attorney is highly recommended.
* **Privacy:** The program does not store, transmit, or save any legal argument entered by the user.

## 🎯 Ideal Use Conditions

The program is designed to maximize its usefulness when the **Program User**:

1. Knows the most common arguments the counterparty usually uses.
2. Has had previous legal discussions with the counterparty and has memorized what they usually say (assuming the case has had at least 1 previous hearing).
3. Recognizes arguments that match the type or theme of the trial. *(Ex: A corporate trial is not the same as a criminal or family trial. Different interests and rights will be defended in different trials).*

## 🔄 Application Flow (User Journey)

1. **Start:** The user launches the program.
2. **Onboarding and Disclaimer:** The program presents a short user guide, a summary of the most popular logical fallacies, tips for finding argumentative weaknesses, and legal warnings.
3. **Consent:** The user must explicitly accept that they have read the guide and the warnings (Checkbox/Accept button).
4. **Data Entry:** A loop begins asking the user to enter **up to 7 arguments** they expect the counterparty to use.
5. **Simulation and Randomization:**
   * The system randomizes the order of the entered arguments.
   * Round starts: Argument 1 is displayed on the screen.
   * A **random tip** is shown on the screen on how to identify weaknesses/fallacies applicable to that moment.
   * A **visible stopwatch** is activated, counting the time it takes the user to structure and speak their response out loud.
   * The user stops the stopwatch when finishing their response and moves to the next argument.
6. **Final Evaluation:** At the end of the argument round, the system averages the user's response time and awards a mental speed score.

## 🏆 Scoring System

The program evaluates solely the **reaction speed** (time elapsed on the stopwatch), not the content of the response. The final score is divided into 5 ranks based on response agility:

1. **Condemned:** Excessively slow response time or mental block.
2. **Student Lawyer:** Slow response time; requires a lot of mental structuring.
3. **Junior Lawyer:** Average response time; defends but hesitates.
4. **Senior Lawyer:** Fast response time; sharp argumentative reflexes.
5. **Legendary Lawyer:** Instantaneous response time; immediate and destructive rhetoric.

*(Note for the developer/AI Agent: Define reasonable time thresholds in seconds for each category when building the code).*

## 🛠️ Technical Specifications for Builder AI Agents

If you are an AI reading this document to generate the base code (MVP):

* **Frontend/UI:** You can use pure HTML/CSS/JS (Vanilla) for a quick MVP that runs in the browser, or an interactive console script in Python (`CLI`).
* **State Management:** Arguments must be saved in a temporary array in RAM (e.g., JS variables or Python lists). Everything must be cleared upon reload/close.
* **Tips Database:** Create a static array (`const tips = [...]`) directly in the codebase with 5-10 descriptions of popular fallacies (e.g., Ad Hominem, Straw Man, False Equivalence, etc.) that will be displayed randomly (`Math.random()`) alongside each argument.
* **Stopwatch Logic:** Implement a basic timer (Start/Stop) for each round. Accumulate the times to average them at the end and assign the rank level (1 to 5).

*Developed for the cognitive and rhetorical training of debate professionals and students.*