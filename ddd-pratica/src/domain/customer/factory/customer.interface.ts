export default interface CustomerInterface {
  get id(): string;
  get name(): string;
  get address(): string;
  get active(): boolean;
  get rewardPoints(): number;
}