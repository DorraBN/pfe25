import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

const Newsletter = () => {
    return (
        <section className="bg-cream -mb-64">
            <div id="join-section" className="relative z-10">
                <div className="mx-auto max-w-2xl py-16 md:py-24 px-4 sm:px-6 md:max-w-7xl lg:px-5 bg-orange rounded-lg bg-newsletter bg-contain bg-no-repeat bg-right-bottom">
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-8">
                        <div>
                        <h3 className="text-5xl font-bold mb-3">Contactez-nous</h3>
                        <h4 className="text-lg font-medium mb-7">Envoyez-nous un message pour toute question ou demande spécifique.</h4>
                            <div className="flex gap-2">
                            <input
                                    type="email"
                                    name="email"
                                    className="py-4 text-sm w-full text-black bg-white rounded-md pl-4"
                                    placeholder="Entrez votre adresse email"
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    className="py-4 text-sm w-full text-black bg-white rounded-md pl-4"
                                    placeholder="Entrez votre numéro téléphone"
                                    autoComplete="off"
                                    required
                                /><Icon icon="tabler:phone" className="text-transparent text-2xl inline-block me-2" />
                              <div>
                              

                            </div>  
                            <br />
   
 
</div>
<br /> {/* Retour à la ligne ici */}
<button className="bg-primary hover:bg-transparent border border-primary hover:text-primary text-white font-medium py-2 px-4 rounded">
Envoyer  <Icon icon="tabler:send" className="text-white text-2xl inline-block me-2" />
</button>
                        </div>
                        <div className="hidden sm:block">
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
