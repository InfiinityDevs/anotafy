export default class FieldError {
    public field: string | null = null;
    public error: string | null = null;

    constructor(field?: string, error?: string) {
        if (field) {
            this.field = field;
        }
        if (error) {
            this.error = error;
        }
    }
};
