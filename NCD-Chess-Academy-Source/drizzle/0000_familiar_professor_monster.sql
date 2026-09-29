CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`level` text NOT NULL,
	`mode` text NOT NULL,
	`phone` text NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created` text NOT NULL,
	`progress` text DEFAULT '{}' NOT NULL,
	`assignments` text DEFAULT '[]' NOT NULL,
	`submissions` text DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_applications_owner_created` ON `applications` (`owner`,`created`);--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
