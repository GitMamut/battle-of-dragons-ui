export const getDragons = async (): Promise<[]> => {
  try {
    const response = await fetch("http://localhost:3000/dragons");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fighters:", error);
    return [];
  }
};
