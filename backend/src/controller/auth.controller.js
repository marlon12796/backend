import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
	try {
		const { id, firstName, lastName, imageUrl } = req.body;

		await User.updateOne(
			{ clerkId: id },
			{
				$setOnInsert: {
					clerkId: id,
					fullName: `${firstName || ""} ${lastName || ""}`.trim(),
					imageUrl
				}
			},
			{ upsert: true }
		);

		res.status(200).json({ success: true });
	} catch (error) {
		console.log("Error in auth callback", error);
		next(error);
	}
};
