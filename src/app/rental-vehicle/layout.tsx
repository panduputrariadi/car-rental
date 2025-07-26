// import BottomMenuCustomer from "@/components/layout/BottomMenuCustomer";
import NavbarCustomer from "@/components/layout/NavbarCustomer";
import SideBarCustomer from "@/components/layout/SideBarCustomer";

type Props = {
  children: React.ReactNode;
};
const layout = async (props: Props) => {
  return (
    <div className="flex w-full">
      <SideBarCustomer />
      {/* <BottomMenuCustomer /> */}
      <div className="w-full">
        <NavbarCustomer />
        <div className="px-4">{props.children}</div>
      </div>
    </div>
  );
};

export default layout;
