import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
	try {
		const songs = await Song.find().sort({ createdAt: -1 });
		res.json(songs);
	} catch (error) {
		next(error);
	}
};

const getRandomSongs = async (size) => {
	return await Song.aggregate([
		{ $sample: { size } },
		{
			$project: {
				_id: 1,
				title: 1,
				artist: 1,
				imageUrl: 1,
				audioUrl: 1,
			},
		},
	]);
};

export const getFeaturedSongs = async (req, res, next) => {
	try {
		const songs = await getRandomSongs(6);
		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getMadeForYouSongs = async (req, res, next) => {
	try {
		const songs = await getRandomSongs(4);
		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getTrendingSongs = async (req, res, next) => {
	try {
		const songs = await getRandomSongs(4);
		res.json(songs);
	} catch (error) {
		next(error);
	}
};
