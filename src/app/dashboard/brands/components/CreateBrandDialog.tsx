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
import { createBrand } from "@/lib/controllers/BrandController";
import { createBrandSchema, CreateBrandSchema } from "@/lib/schema/brand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateBrandDialog = () => {
  const queryClient = useQueryClient();
  const formBrand = useForm<CreateBrandSchema>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      brand_name: "",
      description: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      toast.success("Brand created successfully");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      formBrand.reset();
    },
    onError: (error) => {
      console.log("mutation error: ", error);
      toast.error(error.message || "Failed to create brand");
    },
  });
  const onSubmit = (data: CreateBrandSchema) => {
    mutate(data);
  };
  const onInvalid = (errors: { [s: string]: unknown } | ArrayLike<unknown>) => {
    const firstError = Object.values(errors) as { message?: string };
    toast.error(firstError?.message || "Please fill all required fields");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Brand</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Brand</DialogTitle>
        </DialogHeader>
        <form onSubmit={formBrand.handleSubmit(onSubmit, onInvalid)}>
          <div className="grid gap-2 mb-3">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input type="text" {...formBrand.register("brand_name")} />
            </div>
            <br />
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                // type="text"
                {...formBrand.register("description")}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Brand</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBrandDialog;
