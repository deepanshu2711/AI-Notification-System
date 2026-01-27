export interface Project {
  name: string;
  description: string;
  globalUserId: string;
  settings?: Record<string, any>;
  isActive: boolean;
}
