import { EntityError } from "../../helpers/errors/domain_errors";

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  constructor(public props: UserProps) {
    this.validateProps(props);
  }

  private validateProps(props: UserProps) {
    if (!User.isValidEmail(props.email)) {
      throw new EntityError("Invalid email");
    }

    if (!User.isValidName(props.name)) {
      throw new EntityError("Invalid name");
    }

    if (!User.isValidPassword(props.password)) {
      throw new EntityError("Invalid password");
    }
  }

  get userId(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }


  setName(name: string): void {
    if (!User.isValidName(name)) {
      throw new EntityError("Invalid name");
    }
    this.props.name = name;
  }

  setEmail(email: string): void {
    if (!User.isValidEmail(email)) {
      throw new EntityError("Invalid email");
    }
    this.props.email = email;
  }

  setPassword(password: string): void {
    if (!User.isValidPassword(password)) {
      throw new EntityError("Invalid password");
    }
    this.props.password = password;
  }


  static isValidName(name: string): boolean {
    name = name.trim();
    return name.length >= 2 && name.length <= 130;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /\S+@santander\S+\.\S+/;
    return emailRegex.test(email);
  }

  static isValidPassword(password: string): boolean {
    return typeof password === "string" && password.length >= 8;
  }
}
