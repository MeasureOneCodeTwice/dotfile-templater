export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
  }

  static fromError(error: unknown): ApplicationError {
    let errorMessage: string;
    if (error instanceof Error) errorMessage = error.message;
    else errorMessage = "unknown cause";

    return new ApplicationError(errorMessage);
  }

  annotate(annotation: string): this {
    this.message = `${annotation}: ${this.message}`;
    return this;
  }
}
