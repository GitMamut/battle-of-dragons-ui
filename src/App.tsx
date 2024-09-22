import { useEffect, useState } from "react";
import "./App.css";
import FighterBox from "./components/FighterBox";
import FightersSelect from "./components/FightersSelect";
import { continueFight, startFight } from "./api/fight";
import { getDragonsFromTheServer as useFetchingDragons } from "./api/dragons";
import SmallMessages from "./components/SmallMessages";

//this definitly needs some clean-up and separation of logic from presentation layer
//the smallMessage should be displayed with damage taken
//some more graphical fireworks would be nice, if I had more time
//also, error handling is missing, testing, I know they are missing, but I am out of time
function App() {
  const [fighters, setFighters] = useFetchingDragons();
  const [mainMessage, setMainMessage] = useState("Choose your fighters!");
  const [smallMessages, setSmallMessages] = useState<string[]>([]);
  const [selectedFighters, setSelectedFighters] = useState<string[]>(["", ""]);
  const [fightersHealth, setFightersHealth] = useState<number[]>([100, 100]);
  const [fightId, setFightId] = useState<string | null>(null);

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
    if (fightersHealth.includes(0)) {
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
        setSmallMessages([...fightData.smallMessages, ...smallMessages]);
        console.log(fightData);
      }
      //TODO add error handling
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
      <SmallMessages
        messages={smallMessages}
        capitilizeFirst={fightersHealth.includes(0)}
      />
    </>
  );
}

export default App;
