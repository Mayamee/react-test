import FormikTest from "@components/FormikTest/FormikTest";
import { Reservation } from "@components/Miniformik/Miniformik";
import BasicForm from "@components/FormikHooks/BasicForm";
import AdvancedForm from "@components/FormikHooks/AdvancedForm";

const App = () => {
  return (
    <div className="test">
      {/* <Reservation />  */}
      {/* <FormikTest /> */}
      {/* <BasicForm /> */}
			<AdvancedForm />
    </div>
  );
};
export default App;
