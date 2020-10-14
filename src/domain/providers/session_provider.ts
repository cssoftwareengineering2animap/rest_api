import { ID } from "../../core/types/id"
import { User } from "../entities/user_entity"

export type SessionToken = string

export type SessionData = {
  userId: ID
  session_id: ID
  authenticated_at: string
}

export interface SessionProvider {
  create: (userId: ID) => Promise<SessionToken>
  destroy: (session: SessionToken) => Promise<void>
  validateToken: (sessionToken: SessionToken) => Promise<SessionData | null>
  destroyUserSessions: (user: User | ID) => Promise<void>
}

export const SessionProviderToken = Symbol.for("SessionProvider")
