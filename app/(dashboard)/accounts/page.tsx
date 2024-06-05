"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { columns } from "./column";
import { DataTable } from "@/components/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

const data = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 1060,
    status: "success",
    email: "khhdalk@example.com",
  },
];

const AccountsPage = () => {
  const newAccount = useNewAccount();
  const deleteAccounts = useBulkDeleteAccounts();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if (accountsQuery.isLoading) {
    return (
      <div className="max-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts</CardTitle>
          <Button size="sm" onClick={newAccount.onOpen}>
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccounts.mutate({ ids });
            }}
            disabled={isDisabled}
            filterKey="email"
            columns={columns}
            data={accounts}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
