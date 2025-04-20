import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <Image
          src="/images/logo/logo3.png"
          alt="logo"
          width={64}   // largeur ajustée pour être plus petite
          height={64}  // hauteur ajustée pour être plus petite
          style={{ width: "100%", height: "100%" }}  // S'assurer que l'image occupe toute la taille du conteneur
          quality={100}
        />
      </div>
    </Link>
  );
};

export default Logo;
