import Hero from "./components/Hero";
import Demo from "./components/Demo";

function App() {
  // delete length from localstorage every time app restarts
  localStorage.removeItem("length");
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Demo />
      </div>
    </main>
  );
}

export default App;
