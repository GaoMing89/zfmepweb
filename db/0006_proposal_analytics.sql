ALTER TABLE proposal_sessions ADD COLUMN country_code TEXT;
ALTER TABLE proposal_sessions ADD COLUMN region TEXT;
ALTER TABLE proposal_sessions ADD COLUMN region_code TEXT;
ALTER TABLE proposal_sessions ADD COLUMN city TEXT;
ALTER TABLE proposal_sessions ADD COLUMN timezone TEXT;
ALTER TABLE proposal_sessions ADD COLUMN device_type TEXT;
ALTER TABLE proposal_sessions ADD COLUMN browser_name TEXT;
ALTER TABLE proposal_sessions ADD COLUMN active_seconds INTEGER NOT NULL DEFAULT 0;
ALTER TABLE proposal_sessions ADD COLUMN last_heartbeat_at TEXT;

CREATE INDEX IF NOT EXISTS idx_proposal_sessions_last_seen
  ON proposal_sessions(last_seen_at DESC);
