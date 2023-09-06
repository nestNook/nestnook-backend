import { Schema, model } from 'mongoose';
import { Session } from '../dtos/session.dto';
import { SessionStatus } from '@@types/session-status';

const sessionSchema = new Schema<Session>(
  {
    user_id: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: [SessionStatus.ACTIVE, SessionStatus.EXPIRED],
      default: SessionStatus.ACTIVE,
      required: true,
    },
  },
  { timestamps: true }
);

export const SessionModel = model('Session', sessionSchema);

export default SessionModel;
