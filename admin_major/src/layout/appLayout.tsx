import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { RootState } from "@/redux/store";
import cn from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const isToggle = () => setIsOpen(!isOpen);

  const { pathname } = useLocation();

  const loginStatus = useSelector<RootState>((state) => state.user.loginStatus);

  if (!loginStatus) {
    // console.log("false login");
    return <Navigate to="/login" />;
  }

  if (loginStatus && pathname === "/login") {
    // console.log("false login");
    return <Navigate to="/admin/dashboard" />;
  }
  return (
    <>
      {/* <div className="flex gap-[6px] lg:gap-[32px] bg-neutral-50">
        <Sidebar className="max-w-[260px] shadow-md w-full flex-none sticky top-0 bg-shade-light" />

        <main className="grow p-12 rounded-lg overflow-auto bg-neutral-50">
          {children}
        </main>
      </div> */}
      {/* <NavBar /> */}

      <div className="flex">
        <Sidebar isOpen={isOpen} isToggle={isToggle} />
        <div
          className={cn("flex flex-col w-full px-2", {
            "md:ml-72": !isOpen,
            "md:ml-20": isOpen,
          })}
        >
          <NavBar />
          <div className="w-full  overflow-x-none transition translation-all">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
