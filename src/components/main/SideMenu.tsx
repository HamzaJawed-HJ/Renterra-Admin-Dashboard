import Link from "next/link";
import React from "react";

// Icons
import ThemButton from "../ui/ThemButton";
import { FaRegUser, FaList, FaDashcube, FaAngleDoubleUp } from "react-icons/fa";
import { FaRegStickyNote } from "react-icons/fa";
import { FaCodePullRequest, FaDropletSlash } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";

const SideMenu = () => {
  const { user } = useAuth();
  if (!user) return null;
  const navLinks = [
    { name: "DashBoard", href: "/", icon: FaAngleDoubleUp },

    { name: "users", href: "/users", icon: FaRegUser },
    { name: "renters", href: "/renters", icon: FaRegStickyNote },
    { name: "products", href: "/products", icon: FaList },
    {
      name: "renter requests",
      href: "/renter-requests",
      icon: FaCodePullRequest,
    },
  ];

  return (
    <aside className="shrink-0 w-56 p-2.5 h-full grid content-between gap-5 overflow-y-auto bg-primary rounded-md py-2 pt-20">
      <div>
        <h1 className="font-semibold rounded-md my-2 flex items-center capitalize">
          navigation
        </h1>
        <nav className="grid gap-2">
          {navLinks.map((each) => (
            <LinkMenu
              key={each.name}
              name={each.name}
              href={each.href}
              icon={each.icon}
            />
          ))}
        </nav>
      </div>
      <div className="border-t border-border pt-2">
        <ThemButton />
      </div>
    </aside>
  );
};

export default SideMenu;

interface LinkMenuProps {
  name: string;
  href: string;
  icon: React.ElementType;
}

function LinkMenu({ name, href, icon: Icon }: LinkMenuProps) {
  return (
    <Link
      className="flex p-2 rounded-md gap-2.5 items-center hover:bg-secondary"
      href={href}
    >
      <Icon className="text-lg" />
      <span className="capitalize smallText">{name}</span>
    </Link>
  );
}
