export const startFight = async (
  fighter1Id: number,
  fighter2Id: number
): Promise<string | null> => {
  try {
    const response = await fetch("http://localhost:3000/fight/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fighter1Id, fighter2Id }),
    });
    const data = await response.json();
    return data.newFightId;
  } catch (error) {
    console.error("Error starting fight:", error);
    return null;
  }
};

export const continueFight = async (
  fightId: string
): Promise<
  | {
      message: string;
      fighter1: { newHealth: number };
      fighter2: { newHealth: number };
    }
  | undefined
> => {
  try {
    const response = await fetch(
      `http://localhost:3000/fight/continue/${fightId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error continuing fight:", error);
    return undefined;
  }
};
