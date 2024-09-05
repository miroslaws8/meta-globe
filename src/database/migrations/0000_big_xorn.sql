CREATE TABLE `tokens` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`hash` varchar(255) NOT NULL,
	`token_id` bigint NOT NULL,
	`country` varchar(100) NOT NULL,
	CONSTRAINT `tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `country_index` ON `tokens` (`country`);