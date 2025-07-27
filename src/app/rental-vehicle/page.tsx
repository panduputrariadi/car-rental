"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "@/lib/controllers/CategoryController";
import { CategorySekeleton } from "./components/CategorySekeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchAllBrands, fetchAllModels } from "@/lib/controllers/VehicleController";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface Brand {
  brand: string;
}

interface Model {
  model: string;
}

const RentalVehiclePage = () => {
  const [availableNow, setAvailableNow] = useState(false);
  const [rentalType, setRentalType] = useState("per-hour");
  const [transmission, setTransmission] = useState("manual");

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["fetch-all-categories"],
    queryFn: () => fetchAllCategories(),
  });

  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["fetch-all-brands"],
    queryFn: () => fetchAllBrands(),
  });

  const { data: models = [] } = useQuery<Model[]>({
    queryKey: ["fetch-all-models"],
    queryFn: () => fetchAllModels(),
  });
  return (
    <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-3 2xl:grid-cols-4">
      <div className="col-span-1">
        <div className="w-full bg-white rounded-lg border p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Filter by:</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-500 hover:text-blue-600"
            >
              Reset all
            </Button>
          </div>

          {/* Rental Type */}
          <div className="space-y-2">
            <Label>Rental Type</Label>
            <div className="flex gap-2">
              {["any", "per-day", "per-hour"].map((type, index) => (
                <Button
                  key={index}
                  variant={rentalType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRentalType(type)}
                >
                  {type === "any"
                    ? "Any"
                    : type === "per-day"
                    ? "Per day"
                    : "Per hour"}
                </Button>
              ))}
            </div>
          </div>

          {/* Available Now */}
          <div className="flex items-center justify-between">
            <Label htmlFor="availableNow" className="font-medium">
              Available Now Only
            </Label>
            <Switch
              id="availableNow"
              checked={availableNow}
              onCheckedChange={setAvailableNow}
            />
          </div>

          <Separator />

          {/* Price Range */}
          <div className="space-y-2">
            <Label>Price Range / Hour</Label>
            <div className="flex justify-between text-sm">
              <span>
                From <span className="font-semibold">$22.00</span>
              </span>
              <span>
                To <span className="font-semibold">$98.50</span>
              </span>
            </div>
          </div>
          
          <div>
            <Label>
              <Accordion
                type="single"
                collapsible
                className="w-full"
                // defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>Car Model</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    {models.map((model, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={model.model} />
                        <Label htmlFor={model.model}>{model.model}</Label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Label>
          </div>

          {/* Car Model */}
          <div>
            <Label>
              <Accordion
                type="single"
                collapsible
                className="w-full"
                // defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>Car Brand</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    {brands.map((brand, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={brand.brand} />
                        <Label htmlFor={brand.brand}>{brand.brand}</Label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Label>            
          </div>

          {/* Body Style */}
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {isLoading ? (
                <CategorySekeleton />
              ) : (
                categories.map((category, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={category.id} />
                    <Label htmlFor={category.id}>{category.name}</Label>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Transmission */}
          <div className="space-y-2">
            <Label>Transmission</Label>
            <RadioGroup value={transmission} onValueChange={setTransmission}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="any" />
                <Label htmlFor="any">Any (2,108)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatic" id="automatic" />
                <Label htmlFor="automatic">Automatic (1,142)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">Manual (966)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Fuel Type */}
          <div>
            <Label>Fuel Type</Label>
          </div>
        </div>
      </div>
      <div className="col-span-1">data filter</div>
      <div className="col-span-1">data filter select</div>
    </div>
  );
};

export default RentalVehiclePage;
