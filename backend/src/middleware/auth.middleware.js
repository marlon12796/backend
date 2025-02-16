import { clerkClient, getAuth } from "@clerk/express";


export const requireAdmin = async (req, res, next) => {
	const { userId } = getAuth(req);
	if (!userId) {
		return res.status(401).json({ message: "Unauthorized: No user ID found" });
	}

	try {
		const user = await clerkClient.users.getUser(userId);
		const isAdmin = process.env.ADMIN_EMAIL === user.primaryEmailAddress?.emailAddress;

		if (!isAdmin) {
			return res.status(403).json({ message: "Unauthorized - you must be an admin" });
		}


		next();
	} catch {
		return res.status(500).json({ message: "Error fetching user data" });
	}
};
