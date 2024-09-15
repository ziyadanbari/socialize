export class ActionError extends Error {
  public actionError: string;

  constructor(message: string) {
    super(message);
    this.name = "ActionError"; // Set the error name
    this.actionError = message; // Custom property

    // Set the prototype explicitly for proper instanceof checks in TypeScript
    Object.setPrototypeOf(this, ActionError.prototype);
  }
}
