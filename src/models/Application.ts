export interface Application {
  id: number;
  user_id: number;
  company_name: string;
  platform_name: string;
  link: string;
  skills: string[];
  tags: string[];
  current_status: string;
  applied_at: Date;
  returned_at: Date;
  position: string;
}
