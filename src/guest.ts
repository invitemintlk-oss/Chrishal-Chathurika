// Shared wedding + guest-name helpers used by the invitation and the /admin link generator.

export const WEDDING = {
  groomName: 'Chrishal',
  brideName: 'Chathurika',
};

export const PREFIXES = [
  { code: 'mr', label: 'Mr.' },
  { code: 'mrs', label: 'Mrs.' },
  { code: 'miss', label: 'Miss' },
  { code: 'mrmrs', label: 'Mr. & Mrs.' },
  { code: 'family', label: 'Family' },
  { code: 'dear', label: 'Dear' },
] as const;

export type PrefixCode = (typeof PREFIXES)[number]['code'];

/** Combine prefix + name into the name shown to the guest. "Dear" adds nothing (the greeting already says Dear). */
export function buildDisplayName(prefix: PrefixCode, rawName: string): string {
  const name = rawName.trim().replace(/\s+/g, ' ');
  if (!name) return '';
  switch (prefix) {
    case 'mr':
      return `Mr. ${name}`;
    case 'mrs':
      return `Mrs. ${name}`;
    case 'miss':
      return `Miss ${name}`;
    case 'mrmrs':
      return `Mr. & Mrs. ${name}`;
    case 'family':
      return `${name} and Family`;
    case 'dear':
    default:
      return name;
  }
}

/** {baseURL}/{guestName}?p={prefix} – the prefix rides along as a query param so the site can show it. */
export function buildInviteLink(baseUrl: string, prefix: PrefixCode, rawName: string): string {
  const name = rawName.trim().replace(/\s+/g, ' ');
  const base = baseUrl.replace(/\/+$/, '');
  const query = prefix === 'dear' ? '' : `?p=${prefix}`;
  return `${base}/${encodeURIComponent(name)}${query}`;
}

export function buildMessage(displayName: string, link: string): string {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${WEDDING.groomName} & ${WEDDING.brideName}`;
}

/** Read the guest display name from the current URL (/Sanjaya?p=mr → "Mr. Sanjaya"). */
export function readGuestFromLocation(loc: Location = window.location): string {
  const segment = loc.pathname.replace(/^\/+|\/+$/g, '').split('/')[0];
  if (!segment) return '';
  let name = '';
  try {
    name = decodeURIComponent(segment);
  } catch {
    return '';
  }
  const p = new URLSearchParams(loc.search).get('p') ?? 'dear';
  const code = (PREFIXES.some((x) => x.code === p) ? p : 'dear') as PrefixCode;
  return buildDisplayName(code, name);
}
