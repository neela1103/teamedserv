import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-team-invitation',
  standalone: false,
  templateUrl: './team-invitation.component.html',
  styleUrl: './team-invitation.component.scss',
})
export class TeamInvitationComponent implements OnInit {
  constructor(private _authService: AuthService) {
    this._authService.hideHeader();
  }
  ngOnInit() {}

  public fetchInvitationContent(){

  }
}
