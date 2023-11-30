import { Game } from "./pages/game";
import { GlobalContextProvider } from "./context/GlobalContext";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <GlobalContextProvider>
        <Game />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
