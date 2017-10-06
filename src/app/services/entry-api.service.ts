import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntryInfo } from '../interfaces/entry-info';
import { environment } from '../../environments/environment';

@Injectable()
export class EntryApiService {

  baseUrl = environment.apiUrl;

  constructor(
    private httpThang: HttpClient
  ) { }

  getEntries() {
    return this.httpThang.get(
      this.baseUrl + '/api/dashboard',
      { withCredentials: true }
    );
  }
}
