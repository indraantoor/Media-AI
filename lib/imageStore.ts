import { useContext } from 'react';
import { useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import { createZustandContext } from './zustandContext';

type State = {
  generating: boolean;
  // eslint-disable-next-line no-unused-vars
  setGenerating: (generating: boolean) => void;
};

const getStore = (initialState: { generating: boolean }) => {
  return createStore<State>()(
    persist(
      (set) => ({
        generating: initialState.generating,
        setGenerating: (generating) => set({ generating }),
      }),
      { name: 'images-store', storage: createJSONStorage(() => localStorage) }
    )
  );
};

export const ImageStore = createZustandContext(getStore);

// eslint-disable-next-line no-unused-vars
export function useImageStore<T>(selector: (state: State) => T) {
  const store = useContext(ImageStore.Context);

  if (!store) {
    throw new Error('Missing image store provider');
  }

  return useStore(store, selector);
}
