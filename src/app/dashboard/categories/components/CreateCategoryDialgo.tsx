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
import { createCategory } from "@/lib/controllers/category";
import {
  createCategorySchema,
  CreateCategorySchema,
} from "@/lib/schema/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateCategoryDialgo() {
  const queryClient = useQueryClient();
  const formCategory = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      formCategory.reset();
    },
    onError: (error) => {
        console.log("mutation error: ", error)
      toast.error(error.message || "Failed to create category");
    },
  });
  const onSubmit = (data: CreateCategorySchema) => {    
    mutate(data);
  };
  const onInvalid = (errors: { [s: string]: unknown } | ArrayLike<unknown>) => {
    const firstError = Object.values(errors) as { message?: string };    
    toast.error(firstError?.message || "Please fill all required fields");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={formCategory.handleSubmit(onSubmit, onInvalid)}
          className="space-y-4"
        >
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                type="text"
                {...formCategory.register("name")}
              />              
            </div>
            <br />
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                // type="text"
                {...formCategory.register("description")}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
