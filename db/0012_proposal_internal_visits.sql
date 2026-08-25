ALTER TABLE proposal_sessions ADD COLUMN visitor_type TEXT NOT NULL DEFAULT 'customer';
ALTER TABLE proposal_sessions ADD COLUMN internal_user_id TEXT;

CREATE INDEX IF NOT EXISTS idx_proposal_sessions_visitor_type
  ON proposal_sessions(visitor_type, last_seen_at DESC);
