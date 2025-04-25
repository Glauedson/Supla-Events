CREATE TABLE verification_codes (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  code VARCHAR NOT NULL,
  type VARCHAR NOT NULL, -- 'register' ou 'password_reset'
  expires_at TIMESTAMP NOT NULL,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE INDEX idx_verification_email_type ON verification_codes(email, type)