import {PortfolioDto} from './portfolio-dto';

export class UserPortfolioDto {
  public username: string;
  public email: string;
  public portfolio: PortfolioDto;

  constructor() {
    this.username = '';
    this.email = '';
    this.portfolio = null;
  }
}