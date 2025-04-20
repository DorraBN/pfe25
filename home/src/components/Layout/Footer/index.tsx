import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ProductType {
  id: number;
  section: string;
  link: string[];
}

const products: ProductType[] = [
  {
    id: 1,
    section: "Entreprise",
    link: ['À propos', 'Blog', 'Contactez-nous', 'Tarification', 'Témoignages'],
  },
  {
    id: 2,
    section: "Support",
    link: ['Centre d\'aide', 'Conditions de vente', 'Retours et remboursements', 'Politique de confidentialité', 'Statut de la commande']
  },
  {
    id: 3,
    section: "Boutique",
    link: ['Nos Produits', 'Catégories', 'Offres spéciales', 'Nouveautés']
  },
  {
    id: 4,
    section: "Mon Compte",
    link: ['Se connecter', 'S\'inscrire', 'Mes commandes', 'Mes informations', 'Déconnexion']
  }
]

const footer = () => {
  return (
    <div className="bg-primary" id="first-section">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md pt-64 px-4">
        <div className="grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          <div className='col-span-4  '>
            <Link href="/">
            <Image
  src="/images/logo/logo3.png"
  alt="Logo"
  width={64}    // Largeur ajustée pour être carrée
  height={64}   // Hauteur ajustée pour être carrée
  className="rounded-full"  // Applique la bordure arrondie pour la forme circulaire
/>

            </Link>
            <h3 className='text-white text-lg font-medium leading-9 mb-4 lg:mb-20 mt-5'>
              Découvrez nos produits et offrez-vous la qualité que vous méritez
            </h3>
            <div className='flex gap-4'>
              <Link href="/" className="bg-white/20 rounded-full p-2 text-white hover:bg-cream hover:text-primary duration-300">
                <Icon icon="tabler:brand-instagram" className="text-2xl inline-block" />
              </Link>
              <Link href="/" className="bg-white/20 rounded-full p-2 text-white hover:bg-cream hover:text-primary duration-300">
                <Icon icon="tabler:brand-dribbble" className="text-2xl inline-block" />
              </Link>
              <Link href="/" className="bg-white/20 rounded-full p-2 text-white hover:bg-cream hover:text-primary duration-300">
                <Icon icon="tabler:brand-twitter-filled" className="text-2xl inline-block" />
              </Link>
              <Link href="/" className="bg-white/20 rounded-full p-2 text-white hover:bg-cream hover:text-primary duration-300">
                <Icon icon="tabler:brand-youtube-filled" className="text-2xl inline-block" />
              </Link>
            </div>
          </div>

          {products.map((product) => (
            <div key={product.id} className="group relative col-span-2">
              <p className="text-white text-xl font-semibold mb-9">{product.section}</p>
              <ul>
                {product.link.map((link: string, index: number) => (
                  <li key={index} className='mb-5'>
                    <Link href="/" className="text-white/60 hover:text-white text-sm font-normal mb-6">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className='col-span-4'>
            <h3 className='text-white text-xl font-semibold mb-6'>Restez informé</h3>
            <div className="relative text-white focus-within:text-white flex flex-row-reverse">
              <input type="email" name="q" className="py-4 text-sm w-full text-white bg-white/15 rounded-md pl-4 focus:outline-none bg-emailbg focus:text-white" placeholder="Votre adresse email" autoComplete="off" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                  <Icon icon="tabler:send" className="text-white text-2xl inline-block me-2" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Google Map iframe */}
{/* Section Localisation & Contact */}
<div className="mt-16 px-8">
  <div className="grid md:grid-cols-2 gap-10 items-start">
    
    {/* Google Map */}
    <div className="rounded-xl overflow-hidden shadow-lg border border-white/20">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2253361781657!2d144.96305785068445!3d-37.81209997965121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d47d3471df1%3A0x5045675218ce6e0!2z5aWm5a6D5aWv5bqX5a6z!5e0!3m2!1sen!2s!4v1631245048586!5m2!1sen!2s"
        width="100%"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
      ></iframe>
    </div>

    {/* Infos Contact */}
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Icon icon="tabler:map-pin" className="text-3xl" /> Visitez nos boutiques
      </h2>
      <p className="text-white/70 mt-4">Ou venez directement sur place, on sera ravi de vous accueillir !</p><br />
      <p className="text-white/70 mb-2">📍 Avenue Habib Bourguiba</p>
      <p className="text-white/70 mb-2">📞 Téléphone : <a href="tel:123456789" className="hover:underline">123456789</a></p>
      
    </div>

  </div>
</div></div>

  )
}

export default footer;
