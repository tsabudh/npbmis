import React, { memo, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isOnMobileState,
  jwtTokenState,
  sectorsState,
  userState,
} from "../store/states";
import { fetchSectors } from "../apis/fetchSectors";
import { useQuery } from "@tanstack/react-query";
const tabItems = [
  {
    name: "Overview",
    to: "/",
  },
  {
    name: "Add",
    to: "/register",
  },
  {
    name: "Drafts",
    to: "/drafts",
  },
  {
    name: "Requests",
    to: "/requests",
  },
  {
    name: "Edit",
    to: "/edit",
  },
];

function Board() {
  const isOnMobile = useRecoilValue(isOnMobileState);
  const jwtToken = useRecoilValue(jwtTokenState);
  const user = useRecoilValue(userState);
  const [sectors, setSectors] = useRecoilState(sectorsState);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["sectors", jwtToken],
    queryFn: () => fetchSectors(jwtToken),
    enabled: true,
    placeholderData: [],
  });

  useEffect(() => {
    if (data) {
      setSectors(data);
    }
  }, [data]);

  console.log(data, "jwtTOken from BOARD");
  return (
    <div className="flex w-full  md:flex-col border-s-[1px]">
      {/* Main Content */}
      <div className="flex-grow w-full">
        <header className=" border-b sticky top-0 bg-white">
          <div className="px-3 py-3 flex justify-between items-center">
            <h1 className="m3-title-large w-full">All projects</h1>
            <div className="flex items-center justify-start text-on-surface">
              <div className="h-12 w-12 flex items-center justify-center">
                <span className="material-symbols-outlined cursor-pointer">
                  more_vert
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center overflow-x-auto max-w-full">
            <div className="flex items-center overflow-x-auto w-full">
              {tabItems?.map((tab) => {
                return (
                  <NavLink
                    key={tab.to}
                    className="h-[48px] px-4 flex items-center text-nowrap"
                    to={`.${tab.to}`}
                    end={tab.to === "/"}
                  >
                    {({ isActive }) => (
                      <div className="flex flex-col align-middle justify-stretch">
                        <p
                          className={`pb-2 m3-title-small ${
                            isActive ? "text-primary" : ""
                          } `}
                        >
                          {tab.name}
                        </p>
                        <span
                          className={`rounded-ss-full rounded-se-full h-[3px] w-full block ${
                            isActive ? "border-t-[3px] border-primary" : ""
                          }`}
                        ></span>
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </header>
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

Board.displayName = "Board";
export default Board;
