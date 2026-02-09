-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    type TEXT NOT NULL, -- e.g., 'Contrôle', 'Détartrage', 'Urgence'
    status TEXT DEFAULT 'planifié', -- 'planifié', 'confirmé', 'annulé', 'terminé'
    notes TEXT
);

-- Table: Calls
CREATE TABLE IF NOT EXISTS calls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    phone_number TEXT NOT NULL,
    direction TEXT NOT NULL, -- 'inbound', 'outbound'
    duration_seconds INTEGER DEFAULT 0,
    status TEXT NOT NULL, -- 'completed', 'missed', 'ongoing'
    classification TEXT, -- 'RDV', 'Annulation', 'Urgence', 'Autre'
    practitioner_id TEXT, -- RPPS or Name
    summary TEXT,
    twilio_call_sid TEXT UNIQUE
);

-- Table: Call Transcripts
CREATE TABLE IF NOT EXISTS call_transcripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    call_id UUID REFERENCES calls(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- 'ai', 'patient'
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Follow-ups (Relances)
CREATE TABLE IF NOT EXISTS follow_ups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'Impayer', 'Post-op', 'Rappel'
    priority TEXT DEFAULT 'normale',
    status TEXT DEFAULT 'à faire', -- 'à faire', 'en cours', 'terminé'
    due_date DATE,
    notes TEXT
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_calls_patient ON calls(patient_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups_patient ON follow_ups(patient_id);
