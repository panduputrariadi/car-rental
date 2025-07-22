"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createVehicle } from "@/lib/controllers/VehicleController";
import {
  createVehicleSchema,
  CreateVehicleSchema,
  VEHICLE_STATUS,
  TRANSMISSION_TYPES,
} from "@/lib/schema/VehicleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dropDownCategory } from "@/lib/controllers/CategoryController";
import { AutoComplete } from "@/components/ui/autocomplete";
import { useState } from "react";
// import { Categories } from "@/types/types";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export default function CreateVehicleDialog() {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState<string>("");
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["categories", searchValue], // fetch based on input
    queryFn: () => dropDownCategory(searchValue),
  });

  const formVehicle = useForm<CreateVehicleSchema>({
    resolver: zodResolver(createVehicleSchema),
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
    mutationFn: createVehicle,
    onSuccess: () => {
      toast.success("Vehicle created successfully");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      formVehicle.reset();
    },
    onError: (error: any) => {
      console.log("mutation error: ", error);
      toast.error(error.message || "Failed to create vehicle");
    },
  });

  const onSubmit = (data: CreateVehicleSchema) => {
    mutate(data);
  };

  const onInvalid = (errors: { [s: string]: unknown } | ArrayLike<unknown>) => {
    const firstError = Object.values(errors)[0] as { message?: string };
    toast.error(firstError?.message || "Please fill all required fields");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Vehicle</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Vehicle</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={formVehicle.handleSubmit(onSubmit, onInvalid)}
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
              selectedValue={formVehicle.watch("category_id")}
              onSelectedValueChange={(value) =>
                formVehicle.setValue("category_id", value)
              }
              searchValue={searchValue}
              onSearchValueChange={setSearchValue}
              items={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              // label={formVehicle.watch("category_id")}
              isLoading={isLoading}
              emptyMessage="No categories found"
              placeholder="Select category"
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={formVehicle.watch("status")}
              onValueChange={(value) => formVehicle.setValue("status", value)}
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
                formVehicle.setValue("transmission", value)
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
}
