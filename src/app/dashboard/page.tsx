"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;
const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3 2xl:grid-cols-4">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">$12,500</p>
          <p className="text-sm text-muted-foreground">+15% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>New Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">1,240</p>
          <p className="text-sm text-muted-foreground">+8% from last week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">320</p>
          <p className="text-sm text-muted-foreground">+5% from yesterday</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 h-100 overflow-y-scroll">
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <ChartLegend content={<ChartLegendContent  payload={chartData}/>} />

              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      <Card className="h-70">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[200px] overflow-y-scroll">
            <ul className="text-sm text-muted-foreground">
              <li className="flex items-center justify-between pt-2 pb-2">
                <p className="text-primary">Order #1234</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </li>
              <li className="flex items-center justify-between pt-2 pb-2">
                <p className="text-primary">Order #1234</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </li>
              <li className="flex items-center justify-between pt-2 pb-2">
                <p className="text-primary">Order #1234</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </li>
              <li className="flex items-center justify-between pt-2 pb-2">
                <p className="text-primary">Order #1234</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </li>
              <li className="flex items-center justify-between pt-2 pb-2">
                <p className="text-primary">Order #1234</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </li>
              <li className="flex items-center justify-between pt-2 pb-2">
                <p className="text-primary">Order #1234</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </li>
              <li className="flex items-center justify-between pt-2 pb-2">
                <p className="text-primary">Order #1234</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </li>
              <li className="flex items-center justify-between pt-2 pb-2">
                <p className="text-primary">Order #1234</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </li>
              <li className="flex items-center justify-between pt-2 pb-2">
                <p className="text-primary">Order #1234</p>
                <p className="text-sm text-muted-foreground">3 hours ago</p>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Server Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-green-500">Online</p>
          <p className="text-sm text-muted-foreground">
            All systems operational
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
