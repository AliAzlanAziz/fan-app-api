export class HeartsModel {
  pending: number;
  approved: number;
  rejected: number;

  constructor(pending: number, approved: number, rejected: number) {
    this.pending = pending;
    this.approved = approved;
    this.rejected = rejected;
  }
}
