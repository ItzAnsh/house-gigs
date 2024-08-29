export type Gigster = {
  userId: string;
  slotTimings: string[];
  packages: string[];
  available: boolean;
  gig: string;
};

export type SlotAdd = {
  start: Date
  end: Date
}