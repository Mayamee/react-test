import FormikTest from '@components/FormikTest/FormikTest';
import { Reservation } from '@components/Miniformik/Miniformik';
import BasicForm from '@components/FormikHooks/BasicForm';
import AdvancedForm from '@components/FormikHooks/AdvancedForm';
import Pagination from '@components/Pagination/Pagination';
import Chat from '@components/Chat/Chat';

const App = () => {
  return (
    <div className="test">
      {/* <Reservation />  */}
      {/* <FormikTest /> */}
      {/* <BasicForm /> */}
      {/* <AdvancedForm /> */}
      {/* <Pagination /> */}
      <Chat />
    </div>
  );
};
export default App;
