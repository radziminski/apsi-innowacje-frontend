/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import SampleComponent from '../index';

const renderSampleComponent = (text: string) => render(<SampleComponent text={text} />);

it('renders inside DOM', () => {
  const sampleText = 'Hello World!!!';
  const rendered = renderSampleComponent(sampleText);

  expect(rendered.baseElement).toBeInTheDocument();
});

it('renders with correct text', () => {
  const sampleText = 'Hello World!!!';
  const rendered = renderSampleComponent(sampleText);

  expect(rendered.getByText(sampleText)).toBeInTheDocument();
});
