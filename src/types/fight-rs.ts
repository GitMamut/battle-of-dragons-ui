export type FightResponse = {
  message: string;
  smallMessages: string[];
  fighter1: {
    newHealth: number;
  };
  fighter2: {
    newHealth: number;
  };
};
