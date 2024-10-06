import React from 'react';
import TextEdgy from '../TextEdgy';

interface TestReceiverInfoProps {
  testReceiver: string;
}

const TestReceiverInfo: React.FC<TestReceiverInfoProps> = ({ testReceiver }) => {
  return (
    <div style={{ margin: '20px', padding: '10px', border: '1px ', borderRadius: '5px' }}>
      <TextEdgy className={`text-base-100 text-secondary text-2xl`}>Testing for: {testReceiver}</TextEdgy>
    </div>
  );
};

export default TestReceiverInfo;