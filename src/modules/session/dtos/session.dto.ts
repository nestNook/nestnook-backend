import { type SessionStatus } from '@@types/session-status';

export interface Session {
  id: string;
  refresh_token: string;
  status: SessionStatus;
  user_id: string;
  created_at: string;
}
