interface FighterBoxProps {
  name: string;
}

function FighterBox({ fighter, health }: FighterBoxProps) {
  return (
    <>
      <h2>{fighter.name}</h2>
      <p>Strenght: {fighter.strength}</p>
      <p>Size: {fighter.size}</p>
      <p>Type: {fighter.type}</p>
      <p>Health: {health}</p>
    </>
  );
}

export default FighterBox;
