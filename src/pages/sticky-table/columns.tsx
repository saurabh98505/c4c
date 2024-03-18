import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CameraIcon from '@mui/icons-material/Camera';
import { format } from 'date-fns';

export const COLUMNS = [
    {
        Header: 'Submission Date',
        Footer: 'Submission Date',
        accessor: 'submission_date',
        disableSortBy: true,
        headerIcon: <CalendarMonthIcon fontSize="medium" />,
        Cell: ({ value }: any) => {
            return format(new Date(value), 'dd/MM/yyyy');
        },
        width: 200,
        sticky: 'left',
    },
    {
        Header: 'ARAL WERBEELEMENT TYP',
        Footer: 'ARAL WERBEELEMENT TYP',
        accessor: 'approval_status',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
        sticky: 'left',
    },
    {
        Header: 'Approval Status',
        Footer: 'Approval Status',
        accessor: 'aral_type',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
        sticky: 'left',
    },
    {
        Header: 'Datum Time',
        Footer: 'Datum Time',
        accessor: 'datum_time',
        disableSortBy: true,
        headerIcon: <CalendarMonthIcon fontSize="medium" />,
        Cell: ({ value }: any) => {
            return format(new Date(value), 'dd/MM/yyyy');
        },
        width: 200,
    },
    {
        Header: 'Timer',
        Footer: 'Timer',
        accessor: 'timer',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Installationshohe',
        Footer: 'Installationshohe',
        accessor: 'installationshohe',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Installations Position',
        Footer: 'Installations Position',
        accessor: 'installations_position',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Bitte',
        Footer: 'Bitte',
        accessor: 'bitte',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Strasse',
        Footer: 'Strasse',
        accessor: 'strasse',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Windgeschwindigkeit',
        Footer: 'Windgeschwindigkeit',
        accessor: 'windgeschwindigkeit',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Automatische',
        Footer: 'Automatische',
        accessor: 'automatische',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Ort',
        Footer: 'Ort',
        accessor: 'ort',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Bauart',
        Footer: 'Bauart',
        accessor: 'bauart',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Montage',
        Footer: 'Montage',
        accessor: 'montage',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Wind',
        Footer: 'Wind',
        accessor: 'wind',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Factor',
        Footer: 'Factor',
        accessor: 'factor',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Visueller',
        Footer: 'Visueller',
        accessor: 'visueller',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Wartungsempfehlungen',
        Footer: 'Wartungsempfehlungen',
        accessor: 'wartungsempfehlungen',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Befestigung',
        Footer: 'Befestigung',
        accessor: 'befestigung',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Austausch',
        Footer: 'Austausch',
        accessor: 'austausch',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Uberprufung',
        Footer: 'Uberprufung',
        accessor: 'uberprufung',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Wenn',
        Footer: 'Wenn',
        accessor: 'wenn',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Bewegungs',
        Footer: 'Bewegungs',
        accessor: 'bewegungs',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Auszutauschende',
        Footer: 'Auszutauschende',
        accessor: 'Auszutauschende',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Befestigungslosung',
        Footer: 'Befestigungslosung',
        accessor: 'befestigungslosung',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Technische',
        Footer: 'Technische',
        accessor: 'technische',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Sind',
        Footer: 'Sind',
        accessor: 'sind',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Optischer',
        Footer: 'Optischer',
        accessor: 'optischer',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Technischer',
        Footer: 'Technischer',
        accessor: 'technischer',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Angemessenheit',
        Footer: 'Angemessenheit',
        accessor: 'angemessenheit',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Sonstige',
        Footer: 'Sonstige',
        accessor: 'sonstige',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Vorname',
        Footer: 'Vorname',
        accessor: 'vorname',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Nachname',
        Footer: 'Nachname',
        accessor: 'nachname',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Datum',
        Footer: 'Datum',
        accessor: 'datum',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'unterschrift',
        Footer: 'unterschrift',
        accessor: 'unterschrift',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Laufende',
        Footer: 'Laufende',
        accessor: 'laufende',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Eindeutige',
        Footer: 'Eindeutige',
        accessor: 'eindeutige',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Submission',
        Footer: 'Submission',
        accessor: 'submission',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Prufung',
        Footer: 'Prufung',
        accessor: 'prufung',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Last update date',
        Footer: 'Last update date',
        accessor: 'last_update_date',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'vermutetes',
        Footer: 'vermutetes',
        accessor: 'vermutetes',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Submission Id',
        Footer: 'Submission Id',
        accessor: 'submission_id',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Laufende Inspection',
        Footer: 'Laufende Inspection',
        accessor: 'laufende_inspection',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    // {
    //     Header: 'Images',
    //     Footer: 'Images',
    //     accessor: 'image',
    //     disableSortBy: true,
    //     Cell: (tableProps: any) => {
    //         const images = tableProps.row.original.image;
    //         const isValid = images && Array.isArray(images);
    //         return isValid ? (
    //             images.map((pic: any) => {
    //                 return <img width={40} height={40} src={pic} alt={pic} />;
    //             })
    //         ) : (
    //             <></>
    //         );
    //     },
    //     width: 200,
    //     headerIcon: <CameraIcon fontSize="medium" />,
    // },

    {
        Header: 'Dateiupload1',
        Footer: 'Dateiupload1',
        accessor: 'dateiupload1',
        disableSortBy: true,
        Cell: (tableProps: any) => {
            const images = tableProps.row.original.dateiupload1?.split('\n');
            const isValid = images && Array.isArray(images);
            return isValid ? (
                images.map((pic: any) => (
                    <img width={40} height={40} src={pic} alt={pic} />
                ))
            ) : (
                <></>
            );
        },
        width: 200,
        headerIcon: <CameraIcon fontSize="medium" />,
    },
    {
        Header: 'Dateiupload2',
        Footer: 'Dateiupload2',
        accessor: 'dateiupload2',
        disableSortBy: true,
        Cell: (tableProps: any) => {
            const images = tableProps.row.original.dateiupload2?.split('\n');
            const isValid = images && Array.isArray(images);
            return isValid ? (
                images.map((pic: any) => (
                    <img width={40} height={40} src={pic} alt={pic} />
                ))
            ) : (
                <></>
            );
        },
        width: 200,
        headerIcon: <CameraIcon fontSize="medium" />,
    },
    {
        Header: 'Dateiupload3',
        Footer: 'Dateiupload3',
        accessor: 'dateiupload3',
        disableSortBy: true,
        Cell: (tableProps: any) => {
            const images = tableProps.row.original.dateiupload3?.split('\n');
            const isValid = images && Array.isArray(images);
            return isValid ? (
                images.map((pic: any) => (
                    <img width={40} height={40} src={pic} alt={pic} />
                ))
            ) : (
                <></>
            );
        },
        width: 200,
        headerIcon: <CameraIcon fontSize="medium" />,
    },

    // end
];

// around 45 columns
