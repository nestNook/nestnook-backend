import { Schema, model } from 'mongoose';
import { type Session } from '../dtos/session.dto';
import { SessionStatus } from '@@types/session-status';

const sessionSchema = new Schema<Session>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
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
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        delete ret._id;
      },
    },
  },
);

export const SessionModel = model('Session', sessionSchema);

export default SessionModel;
