import React from 'react';

interface Props {
  text: string;
}

export const SampleComponent: React.FC<Props> = ({ text }) => {
  return <div className="sample-component">{text}</div>;
};

export default SampleComponent;
