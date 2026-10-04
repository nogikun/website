import { useTranslation } from 'react-i18next';

export function NewsPage() {
  const { t } = useTranslation();
  return <div className="news-list">
    <details><summary>{t('news.updated')} — {t('news.updatedSummary')}</summary>
      <p>{t('news.hello')}</p><p>{t('news.intro')}</p>
      <ul><li>{t('news.homeDesign')}</li><li>{t('news.titles')}</li><li>{t('news.stream')}</li><li>{t('news.fixes')}</li></ul>
      <p>{t('news.end')}</p><p>{t('news.edited', { date: '2022/03/16' })}</p>
    </details>
    <details id="links01"><summary>{t('news.launched')}</summary>
      <p>{t('news.first')}</p><p>{t('news.launch')}</p><p>{t('news.purpose')}</p><p>{t('news.feedback')}</p>
      <a href="https://twitter.com/messages/compose?recipient_id=1088997078229905408">{t('news.dm')}</a>
      <p>{t('news.edited', { date: '2022/03/05' })}</p>
    </details>
  </div>;
}
