import "./App.css";
import CardFrontAndBackContainer from "./components/CardFrontAndBackContainer";
import { CardInputProvider } from "./context/CardInputContext";

function App() {
  return (
    <CardInputProvider>
      <div className="App">
        <CardFrontAndBackContainer />
      </div>
    </CardInputProvider>
  );
}

export default App;
