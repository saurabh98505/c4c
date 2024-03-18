import BarChartIcon from '@mui/icons-material/BarChart';
import TableViewIcon from '@mui/icons-material/TableView';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { COLOR_CODES } from '../../utils/constants';
import { StickyTable } from '../sticky-table/sticky-table';
import { StickyTable2 } from '../sticky-table/sticky-table-2';
import { StickyTable3 } from '../sticky-table/sticky-table-3';
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

const TabsTable = () => {
    const [value, setValue] = React.useState(0);
    const {station_id} = useParams()
        console.log(station_id,"station_id")
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
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
                    {/* <CustomTab
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
                                    Clone of Visual SIGNAGE INSPECTIONS 2022
                                </Typography>
                            </TabIconsLabel>
                        }
                        id="simple-tab-0"
                        aria-controls="simple-tabpanel-0"
                        sx={{
                            display: 'none',
                        }}
                    /> */}

                    {/* <CustomTab
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
                                    Clone of Visual SIGNAGE INSPECTION
                                </Typography>
                            </TabIconsLabel>
                        }
                        id="simple-tab-0"
                        aria-controls="simple-tabpanel-0"
                        sx={{
                            display: 'none',
                        }}
                    /> */}
                    <CustomTab
                        label={
                            <TabIconsLabel>
                                <BarChartIcon
                                    fontSize="medium"
                                    sx={{
                                        color: COLOR_CODES.white,
                                    }}
                                />
                                <Typography pl={0.4} variant="caption">
                                    Visual SIGNAGE INSPECTION PROGRAM 2022
                                </Typography>
                            </TabIconsLabel>
                        }
                        id="simple-tab-1"
                        aria-controls="simple-tabpanel-1"
                        sx={{
                            display: 'block',
                        }}
                    />
                    {/* <CustomTab
                        label={
                            <TabIconsLabel>
                                <AddIcon
                                    fontSize="medium"
                                    sx={{
                                        color: COLOR_CODES.white,
                                    }}
                                />
                                <Typography pl={0.4} variant="button">
                                    Add Tab
                                </Typography>
                            </TabIconsLabel>
                        }
                        id="simple-tab-2"
                        aria-controls="simple-tabpanel-2"
                    /> */}
                </Tabs>
            </Box>
            <TabPanel value={value} index={2}>
                <StickyTable3 />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <StickyTable />
            </TabPanel>
            <TabPanel value={value} index={0}>
                <StickyTable2 station_id={station_id}/>
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
                <Typography color="Highlight" p={5} variant="h4">
                    Unbenannter Report
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography color="Highlight" p={5} variant="h4">
                    Add Tab
                </Typography>
            </TabPanel> */}
        </Box>
    );
};

export default TabsTable;
