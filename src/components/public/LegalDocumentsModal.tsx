import React, { useState, useEffect } from 'react';
import {
  X,
  Scale,
  ShieldCheck,
  FileText,
  ScrollText,
  Printer,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Building2,
  Lock,
} from 'lucide-react';

export type LegalTabId = 'mentions' | 'confidentialite' | 'cgu' | 'cgv';

interface LegalDocumentsModalProps {
  isOpen: boolean;
  initialTab?: LegalTabId;
  onClose: () => void;
}

export const LegalDocumentsModal: React.FC<LegalDocumentsModalProps> = ({
  isOpen,
  initialTab = 'mentions',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabId>(initialTab);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs: { id: LegalTabId; label: string; shortLabel: string; icon: React.ElementType }[] = [
    {
      id: 'mentions',
      label: '1. Mentions Légales',
      shortLabel: 'Mentions Légales',
      icon: Building2,
    },
    {
      id: 'confidentialite',
      label: '2. Politique de Confidentialité',
      shortLabel: 'Confidentialité & APDP',
      icon: ShieldCheck,
    },
    {
      id: 'cgu',
      label: "3. Conditions d'Utilisation (CGU)",
      shortLabel: 'CGU Plateforme',
      icon: FileText,
    },
    {
      id: 'cgv',
      label: '4. Conditions de Vente (CGV)',
      shortLabel: 'CGV Prestations',
      icon: ScrollText,
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white px-5 sm:px-7 py-5 border-b border-slate-800 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-[11px] font-bold uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5 text-sky-400" />
                <span>Documents Juridiques Officiels • JMF Mobility Services</span>
              </div>
              <h2 id="legal-modal-title" className="text-lg sm:text-2xl font-black tracking-tight text-white">
                Cadre Légal, Confidentialité & Conditions Générales
              </h2>
              <p className="text-xs text-slate-300">
                Conformité au droit en vigueur en République du Bénin & protection des données (Loi n° 2017-20 / APDP)
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                title="Imprimer ou enregistrer en PDF"
              >
                <Printer className="w-3.5 h-3.5 text-sky-400" />
                <span>Imprimer</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                aria-label="Fermer la fenêtre juridique"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 font-black'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Legal Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed bg-slate-50/50">
          {/* TAB 1: MENTIONS LÉGALES */}
          {activeTab === 'mentions' && (
            <div className="space-y-6">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900 border-b border-slate-100 pb-2.5">
                  1. Mentions Légales — Éditeur de la Plateforme
                </h3>
                <p>
                  Conformément aux dispositions légales en vigueur en République du Bénin, il est porté à la
                  connaissance des utilisateurs, visiteurs et clients de la plateforme{' '}
                  <strong className="text-slate-900">jmfmobilityservices.com</strong> les informations suivantes :
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Raison sociale</div>
                    <div className="font-black text-slate-900 mt-0.5">JMF MOBILITY SERVICES</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Forme juridique</div>
                    <div className="font-bold text-slate-900 mt-0.5">Société / Entreprise de droit béninois</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                      Dirigeant, Fondateur & Directeur de la publication
                    </div>
                    <div className="font-bold text-slate-900 mt-0.5">Monsieur Jules Martial FALADE</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Siège social</div>
                    <div className="font-bold text-slate-900 mt-0.5">Cotonou, République du Bénin</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200/70 space-y-2">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">Activité principale</div>
                  <p className="text-slate-700 text-xs sm:text-sm">
                    Gestion de flotte automobile, administration de véhicules, conseil en mobilité professionnelle,
                    solutions de télématique 4G, approvisionnement en pièces d'origine certifiées OEM, location de
                    véhicules et convoyage transafricain sécurisé.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-semibold text-slate-800">
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-sky-600" />
                      contact@jmfmobilityservices.com
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-sky-600" />
                      +229 01 97 83 21 21 / +229 01 21 24 88 70
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-600" />
                      Cotonou, Bénin • Antenne Dakar, Sénégal
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div>
                  <h4 className="font-black text-slate-900 mb-1">Hébergement de la plateforme</h4>
                  <p>
                    La plateforme est hébergée sur une infrastructure Cloud sécurisée opérée par{' '}
                    <strong>Render / Services Cloud sécurisés</strong>, bénéficiant du chiffrement des communications
                    (HTTPS/TLS), de sauvegardes redondantes et d'une surveillance continue.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 mb-1">Propriété intellectuelle</h4>
                  <p>
                    L'ensemble des éléments du site et de la plateforme (textes, logos, images, visuels de flotte,
                    graphismes, documents téléchargeables, logiciels, bases de données et structure) relève de la
                    législation béninoise et internationale sur le droit d'auteur et la propriété intellectuelle et
                    appartient à <strong>JMF Mobility Services</strong> ou fait l'objet d'une autorisation
                    d'utilisation.
                  </p>
                  <p className="mt-1.5">
                    Le nom et le logo « <strong>JMF Mobility Services</strong> » sont des signes distinctifs de
                    l'entreprise. Toute reproduction, représentation, modification ou exploitation, totale ou
                    partielle, sur un support électronique ou autre, sans l'autorisation écrite expresse préalable du
                    dirigeant est formellement interdite.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 mb-1">Responsabilité & Liens hypertextes</h4>
                  <p>
                    JMF Mobility Services s'efforce de fournir des informations exactes et à jour, mais ne garantit ni
                    leur exhaustivité ni l'absence d'erreur. Le site peut être momentanément interrompu pour
                    maintenance ou raisons techniques. JMF Mobility Services ne saurait être tenue responsable des
                    dommages résultant de l'utilisation du site, sauf faute lourde ou dolosive de sa part. Le site peut
                    contenir des liens vers des sites tiers sur lesquels JMF Mobility Services n'exerce aucun contrôle
                    et décline toute responsabilité.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 mb-1">Droit applicable</h4>
                  <p>
                    Les présentes mentions légales sont régies par le droit béninois. Tout litige relève des
                    juridictions compétentes de Cotonou, sous réserve des dispositions légales impératives contraires.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POLITIQUE DE CONFIDENTIALITÉ */}
          {activeTab === 'confidentialite' && (
            <div className="space-y-6">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900 border-b border-slate-100 pb-2.5">
                  2. Politique de Confidentialité & Protection des Données
                </h3>
                <p>
                  Chez <strong>JMF Mobility Services</strong> (Cotonou, République du Bénin), nous accordons une
                  importance capitale à la protection de vos données personnelles et professionnelles, en particulier
                  dans le cadre de la gestion de flottes automobiles, du convoyage et des services de télématique.
                </p>

                <div>
                  <h4 className="font-black text-slate-900 mb-1">Cadre légal & Rôles de JMF Mobility Services</h4>
                  <p>
                    Les traitements de données personnelles sont mis en œuvre conformément à la{' '}
                    <strong>loi n° 2017-20 du 20 avril 2018</strong> portant code du numérique en République du Bénin
                    (Livre V relatif à la protection des données à caractère personnel) et aux décisions de l'
                    <strong>Autorité de protection des données à caractère personnel (APDP)</strong> :
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <strong>Responsable du traitement :</strong> pour les données de nos visiteurs, prospects et
                      clients directs (création de compte, facturation, relation commerciale, demandes de devis et
                      navigation sur le site).
                    </li>
                    <li>
                      <strong>Sous-traitant :</strong> pour les données opérationnelles que nos entreprises clientes
                      enregistrent ou font collecter dans la plateforme (véhicules, conducteurs, positions GPS,
                      historique des trajets). L'entreprise cliente demeure responsable de ces traitements vis-à-vis de
                      ses propres salariés et conducteurs.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 mb-1">Données collectées</h4>
                  <p>
                    Nous collectons uniquement les données strictement nécessaires au traitement de vos demandes et à
                    l'exécution de nos prestations :
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <strong>Identité et contact :</strong> nom, prénom, fonction, entreprise, adresse e-mail, numéro
                      de téléphone, adresse professionnelle à Cotonou ou à l'international.
                    </li>
                    <li>
                      <strong>Compte et facturation :</strong> identifiants de connexion, coordonnées de facturation,
                      historique des commandes, devis et règlements.
                    </li>
                    <li>
                      <strong>Données de flotte et conducteurs :</strong> immatriculation, numéro de châssis,
                      kilométrage, planification d'entretiens, carburant, permis, comportement de conduite, trajets et
                      géolocalisation lorsque le client active ces fonctions.
                    </li>
                    <li>
                      <strong>Données techniques et formulaires :</strong> adresse IP, type de navigateur, journaux de
                      connexion sécurisés et messages transmis via nos formulaires de contact ou d'audit.
                    </li>
                  </ul>
                  <p className="mt-2 text-xs text-slate-500 italic">
                    Nous ne collectons aucune donnée sensible (santé, opinions, origine) et vous demandons de ne pas
                    nous en transmettre.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 mb-1">Finalités du traitement</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Fournir les prestations souscrites et gérer votre compte client (exécution du contrat).</li>
                    <li>
                      Répondre à vos demandes d'audit, de location, de pièces OEM ou de convoyage et établir des
                      propositions commerciales (mesures précontractuelles).
                    </li>
                    <li>
                      Assurer le suivi opérationnel de flotte, la géolocalisation et la planification des entretiens.
                    </li>
                    <li>Facturer et respecter nos obligations comptables et fiscales (obligation légale).</li>
                    <li>Assurer la sécurité de la plateforme, prévenir la fraude et améliorer nos services en ligne.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div>
                  <h4 className="font-black text-slate-900 mb-1">Géolocalisation des véhicules et des conducteurs</h4>
                  <p>
                    La géolocalisation constitue un traitement encadré pour le respect de la vie privée. L'entreprise
                    cliente qui l'utilise s'engage à définir une finalité professionnelle précise (sécurité des biens
                    et personnes, optimisation des tournées, maintenance), à informer préalablement chaque conducteur,
                    à ne pas suivre les déplacements en dehors du temps de travail et à accomplir les formalités
                    requises auprès de l'APDP.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 mb-1">
                    Sécurité, Destinataires & Durées de conservation
                  </h4>
                  <p>
                    Vos données sont accessibles uniquement aux équipes habilitées de JMF Mobility Services et à nos
                    prestataires techniques (hébergement Cloud sécurisé, messagerie, support) tenus à de stricts
                    engagements de confidentialité.{' '}
                    <strong>Vos données ne sont en aucun cas vendues ou cédées à des tiers à des fins commerciales.</strong>
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <strong>Données de compte client :</strong> pendant la relation contractuelle, puis 3 ans après
                      sa fin.
                    </li>
                    <li>
                      <strong>Données de prospection :</strong> 3 ans après le dernier contact.
                    </li>
                    <li>
                      <strong>Données de facturation :</strong> 10 ans conformément aux obligations comptables.
                    </li>
                    <li>
                      <strong>Données de géolocalisation & journaux de connexion :</strong> 12 mois au maximum, sauf
                      durée plus courte paramétrée par le client.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 mb-1">Vos droits, Cookies & Public visé</h4>
                  <p>
                    Vous disposez d'un droit d'information, d'accès, de rectification, de suppression et d'opposition
                    concernant vos données. Pour exercer vos droits, écrivez à{' '}
                    <strong className="text-sky-700">contact@jmfmobilityservices.com</strong> en joignant un
                    justificatif d'identité (délai de réponse : 30 jours maximum). En cas de réclamation, vous pouvez
                    saisir l'<strong>APDP (apdp.bj)</strong>.
                  </p>
                  <p className="mt-1.5">
                    <strong>Cookies :</strong> La plateforme utilise uniquement des cookies techniques strictement
                    nécessaires au bon fonctionnement, à la sécurité des sessions et aux préférences d'utilisation. Vous
                    pouvez à tout moment paramétrer ou bloquer les cookies depuis votre navigateur. Nos services
                    s'adressent aux professionnels et majeurs habilités, et non aux mineurs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CGU */}
          {activeTab === 'cgu' && (
            <div className="space-y-5">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900 border-b border-slate-100 pb-2.5">
                  3. Conditions Générales d'Utilisation (CGU)
                </h3>

                <div className="space-y-3.5">
                  <div>
                    <h4 className="font-black text-slate-900">Article 1 — Objet</h4>
                    <p>
                      Les présentes CGU régissent l'accès et l'utilisation du site et de la plateforme digitale de
                      gestion de flotte et de mobilité <strong>JMF Mobility Services</strong> (ci-après la «
                      Plateforme »). Toute utilisation de la Plateforme implique l'acceptation pleine et entière des
                      présentes conditions.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">Article 2 — Accès à la Plateforme</h4>
                    <p>
                      L'espace applicatif de gestion est réservé aux clients professionnels et utilisateurs autorisés.
                      L'accès nécessite un compte créé par JMF Mobility Services ou par l'administrateur de
                      l'entreprise cliente. L'utilisateur dispose à sa charge d'un terminal compatible et d'un accès à
                      internet.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">Article 3 — Compte et identifiants</h4>
                    <p>
                      L'utilisateur s'engage à fournir des informations exactes et à jour. Les identifiants de
                      connexion sont strictement personnels et confidentiels et ne doivent pas être partagés. Toute
                      action réalisée depuis ses identifiants est réputée effectuée par lui. En cas de perte ou de
                      suspicion d'accès non autorisé, il en informe sans délai JMF Mobility Services.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">Article 4 — Règles d'utilisation</h4>
                    <p>
                      L'utilisateur s'engage à utiliser la Plateforme dans le strict respect de la loi. Il est
                      notamment interdit de :
                    </p>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1">
                      <li>Tenter d'accéder à des comptes ou données appartenant à des tiers ;</li>
                      <li>
                        Perturber le bon fonctionnement de la Plateforme (intrusion, surcharge, code malveillant) ;
                      </li>
                      <li>Copier, revendre, décompiler ou extraire le contenu ou le code source de la Plateforme ;</li>
                      <li>Saisir des données illicites, inexactes ou portant atteinte aux droits de tiers ;</li>
                      <li>Utiliser les fonctions de géolocalisation en violation des droits des conducteurs.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">Article 5 — Données de l'utilisateur</h4>
                    <p>
                      L'entreprise cliente demeure titulaire des données de flotte qu'elle enregistre dans la
                      Plateforme et garantit disposer des droits nécessaires. Elle autorise JMF Mobility Services à les
                      traiter exclusivement pour fournir les services souscrits, conformément à la Politique de
                      confidentialité.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">Article 6 — Disponibilité</h4>
                    <p>
                      JMF Mobility Services met tout en œuvre pour assurer un accès continu 24h/24 à la Plateforme, sans
                      garantie absolue d'absence d'interruption. Des opérations de maintenance évolutive peuvent
                      entraîner de brèves suspensions, annoncées dans la mesure du possible. Les services reposant sur
                      des réseaux tiers (GPS, couverture GSM/4G, opérateurs internet) peuvent être affectés par des
                      facteurs extérieurs.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">Article 7 — Propriété intellectuelle</h4>
                    <p>
                      La Plateforme, son architecture logicielle, ses bases de données, ses marques et ses contenus
                      sont protégés. L'utilisateur bénéficie d'un droit d'usage personnel, non exclusif et non
                      cessible, limité à la durée de son contrat, sans aucun transfert de propriété.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">Article 8 — Responsabilité</h4>
                    <p>
                      JMF Mobility Services est tenue d'une obligation de moyens. Elle ne répond pas des dommages
                      indirects (perte d'exploitation, de clientèle ou de chiffre d'affaires), ni des dommages liés à
                      une mauvaise utilisation ou à une saisie inexacte par l'utilisateur. Les décisions opérationnelles
                      prises à partir des indicateurs de la Plateforme relèvent de la seule responsabilité du client.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">
                      Article 9 & 10 — Suspension d'accès et Modification des CGU
                    </h4>
                    <p>
                      JMF Mobility Services se réserve le droit de suspendre ou résilier l'accès en cas de manquement
                      aux présentes CGU, de risque de sécurité ou d'impayé, après notification à l'utilisateur sauf
                      urgence. Les présentes CGU peuvent évoluer ; la version applicable est celle en vigueur en ligne
                      à la date d'utilisation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">Article 11 — Droit applicable et litiges</h4>
                    <p>
                      Les présentes CGU sont soumises au droit béninois. Les parties s'efforcent de résoudre tout
                      différend à l'amiable ; à défaut, les juridictions compétentes de Cotonou sont seules compétentes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CGV */}
          {activeTab === 'cgv' && (
            <div className="space-y-5">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900 border-b border-slate-100 pb-2.5">
                  4. Conditions Générales de Vente et de Prestations (CGV)
                </h3>
                <p>
                  <strong>Préambule :</strong> Les présentes Conditions Générales de Vente régissent l'ensemble des
                  prestations de services et fournitures proposées par <strong>JMF Mobility Services</strong> aux
                  entreprises, institutions et clients professionnels ou particuliers. Toute validation de devis ou de
                  commande implique l'adhésion entière et sans réserve aux présentes conditions, qui prévalent sur tout
                  autre document d'achat sauf accord écrit dérogatoire.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-black text-slate-900">Article 1 — Objet et Champ d'application des services</h4>
                    <p>JMF Mobility Services propose des solutions globales structurées autour de trois pôles :</p>
                    <ol className="list-decimal pl-5 mt-1.5 space-y-1">
                      <li>
                        <strong>Gestion de flotte, télématique et conseil :</strong> Audit de parc, optimisation du
                        coût total de possession (TCO), administration documentaire (CNSR, assurances, TVM), fourniture
                        et suivi de boîtiers GPS/4G et abonnement à la Plateforme.
                      </li>
                      <li>
                        <strong>Convoyage transafricain et mobilité :</strong> Déplacement sécurisé, traçable et clé en
                        main de véhicules légers, utilitaires et poids lourds, ainsi que location courte ou longue
                        durée.
                      </li>
                      <li>
                        <strong>Maintenance et pièces d'origine OEM :</strong> Appui technique, coordination d'atelier,
                        gardiennage sécurisé et fourniture de pièces détachées certifiées d'origine constructeur.
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">Article 2 — Commandes et Devis</h4>
                    <p>
                      Chaque prestation fait l'objet d'un devis préalable gratuit (valable 30 jours sauf mention
                      contraire) ou d'un contrat cadre spécifique. La commande n'est considérée comme ferme et
                      définitive qu'après acceptation écrite du devis par le client et, le cas échéant, encaissement
                      effectif de l'acompte convenu.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">
                      Article 3 — Clauses de Responsabilité et Assurances (Convoyage & Gestion de Flotte)
                    </h4>
                    <div className="space-y-2 mt-1">
                      <p>
                        <strong>3.1. Mission de Convoyage Transafricain :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          JMF Mobility Services s'engage à confier les véhicules à des convoyeurs professionnels
                          qualifiés et à assurer un suivi rigoureux (traçabilité et points de situation réguliers) tout
                          au long du trajet.
                        </li>
                        <li>
                          <strong>État des véhicules :</strong> Un état des lieux contradictoire (visuel et technique)
                          est dressé conjointement au départ et à l'arrivée de chaque convoyage. Le client garantit que
                          le véhicule confié est en règle sur le plan administratif (immatriculation, visite technique)
                          et dispose d'une couverture d'assurance valide pour le transport et les corridors empruntés,
                          sauf accord spécifique de prise en charge contractuelle négociée au devis.
                        </li>
                        <li>
                          <strong>Limitation de responsabilité :</strong> La responsabilité de JMF Mobility Services ne
                          saurait être engagée en cas de force majeure (événements climatiques extrêmes, troubles
                          géopolitiques majeurs imprévisibles, barrages routiers illégaux ou accidents imputables à des
                          tiers non identifiés), ni en cas de panne mécanique avérée liée à un vice caché ou à un
                          défaut d'entretien antérieur du véhicule.
                        </li>
                      </ul>

                      <p className="pt-1">
                        <strong>3.2. Prestations de Gestion de Flotte et Télématique :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Dans le cadre de ses missions de conseil, d'optimisation et d'installation de solutions de
                          télématique (boîtiers 4G, suivi de parcs), JMF Mobility Services est soumise à une obligation
                          de moyens quant à l'analyse des données et aux préconisations d'économies de coûts.
                        </li>
                        <li>
                          Les données de géolocalisation et de télématique fournies le sont à titre d'aide à la
                          décision opérationnelle pour le client, qui demeure seul maître de l'exploitation de sa
                          flotte.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">Article 4 — Tarifs et Modalités de Paiement</h4>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1.5">
                      <li>
                        <strong>Tarification :</strong> Les prix des prestations (convoyage kilométrique ou forfaitaire,
                        abonnements de gestion de flotte, audits de conseil, pièces OEM) sont fixés en francs CFA
                        (FCFA) selon les grilles tarifaires en vigueur ou le devis accepté. Ils sont exprimés hors taxes
                        (HT) et majorés des taxes applicables selon la réglementation en vigueur. Toute prestation
                        additionnelle fait l'objet d'un chiffrage complémentaire.
                      </li>
                      <li>
                        <strong>Missions de convoyage :</strong> Versement d'un acompte de <strong>50 %</strong> à la
                        signature du devis / ordre de mission, et solde de <strong>50 %</strong> exigible à la livraison
                        et à la remise des clés du véhicule au point d'arrivée convenu.
                      </li>
                      <li>
                        <strong>Prestations de gestion de flotte et abonnements :</strong> Paiement mensuel ou
                        trimestriel échu (par virement bancaire, Mobile Money, chèque ou espèces autorisées), à régler
                        au plus tard sous <strong>trente (30) jours francs</strong> à compter de la date d'émission de
                        la facture.
                      </li>
                      <li>
                        <strong>Retard de paiement :</strong> Tout retard de règlement à l'échéance entraîne de plein
                        droit, sans mise en demeure préalable, l'application de pénalités de retard calculées au taux
                        légal en vigueur ainsi que la suspension immédiate des accès aux plateformes de télématique et
                        des prestations en cours jusqu'à régularisation intégrale du solde dû.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">
                      Article 5 — Durée, Résiliation & Matériel Télématique
                    </h4>
                    <p>
                      Sauf mention particulière au devis, les abonnements annuels de gestion ou de télématique sont
                      conclus pour une durée de <strong>12 mois</strong>, renouvelables tacitement par périodes
                      identiques sauf dénonciation écrite notifiée au moins <strong>30 jours</strong> avant l'échéance.
                      En cas de manquement grave non régularisé sous 15 jours après mise en demeure, le contrat peut
                      être résilié de plein droit. Le client donne accès aux véhicules aux dates convenues, s'interdit
                      de démonter ou modifier les boîtiers installés et bénéficie d'une garantie constructeur de 12
                      mois sur le matériel hors choc, humidité ou intervention d'un tiers non agréé.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">
                      Article 6 — Responsabilité Générale, Confidentialité & Réclamations
                    </h4>
                    <p>
                      En dehors des cas légaux impératifs, la responsabilité financière globale de JMF Mobility
                      Services au titre d'un contrat est plafonnée aux dommages directs prouvés, dans la limite des
                      sommes effectivement réglées par le Client au cours des 12 derniers mois pour la prestation
                      concernée. Chaque partie conserve strictement confidentielles les informations non publiques
                      échangées pendant toute la durée du contrat et durant <strong>3 ans</strong> après son terme.
                      Toute réclamation doit être adressée par écrit à{' '}
                      <strong className="text-sky-700">contact@jmfmobilityservices.com</strong> (traitement sous 15
                      jours ouvrés).
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900">
                      Article 7 — Droit applicable et Juridiction compétente
                    </h4>
                    <p>
                      Les présentes conditions sont régies par le droit en vigueur en{' '}
                      <strong>République du Bénin</strong>. En cas de litige relatif à l'interprétation ou à
                      l'exécution des présentes, et à défaut d'accord amiable préalable, compétence exclusive est
                      attribuée aux <strong>tribunaux compétents de Cotonou</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Modal Footer Bar */}
        <div className="px-5 sm:px-7 py-3.5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>JMF Mobility Services • Cotonou, République du Bénin • contact@jmfmobilityservices.com</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fermer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
