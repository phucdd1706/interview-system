// THIRD-PARTY
import { useRoutes } from 'react-router-dom';

// PROJECT IMPORTS
import MainRoutes from './MainRoutes';

export default function ThemeRoutes() {
  return useRoutes([MainRoutes]);
}
