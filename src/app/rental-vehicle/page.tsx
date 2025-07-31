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
import { fetchAllBrands } from "@/lib/controllers/BrandController";
import { useDispatch, useSelector } from "react-redux";
import { setBrand } from "@/store/BrandSlice";
import { setSelectedCategories } from "@/store/CategorySlice";
import type { RootState } from "@/store";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface Brand {
  id: string;
  brand_name: string;
}

const RentalVehiclePage = () => {
  const [availableNow, setAvailableNow] = useState(false);
  const [rentalType, setRentalType] = useState("per-hour");
  const [transmission, setTransmission] = useState("manual");

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["fetch-all-categories"],
    queryFn: () => fetchAllCategories(),
  });

  const { data: brands = [], isLoading: isLoadingBrand } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: () => fetchAllBrands(),
  });

  const dispatch = useDispatch();
  const { selectedBrands, selectedCategories } = useSelector(
    (state: RootState) => ({
      selectedBrands: state.brand.selectedBrands,
      selectedCategories: state.category.selectedCategories,
    })
  );

  const handleSelectedBrand = (brandId: string, checked: boolean) => {
    dispatch(setBrand({ brandId, checked }));
  };

  const handleSelectedCategory =
    (categoryId: string) => (checked: boolean | string) => {
      const isChecked = checked === true;
      dispatch(setSelectedCategories({ categoryId, checked: isChecked }));
    };

  return (
    <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-3 2xl:grid-cols-4">
      <div className="col-span-1">
        <Card className="w-full rounded-lg border">
          <CardHeader>
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
          </CardHeader>
          <CardContent className="space-y-6">
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

            {/* Car Brand */}
            <div className="space-y-2">
              <Label>
                {/* <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Car Brand{" "}
                      {selectedBrands.length > 0 && `(${selectedBrands.length})`}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      {isLoadingBrand ? (
                        <CategorySekeleton />
                      ) : (
                        brands.map((brand, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={brand.id}
                              checked={selectedBrands.includes(brand.id)}
                              onCheckedChange={(checked) =>
                                handleSelectedBrand(brand.id, checked)
                              }
                            />
                            <Label htmlFor={brand.id}>{brand.brand_name}</Label>
                          </div>
                        ))
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion> */}
                Car Brand
              </Label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {isLoading ? (
                  <CategorySekeleton />
                ) : (
                  brands.map((brand, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand.id}
                        checked={selectedCategories.includes(brand.id)}
                        onCheckedChange={(checked) =>
                          handleSelectedCategory(brand.id)(checked)
                        }
                      />
                      <Label htmlFor={brand.id}>{brand.brand_name}</Label>
                    </div>
                  ))
                )}
              </div>
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
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) =>
                          handleSelectedCategory(category.id)(checked)
                        }
                      />
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
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1">data filter</div>
      <div className="col-span-1">data filter select</div>
    </div>
  );
};

export default RentalVehiclePage;
