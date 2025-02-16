import { create } from 'zustand';
import { Song } from '@/types';
import { useChatStore } from './useChatStore';

interface PlayerStore {
	currentSong: Song | null;
	isPlaying: boolean;
	queue: Song[];
	currentIndex: number;
	initializeQueue: (songs: Song[]) => void;
	playAlbum: (songs: Song[], startIndex?: number) => void;
	setCurrentSong: (song: Song | null) => void;
	togglePlay: () => void;
	playNext: () => void;
	playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => {
	// Función auxiliar para emitir actividad al socket
	const emitActivity = (activity: string) => {
		const socket = useChatStore.getState().socket;
		if (typeof socket?.auth === 'object') {
			socket.emit('update_activity', {
				userId: socket.auth.userId,
				activity,
			});
		}
	};

	return {
		currentSong: null,
		isPlaying: false,
		queue: [],
		currentIndex: -1,

		// Inicializa la cola de reproducción
		initializeQueue: (songs: Song[]) => {
			set((state) => ({
				queue: songs,
				currentSong: state.currentSong || songs[0],
				currentIndex: state.currentIndex === -1 ? 0 : state.currentIndex,
			}));
		},

		// Reproduce un álbum desde una lista de canciones
		playAlbum: (songs: Song[], startIndex = 0) => {
			if (songs.length === 0) return;

			const song = songs[startIndex];
			emitActivity(`Playing ${song.title} by ${song.artist}`);

			set({
				queue: songs,
				currentSong: song,
				currentIndex: startIndex,
				isPlaying: true,
			});
		},

		// Establece la canción actual
		setCurrentSong: (song: Song | null) => {
			if (!song) return;

			emitActivity(`Playing ${song.title} by ${song.artist}`);

			set((state) => ({
				currentSong: song,
				isPlaying: true,
				currentIndex: state.queue.findIndex((s) => s._id === song._id),
			}));
		},

		// Alterna entre reproducir y pausar
		togglePlay: () => {
			const willStartPlaying = !get().isPlaying;
			const currentSong = get().currentSong;

			if (willStartPlaying && currentSong) {
				emitActivity(`Playing ${currentSong.title} by ${currentSong.artist}`);
			} else {
				emitActivity('Idle');
			}

			set({ isPlaying: willStartPlaying });
		},

		// Reproduce la siguiente canción
		playNext: () => {
			const { currentIndex, queue } = get();
			const nextIndex = currentIndex + 1;

			if (nextIndex < queue.length) {
				const nextSong = queue[nextIndex];
				emitActivity(`Playing ${nextSong.title} by ${nextSong.artist}`);

				set({
					currentSong: nextSong,
					currentIndex: nextIndex,
					isPlaying: true,
				});
			} else {
				emitActivity('Idle');
				set({ isPlaying: false });
			}
		},

		// Reproduce la canción anterior
		playPrevious: () => {
			const { currentIndex, queue } = get();
			const prevIndex = currentIndex - 1;

			if (prevIndex >= 0) {
				const prevSong = queue[prevIndex];
				emitActivity(`Playing ${prevSong.title} by ${prevSong.artist}`);

				set({
					currentSong: prevSong,
					currentIndex: prevIndex,
					isPlaying: true,
				});
			} else {
				emitActivity('Idle');
				set({ isPlaying: false });
			}
		},
	};
});
