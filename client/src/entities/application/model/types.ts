export interface Application {
  id: string;
  name: string;
  description?: string;
  key?: string;
  logs: ApplicationLogs[];
}

export interface ApplicationLogs {
  id: string;
  type: string;
  meta: Record<string, never>;
  createdAt: Date;
}
