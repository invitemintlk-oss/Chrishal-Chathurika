import { useState, type FormEvent } from 'react';
import { Toaster, toast } from 'sonner';
import { Copy, Link2, MessageSquareText } from 'lucide-react';
import { PREFIXES, WEDDING, buildDisplayName, buildInviteLink, buildMessage, type PrefixCode } from '../guest';

export function AdminPage() {
  const [prefix, setPrefix] = useState<PrefixCode>('mr');
  const [name, setName] = useState('');
  const [result, setResult] = useState<{ link: string; message: string; displayName: string } | null>(null);

  const generate = (e: FormEvent) => {
    e.preventDefault();
    const displayName = buildDisplayName(prefix, name);
    if (!displayName) {
      toast.error('Please enter a guest name');
      return;
    }
    const link = buildInviteLink(window.location.origin, prefix, name);
    setResult({ link, displayName, message: buildMessage(displayName, link) });
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error('Could not copy – please copy manually');
    }
  };

  const btn =
    'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-serif text-sm tracking-widest uppercase transition disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-lime-50/40 px-4 py-12">
      <Toaster position="top-center" />
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-serif text-[#4a5d23] text-center uppercase tracking-widest mb-2">
          Invitation Links
        </h1>
        <p className="text-center text-gray-500 font-serif mb-10">
          {WEDDING.groomName} &amp; {WEDDING.brideName}
        </p>

        <form
          onSubmit={generate}
          className="bg-white rounded-2xl shadow-xl border-2 border-[#7d8f4e]/30 p-6 sm:p-8 space-y-5"
        >
          <div>
            <label htmlFor="prefix" className="block text-sm font-serif text-[#4a5d23] mb-2 uppercase tracking-widest">
              Prefix
            </label>
            <select
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value as PrefixCode)}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#7d8f4e]/30 focus:border-[#7d8f4e] focus:outline-none bg-white"
            >
              {PREFIXES.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="guest" className="block text-sm font-serif text-[#4a5d23] mb-2 uppercase tracking-widest">
              Guest Name
            </label>
            <input
              id="guest"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sanjaya"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#7d8f4e]/30 focus:border-[#7d8f4e] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className={`${btn} w-full text-white bg-gradient-to-r from-[#6b7f3a] to-[#3b4a24] shadow-lg hover:scale-[1.02]`}
          >
            <Link2 className="w-4 h-4" />
            Generate Link
          </button>

          <div className="grid sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={!result}
              onClick={() => result && copy(result.link, 'Link')}
              className={`${btn} border-2 border-[#7d8f4e] text-[#4a5d23] hover:bg-lime-50`}
            >
              <Copy className="w-4 h-4" />
              Copy Link Only
            </button>
            <button
              type="button"
              disabled={!result}
              onClick={() => result && copy(result.message, 'Message')}
              className={`${btn} border-2 border-[#7d8f4e] text-[#4a5d23] hover:bg-lime-50`}
            >
              <MessageSquareText className="w-4 h-4" />
              Copy Full Message
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-8 space-y-6">
            <div>
              <p className="text-sm font-serif text-[#4a5d23] mb-2 uppercase tracking-widest">Link</p>
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block break-all bg-white rounded-lg border border-[#7d8f4e]/30 px-4 py-3 text-[#4a5d23] underline"
              >
                {result.link}
              </a>
            </div>
            <div>
              <p className="text-sm font-serif text-[#4a5d23] mb-2 uppercase tracking-widest">Message preview</p>
              <pre className="whitespace-pre-wrap break-words bg-white rounded-lg border border-[#7d8f4e]/30 px-4 py-4 text-sm text-gray-700 font-sans leading-relaxed">
                {result.message}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
