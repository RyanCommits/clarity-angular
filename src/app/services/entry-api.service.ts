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

  getEntry(entryDate: string) {
    return this.httpThang.get(
      this.baseUrl + '/api/dashboard/edit/' + entryDate,
      { withCredentials: true }
    )
  }

  updateEntry(entryDate: string, entryFields: EntryInfo) {
    return this.httpThang.put(
      this.baseUrl + '/api/dashboard/edit/' + entryDate,
      entryFields,
      { withCredentials: true }
    );
  }

  postEntry(entryDate: string, entryFields: EntryInfo) {
    return this.httpThang.post(
      this.baseUrl + '/api/dashboard/new/' + entryDate,
      entryFields,
      { withCredentials: true }
    );
  }
}
