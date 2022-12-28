import { Spinner as Spin } from 'react-bootstrap';

function Spinner() {
  return (
    <Spin
      animation="border"
      role="status"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        marginTop: '70px',
        display: 'block',
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spin>
  );
}

export default Spinner;