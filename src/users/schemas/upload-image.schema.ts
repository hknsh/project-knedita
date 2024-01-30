const UploadImageSchema = {
  required: true,
  schema: {
    type: "object",
    properties: {
      image: {
        type: "string",
        format: "binary",
      },
    },
  },
};

export default UploadImageSchema;
