interface FightersSelectProps {
  fighters: [];
}

function FightersSelect({ fighters, onSelectFighter }: FightersSelectProps) {
  return (
    <select
      value={""}
      onChange={(e) => {
        onSelectFighter(e.target.value);
        console.log(e.target.value);
      }}
    >
      <option value="">Select Fighter</option>
      {fighters.map((fighter, index) => (
        <option key={fighter.name} value={fighter.id}>
          {fighter.name}
        </option>
      ))}
    </select>
  );
}

export default FightersSelect;
