import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import QueryProvder from './contexts/QueryProvider';

function App() {
  const routeElements = useRoutes(routes)
  return routeElements
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <QueryProvder>
        <App />
      </QueryProvder>
  </BrowserRouter>
)