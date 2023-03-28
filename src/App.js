
import './App.css';
import { BookingContextProvider } from './Context/bookingContext';
import { CostomerContextProvider } from './Context/customerContext';
import NavRoutes from './Routers';

function App() {
  return (
    <CostomerContextProvider>
      <BookingContextProvider>
      <NavRoutes/>
      </BookingContextProvider>
    </CostomerContextProvider>
  );
}

export default App;
