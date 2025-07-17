import ChatDemo from '../components/ChatDemo';

const Demo = () => {
  return (
    <div className="demo-page">
      <div className="page-header">
        <h1>Fraud Detection Demo</h1>
        <p>Test our advanced AI-powered fraud detection system</p>
      </div>
      
      <div className="demo-content-centered">
        <ChatDemo />
      </div>
    </div>
  );
};

export default Demo; 