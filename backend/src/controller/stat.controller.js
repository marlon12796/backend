import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
	try {
		const [totalSongs, totalAlbums, totalUsers, songArtists, albumArtists] = await Promise.all([
			Song.countDocuments(),
			Album.countDocuments(),
			User.countDocuments(),
			Song.distinct("artist"),
			Album.distinct("artist"),
		]);

		const uniqueArtists = new Set([...songArtists, ...albumArtists]);

		res.status(200).json({
			totalAlbums,
			totalSongs,
			totalUsers,
			totalArtists: uniqueArtists.size,
		});
	} catch (error) {
		next(error);
	}
};
