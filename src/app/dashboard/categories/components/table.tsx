"use client";
import {
  ColumnFilter,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
// import { columns } from "./columns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "./TableSkeleton";
import { columns } from "./columns";
import CreateCategoryDialgo from "./CreateCategoryDialgo";
import {
  fetchCategories,
  softDeleteCategory,
} from "@/lib/controllers/category";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CategoriesTable = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["categories", page, perPage],
    queryFn: () => fetchCategories(page, perPage),
    // keepPreviousData: true,
  });

  const categories = data?.items || [];
  const meta = {
    current_page: data?.meta?.current_page || 1,
    total_pages: data?.meta?.last_page || 1,
    total_items: data?.meta?.total || 0,
    has_more_pages: data?.meta?.current_page < data?.meta?.last_page,
  };
  const handleDelete = async (id: string) => {
    try {
      await softDeleteCategory(id);
      await refetch();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    }
  };
  const columnDefaults = columns(handleDelete);

  const table = useReactTable({
    data: categories,
    columns: columnDefaults,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      // pagination: {
      //   pageIndex: page - 1,
      //   pageSize: 10,
      // },
    },
  });

  const generatePageNumbers = (current: number, total: number) => {
    const pages = [];

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
      pages.push(1, 2, 3, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current, "...", total);
    }

    return pages;
  };

  if (isLoading) {
    return <TableSkeleton />;
  }
  if (isError) {
    toast.error("Failed to load data", {
      description: "Please try again later",
    });
  }
  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Filter categories..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Select
          value={String(perPage)}
          onValueChange={(value) => {
            setPerPage(Number(value));
            setPage(1); // reset ke page 1 saat perPage berubah
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <CreateCategoryDialgo />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  className="capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnDefaults.length}
                  className="h-24 text-center"
                >
                  <div className="w-full">No results.</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground py-2">
        <div className="flex flex-col gap-2 items-center justify-between text-sm text-muted-foreground py-2 md:flex-row">
          <div>
            Page {meta.current_page} of {meta.total_pages} — Total:{" "}
            {meta.total_items} items
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={meta.current_page <= 1}
            >
              Previous
            </Button>

            {/* {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={
                    pageNumber === meta.current_page ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            )} */}
            {generatePageNumbers(meta.current_page, meta.total_pages).map(
              (pageNum, idx) =>
                pageNum === "..." ? (
                  <span key={idx} className="px-2 text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <Button
                    key={pageNum}
                    variant={
                      pageNum === meta.current_page ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setPage(Number(pageNum))}
                  >
                    {pageNum}
                  </Button>
                )
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPage((prev) => (meta.has_more_pages ? prev + 1 : prev))
              }
              disabled={!meta.has_more_pages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTable;
