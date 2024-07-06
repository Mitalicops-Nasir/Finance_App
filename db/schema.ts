import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("userId").notNull(),
});

export const accountsRelations = relations(accounts, ({ many }) => ({
  transactions: many(transactions),
  //banks: one(banks, {
    //fields: [accounts.id],
    //references: [banks.accountId],
  //}),
}));

export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("userId").notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  amount: integer("amount").notNull(),
  payee: text("payee").notNull(),
  notes: text("notes"),
  date: timestamp("date", { mode: "date" }).notNull(),
  accountId: text("account_id")
    .references(() => accounts.id, {
      onDelete: "cascade",
    })
    .notNull(),
  categoryId: text("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export const insertTransactionSchema = createInsertSchema(transactions, {
  date: z.coerce.date(),
});

export const banks = pgTable("banks", {
  id: text("id").primaryKey(),
  accountId: text("account_id")
    .references(() => accounts.id, {
      onDelete: "cascade",
    })
    .notNull(),
  accessToken: text("access_token").notNull(),
  shareableId: text("shareable_id").notNull(),
  fundingSourceUrl: text("funding_source_url"),
});

export const banksRelations = relations(banks, ({ one }) => ({
  account: one(accounts, {
    fields: [banks.accountId],
    references: [accounts.id],
  }),
}));

export const insertBankSchema = createInsertSchema(banks);

export const BankTransactions = pgTable("bank_transactions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  channel: text("channel").notNull(),
  category: text("category").notNull(),
  senderId: text("sender_id").notNull(),
  receiverId: text("receiver_id").notNull(),
  accessToken: text("access_token").notNull(),
  senderBankId: text("sender_bank_id"),
  shareableId: text("shareable_id").notNull(),
  fundingSourceUrl: text("funding_source_url"),
  receiverBankId: text("receiver_bank_id")
    .references(() => banks.id, {
      onDelete: "set null",
    })
    .notNull(),
  accountId: text("account_id")
    .references(() => accounts.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const insertBankTrasactionsSchema = createInsertSchema(BankTransactions);
