"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dropDownCategory } from "@/lib/controllers/CategoryController";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
    TRANSMISSION_TYPES,
  updateVehicleSchema,
  UpdateVehicleSchema,
  VEHICLE_STATUS,
} from "@/lib/schema/VehicleSchema";
import { AutoComplete } from "@/components/ui/autocomplete";
import { updateVehicle } from "@/lib/controllers/VehicleController";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: {
    id: string;
    name: string;
    description?: string ;
    category_id: string;
    status: string;
    transmission: string;
    plate_number: string;
    fuel_type: string;
    color: string;
    rate_per_day: number;
    rate_per_hour: number;
    capacity: number;
    mileage: number;
    model: string;
    brand: string;
    type: string;
    year: number;
  } | null;
};

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

const UpdateVehicleDialog = ({ open, onOpenChange, vehicle }: Props) => {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["categories", searchValue],
    queryFn: () => dropDownCategory(searchValue),
  });

  const formVehicle = useForm<UpdateVehicleSchema>({
    resolver: zodResolver(updateVehicleSchema),
    defaultValues: {
      name: "",
      description: "",
      category_id: "",
      status: "AVAILABLE",
      transmission: "MANUAL",
      plate_number: "",
      fuel_type: "",
      color: "",
      rate_per_day: 0,
      rate_per_hour: 0,
      capacity: 1,
      mileage: 0,
      model: "",
      brand: "",
      type: "",
      year: new Date().getFullYear(),      
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: UpdateVehicleSchema) => {
      if (!vehicle?.id) return Promise.reject("No Vehicle ID");
      return updateVehicle(vehicle.id, data);
    },
    onSuccess: () => {
      toast.success("Vehicle updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(error.message || "Failed to update Vehicle");
    },
  });

  useEffect(() => {
    if (vehicle) {
      formVehicle.reset({
        name: vehicle.name,
        description: vehicle.description,
        category_id: vehicle.category_id,
        status: vehicle.status as typeof VEHICLE_STATUS[number],
        transmission: vehicle.transmission as typeof TRANSMISSION_TYPES[number],
        plate_number: vehicle.plate_number,
        fuel_type: vehicle.fuel_type,
        color: vehicle.color,
        rate_per_day: vehicle.rate_per_day,
        rate_per_hour: vehicle.rate_per_hour,
        capacity: vehicle.capacity,
        mileage: vehicle.mileage,
        model: vehicle.model,
        brand: vehicle.brand,
        type: vehicle.type,
        year: vehicle.year,
      });
    }
  }, [vehicle, formVehicle]);

  const onSubmit = (data: UpdateVehicleSchema) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Vehicle</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={formVehicle.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="col-span-2">
            <Label>Name</Label>
            <Input {...formVehicle.register("name")} />
          </div>
          <div className="col-span-2">
            <Label>Description</Label>
            <Textarea {...formVehicle.register("description")} />
          </div>
          <div>
            <Label>Category</Label>
            <AutoComplete
              selectedValue={formVehicle.watch("category_id")?.toString() ?? ""}
              onSelectedValueChange={(value) =>
                formVehicle.setValue("category_id", value)
              }
              searchValue={searchValue}
              onSearchValueChange={setSearchValue}
              items={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              isLoading={isLoading}
              emptyMessage="No categories found"
              placeholder="Select category"
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={formVehicle.watch("status")}
              onValueChange={(value) =>
                formVehicle.setValue(
                  "status",
                  value as (typeof VEHICLE_STATUS)[number]
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_STATUS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Transmission</Label>
            <Select
              value={formVehicle.watch("transmission")}
              onValueChange={(value) =>
                formVehicle.setValue(
                  "transmission",
                  value as (typeof TRANSMISSION_TYPES)[number]
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent>
                {TRANSMISSION_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Plate Number</Label>
            <Input {...formVehicle.register("plate_number")} />
          </div>
          <div>
            <Label>Fuel Type</Label>
            <Input {...formVehicle.register("fuel_type")} />
          </div>
          <div>
            <Label>Color</Label>
            <Input {...formVehicle.register("color")} />
          </div>
          <div>
            <Label>Rate per Day</Label>
            <Input
              type="number"
              {...formVehicle.register("rate_per_day", { valueAsNumber: true })}
            />
          </div>
          <div>
            <Label>Rate per Hour</Label>
            <Input
              type="number"
              {...formVehicle.register("rate_per_hour", {
                valueAsNumber: true,
              })}
            />
          </div>
          <div>
            <Label>Capacity</Label>
            <Input
              type="number"
              {...formVehicle.register("capacity", { valueAsNumber: true })}
            />
          </div>
          <div>
            <Label>Mileage</Label>
            <Input
              type="number"
              {...formVehicle.register("mileage", { valueAsNumber: true })}
            />
          </div>
          <div>
            <Label>Model</Label>
            <Input {...formVehicle.register("model")} />
          </div>
          <div>
            <Label>Brand</Label>
            <Input {...formVehicle.register("brand")} />
          </div>
          <div>
            <Label>Type</Label>
            <Input {...formVehicle.register("type")} />
          </div>
          <div>
            <Label>Year</Label>
            <Input
              type="number"
              {...formVehicle.register("year", { valueAsNumber: true })}
            />
          </div>
          <div className="col-span-2">
            <Label>Images</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => formVehicle.setValue("images", e.target.files)}
            />
          </div>
          <DialogFooter className="col-span-2 flex justify-end space-x-2 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Vehicle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateVehicleDialog;
