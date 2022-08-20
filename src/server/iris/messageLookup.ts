import type { Message } from 'types/iris';

/*
 ** Initially this file is copied from https://github.com/derf/Travel-Status-DE-IRIS
 ** Thanks for finding these!
 */
export default {
  '1': 'Nähere Informationen in Kürze',
  '2': 'Polizeieinsatz',
  '3': 'Feuerwehreinsatz auf der Strecke',
  '4': 'Kurzfristiger Personalausfall',
  '5': 'Ärztliche Versorgung eines Fahrgastes',
  '6': 'Unbefugtes Ziehen der Notbremse',
  '7': 'Unbefugte Personen auf der Strecke',
  '8': 'Notarzteinsatz auf der Strecke',
  '9': 'Streikauswirkungen',
  '10': 'Tiere auf der Strecke',
  '11': 'Unwetter',
  '12': 'Warten auf ein verspätetes Schiff',
  '13': 'Pass- und Zollkontrolle',
  '14': 'Technischer Defekt am Bahnhof',
  '15': 'Beeinträchtigung durch Vandalismus',
  '16': 'Entschärfung einer Fliegerbombe',
  '17': 'Beschädigung einer Brücke',
  '18': 'Umgestürzter Baum auf der Strecke',
  '19': 'Unfall an einem Bahnübergang',
  '20': 'Tiere auf der Strecke',
  '21': 'Warten auf Anschlussreisende',
  '22': 'Witterungsbedingte Beeinträchtigungen',
  '23': 'Feuerwehreinsatz auf Bahngelände',
  '24': 'Verspätung aus dem Ausland',
  '25': 'Bereitstellung weiterer Wagen',
  '26': 'Abhängen von Wagen',
  '28': 'Gegenstände auf der Strecke',
  '29': 'Ersatzverkehr mit Bus ist eingerichtet',
  '31': 'Bauarbeiten',
  '32': 'Unterstützung beim Ein- und Ausstieg',
  '33': 'Reparatur an der Oberleitung',
  '34': 'Reparatur an einem Signal',
  '35': 'Streckensperrung',
  '36': 'Reparatur am Zug',
  '37': 'Reparatur am Wagen',
  '38': 'Reparatur an der Strecke',
  '39': 'Anhängen von zusätzlichen Wagen',
  '40': 'Defektes Stellwerk',
  '41': 'Technischer Defekt an einem Bahnübergang',
  '42': 'Vorübergehend verminderte Geschwindigkeit auf der Strecke',
  '43': 'Verspätung eines vorausfahrenden Zuges',
  '44': 'Warten auf einen entgegenkommenden Zug',
  '45': 'Überholung durch anderen Zug', // 'Vorfahrt eines anderen Zuges',
  '46': 'Warten auf freie Einfahrt', // 'Vorfahrt eines anderen Zuges',
  '47': 'Verspätete Bereitstellung',
  '48': 'Verspätung aus vorheriger Fahrt',
  '49': 'Kurzfristiger Personalausfall',
  '50': 'Kurzfristige Erkrankung von Personal',
  '51': 'Verspätetes Personal aus vorheriger Fahrt',
  '52': 'Streik',
  '53': 'Unwetterauswirkungen',
  '54': 'Verfügbarkeit der Gleise derzeit eingeschränkt',
  '55': 'Technische Störung an einem anderen Zug',
  '56': 'Warten auf Anschlussreisende',
  '57': 'Zusätzlicher Halt zum Ein- und Ausstieg',
  '58': 'Umleitung',
  '59': 'Schnee und Eis',
  '60': 'Witterungsbedingt verminderte Geschwindigkeit',
  '61': 'Defekte Tür',
  '62': 'Behobener technischer Defekt am Zug',
  '63': 'Technische Untersuchung am Zug',
  '64': 'Reparatur an der Weiche',
  '65': 'Erdrutsch',
  '66': 'Hochwasser',
  '67': 'Behördliche Maßnahme',
  '68': 'Hohes Fahrgastaufkommen verlängert Ein- und Ausstieg',
  '69': 'Zug verkehrt mit verminderter Geschwindigkeit',
  '70': 'WLAN nicht verfügbar',
  '71': 'WLAN in einem/mehreren Wagen nicht verfügbar',
  '72': 'Info-/Entertainment nicht verfügbar',
  '73': 'Mehrzweckabteil vorne',
  '74': 'Mehrzweckabteil hinten',
  '75': '1. Klasse vorne',
  '76': '1. Klasse hinten',
  '77': '1. Klasse fehlt',
  '79': 'Mehrzweckabteil fehlt',
  '80': 'Abweichende Wagenreihung',
  '82': 'Mehrere Wagen fehlen',
  '83': 'Defekte fahrzeuggebundene Einstiegshilfe',
  '84': 'Zug verkehrt richtig gereiht', // r 80 82 83 85,
  '85': 'Ein Wagen fehlt',
  '86': 'Keine Reservierungsanzeige',
  '87': 'Einzelne Wagen ohne Reservierungsanzeige',
  '88': 'Keine Qualitätsmängel', // r 80 82 83 85 86 87 90 91 92 93 96 97 98,
  '89': 'Reservierungen sind wieder vorhanden',
  '90': 'Kein Bordrestaurant/Bordbistro',
  '91': 'Fahrradmitnahme nicht möglich',
  '92': 'Eingeschränkte Fahrradbeförderung',
  '93': 'Behindertengerechte Einrichtung fehlt',
  '94': 'Ersatzbewirtschaftung',
  '95': 'Universal-WC fehlt',
  '96': 'Der Zug ist stark überbesetzt', // r 97,
  '97': 'Der Zug ist überbesetzt', // r 96,
  '98': 'Sonstige Qualitätsmängel',
  '99': 'Verzögerungen im Betriebsablauf',
  '900': 'Anschlussbus wartet(?)',
  // Generic Message - real message is freitext
  '1000': 'Kundentext',
  '1001': 'Keine Zusatzhinweise',
};

export const messageTypeLookup = {
  d: 'delay',
  // f: 'freeText',
  f: 'qos',
  q: 'qos',
  h: 'him', // 'HIM (Hafas Information Manager)',
  i: 'IBIS (Generated IRIS-AP)',
  u: 'IBIS (Generated IRIS-AP, not yet assigned to train)',
  r: 'disruption',
  c: 'connection',
};

export const supersededMessages = {
  '84': [80, 82, 85],
  '88': [70, 71, 83, 90, 91, 92, 93, 94, 96, 97, 98],
  '89': [86, 87],
  '96': [97],
  '97': [96],
};

export const ignoredMessageNumbers = [1000, 1001];

export const isStrikeMessage = (message: Message): boolean =>
  message.value === 9 || message.value === 52;