export class RegForm {
  name: string;
  email: string;
  address: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class RegFormStep2 {
  date: Date;
  contact : number;
  gender : Gender;
  interested: boolean;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

enum Gender { Male, Female, Other }