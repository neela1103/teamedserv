import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/services/api/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { GoogleService } from '../shared/services/google/google.service';
import { TeamBoardType } from '../common/constants/AppEnum';
import { APIConstant } from '../common/constants/APIConstant';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TeamBoardModel } from '../common/models/TeamBoardModel';
import { MapsAPILoader } from '@agm/core';
import { TeamBoardMapDataModel } from '../common/models/TeamBoardMapDataModel';

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
  public address = [
    'Thane, Maharashtra, India',
    'C2/403, HDIL Residency park Phase 1, Virar West',
    'New York, NY, USA',
  ];
  public mapUrl!: SafeResourceUrl;
  latitude = 51.678418;
  longitude = 7.809007;
  // latitude = 0; // Set your initial latitude
  // longitude = 0; // Set your initial longitude
  zoom = 2; // Set the initial zoom level
  public markers!: TeamBoardMapDataModel[];
  selectedMarker: TeamBoardMapDataModel | null = null;

  teamBoardForm = this.fb.group({
    boardType: TeamBoardType.TEAM,
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
    private _googleService: GoogleService,
    private mapsAPILoader: MapsAPILoader
  ) {}

  ngOnInit() {
    this.getFieldData();
  }

  geocodeAddresses() {
    const geocoder = new google.maps.Geocoder();
    for (const marker of this.markers) {
      geocoder.geocode(
        { address: marker.address },
        (results: any, status: any) => {
          if (status === 'OK') {
            const location = results[0].geometry.location;
            marker.lat = location.lat();
            marker.lng = location.lng();
          } else {
            console.error(
              'Geocode was not successful for the following reason:',
              status
            );
          }
        }
      );
    }
  }

  markerMouseOver(marker: TeamBoardMapDataModel) {
    this.selectedMarker = marker;
  }

  markerMouseOut() {
    this.selectedMarker = null;
  }

  public viewMore(marker: any) {
    this.router.navigate(['team-board/medical-team'], {
      state: { medicalId: marker.pid },
    });
  }
  public setBoardType(type: TeamBoardType) {
    if (this.teamBoardForm.get('boardType')?.value !== type) {
      this.teamBoardForm.patchValue({ boardType: type });
    }
  }

  getMapUrl() {
    const californiaCenter = '36.7783,-119.4179'; // Latitude, Longitude of California

    const zoomLevel = 6;

    // Construct the URL with the specified parameters
    const baseUrl = `https://www.google.com/maps/embed/v1/view?key=${this.apiKey}`;
    const queryParams = `&center=${californiaCenter}&zoom=${zoomLevel}`;
    const url = `${baseUrl}${queryParams}`;

    // Sanitize and return the URL
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  navigateToView() {
    this.router.navigate(['/team-board/medical-team']);
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
        boardType: this.teamBoardForm.value.boardType || TeamBoardType.TEAM,
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
              // console.log(res.message);
              // this.mapUrl = this.getMapUrls(res.data);
              this.markers = res.data as TeamBoardMapDataModel[];
              this.mapsAPILoader.load().then(() => {
                this.geocodeAddresses();
              });
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
