import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SideBar from '../../components/layout/SideBar';
import Navbar from '../../components/layout/Navbar';

type Props = {
  children: React.ReactNode;
};

const layout = async (props: Props) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="px-4">{props.children}</div>
      </div>
    </div>
    
  );
};

export default layout;
