import { useContext } from 'react';
import { FormikContext } from 'formik';

const Debug = () => {
  const formik = useContext(FormikContext);
  if (!formik) {
    return null;
  }
  return (
    <div className="mt-3">
      <h3 className="bg-primary text-light px-3 py-2 rounded-top mb-0">Formik state:</h3>
      <pre className="alert alert-primary text-dark rounded-0 px-2 mt-0">
        {JSON.stringify(formik, null, 2)}
      </pre>
    </div>
  );
};

export default Debug;
