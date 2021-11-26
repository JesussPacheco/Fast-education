import { Column } from 'typeorm';

export class FeedbackNameTypeorm {
  @Column('varchar', { name: 'name', length: 400, nullable: false })
  public description: string;
  private constructor(name: string) {
    this.description = name;
  }
  public static from(name): FeedbackNameTypeorm {
    return new FeedbackNameTypeorm(name);
  }
}
