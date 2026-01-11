import DarkHamburgermenu from "@/public/DarkHamburgermenu.svg";
import LightHamburgermenu from "@/public/LightHamburgermenu.svg";
import DarkLogo from "@/public/DarkLogo.svg";
import LightLogo from "@/public/LightLogo.svg";
import DarkCart from "@/public/Darkcart.svg";
import LightCart from "@/public/Lightcart.svg";

import ThemeHelper from "@/app/components/ThemeHelper";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 md:px-16 py-3 md:py-2 border-b-2 border-gray-100">
      <div className="flex items-center md:gap-2">
        <ThemeHelper
          darkType={DarkLogo}
          lightType={LightLogo}
          width={45}
          height={45}
        />
        <h3 className="text-sm md:text-xl font-extralight dark:text-white">
          Product Explorer
        </h3>
      </div>
      <div className="flex gap-2">
         <div>
          <ThemeHelper
            darkType={DarkCart}
            lightType={LightCart}
            width={35}
            height={35}
          />
        </div>
        <div>
          <ThemeHelper
            darkType={DarkHamburgermenu}
            lightType={LightHamburgermenu}
            width={35}
            height={35}
          />
        </div>
      </div>
    </nav>
  );
}
