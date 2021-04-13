import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import Accordion from 'src/shared/components/Accordion/Accordion';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {FAQLocaleItem} from 'src/features/check-ins/FAQLocales';
import {Paragraph} from 'react-native-paper';

const FAQScreen: React.FC = () => {
  const {t} = useTranslation('faqScreen');
  const [openAccordion, setOpenAccordion] = useState(-1);

  const handleOpenAccordion = (index: number) => () => {
    setOpenAccordion(index === openAccordion ? -1 : index);
  };

  const items: FAQLocaleItem[] = t('items', {returnObjects: true});

  return (
    <TopLevelView>
      <Space.V s={10} />
      <Title split={false}>{t('title')}</Title>
      <Space.V s={20} />

      {items.map((el, index) => {
        const {title, content} = el;

        return (
          <Accordion
            key={index}
            open={index === openAccordion}
            title={title}
            content={
              <Paragraph>
                {typeof content === 'function' ? React.createElement(content) : content}
              </Paragraph>
            }
            onOpen={handleOpenAccordion(index)}
          />
        );
      })}
    </TopLevelView>
  );
};

export default FAQScreen;
