// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import SideBar from '../../components/layout/SideBar';
import Navbar from '../../components/layout/Navbar';
import { PrimeReactProvider } from 'primereact/api';

type Props = {
  children: React.ReactNode;
};

const layout = async (props: Props) => {
  // const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="px-4">
          <PrimeReactProvider>
            {props.children}
          </PrimeReactProvider>
        </div>
      </div>
    </div>
    
  );
};

export default layout;
