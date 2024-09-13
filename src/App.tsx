import { useEffect, useState } from "react";
import "./App.css";
import FighterBox from "./components/FighterBox";
import FightersSelect from "./components/FightersSelect";

function App() {
  const [fighters, setFighters] = useState([]);
  const [mainMessage, setMainMessage] = useState("Fight!");
  const [smallMessage, setSmallMessage] = useState("Choose your fighters!");
  const [selectedFighter1, setSelectedFighter1] = useState("");
  const [selectedFighter2, setSelectedFighter2] = useState("");
  const [fighter1Health, setFighter1Health] = useState(100);
  const [fighter2Health, setFighter2Health] = useState(100);

  useEffect(() => {
    fetch("http://localhost:3000/dragons")
      .then((response) => response.json())
      .then((data) => setFighters(data))
      .catch((error) => console.error("Error fetching fighters:", error));
  }, []);

  const handleSelectFighter1 = (id: number) => {
    setSelectedFighter1(id);
  };

  const handleSelectFighter2 = (id: number) => {
    setSelectedFighter2(id);
  };

  const handleFight = () => {
    console.log(`Fighter 1: id: ${selectedFighter1} health: ${fighter1Health}`);
    console.log(`Fighter 2: id: ${selectedFighter2} health: ${fighter2Health}`);

    if (fighter1Health < 1 || fighter2Health < 0) {
      setSelectedFighter1("");
      setSelectedFighter2("");
      setFighter1Health(100);
      setFighter2Health(100);
      setMainMessage("Fight!");
      return;
    }

    const requestBody = {
      fighter1: {
        id: Number(selectedFighter1),
        health: fighter1Health,
      },
      fighter2: {
        id: Number(selectedFighter2),
        health: fighter2Health,
      },
    };

    fetch("http://localhost:3000/fight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setMainMessage(data.message);
        setFighter1Health(data.fighter1.newHealth);
        setFighter2Health(data.fighter2.newHealth);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching fighters:", error));
  };

  return (
    <>
      <h1>The BATTLE OF DRAGONS!</h1>
      {!(selectedFighter1 && selectedFighter2) && <div>{smallMessage}</div>}
      <div className="fighters-container">
        <div>
          {selectedFighter1 ? (
            <FighterBox
              fighter={fighters[selectedFighter1]}
              health={fighter1Health}
            />
          ) : (
            <FightersSelect
              fighters={fighters}
              onSelectFighter={handleSelectFighter1}
            />
          )}
        </div>
        <div>
          {selectedFighter2 ? (
            <FighterBox
              fighter={fighters[selectedFighter2]}
              health={fighter2Health}
            />
          ) : (
            <FightersSelect
              fighters={fighters}
              onSelectFighter={handleSelectFighter2}
            />
          )}
        </div>
      </div>
      <button
        disabled={!(selectedFighter1 && selectedFighter2)}
        onClick={handleFight}
      >
        {mainMessage}
      </button>
    </>
  );
}

export default App;
