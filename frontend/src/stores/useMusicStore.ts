import { axiosInstance } from '@/lib/axios';
import { Album, Song, Stats } from '@/types';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface MusicStore {
	songs: Song[];
	albums: Album[];
	isLoading: boolean;
	error: string | null;
	currentAlbum: Album | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;
	setSongs: (songs: Song[]) => void;
	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<void>;
	fetchFeaturedSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
	fetchStats: () => Promise<void>;
	fetchSongs: () => Promise<void>;
	deleteSong: (id: string) => Promise<void>;
	deleteAlbum: (id: string) => Promise<void>;
}

// Función reutilizable para manejar peticiones
const handleRequest = async <T>(
	request: () => Promise<T>,
	setState: (data: T) => void,
	set: (partial: Partial<MusicStore>) => void
) => {
	set({ isLoading: true, error: null });
	try {
		const response = await request();
		setState(response);
	} catch (error: unknown) {
		if (error instanceof AxiosError && error.response?.data?.message) {
			set({ error: error.response.data.message });
			toast.error(error.response.data.message);
		} else {
			set({ error: 'An error occurred' });
			toast.error('An error occurred');
		}
	} finally {
		set({ isLoading: false });
	}
};

export const useMusicStore = create<MusicStore>((set) => ({
	albums: [],
	songs: [],
	isLoading: false,
	error: null,
	currentAlbum: null,
	madeForYouSongs: [],
	featuredSongs: [],
	trendingSongs: [],
	stats: { totalSongs: 0, totalAlbums: 0, totalUsers: 0, totalArtists: 0 },
	setSongs: (songs: Song[]) => {
		set({ songs });
	},
	deleteSong: async (id) => {
		await handleRequest(
			() => axiosInstance.delete(`/admin/songs/${id}`),
			() => {
				set((state) => ({
					songs: state.songs.filter((song) => song._id !== id),
				}));
				toast.success('Song deleted successfully');
			},
			set
		);
	},

	deleteAlbum: async (id) => {
		await handleRequest(
			() => axiosInstance.delete(`/admin/albums/${id}`),
			() => {
				set((state) => ({
					albums: state.albums.filter((album) => album._id !== id),
					songs: state.songs.map((song) => (song.albumId === id ? { ...song, album: null } : song)),
				}));
				toast.success('Album deleted successfully');
			},
			set
		);
	},

	fetchSongs: async () =>
		handleRequest(
			() => axiosInstance.get('/songs'),
			(res) => set({ songs: res.data }),
			set
		),

	fetchStats: async () =>
		handleRequest(
			() => axiosInstance.get('/stats'),
			(res) => set({ stats: res.data }),
			set
		),

	fetchAlbums: async () =>
		handleRequest(
			() => axiosInstance.get('/albums'),
			(res) => set({ albums: res.data }),
			set
		),

	fetchAlbumById: async (id) =>
		handleRequest(
			() => axiosInstance.get(`/albums/${id}`),
			(res) => set({ currentAlbum: res.data }),
			set
		),

	fetchFeaturedSongs: async () =>
		handleRequest(
			() => axiosInstance.get('/songs/featured'),
			(res) => set({ featuredSongs: res.data }),
			set
		),

	fetchMadeForYouSongs: async () =>
		handleRequest(
			() => axiosInstance.get('/songs/made-for-you'),
			(res) => set({ madeForYouSongs: res.data }),
			set
		),

	fetchTrendingSongs: async () =>
		handleRequest(
			() => axiosInstance.get('/songs/trending'),
			(res) => set({ trendingSongs: res.data }),
			set
		),
}));
