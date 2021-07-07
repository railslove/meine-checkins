import React from 'react';

import {WFD_EMAIL} from 'src/shared/services/OpenLinkService';
import WFDEmailButtonLink from 'src/shared/components/Button/WFDEmailButtonLink';
import WFDIndexButtonLink from 'src/shared/components/Button/WFDIndexButtonLink';

export type FAQLocaleItem = {
  title: string;
  content: string | React.FC;
};

const faqItems: FAQLocaleItem[] = [
  {
    title: 'Warum brauche ich eine App?',
    content:
      'Mittels dieser App bist du Check-In Anbieter unabhängig. Außerdem speicherst du deine Check-Ins und es wird automatisch ein Check-In-Tagebuch angelegt.',
  },
  {
    title: 'Welche Apps kann ich mit der App einchecken?',
    content:
      'Es haben sich hierbei schon einige Apps angeschlossen, aber eine genauere Liste folgt in Kürze.',
  },
  {
    title: 'Kann ich trotzdem noch ganz normal mit meiner Kamera etc. einchecken?',
    content:
      'Ja kannst du. Mit nur einem Klick kannst du deinen QR-Code-Scanner, welcher in den meisten Handykameras integriert ist, nutzen. Dann wirst du allerdings keinen Eintrag im geteilten Tagebuch bekommen.',
  },
  {
    title: 'Ist Meine Checkins bundesweit einsetzbar?',
    content:
      'Ja, du kannst die App in jedem Bundesland benutzen, zusätzlich finden Anbieter von Kontaktdatenerfassungssystemen im Menü "Check-ins" die Option "Als Anbieter mitmachen" - solltet ihr einen Anbieter in eurer Region kennen, der noch nicht dabei ist, schlagt ihm gerne die App vor.',
  },
  {
    title: 'Worin liegt der Unterscheid zu anderen Check-in Apps?',
    content:
      'Mit Meine Checkins funktioniert die Kontaktnachverfolgung anbieterunabhängig, d.h. du wirst über das Scannen des QR Codes zu einem der vielen Anbieter weitergeleitet, deine Daten werden nur lokal auf deinem Handy gespeichert. Somit musst du nicht mehrere Apps runterladen und der Gastronom hat Entscheidungsfreiheit, was den Anbieter angeht.',
  },
  {
    title: 'Was ist “Wir für Digitalisierung”?',
    content() {
      return (
        <>
          <WFDIndexButtonLink>Wir für Digitalisierung</WFDIndexButtonLink> ist eine Initiative
          verschiedener Startups mit dem Ziel die digitale Vielfältigkeit der Kontakterfassung zu
          forcieren.
        </>
      );
    },
  },
  {
    title: 'Sind meine Daten sicher?',
    content:
      'Deine Daten verlassen diese App nicht. Sie sind somit sicher. Falls du noch mehr Fragen zum Thema Datenschutz hast, dann informiere dich dafür bei den vertretenen Anbietern.',
  },
  {
    title: 'Werden meine Daten unverschlüsselt ins Netz übertragen?',
    content: 'Nein deine Daten verlassen die App nicht und bleiben hierbei verschlüsselt.',
  },
  {
    title: 'Ist die App kostenlos?',
    content: 'Die App ist vollständig kostenlos.',
  },
  {
    title: 'Wer kann meine Daten einsehen?',
    content:
      'Nur die zuständige Behörde kann im Infektionsfall die notwendigen Daten beim jeweiligen Betreiber anfordern. Die App gibt Deine Daten nicht weiter.',
  },
  {
    title: 'Muss ich meine richtigen Daten angeben?',
    content:
      'Nach erfolgreicher Eingabe der Kontaktdaten erhält der Gast ein “Check-In-Ticket”. Hierbei wird darauf verwiesen, dem Servicepersonal dieses Ticket vorzuzeigen. Das Personal kann die Eingabe der Kontaktdaten aus Sicht des Gastes durchspielen. Dabei lässt sich die Plausibilität der eingegeben Daten prüfen.',
  },
  {
    title: 'Wo kann ich die App nutzen?',
    content:
      'Die App ist nutzbar bei allen teilnehmenden Betrieben. Wir sind deutschlandweit vertreten.',
  },
  {
    title: 'Wieso sollte ich diese App nutzen und nicht andere Alternativen?',
    content:
      'Mit dieser App hast du die Möglichkeit eine universelle App für die Registrierung deiner Daten zu nutzen. Somit vermeidest du zusätzliche Apps der einzelnen Anbieter herunterzuladen und greifst nur auf eine Plattform zurück, die alle anderen integriert hat.',
  },
  {
    title: 'Wo unterscheidet sich die App von der Corona Warn App',
    content:
      'Mit der App kannst du in Restaurants Anbieterübergreifend Einchecken um deine Personendaten zu hinterlegen, die im Falle einer Infektion an diesem Ort dann dem Gesundheitsamt weitergegeben werden. Dies ersetzt die Corona-Warn-App nicht und du kannst und solltest diese auch weiterhin benutzen.',
  },
  {
    title: 'Der Checkin funktioniert nicht - was kann ich tun?',
    content() {
      return (
        <>
          Bitte melde dich bei Problemen gerne unter{' '}
          <WFDEmailButtonLink>{WFD_EMAIL}</WFDEmailButtonLink> und wir werden uns umgehend der
          Problematik annehmen. Bei einem Aufkommen von Problemen kannst du deine Daten immer noch
          auf die analoge Art, mit Stift und Papier, hinterlassen.
        </>
      );
    },
  },
];

export default {
  title: 'Häufige Fragen',
  items: faqItems,
};
