import { create } from "zustand";

export type PlayerSide = "left" | "right";

export type TrackPlayerState = "stopped" | "playing" | "paused";

export interface TrackState {
  id: string; // YouTube video ID (11 chars)
  volume: number; // 0..1
  muted: boolean;
  state: TrackPlayerState;
}

export interface LibraryItem {
  id: string;
  url: string;
  title: string;
  author: string;
  thumbnail: string;
}

export interface ControlsState {
  crossfader: number; // 0..1
}

interface SessionState {
  library: LibraryItem[];
  players: Record<PlayerSide, TrackState>;
  controls: ControlsState;

  // actions
  addToLibrary: (item: LibraryItem) => void;
  setTrack: (side: PlayerSide, id: string) => void;
  setVolume: (side: PlayerSide, v: number) => void;
  toggleMute: (side: PlayerSide) => void;
  setPlayerState: (side: PlayerSide, s: TrackPlayerState) => void;
  setCrossfader: (v: number) => void;
}

const defaultTrack: TrackState = {
  id: "N87E3Kz3Hmo",
  volume: 0.5,
  muted: false,
  state: "stopped",
};

export const useSessionStore = create<SessionState>((set) => ({
  library: [],
  players: { left: { ...defaultTrack }, right: { ...defaultTrack } },
  controls: { crossfader: 0.5 },

  addToLibrary: (item) =>
    set((s) => ({ library: [...s.library, item] })),

  setTrack: (side, id) =>
    set((s) => ({ players: { ...s.players, [side]: { ...s.players[side], id } } })),

  setVolume: (side, volume) =>
    set((s) => ({ players: { ...s.players, [side]: { ...s.players[side], volume } } })),

  toggleMute: (side) =>
    set((s) => ({ players: { ...s.players, [side]: { ...s.players[side], muted: !s.players[side].muted } } })),

  setPlayerState: (side, state) =>
    set((s) => ({ players: { ...s.players, [side]: { ...s.players[side], state } } })),

  setCrossfader: (crossfader) => set(() => ({ controls: { crossfader } })),
}));
