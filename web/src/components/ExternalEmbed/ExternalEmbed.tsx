import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button';

export interface ExternalEmbedProps { title: string; src: string; link: string; kind?: 'form' | 'video' }
export function ExternalEmbed({ title, src, link, kind = 'video' }: ExternalEmbedProps) {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  return <section className={`external-embed external-embed--${kind}`} aria-label={title}>
    {loaded ? <iframe src={src} title={title} allowFullScreen /> : <div className="embed-placeholder">
      <p>{t('embed.placeholder', { title })}</p>
      <Button label={t('embed.load')} primary onClick={() => setLoaded(true)} />
    </div>}
    <p><a href={link}>{t('embed.external')}</a></p>
  </section>;
}
