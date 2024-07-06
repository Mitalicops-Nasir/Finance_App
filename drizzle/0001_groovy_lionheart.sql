ALTER TABLE "bank_transactions" ADD COLUMN "access_token" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bank_transactions" ADD COLUMN "shareable_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bank_transactions" ADD COLUMN "funding_source_url" text;