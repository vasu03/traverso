# Traverso

**Ever wondered how traversal algorithms work? 🤔 Traverso makes the invisible 👻 become visible 👁️.**

Traverso is a modern, interactive web application that visually demonstrates how traversal or path-finding algorithms operate on a uni-weighted grid. Designed for students, educators, and developers, Traverso provides intuitive, animated visualizations of path-finding and traversal techniques, making complex concepts accessible and engaging.

---

## 🚀 Features

- **Grid-Based Visualizations**: Algorithms are visualized on a uni-weighted 2D grid, not on abstract data structures.
- **Fixed Start/Stop Tiles**: The entry and exit points are fixed, ensuring consistent experiment conditions (dynamic placement of start/stop points might be implemented in near future).
- **Maze Generation**: Users can either manually draw walls or utilize pre-defined maze-generation algorithms for challenging scenarios.
- **Interactive Animations**: Each algorithm’s step is brought to life through smooth, responsive animations, providing a clear sense of progress.
- **Responsive UI**: Built with React, Vite, and TailwindCSS for a seamless experience on any device.
- **TypeScript Reliability**: Strict type safety guarantees a robust codebase and developer experience.

---

## 📸 Demo

![Traverso Demo](./public/demo-video.gif)

---

## 🛠️ Built With

[<img src="https://skillicons.dev/icons?i=react" height="28" alt="reactjs" />](https://react.dev/)
<img width="12" />
[<img src="https://skillicons.dev/icons?i=vite" height="28" alt="vite"  />](https://vitejs.dev/)
<img width="12" />
[<img src="https://skillicons.dev/icons?i=tailwind" height="28" alt="tailwindcss"  />](https://tailwindcss.com/)
<img width="12" />
[<img src="https://skillicons.dev/icons?i=typescript" height="28" alt="typescript"/>](https://www.typescriptlang.org/)

---

## ⚡ How It Works

1. **Grid & Tiles**: Visualizations take place on a uni-weighted grid. Start and stop tiles are fixed and visible throughout each session.
2. **Maze Creation**: Build your own maze by hand or use built-in maze-generation algorithms.
3. **Run Algorithms**: Watch as traversal or path-finding algorithms animate their progress across the grid, showing how each cell is explored at different visualization speed as per choice.
4. **Animations**: Responsive, visually rich animations highlight the path-finding process and make learning engaging.

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/vasu03/traverso.git
cd traverso
npm install
```

---

## 🚦 Usage

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser to explore Traverso!

---

## 🤝 Contributing

We welcome contributions to enhance Traverso! To get started:

1. **Fork** the official repository [https://github.com/vasu03/traverso](https://github.com/vasu03/traverso).
2. **Clone** your fork locally.
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes and commit: `git commit -m 'Add awesome feature'`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a **Pull Request** on GitHub.

### Development Setup

- Ensure you have **Node.js (v18+)** and **npm** installed.
- This project uses strict TypeScript and for css styling, uses TailwindCSS utility classes.

### Code Quality

- Strictly adhere to the code documentation and formatting structure that has been followed throughout the project to maintain a clean codebase for easy maintanence & upgrades.

---

## 📁 Project Structure

```
.
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable React components
│   ├── hooks/        # Custom hooks
│   ├── contexts/     # React context providers
│   ├── lib/          # Core algorithm logic
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main app component
|   ├── main.tsx      # entry point for application
│   └── index.css     # Global styles
├── index.html        # HTML template
├── .gitignore
├── eslint.config.json
├── tailwind.config.ts
├── postcss.config.mjs
├── vite.config.ts
├── package.json
├── README.md
└── LICENSE
```

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

> _For questions, feedback, or collaboration, please open an issue or reach out via GitHub._
