import TableViewIcon from '@mui/icons-material/TableView';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { COLOR_CODES } from '../../utils/constants';
import { ShopTableData } from '../sticky-table/shop-table-data';
import { ShopTableDataNew } from '../sticky-table/shop-table-data-new';
import { useParams } from 'react-router-dom';
const CustomTab = styled(Tab)({
    color: COLOR_CODES.white,
    background: COLOR_CODES.tabBtnColor,
    margin: '5px 5px 0px 5px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    '&.Mui-selected': {
        color: COLOR_CODES.black,
        background: COLOR_CODES.white,
    },

    '&.Mui-selected .MuiSvgIcon-root': {
        color: COLOR_CODES.tabBtnColor,
    },
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    );
}

const TabIconsLabel = ({ children }: any) => {
    return (
        <Box display={'flex'} justifyContent="center" alignItems={'center'}>
            {children}
        </Box>
    );
};

const ShopTable = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const {station_id} = useParams()

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    background: COLOR_CODES.tabColor,
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    className="custom-tabs-container"
                >
                    <CustomTab
                        label={
                            <TabIconsLabel>
                                <TableViewIcon
                                    fontSize="medium"
                                    sx={{
                                        color: COLOR_CODES.white,
                                    }}
                                />
                                <Typography pl={0.4} variant="caption">
                                    2023-02-10-BP-ShopFassedenCheck
                                </Typography>
                            </TabIconsLabel>
                        }
                        id="simple-tab-0"
                        aria-controls="simple-tabpanel-0"
                    />
                    <CustomTab
                        label={
                            <TabIconsLabel>
                                <TableViewIcon
                                    fontSize="medium"
                                    sx={{
                                        color: COLOR_CODES.white,
                                        display:'none'
                                    }}
                                />
                                <Typography pl={0.4} variant="caption">
                                    2023-02-10-BP-ShopFassedenCheck-New
                                </Typography>
                            </TabIconsLabel>
                        }
                        id="simple-tab-0"
                        aria-controls="simple-tabpanel-0"
                        sx={{display:'none'}}
                    />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <ShopTableData station_id={station_id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ShopTableDataNew />
            </TabPanel>
        </Box>
    );
};

export default ShopTable;
