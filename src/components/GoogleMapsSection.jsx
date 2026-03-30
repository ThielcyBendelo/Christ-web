import React from "react";

function GoogleMapsSection() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-black-400 via-bleu to-blue-50" id="localisation">
      <div className="max-w-3xl mx-auto text-center black-400">
        <h2 className="text-3xl md:font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 text-transparent bg-clip-text">Localisation professionnelle</h2>
        <p className="text-lg text-gray-400 mb-6">Retrouvez-nous à notre siège, Avenue Kimwenza A/A25, Kinshasa, DR Congo. Nous sommes disponibles pour tous vos projets professionnels.</p>
        <div className="rounded-2xl overflow-hidden shadow-xl-black border border-black-400">
          <iframe
            title="Google Maps localisation"
            src="https://www.google.com/maps?q=Avenue+Kimwenza+A%2FA25,+Kinshasa,+DR+Congo&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="mt-6 text-gray-400 text-base">
          <strong>Adresse :</strong> Avenue , Kinshasa, DR Congo<br />
          <strong>Téléphone :</strong> +243 82<br />
          <strong>Email :</strong> christiantshianyi22@gmail.com
        </div>
      </div>
    </section>
  );
}

export default GoogleMapsSection;
