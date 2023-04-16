import FormikTest from '@components/FormikTest/FormikTest';
import { Reservation } from '@components/Miniformik/Miniformik';
import BasicForm from '@components/FormikHooks/BasicForm';
import AdvancedForm from '@components/FormikHooks/AdvancedForm';
import Pagination from '@components/Pagination/Pagination';
import Chat from '@components/Chat/Chat';
import { SocketProvider } from '@components/Chat/hooks/useSocket';
import { App as SocketApp } from '@components/ChatSocketIo/Client/App';

const App = () => {
  return (
    <div className="test">
      {/* <Reservation />  */}
      {/* <FormikTest /> */}
      {/* <BasicForm /> */}
      {/* <AdvancedForm /> */}
      {/* <Pagination /> */}
      <Chat />
      {/* <SocketApp /> */}
    </div>
  );
};
export default App;
