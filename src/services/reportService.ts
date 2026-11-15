import {request} from './api';import type {ReportData} from '../types/domain';
export type ReportKind='sales'|'workload'|'delivery';
export const reportService={async get(kind:ReportKind,filters:{date_from:string;date_to:string;hub_id?:number}):Promise<ReportData>{const query=new URLSearchParams({date_from:filters.date_from,date_to:filters.date_to,...(filters.hub_id?{hub_id:String(filters.hub_id)}:{})});const result=await request<{report:ReportData}>(`/manager/reports/${kind}?${query}`);return result.report;}};
