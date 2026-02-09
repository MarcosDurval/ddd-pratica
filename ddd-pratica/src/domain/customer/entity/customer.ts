// uma entidade é algo unico no sistema, por exemplo, um cliente
// Entity
// -customer.ts / regras de negocio
// Complexidade acidental
// Infra
// -Entity / Model / Repository
// -- customer.ts / get e set / db

import Address from "./value-object/address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _active: boolean = false;
  private _address: Address | null = null;
  private _rewardPoints: number = 0;
  
  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.toValidate();
  }

  toValidate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  canActivate() {
    if (this._address === null) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }
  changeAddress(address: Address) {
    this._address = address;
  }

  getAddress(): string | null {
    if (this._address === null) {
      return null;
    }
    return this._address.toString();
  }

  get id(): string {
    return this._id;
  } 
  
  get name(): string {
    return this._name;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get Address(): Address | null {
    return this._address;
  }
  
  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeName(name: string) { 
    this._name = name;
    this.toValidate();
  }
}