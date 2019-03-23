import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SettingsService} from '../../shared/services/settings.service';
import {ILimit} from '../models/Limit.model';

@Injectable({
  providedIn: 'root'
})
export class LimitsService {

  constructor(private http: HttpClient,
              private settings: SettingsService) {}

  get limitsApi(): string {
    return this.settings.apiHost + 'account/limits/';
  }

  addLimit(task) {
    return this.http.post<ILimit>(this.limitsApi, task);
  }

  getLimits(created_at_lte= null, created_at_gte= null) {
    const params = new HttpParams();
    params.set('created_at_lte', created_at_lte);
    params.set('created_at_gte', created_at_gte);

    return this.http.get<ILimit[]>(this.limitsApi, {params: params});
  }

  // TODO Handle updates and deletes
  updateLimits(update) {
    return this.http.put<{ message: string; result: ILimit }>(this.limitsApi, update);
  }

  deleteLimit(limit_id: string) {
    return this.http.delete<{ message: string; result: ILimit[] }>(`${this.limitsApi}${limit_id}/`);
  }
}
