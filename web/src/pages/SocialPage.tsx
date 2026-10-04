import { useTranslation } from 'react-i18next';

export function SocialPage() {
  const { t } = useTranslation();
  return <section className="social-page">
    <p>{t('sns.intro')}</p>
    <div className="social-accounts">{(['main', 'sub'] as const).map((account) => (
      <a key={account} href={`https://twitter.com/${account === 'main' ? 'nogikun_' : 'nogikun_sub'}`}>
        <img src={`/images/sns/twitter_${account}_icon.jpg`} alt={t(`sns.${account}`)} />
        <span>{t(`sns.${account}`)}</span>
      </a>
    ))}</div>
    <h2>{t('sns.timeline')}</h2>
    <p><a href="https://twitter.com/nogikun_">@nogikun_</a> / <a href="https://twitter.com/nogikun_sub">@nogikun_sub</a></p>
  </section>;
}
