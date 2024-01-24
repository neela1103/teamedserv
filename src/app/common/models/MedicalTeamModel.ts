import { UserTypeConstant } from '../constants/UserTypeConstant';

export class MedicalTeamModel {
  [key: string]: any;
  public pid!: number;
  public customer_id: number;
  public first_name: string;
  public last_name: string;
  public describe: string;
  public email: string;
  public profession: string;
  public ethnicity: string;
  public languages: string;
  public county: string;
  public service_area: string;
  public phone: string;
  public address: string;
  public internal_notes: string;

  constructor() {
    this.customer_id = 0;
    this.first_name = '';
    this.last_name = '';
    this.describe = '';
    this.email = '';
    this.profession = '';
    this.ethnicity = '';
    this.languages = '';
    this.county = '';
    this.service_area = '';
    this.phone = '';
    this.address = '';
    this.internal_notes = '';
  }
}
