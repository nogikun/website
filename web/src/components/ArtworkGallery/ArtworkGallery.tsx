import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Artwork } from '../../data/artworks';

export interface ArtworkGalleryProps { artworks: Artwork[] }

function ArtworkImage({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const { t } = useTranslation();
  return failed ? <div className="image-unavailable" role="img" aria-label={title}>{t('gallery.imageUnavailable')}</div>
    : <img src={src} alt={title} onError={() => setFailed(true)} />;
}

export function ArtworkGallery({ artworks }: ArtworkGalleryProps) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(artworks[0]?.id);
  const selected = artworks.find((item) => item.id === selectedId) ?? artworks[0];
  if (!selected) return <p className="empty-gallery">{t('gallery.empty')}</p>;
  const title = t(`artwork.${selected.titleKey}`);
  return (
    <section className="artwork-gallery" aria-label={t('gallery.label')}>
      <figure className="selected-artwork">
        <figcaption>{title}</figcaption>
        <ArtworkImage key={selected.image} src={selected.image} title={title} />
        <div className="artwork-links">
          <a href={selected.postUrl}>{t('gallery.post')}</a>
          {selected.pixivUrl && <a href={selected.pixivUrl}>{t('gallery.pixiv')}</a>}
          <a href={selected.image}>{t('gallery.original')}</a>
        </div>
      </figure>
      <div className="artwork-thumbnails">{artworks.map((artwork) => (
        <button type="button" key={artwork.id} aria-pressed={artwork.id === selected.id}
          aria-label={t('gallery.select', { title: t(`artwork.${artwork.titleKey}`) })}
          onClick={() => setSelectedId(artwork.id)}>
          <ArtworkImage key={artwork.image} src={artwork.image} title={t(`artwork.${artwork.titleKey}`)} />
        </button>
      ))}</div>
    </section>
  );
}
