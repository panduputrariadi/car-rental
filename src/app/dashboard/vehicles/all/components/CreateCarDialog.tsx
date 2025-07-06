"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { createCarSchema, CreateCarInput } from "@/lib/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVehicle } from "@/lib/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateCarInput, createCarSchema } from "@/lib/schema/vehicle";

export default function CreateCarDialog() {
  const queryClient = useQueryClient();

  const form = useForm<CreateCarInput>({
    resolver: zodResolver(createCarSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      color: "",
      type: "",
      plateNumber: "",
      status: "AVAILABLE",
      description: "",
      images: undefined,
    },
  });

  const { mutate } = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      toast.success("Car created successfully");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create car");
    },
  });

  const onSubmit = async (data: CreateCarInput) => {
    mutate(data);
  }
  const onInvalid = (errors: { [s: string]: unknown; } | ArrayLike<unknown>) => {
    const firstError = Object.values(errors)[0] as { message?: string };
    toast.error(firstError?.message || "Please fill all required fields");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Car</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Car</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Brand</Label>
              <Input {...form.register("brand")} />
            </div>
            <div className="grid gap-2">
              <Label>Model</Label>
              <Input {...form.register("model")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Year</Label>
              <Input type="number" {...form.register("year", { valueAsNumber: true })} />
            </div>
            <div className="grid gap-2">
              <Label>Price</Label>
              <Input type="number" {...form.register("price", { valueAsNumber: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Color</Label>
              <Input {...form.register("color")} />
            </div>
            <div className="grid gap-2">
              <Label>Type</Label>
              <Input {...form.register("type")} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Plate Number</Label>
            <Input {...form.register("plateNumber")} />
          </div>

          <div className="grid gap-2">
            <Label>Status</Label>
            <Input {...form.register("status")} />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea {...form.register("description")} />
          </div>

          <div className="grid gap-2">
            <Label>Images</Label>
            <Input type="file" multiple {...form.register("images")} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              Create Car              
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
