// THIRD-PARTY
import React, { useEffect, useState } from 'react';
import { IntlProvider, MessageFormatElement } from 'react-intl';

// import label from ;

// PROJECT IMPORTS
import useConfig from 'hooks/useConfig';

// console.log('label', label);

const loadLocaleData = (locale: string) => {
  switch (locale) {
    case 'vi':
      return import('utils/locales/vi');
    default:
      return import('utils/locales/en');
  }
};

interface LocalsProps {
  children: React.ReactNode;
}

const Locales = ({ children }: LocalsProps) => {
  const { locale } = useConfig();
  const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();

  useEffect(() => {
    loadLocaleData(locale).then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
      setMessages(d.default);
    });
  }, [locale]);

  return (
    <>
      {messages && (
        <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
          {children}
        </IntlProvider>
      )}
    </>
  );
};

export default Locales;
