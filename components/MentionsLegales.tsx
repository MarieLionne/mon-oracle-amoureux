import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { MENTIONS, TIRAGE_PREMIUM } from '../constants';

const Section: React.FC<{ titre: string; children: React.ReactNode }> = ({ titre, children }) => (
  <section className="space-y-3">
    <h3 className="font-decorative text-lg md:text-xl text-fuchsia-200">{titre}</h3>
    <div className="space-y-3 text-white/70 leading-relaxed">{children}</div>
  </section>
);

const Ligne: React.FC<{ label: string; valeur: string }> = ({ label, valeur }) =>
  valeur ? (
    <p>
      <span className="text-white/90">{label} :</span> {valeur}
    </p>
  ) : null;

const Email = () => (
  <a href={`mailto:${MENTIONS.email}`} className="text-fuchsia-300 hover:underline">
    {MENTIONS.email}
  </a>
);

const MentionsLegales: React.FC<{ onRetour: () => void }> = ({ onRetour }) => (
  <div className="max-w-3xl mx-auto w-full space-y-10 animate-in fade-in slide-in-from-bottom-8 font-sans text-sm md:text-base">
    <div className="flex justify-between items-center border-b border-white/10 pb-6">
      <h2 className="font-decorative text-2xl md:text-3xl">Mentions légales & conditions de vente</h2>
      <button onClick={onRetour} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all shrink-0" aria-label="Retour">
        <ArrowLeft className="w-6 h-6" />
      </button>
    </div>

    <Section titre="Éditrice du site">
      <p className="text-white/90">{MENTIONS.nomCommercial}</p>
      <Ligne label="Responsable de la publication" valeur={MENTIONS.nomPrenomLegal} />
      <Ligne label="Adresse" valeur={MENTIONS.adresse} />
      <Ligne label="Téléphone" valeur={MENTIONS.telephone} />
      <Ligne label="SIRET" valeur={MENTIONS.siret} />
      <p>
        <span className="text-white/90">Contact :</span> <Email />
      </p>
    </Section>

    <Section titre="Hébergement">
      <p>
        Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com
      </p>
    </Section>

    <Section titre="Conditions de vente du tirage personnalisé">
      <p>
        <span className="text-white/90">Le service.</span> Le tirage personnalisé est une réponse écrite et personnelle,
        rédigée par Marie Lionne à partir de votre question, de votre date de naissance et du tirage de l'oracle.
        Il est envoyé à l'adresse e-mail indiquée dans le formulaire, sous {TIRAGE_PREMIUM.delai} après réception du paiement.
      </p>
      <p>
        <span className="text-white/90">Prix et paiement.</span> {TIRAGE_PREMIUM.prix} TTC
        {MENTIONS.mentionTva ? ` (${MENTIONS.mentionTva})` : ''}, payable en ligne par paiement sécurisé via Stripe.
        La commande est confirmée à la réception du paiement.
      </p>
      <p>
        <span className="text-white/90">Droit de rétractation.</span> Vous disposez en principe d'un délai de 14 jours
        pour vous rétracter. En passant commande, vous demandez expressément que votre tirage soit réalisé avant la fin
        de ce délai et reconnaissez perdre votre droit de rétractation une fois la réponse envoyée
        (article L221-28 du Code de la consommation). Tant que la réponse n'est pas envoyée, vous pouvez annuler votre
        demande en écrivant à <Email /> : vous serez intégralement remboursé·e.
      </p>
      <p>
        <span className="text-white/90">Réclamations.</span> Pour toute question ou réclamation, écrivez à <Email />.
        {MENTIONS.mediateur && (
          <> En cas de litige non résolu, vous pouvez recourir gratuitement au médiateur de la consommation : {MENTIONS.mediateur}.</>
        )}
      </p>
      <p className="text-xs text-white/40 italic">
        Les tirages sont réalisés avec sérieux et bienveillance. Ils offrent un éclairage et une guidance, et ne
        remplacent pas l'avis d'un médecin, d'un psychologue, d'un avocat ou d'un conseiller financier.
      </p>
    </Section>

    <Section titre="Données personnelles">
      <p>
        <span className="text-white/90">Tirage gratuit.</span> Votre question et la carte tirée sont transmises au service
        d'intelligence artificielle Google Gemini pour générer l'interprétation. Elles ne sont pas conservées sur ce site.
        L'historique de vos tirages est enregistré uniquement dans votre navigateur, sur votre appareil.
      </p>
      <p>
        <span className="text-white/90">Tirage personnalisé.</span> Votre prénom, votre question, votre date de naissance
        et votre adresse e-mail sont transmis à Marie Lionne par e-mail (service Brevo), uniquement pour réaliser et
        vous envoyer votre tirage. Le paiement est traité par Stripe : vos coordonnées bancaires ne sont jamais
        communiquées à Marie Lionne. Ces informations sont conservées le temps nécessaire au service et à la gestion
        de la relation client, puis au maximum 3 ans après votre dernier contact.
      </p>
      <p>
        <span className="text-white/90">Vos droits.</span> Vous pouvez demander l'accès, la rectification ou la suppression
        de vos données en écrivant à <Email />. Vous pouvez également adresser une réclamation à la CNIL (cnil.fr).
      </p>
    </Section>

    <Section titre="Cookies et mesure d'audience">
      <p>
        Ce site n'utilise aucun cookie publicitaire. La fréquentation est mesurée de façon anonyme et agrégée par
        Vercel Web Analytics, sans cookie et sans identification des visiteurs.
      </p>
    </Section>

    <Section titre="Propriété intellectuelle">
      <p>
        Les textes, les cartes et l'univers de « Mon Oracle Amoureux » sont la propriété de Marie Lionne.
        Toute reproduction sans autorisation est interdite.
      </p>
    </Section>
  </div>
);

export default MentionsLegales;
