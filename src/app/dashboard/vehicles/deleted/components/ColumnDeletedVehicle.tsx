"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Vehicle } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { IconReload } from "@tabler/icons-react";

export const DeletedVehiclesColumns = (
  handleRestore: (id: string) => void,
  handleForceDelete: (id: string) => void
): ColumnDef<Vehicle>[] => [
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
    header: "Vehicle Name",
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Brand
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "plate_number",
    header: "Plate Number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Vehicle["status"];
      const variantMap: Record<Vehicle["status"], "default" | "success" | "destructive" | "warning"> = {
        AVAILABLE: "success",
        UNAVAILABLE: "destructive",
        RENTED: "warning",
        DAMAGED: "destructive",
        UNDER_MAINTENANCE: "warning",
      };

      return (
        <Badge variant={variantMap[status]}>
          {status.toLowerCase().replace(/_/g, " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "transmission",
    header: "Transmission",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("transmission") as Vehicle["transmission"]}</Badge>
    ),
  },
  {
    accessorKey: "fuel_type",
    header: "Fuel Type",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const color = row.getValue("color") as string;
      return (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
          <span>{color}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: "Seats",
  },
  {
    accessorKey: "mileage",
    header: "Mileage",
    cell: ({ row }) => `${row.getValue("mileage")} km`,
  },
  {
    accessorKey: "type",
    header: "Vehicle Type",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return <span>{category?.name ?? "No Category"}</span>;
    },
  },
  {
    accessorKey: "rate_per_day",
    header: () => <div className="text-right">Daily Rate</div>,
    cell: ({ row }) => {
      const amount = Number(row.getValue("rate_per_day"));
      return (
        <div className="text-right font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "rate_per_hour",
    header: () => <div className="text-right">Hourly Rate</div>,
    cell: ({ row }) => {
      const amount = Number(row.getValue("rate_per_hour"));
      return (
        <div className="text-right font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
    console.log(row.original);
      const vehicle = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleRestore(vehicle.id)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <IconReload className="h-4 w-4" /> Restore
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleForceDelete(vehicle.id)}
              className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash className="h-4 w-4 text-red-600" />Force Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
