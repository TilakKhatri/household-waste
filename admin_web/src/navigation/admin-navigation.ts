import {
  Squares2X2Icon,
  UsersIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { ChartBarSquareIcon } from "@heroicons/react/24/solid";

interface INavigation {
  id: string;
  name: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
}

export const navigationLinks: INavigation[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/dashboard",
    icon: Squares2X2Icon,
  },

  {
    id: "centers",
    name: "center",
    path: "/centers",
    icon: BuildingStorefrontIcon,
  },
  {
    id: "pickers",
    name: "Picker management",
    path: "/pickers",
    icon: UsersIcon,
  },
  {
    id: "analytics",
    name: "Analytics",
    path: "/analytics",
    icon: ChartBarSquareIcon,
  },
];
