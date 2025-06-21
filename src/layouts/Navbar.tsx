"use client";
import * as React from "react";
import {
  CircleUser,
  LayoutDashboard,
  Menu,
  ScrollText,
  Search,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import ButtonLink from "@/components/links/ButtonLink";
import UnstyledLink from "@/components/links/UnstyledLink";
import clsxm from "@/lib/clsxm";
import Link from "next/link";
import Button from "@/components/buttons/Button";

const links = [{ href: "/", label: "" }];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const user = true;

  const pathname = usePathname();

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      let offset;
      if (window.innerWidth < 768) {
        offset = element.getBoundingClientRect().top + window.scrollY - 66;
      } else if (window.innerWidth < 1280) {
        offset = element.getBoundingClientRect().top + window.scrollY - 74;
      } else {
        offset = element.getBoundingClientRect().top + window.scrollY - 90;
      }
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const isActive = (href: string) => pathname === href;
  const getTextColor = (href: string) =>
    pathname === href ? "text-primary-base font-semibold" : "text-black";

  return (
    <section
      className={clsxm(
        "fixed top-0 z-[100] max-md:h-[3.5rem] items-center flex justify-between bg-white px-4 sm:px-6 md:px-8 shadow-lg lg:px-[5%] w-full transition-transform duration-200 translate-y-0",
      )}
    >
      {/* Mobile Menu Trigger */}
      <div className="md:hidden z-50">
        <Link href={"/"} className="flex items-center gap-2 ml-10">
          <p className="text-black font-bold text-xl md:hidden">Makan</p>
        </Link>
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer absolute top-4 left-4 sm:right-6 md:right-8"
        >
          {isOpen ? (
            <X className="relative text-2xl text-black" />
          ) : (
            <Menu className="relative text-2xl text-black" />
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleClick("menus")}
          className="absolute top-4 right-4 px-1.5 sm:right-6 md:right-8"
        >
          <Search size={16} />
        </Button>

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="fixed top-[3.5rem] left-0 w-full bg-white z-40 max-h-[calc(100vh-72px)] overflow-y-auto shadow-lg">
            <div className="relative z-50 flex flex-col p-6">
              <div className="flex justify-between items-center mb-6">
                {!user ? (
                  <ButtonLink
                    variant="primary"
                    size="sm"
                    href="/login"
                    className="text-sm px-2 py-1 font-normal text-white md:leading-none"
                  >
                    Login
                  </ButtonLink>
                ) : user ? (
                  <div className="flex gap-2">
                    <ButtonLink
                      variant="outline"
                      href="/orders"
                      size="sm"
                      className="text-sm px-2 py-1 font-normal md:leading-none"
                      leftIcon={ScrollText}
                    >
                      History
                    </ButtonLink>
                    <ButtonLink
                      variant="primary"
                      href="/profile"
                      size="sm"
                      className="text-sm px-2 py-1 font-normal text-white md:leading-none"
                      leftIcon={CircleUser}
                    >
                      Profile
                    </ButtonLink>
                  </div>
                ) : (
                  <ButtonLink
                    variant="primary"
                    href="/dashboard"
                    size="sm"
                    className="text-sm px-2 py-1 font-normal text-white md:leading-none"
                    leftIcon={LayoutDashboard}
                  >
                    Dashboard
                  </ButtonLink>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {links.map(({ href, label }) => (
                  <UnstyledLink
                    key={href}
                    href={href}
                    className="group relative w-fit"
                    onClick={() => setIsOpen(false)}
                  >
                    <p
                      className={`relative z-10 text-[20px] ${getTextColor(
                        href,
                      )}`}
                    >
                      {label}
                    </p>
                    <span className="absolute inset-0 h-full w-0 bg-[#bea6a1] scale-[120%] transition-all duration-200 ease-in group-hover:w-full"></span>
                  </UnstyledLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Menu */}
      <UnstyledLink href="/" className="flex items-center gap-2">
        <p className="text-black font-bold text-2xl max-md:hidden">Makan</p>
      </UnstyledLink>
      <div className="my-3 flex items-center justify-between gap-6 max-md:hidden">
        {links.map(({ href, label }) => (
          <UnstyledLink
            key={href}
            href={href}
            className="group relative inline-block"
          >
            <p
              className={`relative z-10 transition-all duration-300 ease-in-out ${getTextColor(href)} ${isActive(href) ? "text-primary-hover" : "hover:text-primary-hover"}`}
            >
              {label}
            </p>
            <span
              className={`absolute bottom-0 h-[1px] bg-primary-hover rounded-full transition-all duration-300 ease-in-out ${isActive(href) ? "w-full left-0" : "left-1/2 w-0 group-hover:w-full group-hover:left-0"}`}
            ></span>
          </UnstyledLink>
        ))}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleClick("menus")}
          >
            <Search size={16} />
          </Button>
          {!user ? (
            <>
              <ButtonLink
                variant="primary"
                size="sm"
                href="/login"
                className="text-lg font-normal text-white md:leading-none px-3 py-2"
              >
                Login
              </ButtonLink>
            </>
          ) : user ? (
            <div className="flex gap-2">
              <ButtonLink
                variant="outline"
                href="/orders"
                size="sm"
                className="text-sm px-2 py-1 font-normal md:leading-none"
                leftIcon={ScrollText}
              >
                History
              </ButtonLink>
              <ButtonLink
                variant="primary"
                href="/profile"
                size="sm"
                className="text-sm px-2 py-1 font-normal text-white md:leading-none"
                leftIcon={CircleUser}
              >
                Profile
              </ButtonLink>
            </div>
          ) : (
            <ButtonLink
              variant="primary"
              size="sm"
              href="/dashboard"
              className="text-lg font-normal text-white md:leading-none"
              leftIcon={LayoutDashboard}
            >
              Dashboard
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
