import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/services/api/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { GoogleService } from '../shared/services/google/google.service';
import { TeamBoardType } from '../common/constants/AppEnum';
import { APIConstant } from '../common/constants/APIConstant';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { TeamBoardModel } from '../common/models/TeamBoardModel';

@Component({
  selector: 'app-team-board',
  templateUrl: './team-board.component.html',
  styleUrls: ['./team-board.component.scss'],
})
export class TeamBoardComponent implements OnInit {
  public showSpinner: Boolean = false;
  public TeamBoardType = TeamBoardType;
  public fieldData: any;
  public apiKey = environment.googleMapsApiKey;

  teamBoardForm = this.fb.group({
    board_type: TeamBoardType.TEAM,
    language: [],
    county: [],
    profession: [],
    service_area: [],
  });

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService,
    private _googleService: GoogleService
  ) {}

  ngOnInit() {
    this.getFieldData();
  }

  public setBoardType(type: TeamBoardType) {
    if (this.teamBoardForm.get('board_type')?.value !== type) {
      this.teamBoardForm.patchValue({ board_type: type });
    }
  }

  getMapUrl() {
    // const url = `https://www.google.com/maps/embed/v1/view?key=${this.apiKey}&center=0,0&zoom=15`;
    // return this.sanitizer.bypassSecurityTrustResourceUrl(url);

    const californiaCenter = "36.7783,-119.4179"; // Latitude, Longitude of California

  // Specify the zoom level
  const zoomLevel = 6;

  // Construct the URL with the specified parameters
  const baseUrl = `https://www.google.com/maps/embed/v1/view?key=${this.apiKey}`;
  const queryParams = `&center=${californiaCenter}&zoom=${zoomLevel}`;
  const url = `${baseUrl}${queryParams}`;

  // Sanitize and return the URL
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public getFieldData() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_MEDICAL_FIELD_DATA).subscribe(
      (res: any) => {
        if (res) {
          this.fieldData = res;
        }
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
        this.showSpinner = false;
      }
    );
  }

  public onSubmit() {
    if (this.teamBoardForm.valid) {
      const formModel: TeamBoardModel = {
        board_type: this.teamBoardForm.value.board_type || TeamBoardType.TEAM,
        language: this.teamBoardForm.value.language || [],
        county: this.teamBoardForm.value.county || [],
        profession: this.teamBoardForm.value.profession || [],
        service_area: this.teamBoardForm.value.service_area || [],
      };
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this.showSpinner = true;

      this._apiService
        .post(APIConstant.FILTER_MEDICAL_TEAM, formData)
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              console.log(res.message);
              this.showSpinner = false;
            } else {
              this.showSpinner = false;
              console.log(res.message);
            }
          },
          (error) => {
            console.log(error);
            this.showSpinner = false;
          }
        );
    }
  }
}
