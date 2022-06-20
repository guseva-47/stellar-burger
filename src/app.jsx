import { Route, Routes } from 'react-router-dom';
import ConstructorPage from './pages/constructor/constructor-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ConstructorPage />} />
    </Routes>
  );
}

export default App;
