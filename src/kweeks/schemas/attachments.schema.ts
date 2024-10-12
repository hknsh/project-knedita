export const AttachmentsSchema = {
	required: true,
	schema: {
		type: "object",
		properties: {
			content: {
				type: "string",
			},
			attachments: {
				type: "array",
				items: {
					type: "string",
					format: "binary",
				},
			},
		},
	},
};
