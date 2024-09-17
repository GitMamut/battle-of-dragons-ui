import { Fighter } from "../interfaces/Fighter";

interface FightersSelectProps {
  fighters: Fighter[];
  onSelectFighter: (fighterId: string) => void;
}

function FightersSelect({ fighters, onSelectFighter }: FightersSelectProps) {
  return (
    <select
      value={""}
      onChange={(e) => {
        onSelectFighter(e.target.value);
      }}
    >
      <option value="">Select Fighter</option>
      {fighters.map((fighter) => (
        <option key={fighter.name} value={fighter.id}>
          {fighter.name}
        </option>
      ))}
    </select>
  );
}

export default FightersSelect;
