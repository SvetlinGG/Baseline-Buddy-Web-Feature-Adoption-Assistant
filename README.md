
# Baseline Buddy -- Web Feature Adoption Assistant

⚡ **Baseline Buddy** helps web developers adopt modern web features
faster and with confidence.\
It integrates **Baseline data** directly into **VS Code** and also
offers a web demo for experimentation.

------------------------------------------------------------------------

## 🚀 Features

-   **VS Code Extension**
    -   Automatically warns when using modern/non-baseline HTML, CSS, or
        JS features.\
    -   Displays diagnostics in the **Problems panel** with direct links
        to MDN docs.\
    -   Supports **HTML `<dialog>`**, **CSS `:has()`**, and **JS View
        Transitions API** (easily extendable).\
    -   User setting for **severity** (`warning`, `info`, `error`)
        configurable in VS Code Settings.
-   **Web Demo UI (Angular + Node.js)**
    -   Textarea for code input.\
    -   Dropdown to select language (HTML/CSS/JS).\
    -   **Analyze** button → returns diagnostics with MDN links.\
    -   Useful for hackathon judges and users who don't have VS Code.
-   **Core Analyzer Package**
    -   Shared module (`@baseline-buddy/core-analyzer`) used by both the
        extension and the web demo.\
    -   Contains Baseline map (`baseline-map.json`) + analysis
        functions.

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   **Frontend:** Angular 18 (Signals, HttpClient)\
-   **Backend:** Node.js + Express\
-   **Editor Integration:** VS Code Extension API\
-   **Core:** JavaScript package with Baseline map

------------------------------------------------------------------------

## 📥 Installation

### VS Code Extension (Dev mode)

1.  Clone the repo:

    ``` bash
    git clone https://github.com/your-org/baseline-buddy.git
    cd baseline-buddy/packages/vscode-extension
    npm install
    ```

2.  Open `packages/vscode-extension` in VS Code.\

3.  Press **F5** → opens *Extension Development Host*.\

4.  Open an HTML/CSS/JS file → see diagnostics in the Problems panel.

### Web Demo (Angular UI)

1.  Install dependencies:

    ``` bash
    cd baseline-buddy/frontend
    npm install
    ng serve
    ```

2.  Start the backend:

    ``` bash
    cd ../backend
    npm install
    npm run dev
    ```

3.  Open <http://localhost:4200> in your browser.

------------------------------------------------------------------------

## 📖 Usage Examples

### HTML

\`\`\`html `<dialog>`{=html}Test`</dialog>`{=html} \`\`\` ➡️ Warning: ⚠️
Found `<dialog>` -- Baseline: 2023 →
[Docs](https://developer.mozilla.org/docs/Web/HTML/Element/dialog)

### CSS

\`\`\`css article:has(img) { border: 1px solid red; } \`\`\` ➡️ Warning:
⚠️ Found `:has()` -- Baseline: 2024 →
[Docs](https://developer.mozilla.org/docs/Web/CSS/:has)

### JS

\`\`\`js document.startViewTransition(() =\> {
console.log("Transition!"); }); \`\`\` ➡️ Warning: ⚠️ Found View
Transitions API -- Baseline: 2024 →
[Docs](https://developer.mozilla.org/docs/Web/API/Document/startViewTransition)

------------------------------------------------------------------------

## 🎥 Demo Video

[▶ Watch Demo on YouTube](https://your-video-link) *(3+ minutes)*

------------------------------------------------------------------------

## 🌐 Live Demo

-   **Web UI (Angular demo):** <https://your-demo-link.netlify.app>

------------------------------------------------------------------------

## 📂 Repository

[GitHub Repo](https://github.com/your-org/baseline-buddy)

------------------------------------------------------------------------

## 📜 License

[MIT License](./LICENSE)

