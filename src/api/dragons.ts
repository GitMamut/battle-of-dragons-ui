import { useEffect, useState } from "react";

export function getDragonsFromTheServer(): [[], (fighters: []) => void] {
  const [fighters, setFighters] = useState<[]>([]);

  useEffect(() => {
    // use react query or something similar
    const fetchDragons = async () => {
      const data = await getDragons();
      setFighters(data);
    };
    fetchDragons();
  }, []);

  return [fighters, setFighters];
}

const getDragons = async (): Promise<[]> => {
  try {
    const response = await fetch("http://localhost:3000/dragons");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fighters:", error);
    return [];
  }
};
