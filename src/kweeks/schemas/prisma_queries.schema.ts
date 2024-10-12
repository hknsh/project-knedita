export const selectUser = {
	select: {
		displayName: true,
		username: true,
		profileImage: true,
	},
};

const selectReplies = {
	select: {
		id: true,
		content: true,
		parentId: true,
		attachments: true,
		createdAt: true,
		updatedAt: true,
		user: selectUser,
	},
};

export const selectCommentsWithReplies = {
	id: true,
	content: true,
	kweekId: true,
	attachments: true,
	createdAt: true,
	updatedAt: true,
	user: selectUser,
	_count: {
		select: { replies: true, likes: true },
	},
	replies: {
		...selectReplies,
	},
};

export const selectComments = {
	select: {
		id: true,
		content: true,
		kweekId: true,
		attachments: true,
		createdAt: true,
		updatedAt: true,
		user: selectUser,
		_count: {
			select: { replies: true, likes: true },
		},
	},
};
