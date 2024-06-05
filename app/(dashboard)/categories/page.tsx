"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { columns } from "./column";
import { DataTable } from "@/components/data-table";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

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

const CategoriesPage = () => {
  const newAccount = useNewCategory();
  const deleteCategories = useBulkDeleteCategories();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

  if (categoriesQuery.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
          <Button size="sm" onClick={newAccount.onOpen}>
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategories.mutate({ ids });
            }}
            disabled={isDisabled}
            filterKey="name"
            columns={columns}
            data={categories}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
