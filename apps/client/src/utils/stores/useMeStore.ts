import { JwtPayloadUser } from "shared";
import { create } from "zustand";

type MeStoreState = {
  me: JwtPayloadUser | null;
  setMe: (me: JwtPayloadUser | null) => void;
};

export const useMeStore = create<MeStoreState>((set) => ({
  me: null,
  setMe: (me) => set({ me }),
}));
