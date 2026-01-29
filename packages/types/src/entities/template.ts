export interface Template {
  _id: string;
  name: string;
  channel: string;
  content: Record<string, any>;
  aiGenerated: boolean;
  globalUserId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  variables: Record<string, any>;
}
