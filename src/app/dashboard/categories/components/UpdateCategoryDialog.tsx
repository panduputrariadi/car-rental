import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCategorySchema, UpdateCategorySchema } from "@/lib/schema/category";
import { updateCategory } from "@/lib/controllers/CategoryController";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: {
    id: string;
    name: string;
    description?: string | null;
  } | null;
};

const UpdateCategoryDialog = ({ open, onOpenChange, category }: Props) => {
  const queryClient = useQueryClient();

  const form = useForm<UpdateCategorySchema>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateCategorySchema) => {
      if (!category?.id) return Promise.reject("No category ID");
      return updateCategory(category.id, data);
    },
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onOpenChange(false);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message || "Failed to update category");
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        description: category.description ?? "",
      });
    }
  }, [category, form]);

  const onSubmit = (data: UpdateCategorySchema) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input {...form.register("name")} />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea {...form.register("description")} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryDialog;
