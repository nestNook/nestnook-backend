import { SessionStatus } from '@@types/session-status';

export interface UpdateSessionDTO {
  status?: SessionStatus;
  refresh_token?: string;
}
