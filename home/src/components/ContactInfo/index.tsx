import { FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope } from "react-icons/fa";

const Contact = () => {
    return (
   
              
                <div className="bg-white rounded-6xl shadow-xl p-8 max-w-6xl mx-auto -mb-60">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Adresse */}
                        <div className="flex flex-col items-center text-center p-6 hover:bg-orange-50 rounded-xl transition-all duration-300">
                            <div className="bg-orange-100 p-4 rounded-full mb-4">
                                <FaMapMarkerAlt className="text-orange-500 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Adresse</h3>
                            <p className="text-white">Nouvelle-Orléans, États-Unis</p>
                        </div>
                        
                        {/* Téléphone */}
                        <div className="flex flex-col items-center text-center p-6 hover:bg-orange-50 rounded-xl transition-all duration-300">
                            <div className="bg-orange-100 p-4 rounded-full mb-4">
                                <FaPhone className="text-orange-500 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Téléphone</h3>
                            <p className="text-white">+12 958 648 597</p>
                        </div>
                        
                        {/* Horaires */}
                        <div className="flex flex-col items-center text-center p-6 hover:bg-orange-50 rounded-xl transition-all duration-300">
                            <div className="bg-orange-100 p-4 rounded-full mb-4">
                                <FaClock className="text-orange-500 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Horaires</h3>
                            <p className="text-white">Lun - Sam: 10:00 - 19:00</p>
                        </div>
                        
                        {/* Email */}
                        <div className="flex flex-col items-center text-center p-6 hover:bg-orange-50 rounded-xl transition-all duration-300">
                            <div className="bg-orange-100 p-4 rounded-full mb-4">
                                <FaEnvelope className="text-orange-500 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                            <p className="text-white">Shopcart@gmail.com</p>
                        </div>
                    </div>

                    {/* Carte et formulaire optionnels */}
                   
                </div>
           
    );
};

export default Contact;