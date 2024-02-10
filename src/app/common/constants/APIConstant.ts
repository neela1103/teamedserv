export enum APIConstant {
  LOGIN = '/login',
  IS_USERNAME_AVAILABLE = 'is-username-available',
  // customers
  GET_CUSTOMERS = 'customers',
  ADD_CUSTOMER = 'customer/add',
  DELETE_CUSTOMER = 'customer/delete',
  EDIT_CUSTOMER = 'customer/edit',
  GET_TIMEZONE = 'timezones',
  // medical-teams
  GET_MEDICALTEAMS = 'medical-teams',
  ADD_MEDICALTEAM = 'medical-team/add',
  DELETE_MEDICALTEAM = 'medical-team/delete',
  EDIT_MEDICALTEAM = 'medical-team/edit',
  GET_MEDICAL_FIELD_DATA = 'getProfessionalFieldData',
  GET_MEDICALTEAM_BY_ID = 'medical/get-medical-team-by-id',

  // users
  GET_USERS = 'users',
  ADD_USER = 'user/add',
  EDIT_USER = 'user/edit',
  DELETE_USER = 'user/delete',

  // team-board
  FILTER_MEDICAL_TEAM = 'medical/filter-medical-team',
}
