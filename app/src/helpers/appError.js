export default class AppError extends Error {
	constructor(message, info) {
		super(message);
		this.name="AppError";
		Object.entries(info).forEach(([key, value]) => {
			this[key] = value;
		});
	}
}