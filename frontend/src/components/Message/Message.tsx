import { ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

function Message({
  variant = 'info',
  children,
}: {
  variant?: string;
  children: ReactNode;
}) {
  return <Alert variant={variant}>{children}</Alert>;
}

export default Message;