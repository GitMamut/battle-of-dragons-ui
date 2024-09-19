import { useEffect, useState } from "react";
import "./App.css";
import FighterBox from "./components/FighterBox";
import FightersSelect from "./components/FightersSelect";
import { continueFight, startFight } from "./api/fight";
import { getDragons } from "./api/dragons";

//this definitly needs some clean-up and separation of logic from presentation layer
//the smallMessage should be displayed with damage taken
//some more graphical fireworks would be nice, if I had more time
//also, error handling is missing, testing, I know they are missing, but I am out of time
function App() {
  const [fighters, setFighters] = useState([]);
  const [mainMessage, setMainMessage] = useState("Choose your fighters!");
  const [smallMessages, setSmallMessages] = useState<string[]>([]);
  const [selectedFighters, setSelectedFighters] = useState<string[]>(["", ""]);
  const [fightersHealth, setFightersHealth] = useState<number[]>([100, 100]);
  const [fightId, setFightId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDragons = async () => {
      const data = await getDragons();
      setFighters(data);
    };
    fetchDragons();
  }, []);

  useEffect(() => {
    if (selectedFighters[0] && selectedFighters[1]) {
      setMainMessage("Fight!");
    }
  }, [selectedFighters]);

  const handleSelectFighter = (index: number) => {
    return (dragonId: string) => {
      const newSelectedFighters = [...selectedFighters];
      newSelectedFighters[index] = dragonId;
      setSelectedFighters(newSelectedFighters);
    };
  };

  const handleFight = async () => {
    if (fightersHealth.some((health) => health < 1)) {
      resetFighters();
      return;
    }

    let currentFightId = fightId;
    if (!fightId) {
      currentFightId = await startFight(
        Number(selectedFighters[0]),
        Number(selectedFighters[1])
      );
      setFightId(currentFightId);
    }

    if (currentFightId) {
      const fightData = await continueFight(currentFightId);
      if (fightData) {
        setMainMessage(fightData.message);
        setFightersHealth([
          fightData.fighter1.newHealth,
          fightData.fighter2.newHealth,
        ]);
        setSmallMessages([fightData.message, ...smallMessages]);
        console.log(fightData);
      }
    }
  };

  const resetFighters = () => {
    setSelectedFighters(["", ""]);
    setFightersHealth([100, 100]);
    setMainMessage("Choose your fighters!");
    setSmallMessages([]);
    setFightId(null);
  };

  return (
    <>
      <h1>The BATTLE OF DRAGONS!</h1>
      <button
        onClick={handleFight}
        disabled={!(selectedFighters[0] && selectedFighters[1])}
      >
        {mainMessage}
      </button>
      <div className="fighters-container">
        <div>
          {selectedFighters[0] ? (
            <FighterBox
              fighter={fighters[Number(selectedFighters[0])]}
              health={fightersHealth[0]}
            />
          ) : (
            <FightersSelect
              fighters={fighters}
              onSelectFighter={handleSelectFighter(0)}
            />
          )}
        </div>
        <div>
          {selectedFighters[1] ? (
            <FighterBox
              fighter={fighters[Number(selectedFighters[1])]}
              health={fightersHealth[1]}
            />
          ) : (
            <FightersSelect
              fighters={fighters}
              onSelectFighter={handleSelectFighter(1)}
            />
          )}
        </div>
      </div>
      {smallMessages.map((message, index) => (
        <p className={"small-message" + (index == 0 ? " first" : "")}>
          {message}
        </p>
      ))}
    </>
  );
}

export default App;
