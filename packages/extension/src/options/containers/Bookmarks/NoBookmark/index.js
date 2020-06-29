import React from 'react';
import { useTranslation } from 'react-i18next';

const NoBookmark = () => {
  const { t } = useTranslation('bookmark');

return <div>{t('nobookmark')}</div>;
};

export default NoBookmark;
