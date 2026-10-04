import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { LanguageSwitcher, type LanguageSwitcherProps } from '../LanguageSwitcher/LanguageSwitcher';

export interface NavItem { label: string; href: string; hidden?: boolean }
export interface SiteHeaderProps extends LanguageSwitcherProps {
  items: NavItem[];
  homeHref: string;
}

export function SiteHeader({ items, homeHref, ...languageProps }: SiteHeaderProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    else if (!open) dialog.current?.close();
  }, [open]);

  return (
    <header className="site-header">
      <Link className="site-brand" to={homeHref} onClick={() => setOpen(false)}><span>{t('site.name')}</span><small>{t('site.byline')}</small></Link>
      <LanguageSwitcher {...languageProps} />
      <button type="button" className="menu-toggle" aria-label={t('menu.open')}
        aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(true)}>
        <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
      </button>
      <dialog id={menuId} className="site-menu" ref={dialog} aria-label={t('menu.label')}
        onCancel={() => setOpen(false)} onClose={() => { if (!dialog.current?.open) setOpen(false); }}>
        <button type="button" className="menu-toggle menu-toggle--close" aria-label={t('menu.close')}
          aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(false)}>
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
        </button>
        <nav aria-label={t('menu.label')}><ul>{items.map((item) => (
          <li key={item.href} hidden={item.hidden}>{item.href.startsWith('/')
            ? <Link to={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
            : <a href={item.href} onClick={() => setOpen(false)}>{item.label}</a>}</li>
        ))}</ul></nav>
      </dialog>
    </header>
  );
}
