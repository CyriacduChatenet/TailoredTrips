import { ROUTES } from "@travel-tailor/constants";
import { useUser } from "@travel-tailor/contexts";
import { TokenService } from "@travel-tailor/services";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

export const Navbar: FC = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6 fixed w-full z-10">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href={"/"}>
          <span className="font-semibold text-xl tracking-tight">
            Travel Tailor
          </span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              fillRule="evenodd"
              d="M2 5h16a1 1 0 010 2H2a1 1 0 010-2zm0 6h16a1 1 0 010 2H2a1 1 0 010-2zm0 6h16a1 1 0 010 2H2a1 1 0 010-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow"></div>
        {isMobile && open && (
          <div>
            {user.advertiser && TokenService.getAccessToken() !== null && (
              <a
                href={ROUTES.ADVERTISER.DASHBOARD}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Dashboard
              </a>
            )}
            {user.traveler && TokenService.getAccessToken() !== null && (
              <a
                href={ROUTES.TRAVELER.DASHBOARD}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Dashboard
              </a>
            )}
            {user.traveler && TokenService.getAccessToken() !== null && (
              <a
                href={ROUTES.TRAVELER.TASTE.INDEX}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Tastes
              </a>
            )}
            {user.advertiser && TokenService.getAccessToken() !== null && (
              <a
                href={ROUTES.ADVERTISER.INVOICE.INDEX}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Invoices
              </a>
            )}
            {TokenService.getAccessToken() !== null && (
              <a
                href={""}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Profile
              </a>
            )}
            {TokenService.getAccessToken() !== null && (
              <a
                href={""}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Settings
              </a>
            )}
            {TokenService.getAccessToken() === null && (
              <>
                <a
                  href={ROUTES.AUTH.SIGNIN}
                  className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                >
                  Signin
                </a>
                <a
                  href={ROUTES.AUTH.SIGNUP}
                  className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                >
                  Signup
                </a>
              </>
            )}
            {TokenService.getAccessToken() !== null && (
              <>
                <a
                  href={ROUTES.ROOT}
                  className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                  onClick={() => TokenService.removeAccessToken()}
                >
                  Logout
                </a>
              </>
            )}
          </div>
        )}
        {!isMobile && (
          <div>
            {user.advertiser && TokenService.getAccessToken() !== null && (
              <a
                href={ROUTES.ADVERTISER.DASHBOARD}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Dashboard
              </a>
            )}
            {user.traveler && TokenService.getAccessToken() !== null && (
              <a
                href={ROUTES.TRAVELER.DASHBOARD}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Dashboard
              </a>
            )}
            {user.traveler && TokenService.getAccessToken() !== null && (
              <a
                href={ROUTES.TRAVELER.TASTE.INDEX}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Tastes
              </a>
            )}
            {user.advertiser && TokenService.getAccessToken() !== null && (
              <a
                href={ROUTES.ADVERTISER.INVOICE.INDEX}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Invoices
              </a>
            )}
            {TokenService.getAccessToken() !== null && (
              <a
                href={""}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Profile
              </a>
            )}
            {TokenService.getAccessToken() !== null && (
              <a
                href={""}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Settings
              </a>
            )}
            {TokenService.getAccessToken() === null && (
              <>
                <a
                  href={ROUTES.AUTH.SIGNIN}
                  className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                >
                  Signin
                </a>
                <a
                  href={ROUTES.AUTH.SIGNUP}
                  className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                >
                  Signup
                </a>
              </>
            )}
            {TokenService.getAccessToken() !== null && (
              <>
                <a
                  href={ROUTES.ROOT}
                  className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                  onClick={() => TokenService.removeAccessToken()}
                >
                  Logout
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
