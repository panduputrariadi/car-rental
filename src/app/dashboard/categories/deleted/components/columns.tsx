"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Categories } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,  
} from "@/components/ui/dropdown-menu";
import { IconRestore } from "@tabler/icons-react";

export const columns = (
  handleForceDelete: (id: string) => void,
  handleRestore: (id: string) => void
): ColumnDef<Categories>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Slug
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("slug")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Description
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("description")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleRestore(category.id)} variant="default">
              <IconRestore />Restore
            </DropdownMenuItem>                      
            <DropdownMenuItem onClick={() => handleForceDelete(category.id)} variant="destructive">
              <Trash />Force Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
