import Image from 'next/image';

type Props = {
  src: string | null;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  tone?: 'chilli' | 'ocean' | 'sun';
};

/**
 * Real photo when `src` is set; otherwise a branded art placeholder so the
 * layout still looks intentional before the photoshoot lands.
 */
export default function Photo({ src, alt, label, className = '', priority, tone = 'chilli' }: Props) {
  if (src) {
    return (
      <div className={`photo ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
      </div>
    );
  }
  return (
    <div className={`photo photo--art tone-${tone} ${className}`} role="img" aria-label={alt}>
      <span className="art-sun" />
      <span className="art-waves" />
      <span className="art-mono">YS</span>
      {label && <span className="art-label">{label}</span>}
    </div>
  );
}
