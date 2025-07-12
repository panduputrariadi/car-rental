"use client";
import {
  Award,
  BarChart2,
  Building2,
  Calendar,
  CalendarCheck,
  Car,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  List,
  LogOut,
  MapPin,
  Plus,
  Settings,
  Tags,
  Trash,
  User,
  UserCog,
  Users,
  Wrench,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";

const SideBar = () => {
  const { data: session } = useSession();
  // console.log(session);
  return (
    <Sidebar collapsible="icon" variant="floating">
      {/* Header with logo and app name */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/vite.svg"
                  width={24}
                  height={24}
                  alt="Car Rental Logo"
                />
                <span className="font-bold text-lg">DriveEase Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        {/* Dashboard Section */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  {/* <LayoutDashboard className="w-4 h-4" /> */}
                  <span>Dashboard</span>
                  <Badge variant="secondary" className="ml-auto">
                    New
                  </Badge>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Fleet Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Fleet Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger>
                        <Car className="w-4 h-4" />
                        Vehicles
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      {/* <SidebarGroupContent /> */}
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link href="/dashboard/vehicles/all" className="">
                              <List className="w-3 h-3" />
                              <span>All Vehicles</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link href="/vehicles/add">
                              <Plus className="w-3 h-3" />
                              <span>Add New Vehicle</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>

                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger>
                        <Tags className="w-4 h-4" />
                        Categories
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      {/* <SidebarGroupContent /> */}
                      {/* <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link
                              href="dashboard/vehicles/all"
                              className="pl-6"
                            >
                              <List className="w-3 h-3" />
                              <span>All Categories</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href="/vehicles/add" className="pl-6">
                              <Trash className="w-3 h-3" />
                              <span>Deleted Categories</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu> */}
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link href="/dashboard/categories">
                              <List className="w-3 h-3" />
                              <span>All Categories</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link href="/dashboard/categories/deleted">
                              <Trash className="w-3 h-3" />
                              <span>Deleted Categories</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/maintenance">
                    <Wrench className="w-4 h-4" />
                    <span>Maintenance</span>
                    <Badge variant="destructive" className="ml-auto">
                      3
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/locations">
                    <MapPin className="w-4 h-4" />
                    <span>Locations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Booking Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Bookings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/bookings">
                    <CalendarCheck className="w-4 h-4" />
                    <span>All Bookings</span>
                    <Badge className="ml-auto">24</Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/bookings/calendar">
                    <Calendar className="w-4 h-4" />
                    <span>Booking Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/bookings/pending">
                    <Clock className="w-4 h-4" />
                    <span>Pending Approval</span>
                    <Badge variant="secondary" className="ml-auto">
                      5
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Customer Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Customers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/customers">
                    <Users className="w-4 h-4" />
                    <span>Customer List</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/customers/loyalty">
                    <Award className="w-4 h-4" />
                    <span>Loyalty Program</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Financial Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Financial</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/payments">
                    <CreditCard className="w-4 h-4" />
                    <span>Payments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/invoices">
                    <FileText className="w-4 h-4" />
                    <span>Invoices</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/reports">
                    <BarChart2 className="w-4 h-4" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings/company">
                    <Building2 className="w-4 h-4" />
                    <span>Company Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings/rates">
                    <DollarSign className="w-4 h-4" />
                    <span>Rates & Pricing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings/users">
                    <UserCog className="w-4 h-4" />
                    <span>User Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user dropdown */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/vite.svg" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span>{session?.user?.name}</span>
                  </div>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
                align="end"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
