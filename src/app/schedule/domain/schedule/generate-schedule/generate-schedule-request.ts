export class GenerateScheduleRequest {

  constructor(
    public startDate: Date,
    public days: number,
    public timeInterval: number,
    public startTime: Date = new Date(0, 0, 0, 10, 0),
    public endTime: Date = new Date(0, 0, 0, 20, 0)
  ) {
  }
}
