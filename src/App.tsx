import { ThemeProvider } from '@mui/material';
import 'react-image-gallery/styles/css/image-gallery.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/layout';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login';
import ShopTable from './pages/tabs-table/shop-table';
import RetroFitTable from './pages/tabs-table/retro-table';
import TabsTable from './pages/tabs-table/tabs-table';
import Theme from './theme';
import './utils/interceptor';

function App() {
    return (
        <div className="app-container">
            <ThemeProvider theme={Theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/visual_user/:station_id?" element={<TabsTable />} />
                        <Route path="/shop_user/:station_id?" element={<ShopTable />} />
                        <Route path="/retrofit_user/:station_id?" element={<RetroFitTable />} />

                        <Route path="/" element={<Layout />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="sticky" element={<TabsTable />} />
                            <Route path="shop" element={<ShopTable />} />
                            <Route path="retrofit" element={<RetroFitTable />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
