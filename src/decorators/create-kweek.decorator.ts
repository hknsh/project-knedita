// Thanks sandeepsuvit @ https://github.com/nestjs/swagger/issues/417
// TODO: Remove this decorator.

import { ApiBody } from "@nestjs/swagger";

export const ApiCreateKweek =
	(fieldName: string): MethodDecorator =>
	// biome-ignore lint/suspicious/noExplicitAny: idk typing for target
	(target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		ApiBody({
			required: true,
			schema: {
				type: "object",
				properties: {
					content: {
						type: "string",
					},
					[fieldName]: {
						type: "array",
						items: {
							type: "string",
							format: "binary",
						},
					},
				},
			},
		})(target, propertyKey, descriptor);
	};
